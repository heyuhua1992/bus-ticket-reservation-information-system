<template>
<div id="account-home">
  <div class="mem-box">
    <div class="mem-pic-box clearfix">
      <div class="mem-pic">
        <img src="../../../static/img/login-face.gif">
      </div>
      <div class="mem-top-right">
        <div class="name-box">
          <a href="#">
            <span>尊敬的会员</span>
          </a>
        </div>
        <div class="account-verify">
          <label>账户实名</label>
          <span class="verify-span">去认证</span>
        </div>
        <div class="account-sec">
          <label>账户安全</label>
          <span class="line-bottom">
            <span class="level lv1" style="width: 30%">弱</span>
          </span>
          <a href="#">
            <s>提升安全度</s>
          </a>
        </div>
      </div>
    </div>
    <div class="mem-order">
      <ul>
        <li>
          <router-link to="/account/order">
            <div class="all-ico"></div>
            <p>全部订单</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/account/order', query:{choose: 1}}">
            <div class="pay-ico"></div>
            <p>
              待支付
              <span class="un-pay-count">{{numbers.waitPay}}</span>
            </p>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/account/order', query:{choose: 2}}">
            <div class="travel-ico"></div>
            <p>
              待出行
              <span class="un-use-count">{{numbers.noTravel}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="clearfix my-order">
    <h3>
      我的订单
      <router-link to="/account/order" class="more-order">查看全部订单</router-link>
    </h3>
    <OrderList :orderData="orderData" :showLis="3"/>
  </div>
</div>
</template>

<script>
import OrderList from '@/components/orderList/OrderList'
/* eslint-disable no-unused-vars */
import { getOrders } from '@/api/api'
export default {
  name: 'home',
  props: {
    setTitleText: {
      type: Function
    },
    setHidMark: {
      type: Function
    }
  },
  beforeMount () {
    this.setTitleText('首页')
    this.getData()
  },
  data () {
    return {
      orderData: this.$store.state.orderData,
      numbers: {
        all: 0, // 全部订单
        waitPay: 0, // 待支付
        noTravel: 0, // 待出行
        used: 0, // 已完成
        cancel: 0 // 已取消
      }
    }
  },
  methods: {
    getData () {
      let userid = this.$store.state.userInfo.id
      this.setHidMark(false)
      getOrders({userid: userid})
        .then(data => {
          if (data.header.isSuccess !== 0) {
            alert(data.header.msg)
          }
          this.$store.commit('setOrderData', data)
          this.$set(this, 'orderData', data)
          this.initNumber()
          this.setHidMark(true)
        })
        .catch()
    },
    initNumber () {
      if (this.orderData.header.isSuccess === 0) {
        let orders = this.orderData.body
        if (!orders.length) {
          return
        }
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
    }
  },
  components: {
    OrderList
  }
}
</script>

<style lang="stylus" scoped>
#account-home
  float left
  color #333
  font-size 14px
  min-height 640px
  width 100%
  padding 0 10px 20px
  box-sizing border-box
  .mem-box
    padding 5px 0 5px 5px
    background-color #f7f7f7
    margin-bottom 20px
    height 142px
    overflow hidden
    .mem-pic-box
      float left
      width 330px
      border-right 1px solid #ddd
      padding 25px 0 25px 25px
      .mem-pic
        float left
        width 80px
        height 80px
        img
          display inline-block
          width 80px
          height 80px
          border 0
          border-radius 50%
      .mem-top-right
        position relative
        float left
        width 220px
        margin 3px 0 0 15px
        font-size 12px
        .name-box
          height 20px
          a:first-child
            display inline-block
            float left
            max-width 120px
            color #666
            font-size 18px
            font-weight 700
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            cursor pointer
            outline 0
        .account-verify
          height 20px
          clear both
          margin-top 15px
          label
            float left
            color #666
          span
            margin-left 7px
            color #0185c6
            cursor pointer
        .account-sec
          margin 10px 0 5px 0
          &>label
            float left
            color #666
          .line-bottom
            display block
            float left
            width 75px
            height 12px
            margin 4px 0 0 7px
            background-color #ddd
            overflow hidden
            .level
              display block
              height 12px
              line-height 13px
              padding-left 5px
              overflow hidden
              color #fff
              background-color #ff7800
              &.lv1
                background-color #2ebd59
          &>a
            float left
            color #333
            margin-left 8px
            cursor pointer
            s
              display block
              color #08c
              text-decoration none
    .mem-order
      float left
      width 380px
      padding 25px 0 25px 20px
      ul>li
        float left
        width 96px
        a
          cursor pointer
        a>p
          text-align center
          color #666
          span
            color #ff7800
            margin-left 3px
            font-weight 700
        a .all-ico, a .pay-ico, a .travel-ico
          width 52px
          height 52px
          margin 0 0 15px 15px
          filter invert(50%)
          background url("./png/orderCenter.0.2.png") no-repeat
        a .all-ico
          margin-left 13px
          background-position -60px -216px
          &:hover
            background-position -58px -345px
        a .pay-ico
          background-position -145px -216px
          &:hover
            background-position -143px -345px
        a .travel-ico
          background-position -60px -279px
          &:hover
            background-position -58px -412px
        &:first-child
          width 96px
          a>p
            width 82px
  .my-order
    min-height 210px
    margin-bottom 20px
    &>h3
      position relative
      height 24px
      line-height 24px
      margin-top 18px
      padding-bottom 6px
      padding-left 28px
      font-size 20px
      font-weight 400
      color #333
      border-bottom 2px solid #eee
      background url("./png/orderCenter.0.2.png") no-repeat
      background-position -278px -158px
      .more-order
        filter invert(0%)
        font-size 14px
        position absolute
        right 20px
        cursor pointer
        color #0185c6
        outline 0
        &:hover
          color #ff5d3d
</style>
