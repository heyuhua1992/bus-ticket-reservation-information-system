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
        已使用
        <span v-show="numbers.used !== 0">{{numbers.used}}</span>
      </a>
      <a href="javascript:;"
         class="cancel"
         :class="{current: this.choose === 4}"
         @click="setChoose(4)">
        已取消
        <span v-show="numbers.cancel !== 0">{{numbers.cancel}}</span>
      </a>
    </div>
  </div>
  <div class="orders-list">
    <OrderList :orderData="orderDataFilter"/>
  </div>
</div>
</template>

<script>
import OrderList from '@/components/orderList/OrderList'
export default {
  name: 'order',
  props: {
    setTitleText: {
      type: Function
    },
    orderData: {
      type: Object
    }
  },
  beforeMount () {
    this.setTitleText('我的订单')
    if (this.orderData) {
      this.$nextTick(() => {
        let orders = this.orderData.orders
        for (let i = 0; i < orders.length; ++i) {
          this.numbers.all++
          if (orders[i].orderState === '已取消') {
            this.numbers.cancel++
          } else if (orders[i].orderState === '已使用') {
            this.numbers.used++
          } else if (orders[i].orderState === '待支付') {
            this.numbers.waitPay++
          } else if (orders[i].orderState === '待出行') {
            this.numbers.noTravel++
          }
        }
      })
    }
  },
  data () {
    return {
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
    }
  },
  computed: {
    orderDataFilter () {
      let data = this.orderData
      let newData = {}
      if (this.choose === 0) {
        return data
      } else if (this.choose === 1) {
        newData.orders = data.orders.filter((item) => {
          return item.orderState === '待支付'
        })
      } else if (this.choose === 2) {
        newData.orders = data.orders.filter((item) => {
          return item.orderState === '待出行'
        })
      } else if (this.choose === 3) {
        newData.orders = data.orders.filter((item) => {
          return item.orderState === '已使用'
        })
      } else {
        newData.orders = data.orders.filter((item) => {
          return item.orderState === '已取消'
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
    width 100%
</style>
