import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'

import'normalize.css/normalize.css'


function setupApp() {
  const app = createApp(App)

  // router
  setupRouter(app)
  // store
  setupStore(app)

  app.mount('#app')
}


// createApp(App).mount('#app')
setupApp()
