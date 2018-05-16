import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 操作状态集
const state = {
  // 是否登陆
  isLogin: false,
  checkFromServer: false,
  // 头组件是否需要背景图片、背景模糊，默认为false
  hasBlur: false,
  searchMsg: {
    // 出发城市
    leaveCity: '',
    // 到达城市
    arriveCity: '',
    // 出发时间
    startDateTime: new Date()
  }
}
// 类似于计算属性的东西
const getters = {}

// 只能是调用mutations中的方法
// 使用dispatch进行触发
// 处理异步操作，不能直接操作mutations
const actions = {
  Login ({commit}, userMsg) {
    commit('Login', userMsg)
  },
  Logout ({commit}) {
    commit('Logout')
  },
  checkValidate ({commit}, data) {
    commit('checkValidate', data)
  }
}
// 操作状态变化
// 方法需要使用commit进行触发
// 非异步操作写在mutations中，可以对state中的数据进行操控
const mutations = {
  Login (state, userMsg) {
    // userMsg: {
    //   phone: '',
    //     password: ''
    // }
    state.isLogin = true
  },
  Logout (state) {
    state.isLogin = false
  },
  hasBlur (state, type) {
    state.hasBlur = type
  },
  checkValidate (state, data) {
    if (data) {
      console.log('正在向后台验证用户信息')
      state.checkFromServer = true
    } else {
      console.log('手机号码、密码输入有误')
    }
  },
  setLeaveCity (state, city) {
    state.searchMsg.leaveCity = city
  },
  setArriveCity (state, city) {
    state.searchMsg.arriveCity = city
  },
  setStartDateTime (state, date) {
    state.searchMsg.startDateTime = date
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
