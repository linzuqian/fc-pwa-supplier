import Vue from 'vue'
import Axios from 'axios'

Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.withCredentials = true

// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})