<template>
<div id="account-order">
  <div class="order-tab-box">
    <div class="order-tab">
      <a href="javascript:;"
         class="all"
         :class="{current: this.choose === 0}"
         @click="setChoose(0)">
        全部订单
        <span v-show="numbers.all !== 0">{{numbers.all}}</span>
      </a>
      <a href="javascript:;"
         class="wait-pay"
         :class="{current: this.choose === 1}"
         @click="setChoose(1)">
        待支付
        <span v-show="numbers.waitPay !== 0">{{numbers.waitPay}}</span>
      </a>
      <a href="javascript:;"
         class="no-travel"
         :class="{current: this.choose === 2}"
         @click="setChoose(2)">
        待出行
        <span v-show="numbers.noTravel !== 0">{{numbers.noTravel}}</span>
      </a>
      <a href="javascript:;"
         class="used"
         :class="{current: this.choose === 3}"
         @click="setChoose(3)">
        已完成
        <span v-show="numbers.used !== 0">{{numbers.used}}</span>
      </a>
      <a href="javascript:;"
         class="cancel"
         :class="{current: this.choose === 4}"
         @click="setChoose(4)">
        已过期
        <span v-show="numbers.cancel !== 0">{{numbers.cancel}}</span>
      </a>
    </div>
  </div>
  <div class="orders-list">
    <OrderList :orderData="orderDataFilter" @init="init"/>
  </div>
</div>
</template>

<script>
import OrderList from '@/components/orderList/OrderList'
/* eslint-disable no-unused-vars */
import { getOrders } from '@/api/api'
export default {
  name: 'order',
  props: {
    setTitleText: {
      type: Function
    },
    setHidMark: {
      type: Function
    }
  },
  beforeMount () {
    this.init()
  },
  data () {
    return {
      orderData: this.$store.state.orderData,
      numbers: {
        all: 0, // 全部订单
        waitPay: 0, // 待支付
        noTravel: 0, // 待出行
        used: 0, // 已使用
        cancel: 0 // 已取消
      },
      choose: 0 // 默认选中全部订单
    }
  },
  methods: {
    setChoose (num) {
      this.choose = num
    },
    init () {
      this.setTitleText('我的订单')
      let userid = this.$store.state.userInfo.id
      getOrders({userid: userid})
        .then(data => {
          if (data.header.isSuccess !== 0) {
            alert(data.header.msg)
          }
          this.$set(this, 'orderData', data)
          if (this.orderData.header && this.orderData.header.isSuccess === 0) {
            let orders = this.orderData.body
            for (let i = 0; i < orders.length; ++i) {
              this.numbers.all++
              if (orders[i].status === '2' || orders[i].status === 2) {
                this.numbers.cancel++
              } else if (orders[i].status === '1' || orders[i].status === 1) {
                let today = new Date()
                if (today.getTime() >= (orders[i].departuretime - 0)) {
                  this.numbers.used++
                } else {
                  this.numbers.noTravel++
                }
              } else if (orders[i].status === '0' || orders[i].status === 0) {
                this.numbers.waitPay++
              }
            }
          }
          this.setHidMark(true)
        })
        .catch()
      if (this.$route.query.choose) {
        this.choose = this.$route.query.choose
      }
    }
  },
  computed: {
    orderDataFilter () {
      let data = this.orderData
      if (!data.body) {
        return
      }
      let newData = {}
      if (this.choose === 0) {
        return data
      } else if (this.choose === 1) {
        newData.body = data.body.filter((item) => {
          return item.status === 0 || item.status === '0'
        })
      } else if (this.choose === 2) {
        newData.body = data.body.filter((item) => {
          let day = new Date()
          return (item.status === 1 || item.status === '1') && day.getTime() < item.departuretime
        })
      } else if (this.choose === 3) {
        newData.body = data.body.filter((item) => {
          let day = new Date()
          return (item.status === 1 || item.status === '1') && day.getTime() >= item.departuretime
        })
      } else {
        newData.body = data.body.filter((item) => {
          return item.status === 2 || item.status === '2'
        })
      }
      return newData
    }
  },
  components: {
    OrderList
  }
}
</script>

<style lang="stylus" scoped>
#account-order
  font-size 14px
  padding 0 10px 20px
  box-sizing border-box
  .order-tab-box
    height 38px
    border-bottom 2px solid #00A1D6
    .order-tab
      height 38px
      a
        float left
        margin-right 5px
        width 138px
        height 36px
        line-height 36px
        border 2px solid #ccc
        border-bottom 0 none
        font-size 18px
        color #666
        text-align center
        outline none
        &:hover
          border-color #b5cce9
          background-color #dceefd
          text-decoration none
      a.current
        height 38px
        border-color #00A1D6
        background-color #fff
        color #00A1D6
        cursor default
  .orders-list
    margin-top 10px
    min-height 200px
    height 100%
    width 100%
</style>
