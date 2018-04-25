// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Router from './vue-router/vue-router'
import Vuex from './vuex/vuex'
import './vee-validate/VeeValidate'
import '@/common/stylus/index'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Vuex,
  render: h => h(App)
})
