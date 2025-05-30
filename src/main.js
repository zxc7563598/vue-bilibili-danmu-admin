import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { setupDirectives } from './directives'

import en from './locales/en.json'
import zh from './locales/zh.json'
import { setupRouter } from './router'
import { setupStore } from './store'
import { lStorage, setupNaiveDiscreteApi } from './utils'
import '@/styles/reset.css'

import '@/styles/global.css'
import 'uno.css'

const i18n = createI18n({
  legacy: false,
  locale: lStorage.get('locale') || 'zh',
  messages: {
    en,
    zh,
  },
})

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupDirectives(app)
  await setupRouter(app)
  app.use(i18n)
  app.provide('t', i18n.global.t)
  setupNaiveDiscreteApi(i18n.global.t)
  window.t = i18n.global.t
  app.mount('#app')
}

bootstrap()
