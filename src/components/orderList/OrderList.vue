<template>
<div id="order-list">
  <div class="order-info">
    <ul>
      <li class="pro-info">产品信息</li>
      <li class="money">订单金额</li>
      <li class="date">订单编号</li>
      <li class="state">订单状态</li>
      <li class="do">订单操作</li>
    </ul>
  </div>
  <div class="order-list">
    <ul v-if="orderData && orderData.orders.length > 0">
      <li class="order-li"
          v-for="(item, index) in showData"
          :key="'order-li' + index">
          <span class="list-title">
            <span :title="item.ticket.start + '-' + item.ticket.end">
              {{item.ticket.start}} - {{item.ticket.end}}
            </span>
            <span class="order-detail">
              {{item.ticket.startDay}} {{item.ticket.startTime}} 出发
            </span>
          </span>
        <span class="list-money">
            <span class="money-data">&yen;{{item.totalPrice}}</span>
          </span>
        <span class="list-date">
            <span class="order-code">
              {{item.orderCode}}
            </span>
          </span>
        <span class="list-state">
            {{item.orderState}}
          </span>
        <span class="list-operate">
            <a class="check-order" @click="setMark(true, item)">查看订单</a>
          </span>
      </li>
    </ul>
    <div v-else class="no-order">
      暂时没有相关订单
    </div>
  </div>
  <div class="mask" v-if="isMark">
    <ViewOrder @setMark="setMark" :orderItem="orderItem"/>
  </div>
</div>
</template>

<script>
import ViewOrder from '@/components/viewOrder/ViewOrder'
export default {
  name: 'order-list',
  props: {
    orderData: {
      type: Object
    },
    showLis: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      isMark: false,
      orderItem: {}
    }
  },
  methods: {
    setMark (state, item) {
      this.isMark = state
      if (item) {
        this.orderItem = item
      }
    }
  },
  computed: {
    showData () {
      let data = this.orderData.orders
      if (this.showLis === -1) {
        return data
      } else if (typeof this.showLis === 'number') {
        let newData = []
        newData = data.slice(0, this.showLis)
        return newData
      }
      console.log('出错了')
    }
  },
  components: {
    ViewOrder
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
