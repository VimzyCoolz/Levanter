import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'

export async function createDB(file) {
  if (!fs.existsSync('data')) fs.mkdirSync('data')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  await db.read()
  db.data ||= { messages: [], contacts: [], settings: {} }
  await db.write()
  return db
}
