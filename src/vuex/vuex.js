import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 操作状态集
const state = {
  // 是否登陆
  isLogin: false,
  // 头组件是否需要背景图片、背景模糊，默认为false
  hasBlur: false
}
// 类似于计算属性的东西
const getters = {}

// 只能是调用mutations中的方法
// 使用dispatch进行触发
// 处理异步操作，不能直接操作mutations
const actions = {
  Login ({commit}) {
    commit('Login')
  }
}
// 操作状态变化
// 方法需要使用commit进行触发
// 非异步操作写在mutations中，可以对state中的数据进行操控
const mutations = {
  Login (state) {
    state.isLogin = true
  },
  hasBlur (state, type) {
    state.hasBlur = type
  }
}

const modules = {}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: modules
})
