import axios from 'axios'
import qs from 'qs'

// let base = 'http://192.168.43.228:8888/btrisys'
// let base = 'http://120.79.21.193/btrisys'
let base = 'http://cerky.s3.natapp.cc/btrisys'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

// 发送短信验证码
export const sendCaptcha = params => {
  return axios.post(`${base}/user/createCaptcha`, qs.stringify(params))
}

// 注册
export const register = params => {
  return axios.post(`${base}/user/register`, qs.stringify(params)).then(res => res.data)
}
// 登陆
export const requestLogin = params => {
  return axios.post(`${base}/user/login`, qs.stringify(params)).then(res => res.data)
}

// 查询出发城市列表
export const getCity = () => {
  return axios.post(`${base}/ticketQuery/findAllCity`).then(res => res.data)
}
// 根据选取的出发站点、到达站点、时间 获取车票列表
export const getTicket = params => {
  return axios.post(`${base}/ticketQuery/findTicket`, qs.stringify(params)).then(res => res.data)
}


// 获取用户个人信息
export const getPersonInfo = params => {
  return axios.post(`${base}/user/findPersonInfo`, qs.stringify(params)).then(res => res.data)
}
// 用户修改个人信息
export const setPersonInfo = params => {
  return axios.post(`${base}/user/updatePersonInfo`, qs.stringify(params)).then(res => res.data)
}


// 提交订单
export const bookTicket = params => {
  return axios.post(`${base}/order/bookTicket`, qs.stringify(params)).then(res => res.data)
}
// 获取用户订单
export const getOrders = params => {
  return axios.post(`${base}/order/findOrderByUserid`, qs.stringify(params)).then(res => res.data)
}
// 获取订单详情
export const getOrderDetail = params => {
  return axios.post(`${base}/order/orderDetail`, qs.stringify(params)).then(res => res.data)
}
// 退票
export const ticketRefund = params => {
  return axios.post(`${base}/order/ticketRefund`, qs.stringify(params)).then(res => res.data)
}
// 退订单
export const cancelOrder = params => {
  return axios.post(`${base}/order/cancelOrder`, qs.stringify(params)).then(res => res.data)
}
// 待付款订单付款
export const orderPayment = params => {
  return axios.post(`${base}/order/orderPayment`, qs.stringify(params)).then(res => res.data)
}
