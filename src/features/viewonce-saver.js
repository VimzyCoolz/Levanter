export default function initViewOnceSaver({ sock, db, config }) {
  if (!config.features?.viewonce_saver) return
  console.log('[viewonce-saver] initializing')

  // This is a stub: implement actual detection & saving of view-once media
  sock.ev.on('messages.upsert', async (m) => {
    // TODO: inspect message for viewOnce flag and save media buffer to disk
  })
}
