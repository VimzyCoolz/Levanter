import axios from 'axios'

export default function initDownloader({ sock, db, config }) {
  if (!config.features?.downloader) return
  console.log('[downloader] initializing')

  // Example command handler could be implemented to download URLs shared by users
  // This is a stub for future implementation
}
