const FortniteAPI = require('fortnite-api')
import { AppConfig } from '../config/config'
require('dotenv').config()

module String {
  export function getErrorMessage(s: string): string {
    return "Environnement variables " + s + " is missing !"
  }
}

if (!process.env.LOGIN_EMAIL) {
  throw new Error(String.getErrorMessage('LOGIN_EMAIL')).message
}

if (!process.env.LOGIN_PASSWORD) {
  throw new Error(String.getErrorMessage('LOGIN_PASSWORD')).message
}

if (!process.env.OAUTH_EPIC_LAUNCHER) {
  throw new Error(String.getErrorMessage('OAUTH_EPIC_LAUNCHER')).message
}

if (!process.env.OAUTH_FORTNITE) {
  throw new Error(String.getErrorMessage('OAUTH_FORTNITE')).message
}

export const fortniteAPI = new FortniteAPI([
  process.env.LOGIN_EMAIL,
  process.env.LOGIN_PASSWORD,
  process.env.OAUTH_EPIC_LAUNCHER,
  process.env.OAUTH_FORTNITE
], {
    debug: AppConfig.debug
  })
