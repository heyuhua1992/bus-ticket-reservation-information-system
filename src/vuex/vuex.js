import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 操作状态集
const state = {
  // 是否登陆
  isLogin: false,
  userInfo: {},
  checkFromServer: false,
  // 头组件是否需要背景图片、背景模糊，默认为false
  hasBlur: false,
  searchMsg: {
    // 出发城市
    leaveCity: '',
    // 到达城市
    arriveCity: '',
    // 出发时间,会被修改
    startDateTime: new Date(),
  },
  // 今天的时间
  today: new Date(),
  // 允许选取的日期范围，今天开始的，后60天内
  ableRange: 60,
  errorType: {
    1: '1错误',
    2: '2错误'
  },
  stationtype: { // 车站类型
    0: '过路车',
    1: '终点站'
  },
  ticketstatus: {
    0: '退票',
    1: '正常'
  },
  // 订单数据
  orderData: {
    header: {},
    body: []
  }
}
// 类似于计算属性的东西
const getters = {}

// 只能是调用mutations中的方法
// 使用dispatch进行触发
// 处理异步操作，不能直接操作mutations
const actions = {
  Login ({commit}) {
    commit('Login')
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
  Login (state) {
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
  },
  setUserInfo (state, date) {
    state.userInfo = date
  },
  clearUserInfo (state) {
    state.userInfo = {}
  },
  setOrderData (state, data) {
    state.orderData = data
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
