# Levanter — WhatsApp Bot Starter

This branch contains a starter skeleton for adding WhatsApp bot features (antidelete, view-once saver, downloader, toggles).

Quick start

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY` if using AI features.
2. Install dependencies: `npm install`.
3. Start the bot: `npm start`.

Notes
- This is a minimal skeleton using Baileys and lowdb. Feature modules are in `src/features` and are loaded based on toggles in `src/config.json`.
