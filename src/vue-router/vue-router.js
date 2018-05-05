import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    // 懒加载
    component: () => import('@/components/home/Home'),
    // 缓存vue的组件信息，使其不再重新加载。
    meta: {keepAlive: true}
  },
  {
    path: '/login',
    component: () => import('@/components/login/Login')
  },
  {
    path: '/register',
    component: () => import('@/components/register/Register')
  },
  {
    path: '/forgetpassword',
    component: () => import('@/components/forgetPassword/ForgetPassword')
  }
]
export default new VueRouter({
// 默认的 linkActiveClass 为 router-link-active ,现在把他改为active
  linkActiveClass: 'active',
  mode: 'history',
  routes: routes
})
