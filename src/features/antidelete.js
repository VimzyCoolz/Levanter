export default function initAntidelete({ sock, db, config }) {
  if (!config.features?.antidelete) return
  console.log('[antidelete] initializing')

  // Store incoming messages so we can recover deleted ones
  sock.ev.on('messages.upsert', async (m) => {
    try {
      const messages = m.messages || []
      for (const msg of messages) {
        if (!msg.key || !msg.message) continue
        // Save message to DB
        db.data.messages.push({ key: msg.key, message: msg.message, timestamp: Date.now() })
      }
      await db.write()
    } catch (e) { console.error('[antidelete] save error', e) }
  })

  // Listen for message deletions and attempt to recover
  sock.ev.on('messages.delete', async (del) => {
    try {
      const key = del.key
      const found = db.data.messages.find(m => JSON.stringify(m.key) === JSON.stringify(key))
      if (found) {
        const jid = key.remoteJid
        await sock.sendMessage(jid, { text: `A message was deleted:\n\n${JSON.stringify(found.message).slice(0,200)}` })
      }
    } catch (e) { console.error('[antidelete] recover error', e) }
  })
}
