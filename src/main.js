import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import MantDesign from 'mant-design'
import 'mant-design/lib/mant.css'
import 'mant-design/dist/css/app.6c4d7cc1.css'

Vue.config.productionTip = false
Vue.use(MantDesign)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
