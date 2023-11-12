import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'

import'normalize.css/normalize.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



function setupApp() {
  const app = createApp(App)

  //el-icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // router
  setupRouter(app)
  // store
  setupStore(app)

  app.mount('#app')
}


// createApp(App).mount('#app')
setupApp()
