export function initToggleManager({ sock, db, config }) {
  // Simple runtime toggle via commands (e.g., !enable antidelete)
  sock.ev.on('messages.upsert', async (m) => {
    const messages = m.messages || []
    for (const msg of messages) {
      if (!msg.message || !msg.message.conversation) continue
      const text = msg.message.conversation
      const parts = text.split(' ')
      if (parts[0] === '!enable' || parts[0] === '!disable') {
        const on = parts[0] === '!enable'
        const feat = parts[1]
        if (feat && config.features.hasOwnProperty(feat)) {
          config.features[feat] = on
          await db.write()
          await sock.sendMessage(msg.key.remoteJid, { text: `Feature ${feat} set to ${on}` })
        }
      }
    }
  })
}
