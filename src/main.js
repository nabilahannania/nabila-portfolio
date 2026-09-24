import { createApp } from 'vue'
import { Quasar } from 'quasar'
// Quasar options (with its CSS) must load before App.vue so our styles can override Quasar's
import quasarUserOptions from './quasar-user-options'
import App from './App.vue'
import router from './router'

createApp(App).use(Quasar, quasarUserOptions).use(router).mount('#app')
