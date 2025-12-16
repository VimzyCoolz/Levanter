import makeWASocket from '@adiwajshing/baileys'
import { useSingleFileAuthState } from '@adiwajshing/baileys'
import fs from 'fs'
import config from './config.json' assert { type: 'json' }
import { createDB } from './utils/db.js'
import initAntidelete from './features/antidelete.js'
import initViewOnceSaver from './features/viewonce-saver.js'
import initDownloader from './features/downloader.js'
import { initToggleManager } from './features/toggle-manager.js'

const { state, saveState } = useSingleFileAuthState('./session.json')

async function start() {
  const sock = makeWASocket.default({ auth: state })
  sock.ev.on('connection.update', (update) => {
    console.log('connection.update', update)
    if (update.connection === 'close') console.log('Connection closed')
  })
  sock.ev.on('creds.update', saveState)

  const db = await createDB(config.dbPath)

  // Initialize features based on config
  initAntidelete({ sock, db, config })
  initViewOnceSaver({ sock, db, config })
  initDownloader({ sock, db, config })
  initToggleManager({ sock, db, config })

  console.log('Bot started with features:', Object.keys(config.features).filter(k => config.features[k]))
}

start().catch(e => console.error(e))
