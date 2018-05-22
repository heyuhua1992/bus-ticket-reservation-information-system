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
    <ul>
      <li class="order-li" v-for="n in 5" :key="n">
          <span class="list-title">
            <span title="广州-湛江">广州-湛江</span>
            <span class="order-detail">
              2018-05-19 09:45 出发
            </span>
          </span>
        <span class="list-money">
            <span class="money-data">&yen;120</span>
          </span>
        <span class="list-date">
            <span class="order-code">
              WQ5AFU887710081A
            </span>
          </span>
        <span class="list-state">
            已取消
          </span>
        <span class="list-operate">
            <a href="" class="check-order">查看订单</a>
          </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'order-list'
}
</script>

<style lang="stylus" scoped>
#order-list
  min-height 210px
  margin-bottom 20px
  .order-info
    height 38px
    ul
      &>li
        float left
        font-size 12px
        color #999
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
</style>
