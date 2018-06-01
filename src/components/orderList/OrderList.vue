<template>
<div id="order-list">
  <div class="order-info">
    <ul>
      <li class="pro-info">产品信息</li>
      <li class="money">订单金额</li>
      <li class="date">创建时间</li>
      <li class="state">订单状态</li>
      <li class="do">订单操作</li>
    </ul>
  </div>
  <div class="order-list">
    <ul v-if="orderData && orderData.body.length > 0">
      <li class="order-li"
          v-for="(item, index) in showData"
          :key="'order-li' + index"
          v-if="isShowPage(index)">
          <span class="list-title">
            <span>
              取票人 : {{item.taketicketname}}
              <br>
              {{item.idtype}} : {{item.idnumber}}
            </span>
            <span class="order-detail">
              手机 : {{ item.phone }}
              <br>
              出发 : {{ timeStampFormatting(item.departuretime) }}
            </span>
          </span>
        <span class="list-money">
            <span class="money-data">&yen;{{item.money}}</span>
          </span>
        <span class="list-date">
            <span class="order-code">
              {{ timeStampFormatting(item.creationtime) }}
            </span>
          </span>
        <span class="list-state">
          {{showStatus(item)}}
        </span>
        <span class="list-operate">
          <a class="check-order"
             v-if="showStatus(item) === '待支付'"
             @click="orderPayment(item.id)">
            付款
          </a>
          <a class="check-order"
             v-if="showStatus(item) === '待支付'"
             @click="cancelOrder(item.id)">
            取消订单
          </a>
          <a class="check-order" @click="setMark(true, item)">查看订单</a>
        </span>
      </li>
    </ul>
    <div v-else class="no-order">
      暂时没有相关订单
    </div>
  </div>
  <div class="pages-wrapper" v-show="showData.length > pageMsg.liNumber">
    <VuejsPaginate :page-count="pageMsg.countPage"
                   :prevText="'上页'"
                   :nextText="'下页'"
                   :page-range="3"
                   :click-handler="showPage"
                   :containerClass="'pages-ul'"
                   :page-class="'page-li'"
                   :prev-class="'prev-li'"
                   :next-class="'next-li'"
                   :active-class="'active-li'"
                   :disabled-class="'disabled-li'"
                   :break-view-class="'break'"/>
  </div>
  <div class="mask" v-if="isMark">
    <ViewOrder @setMark="setMark" :orderItem="orderItem"/>
  </div>
  <div>
    <MarkTips ref="marktips"/>
  </div>
</div>
</template>

<script>
import ViewOrder from '@/components/viewOrder/ViewOrder'
import VuejsPaginate from 'vuejs-paginate'
/* eslint-disable no-unused-vars */
import { orderPayment, cancelOrder } from '@/api/api'
import MarkTips from '@/components/markTips/MarkTips'
export default {
  props: {
    orderData: {
      type: Object
    },
    showLis: { // 最多显示多少条，默认显示全部
      type: Number,
      default: -1
    },
    init: {
      type: Function
    }
  },
  data () {
    return {
      isMark: false,
      orderItem: {},
      status: {
        0: '待支付',
        2: '已过期'
      },
      // 分页
      pageMsg: {
        currentPage: 1, // 当前页，默认为第一页
        countPage: 10, // 总页数,根据拿到的数据进行设置（自动）
        liNumber: 4 // 每页显示内容数量，在这里进行设置
      }
    }
  },
  methods: {
    setMark (state, item) {
      this.isMark = state
      if (item) {
        this.orderItem = item
      }
    },
    showStatus (item) {
      if (item.status === 1) {
        let msg = this.noTravelORUsed(item)
        return msg
      } else {
        return this.status[item.status]
      }
    },
    noTravelORUsed (item) {
      let today = new Date()
      if (today.getTime() >= (item.departuretime - 0)) {
        return '已完成'
      } else {
        return '待出行'
      }
    },
    timeStampFormatting (time) {
      let day = new Date(time)
      return day.toLocaleString()
    },
    // 待支付才能取消
    cancelOrder (orderid) {
      // let config = {
      //   title: '取消付款',
      //   text: '您真的要取消付款么？',
      //   ishid: true
      // }
      // this.markConfig(config)
      cancelOrder({orderid: orderid})
        .then(data => {
          alert(data.header.msg)
          this.$emit('init')
        })
    },
    orderPayment (orderid) {
      orderPayment({orderid: orderid})
        .then(data => {
          alert(data.header.msg)
          this.$emit('init')
        })
    },
    showPage (page) {
      this.pageMsg.currentPage = page
    },
    initPage (data) {
      let num = Math.ceil(data.length / this.pageMsg.liNumber)
      this.pageMsg.countPage = num
      this.pageMsg.currentPage = 1
    },
    isShowPage (index) {
      index += 1
      let cur = this.pageMsg.currentPage
      let num = this.pageMsg.liNumber
      if (cur === 1 && index <= num) {
        return true
      } else if (cur === 1) {
        return false
      }
      if (index <= cur * num && index > (cur - 1) * num) {
        return true
      } else {
        return false
      }
    },
    markConfig (config) {
      this.$refs.marktips.markConfig(config)
    }
  },
  computed: {
    showData () {
      let data = this.orderData.body
      this.initPage(data)
      if (this.showLis === -1) {
        return data.reverse()
      } else if (typeof this.showLis === 'number') {
        let newData = []
        newData = data.reverse().slice(0, this.showLis)
        return newData
      }
      console.log('出错了')
    }
  },
  components: {
    ViewOrder,
    VuejsPaginate,
    MarkTips
  }
}
</script>

