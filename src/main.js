/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

// Remove only data left by the discontinued local demonstration.
try {
  localStorage.removeItem('gpter:demo:v1')
  sessionStorage.removeItem('gpter:session:v1')
} catch { /* Storage may be unavailable in restricted browser contexts. */ }

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
