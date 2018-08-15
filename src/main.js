import Vue from 'vue'
import App from './App.vue'

import router from '@/plugins/router'

import '@/plugins/axios'
import { apolloProvider } from '@/plugins/vue-apollo'
import '@/plugins/infinite-loading'

Vue.config.productionTip = false

new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')