<style lang="stylus" scoped>
#order-list
  min-height 210px
  margin-bottom 20px
  .order-info
    height 38px
    ul
      display flex
      background-color #ccc
      &>li
        font-size 14px
        color #000
        line-height 22px
        padding 8px 0
        text-align left
      .pro-info
        width 250px
        margin-right 10px
      .money
        width 100px
        margin-right 10px
      .date
        width 190px
        margin-right 10px
      .state
        width 100px
        margin-right 10px
      .do
        text-align center
        width 120px
  .order-list
    ul>li.order-li
      float left
      width 100%
      padding 20px 0
      border 1px solid #eee
      &:nth-of-type(odd)
        background-color #eee
      &>span
        float left
      .list-title
        width 250px
        line-height 22px
        margin-right 10px
        &>span
          display block
          color #333
          margin-bottom 3px
        span:first-child
          font-weight 700
          max-height 44px
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
        .order-detail
          font-size 12px
          color #666
          width 220px
          word-wrap break-word
          line-height 20px
          margin-bottom 0
      .list-money
        width 100px
        min-height 22px
        font-size 18px
        font-family Arial
        color #f63
        line-height 22px
        margin-right 10px
        .money-data
          font-weight 700
      .list-date
        width 190px
        margin-right 10px
        min-height 22px
        line-height 22px
        color #333
        .order-code
          display block
      .list-state
        width 102px
        margin-right 10px
        line-height 22px
        color #333
        font-weight 700
      .list-operate
        position relative
        width 120px
        height 30px
        text-align center
        .check-order
          display inline-block
          font-size 14px
          width 82px
          color #666
          margin-bottom 5px
          margin-top 5px
          cursor pointer
          &:hover
            color #ff5d3d
    .no-order
      height 200px
      line-height 200px
      margin 0 auto
      text-align center
  .mask
    position absolute
    top 0
    left 0
    width 100%
    min-height 100%
    background-color #fff
    z-index 100
</style>
<style lang="stylus">
  #bus-list>.main>.msg-wrapper>
  .pages-wrapper
    .pages-ul
      display flex
      float right
      height auto
      border-radius 4px
      color #fff
      margin-bottom 20px
      font-size 16px
      vertical-align middle
      li
        display inline-block
        color #337ab7
        margin-left -1px
        border 1px solid #ddd
        text-align center
        a
          display inline-block
          height 26px
          line-height 26px
          padding 6px 12px
          outline 0
          user-select none
      .disabled-li
        a
          cursor not-allowed
          color #c9c9c9
      .active-li
        border-color #337ab7
        a
          color #fff
          border-color #337ab7
          background-color #337ab7
</style>
