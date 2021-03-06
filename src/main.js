// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Cookies from 'js-cookie/src/js.cookie'
import axios from 'axios'
import Router from './vue-router/vue-router'
import Vuex from './vuex/vuex'
import './vee-validate/VeeValidate'
import '@/common/stylus/index'
import '../static/css/bootstrap-theme.min.css'
import '../static/css/reset.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$Cookies = Cookies
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Vuex,
  render: h => h(App)
})
