
import './styles/quasar.sass'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    // Follow the OS color scheme until the visitor picks a theme in the navbar
    dark: 'auto'
  },
  plugins: {
    Notify
  }
}
