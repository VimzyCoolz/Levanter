const { spawnSync } = require('child_process')
const { existsSync, writeFileSync } = require('fs')

// Read SESSION_ID from Render environment variables
const SESSION_ID = process.env.SESSION_ID

if (!SESSION_ID) {
  throw new Error('SESSION_ID is not set in environment variables')
}

if (!existsSync('levanter')) {
  console.log('Cloning the repository...')
  const cloneResult = spawnSync(
    'git',
    ['clone', 'https://github.com/lyfe00011/levanter.git', 'levanter'],
    {
      stdio: 'inherit',
    }
  )

  if (cloneResult.error) {
    throw new Error(`Failed to clone the repository: ${cloneResult.error.message}`)
  }

  const configPath = 'levanter/config.env'
  try {
    console.log('Writing to config.env...')
    writeFileSync(
      configPath,
      `VPS=true\nSESSION_ID=${SESSION_ID}\n`
    )
  } catch (err) {
    throw new Error(`Failed to write to config.env: ${err.message}`)
  }

  console.log('Installing dependencies...')
  const installResult = spawnSync(
    'yarn',
    ['install', '--network-concurrency', '3'],
    {
      cwd: 'levanter',
      stdio: 'inherit',
    }
  )

  if (installResult.error) {
    throw new Error(`Failed to install dependencies: ${installResult.error.message}`)
  }
}

spawnSync('yarn', ['start'], { cwd: 'levanter', stdio: 'inherit' })
