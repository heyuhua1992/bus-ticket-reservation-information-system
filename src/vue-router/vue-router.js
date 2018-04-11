import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/'
  }
]
export default new VueRouter({
// 默认的 linkActiveClass 为 router-link-active ,现在把他改为active
  linkActiveClass: 'active',
  mode: 'history',
  routes: routes
})
