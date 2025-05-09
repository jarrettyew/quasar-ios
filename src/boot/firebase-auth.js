import { boot } from 'quasar/wrappers'
import { FirebaseAuthentication } from '@capacitor-firebase/authentication'

export default boot(({ app }) => {
  app.config.globalProperties.$fAuth = FirebaseAuthentication
})

export { FirebaseAuthentication }
