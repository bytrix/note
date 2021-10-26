import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import MantDesign from 'mant-design'
// import MarkdownItVue from 'markdown-it-vue'
// import 'markdown-it-vue/dist/markdown-it-vue.css'
import 'mant-design/lib/mant.css'
// import 'mant-design/dist/css/app.f80a152f.css'
import './assets/app.css'

Vue.config.productionTip = false
Vue.use(MantDesign)
// Vue.use(MarkdownItVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
