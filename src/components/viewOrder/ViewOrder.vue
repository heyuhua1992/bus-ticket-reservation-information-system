<template>
<div id="view-order">
  <div class="order-info">
    <span>
      订单号：
      <em>{{orderItem.orderCode}}</em>
    </span>
    <span>
      订单状态：
      <em>{{orderItem.orderState}}</em>
    </span>
    <span>预订时间：{{orderItem.orderMakeTime}}</span>
  </div>
  <div class="order-detail">
    <template v-if="orderItem.QrCode">
      <h4 class="info-tit">二维码</h4>
      <div class="info-list">
        <QrCodeVue :value="orderItem.QrCode" :size="100" level="H"/>
      </div>
    </template>
    <h4 class="info-tit">行程信息</h4>
    <div class="info-list">
      <ul class="table-bt">
        <li>计划车型</li>
        <li>出发时间</li>
        <li>始发站</li>
        <li>终点站</li>
        <li>票款</li>
      </ul>
      <ul>
        <li>{{ orderItem.ticket.busType }}</li>
        <li>{{ orderItem.ticket.startDay }} {{ orderItem.ticket.startTime }}</li>
        <li>
          {{ orderItem.ticket.start }}
        </li>
        <li>
          湛江
        </li>
        <li class="price">&yen;{{ orderItem.ticket.ticketPrice }}</li>
      </ul>
    </div>
    <template v-if="showInsurance">
      <h4 class="info-tit" >保险信息</h4>
      <div class="info-list">
        <ul class="table-bt">
          <li>保险价格</li>
          <li>保额</li>
        </ul>
        <ul>
          <li>&yen;{{ orderItem.insurance.price }}</li>
          <li>{{ orderItem.insurance.info }}</li>
        </ul>
      </div>
    </template>
    <h4 class="info-tit">乘客信息</h4>
    <div class="info-list">
      <ul class="table-bt">
        <li>乘客姓名</li>
        <li>乘客类型</li>
        <li>证件类型</li>
        <li>证件号码</li>
      </ul>
      <ul v-for="(item, index) in orderItem.passengers" :key="'ul' + index">
        <li>{{ item.passengerName }}</li>
        <li>
          成人票
        </li>
        <li>
          身份证
        </li>
        <li>
          {{ item.idCardCode }}
        </li>
      </ul>
    </div>
    <h4 class="info-tit">支付信息</h4>
    <div class="info-list">
      <p>
        支付金额：
        <span class="price">&yen;{{ orderItem.totalPrice }}</span>
        (
        <span>
          成人票
          <em class="price">
            &yen;{{ orderItem.ticket.ticketPrice }}*{{orderItem.passengers.length}}
          </em>
          <template v-if="orderItem.insurance.price">
          +
          保险
          <em class="price">
            &yen;{{ orderItem.insurance.price }}*{{orderItem.passengers.length}}
          </em>
          </template>
        </span>
        )
      </p>
    </div>
    <h4 class="info-tit">联系人信息</h4>
    <div class="info-list">
      <ul>
        <li>姓名：{{ orderItem.contacts.name }}</li>
        <li>手机：{{ orderItem.contacts.phone }}</li>
      </ul>
    </div>
  </div>
  <div class="order-btn">
    <a class="btn" @click="hid">返回列表</a>
  </div>
</div>
</template>

<script>
import QrCodeVue from 'qrcode.vue'
export default {
  name: 'view-order',
  props: {
    orderItem: {
      type: Object
    }
  },
  methods: {
    hid () {
      this.$emit('setMark', false)
    }
  },
  computed: {
    showInsurance () {
      if (this.orderItem.insurance.price) {
        return true
      }
      return false
    }
  },
  components: {
    QrCodeVue
  }
}
</script>

<style lang="stylus" scoped>
#view-order
  width 100%
  height 100%
  font-size 14px
  .order-info
    padding 10px
    span
      display inline-block
      margin-right 20px
      em
        font-weight 700
  .order-detail
    border 1px solid #ddd
    .info-tit
      display block
      background #f0f0f0
      padding 0 0 0 10px
      height 30px
      line-height 30px
    .info-list
      padding 10px
      .price
        color #ff7800
      &>ul
        width 100%
        overflow hidden
        li
          width 160px
          float left
          height 30px
          line-height 30px
      .table-bt
        color #999
  .order-btn
    text-align center
    padding 20px 0
    .btn
      display inline-block
      height 26px
      line-height 26px
      font-weight 700
      cursor pointer
      margin-right 15px
      padding 0 15px
      border-radius 3px
      color #fff
      background-color #2aabd2
</style>
