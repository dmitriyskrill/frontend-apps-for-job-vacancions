/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import { loadFonts } from './webfontloader'
import type { App } from 'vue'

export function registerPlugins (app: App<Element>) {
  loadFonts()
}
