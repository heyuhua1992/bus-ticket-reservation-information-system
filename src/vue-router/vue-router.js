import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    // 懒加载
    component: resolve => require(['@/components/home/Home'], resolve),
    // 缓存vue的组件信息，使其不再重新加载。
    meta: {keepAlive: true}
  },
  {
    path: '/login',
    component: resolve => require(['@/components/login/Login'], resolve)
  },
  {
    path: '/register',
    component: resolve => require(['@/components/register/Register'], resolve)
  },
  {
    path: '/forgetpassword',
    component: resolve => require(['@/components/forgetPassword/ForgetPassword'], resolve)
  },
  {
    path: '/buslist',
    component: resolve => require(['@/components/busList/BusList'], resolve)
  },
  {
    path: '/informationtips',
    component: resolve => require(['@/components/informationTips/InformationTips'], resolve)
  },
  {
    path: '/resetpassword',
    component: resolve => require(['@/components/resetPassword/ResetPassword'], resolve)
  },
  {
    path: '/booking',
    component: resolve => require(['@/components/booking/Booking'], resolve)
  },
  {
    path: '/account',
    component: resolve => require(['@/components/account/Account'], resolve),
    children: [
      {
        path: 'home',
        component: resolve => require(['@/components/account/Home'], resolve)
      },
      {
        path: 'order',
        component: resolve => require(['@/components/account/Order'], resolve)
      },
      {
        path: 'setting',
        component: resolve => require(['@/components/account/Setting'], resolve)
      },
      {
        path: 'general',
        component: resolve => require(['@/components/account/General'], resolve)
      }
    ]
  }
]
export default new VueRouter({
// 默认的 linkActiveClass 为 router-link-active ,现在把他改为active
  linkActiveClass: 'active',
  mode: 'history',
  routes: routes
})
