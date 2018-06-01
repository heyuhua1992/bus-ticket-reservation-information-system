<template>
<div id="view-order">
  <template v-for="(detail, ind) in orderDetails">
    <div class="order-info" :key="'orderDetails' + ind">
      <span>
        车票状态：
        <em>{{ $store.state.ticketstatus[detail.ticketstatus] }}</em>
      </span>
      <template v-if="showBtn(detail)">
        <span class="fr btn">
<!--          <a>改签</a>-->
          <a @click="refund(detail.orderdetailid)">退票</a>
        </span>
      </template>
    </div>
    <div class="order-detail" :key="'orderDetails-' + ind">
      <template v-if="showQRcode()">
        <h4 class="info-tit">二维码</h4>
        <div class="info-list">
          <QrCodeVue :value="getQRcode(detail)" :size="100" level="H"/>
        </div>
      </template>
      <h4 class="info-tit">行程信息</h4>
      <div class="info-list">
        <ul class="table-bt">
          <li>计划车型</li>
          <li>始发站 : {{ detail.startcity }}</li>
          <li>{{detail.stationtype === 0 ? '过路站' : '终点站' }} : {{ detail.endcity }}</li>
          <li>出发时间</li>
          <li>票款</li>
        </ul>
        <ul>
          <li>
            {{detail.comment}}
          </li>
          <li :title="detail.startstationname">
             {{ detail.startstationname }}
          </li>
          <li :titel="detail.endstationname">
             {{ detail.endstationname }}
          </li>
          <li>
            {{ new Date(detail.departuretime).toLocaleString() }}
          </li>
          <li class="price">&yen;{{ detail.price }}</li>
        </ul>
      </div>
      <h4 class="info-tit">乘客信息</h4>
      <div class="info-list">
        <ul class="table-bt">
          <li>乘客姓名</li>
          <li>乘客类型</li>
          <li>证件类型</li>
          <li>证件号码</li>
        </ul>
        <ul>
          <li>{{ detail.passengername }}</li>
          <li>
            成人票
          </li>
          <li>
            {{ detail.idtype }}
          </li>
          <li>
            {{ detail.idnumber }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  <div class="order-detail">
    <h4 class="info-tit yellow">支付信息</h4>
    <div class="info-list">
      <p>
        支付总金额：
        <span class="price">&yen;{{totalPrice()}}</span>
      </p>
    </div>
  </div>
  <div class="order-btn">
    <a class="btn" @click="hid">返回列表</a>
  </div>
</div>
</template>

<script>
import QrCodeVue from 'qrcode.vue'
/* eslint-disable no-unused-vars */
import { getOrderDetail, ticketRefund } from '@/api/api'
export default {
  name: 'view-order',
  beforeMount () {
    // 获取详细订单的信息
    if (this.orderItem !== {}) {
      getOrderDetail({orderid: this.orderItem.id})
        .then(data => {
          if (data.header.isSuccess === 0) {
            this.orderDetails = data.body
          } else {
            alert(data.header.msg)
          }
        })
    }
  },
  props: {
    orderItem: {
      type: Object
    }
  },
  data () {
    return {
      orderDetails: [],
      status: {
        0: '待支付',
        2: '已过期'
      }
    }
  },
  methods: {
    hid () {
      this.$emit('setMark', false)
    },
    timeStampFormatting (time) {
      let day = new Date(time)
      return day.toLocaleString()
    },
    getQRcode (item) {
      let codeInfo = {
        departuretime: item.departuretime,
        idnumber: item.idnumber
      }
      return JSON.stringify(codeInfo)
    },
    showQRcode () {
      if (this.showStatus(this.orderItem) === '待出行') {
        return true
      }
      return false
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
    totalPrice () {
      let total = 0
      for (let item of this.orderDetails) {
        if (item.ticketstatus === 1) {
          total = item.price - 0 + total
        }
      }
      return total
    },
    refund (id) {
      ticketRefund({orderdetailid: id})
        .then(data => {
          alert(data.header.msg)
          this.hid()
        })
    },
    showBtn (detail) {
      if (this.orderItem.status === 1 && detail.ticketstatus === 1) {
        return true
      }
      return false
    }
  },
  computed: {
  },
  components: {
    QrCodeVue
  }
}
</script>

<style lang="stylus" scoped>
#view-order
  overflow visible
  width 100%
  height 100%
  font-size 14px
  .order-info
    padding 10px
    margin-top 50px
    border-top 1px solid blue
    &:first-child
      margin-top 0
      border-top none
    span
      display inline-block
      margin-right 20px
      em
        font-weight 700
    .btn
      a
        cursor pointer
        font-size 16px
        color green
        &:first-child
          margin-right 20px
  .order-detail
    border 1px solid #ddd
    .info-tit
      display block
      background #f0f0f0
      padding 0 0 0 10px
      height 30px
      line-height 30px
    .yellow
      background-color #e7982b
      margin-top 40px
    .info-list
      padding 10px
      .price
        color #ff7800
      &>ul
        width 100%
        overflow hidden
        li
          width 150px
          float left
          height 30px
          line-height 30px
          &:nth-of-type(n +5)
            text-align center
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
