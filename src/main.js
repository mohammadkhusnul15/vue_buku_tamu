import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import VueSignature from 'vue-signature-pad'
import 'vue-signature-pad/dist/vue-signature-pad.common.js'

Vue.use(VueSignature)
Vue.use(BootstrapVue)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
