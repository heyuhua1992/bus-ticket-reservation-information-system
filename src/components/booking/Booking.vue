<template>
<div id="booking">
  <div class="content">
    <section class="sec bus-info">
      <div class="title">
        <span>车次信息</span>
        <a @click="back">修改车次</a>
      </div>
      <div class="info">
        <div class="bus-type">
          <p>计划车型</p>
          <div>{{busData.busType}}</div>
        </div>
        <div class="bus-station">
          <div class="depature">
            {{busData.start}}
          </div>
          <div class="date">
            <p>{{busData.date}}&nbsp;&nbsp;{{busData.weekDay}}&nbsp;&nbsp;{{busData.startTime}}</p>
            <i class="long-arrow"></i>
          </div>
          <div class="arrive">
            {{busData.end}}
          </div>
        </div>
        <div class="bus-ticket-price">
          &yen;{{busData.ticket}}
        </div>
      </div>
      <div class="alternate">
        <div class="alter-open">
          <span>备选车次</span>
          <div class="b-switch"></div>
          <i class="note">注：无票时换为临近时间车次</i>
        </div>
      </div>
    </section>
    <section class="sec ticket-info" :class="{shrink: isShrink}">
      <div class="title">
        <span>票价信息</span>
        <a @click="toggleShrink"></a>
      </div>
      <div class="detail">
        <table>
          <tbody>
          <tr>
            <td>票价：</td>
            <td>{{busData.ticket}}元 × {{passengers.length}}</td>
          </tr>
          <tr v-show="insuranceSelcet > 0">
            <td>保险：</td>
            <td>{{insuranceSelcet}}元 × {{passengers.length}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="total">
        <table>
          <tbody>
            <tr>
              <td>订单总额</td>
              <td class="amount">&yen; {{amount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="sec fill-message">
      <div class="title">
        <span>填写信息</span>
      </div>
      <dl class="sub-title">
        <dt>
          乘车人信息
          <i>（暂不支持购买儿童票）</i>
        </dt>
      </dl>
      <dl class="traveller">
        <dt>选择乘车人</dt>
        <dd class="wrapper">
          <div v-for="(itemGeneral, index) in general"
               :key="'general' + index">
            <label>
              <input type="checkbox"
                     :value="itemGeneral.name"
                     @click.stop="choose(itemGeneral)"
                     v-model="itemGeneral.check">
              {{ itemGeneral.name }}
            </label>
          </div>
        </dd>
      </dl>
      <div class="passengers">
        <dl class="person"
            v-for="(itemPassengers, index) in passengers"
            :key="'passengers' + index">
          <dt>第{{ index + 1 }}位乘车人</dt>
          <dd>
            <div class="passenger-name">
              <p class="tips"></p>
              <label>
                <span>姓名</span>
                <input type="text"
                       v-model="itemPassengers.name"
                       maxlength="20"
                       placeholder="与证件姓名保持一致">
              </label>
              <p class="take-ticket-person">
                <label>
                  <input type="checkbox"
                         v-model="itemPassengers.getTick"
                         @click="setGetTicketPerson(itemPassengers)">
                  设为取票人
                </label>
              </p>
            </div>
            <div class="passenger-id">
              <label>
                <span>证件信息</span>
                <input type="text"
                       v-model="itemPassengers.id"
                       maxlength="20"
                       placeholder="与证件号码保持一致">
              </label>
            </div>
            <span class="delete" @click="del(itemPassengers)"></span>
          </dd>
        </dl>
      </div>
      <div class="setting">
        <div class="add">
          <button class="btn"
                  :class="{gray: passengers.length === mostPassengers}"
                  @click="add(false)">
            <i>+</i>
            新增乘客
          </button>
          <span>
            每笔订单最多添加
            <i>{{mostPassengers}}</i>
            名乘客
          </span>
        </div>
        <select class="insurance" v-model="insuranceSelcet">
          <option v-for="(itemInsurance, index) in insurance"
                  :key="'insurance' + index"
                  :value="itemInsurance.price">
            {{ itemInsurance.name }}
          </option>
        </select>
      </div>
      <dl class="get-ticket-person-info">
        <dt>取票人信息</dt>
        <dd class="box">
          <div>
            <label>
              姓名
              <input type="text"
                     v-model="getTicketPerson.name"
                     placeholder="取票人姓名">
            </label>
          </div>
          <div>
            <label>
              手机号码
              <input type="text"
                     v-model="getTicketPerson.phone"
                     placeholder="接收出票信息联系手机">
            </label>
          </div>
          <div>
            <label>
              二代身份证
              <input type="text"
                     v-model="getTicketPerson.id"
                     placeholder="与证件号码保持一致">
            </label>
          </div>
        </dd>
      </dl>
    </section>
    <section class="sec summary">
      <div class="readme">
        <div class="headcount">
          共
          <i>{{ passengers.length }}</i>
          名乘车人 出发时间：
          <i>{{busData.date}}&nbsp;&nbsp;{{busData.weekDay}}&nbsp;&nbsp;{{busData.startTime}}</i>
        </div>
        <div class="agreement">
          <label>
            <input type="checkbox" checked>
            <span>我已阅读并同意</span>
          </label>
          <a href="http://www.baidu.com">
            《产品预定协议》
          </a>
          和
          <a href="http://www.baidu.com">
            《保险产品条款》
          </a>
        </div>
      </div>
      <div class="btn">
        <button class="submit" @click="send">提交订单</button>
      </div>
    </section>
  </div>
</div>
</template>

<script>
export default {
  name: 'booking',
  beforeMount () {
    // if (!this.$store.state.isLogin) {
    //   let tipsData = {
    //     tips: '您还没有登陆，3s后回到首页,无反应可直接点击跳转',
    //     back: '/',
    //     wait: 3000
    //   }
    //   this.$router.push({path: '/informationtips', query: tipsData})
    // }
    let query = this.$route.query
    this.busData = {
      startTime: query.startTime,
      start: query.start,
      end: query.end,
      busType: query.busType,
      ticket: query.ticket,
      weekDay: query.weekDay,
      date: query.date
    }
  },
  data () {
    return {
      busData: {
        // startTime: '06:20',
        // start: '广州海珠客运站1',
        // end: '湛江1',
        // busType: '客车',
        // ticket: '110',
        // weekDay: '周一',
        // date: '05-21'
      },
      isShrink: true,
      general: [
        {
          name: '何煜华',
          id: '440823199001015711',
          phone: ''
        },
        {
          name: 'fff',
          id: '440823199001015712',
          phone: ''
        }
      ],
      passengers: [
        {
          name: '',
          id: '',
          phone: '',
          getTick: false
        }
      ],
      insuranceSelcet: 0,
      insurance: [
        {
          name: '15元/份 保额81万',
          price: 15
        },
        {
          name: '6元/份 保额30.5万',
          price: 6
        },
        {
          name: '2元/份 保额10.1万',
          price: 2
        },
        {
          name: '我不需要服务',
          price: 0
        }
      ],
      mostPassengers: 3,
      total: '',
      getTicketPerson: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toggleShrink () {
      this.isShrink = !this.isShrink
    },
    add (passenger) {
      let pas = this.passengers
      let isTrue = pas.length < this.mostPassengers
      let obj = {
        name: passenger.name,
        id: passenger.id,
        phone: passenger.phone,
        getTick: false
      }
      if (passenger) {
        if (!passenger.check) {
          let index = -1
          for (let i = 0; i < pas.length; ++i) {
            if (pas[i].name === '' && pas[i].id === '' && pas[i].phone === '') {
              index = i
              break
            }
          }
          if (index !== -1) {
            this.passengers[index] = obj
          } else if (isTrue) {
            this.passengers.push(obj)
          } else if (!isTrue) {
            alert('人数已经达到上限')
          }
        }
      } else if (!passenger && isTrue) {
        passenger = {
          name: '',
          id: '',
          phone: '',
          getTick: false
        }
        this.passengers.push(passenger)
      } else {
        alert('人数已经达到上限')
      }
    },
    del (itemPassengers) {
      this.passengers = this.passengers.filter((item, i) => {
        if (itemPassengers.name !== this.passengers[i].name && itemPassengers.id !== this.passengers[i].id) {
          return item
        } else {
          let g = this.general
          for (let index = 0; index < g.length; index++) {
            if (g[index].name === item.name || g[index].id === item.id) {
              delete g[index].check
            }
          }
        }
      })
      if (this.passengers.length < 1) {
        this.passengers = [
          {
            name: '',
            id: '',
            phone: ''
          }
        ]
      }
    },
    choose (item) {
      if (!item.check) {
        this.add(item)
      } else if (item.check) {
        for (let i = 0; i < this.passengers.length; ++i) {
          this.del(item)
        }
      }
    },
    setTotal (price) {
      this.total = price
    },
    setGetTicketPerson (item) {
      if (!item.getTick) {
        let arr = this.passengers
        for (let i = 0; i < arr.length; ++i) {
          arr[i].getTick = false
        }
        item.getTick = true
        this.getTicketPerson = {
          name: item.name,
          id: item.id,
          phone: item.phone
        }
      } else {
        item.getTick = false
        this.getTicketPerson = ''
      }
    },
    send () {
      let data = {}
      let insurance = this.insurance.filter((item) => {
        if (item.price === this.insuranceSelcet) {
          return item
        }
      })
      Object.assign(data, {
        passengers: this.passengers,
        getTicketPerson: this.getTicketPerson,
        busData: this.busData,
        total: this.total,
        insurance: insurance
      })
    }
  },
  computed: {
    amount () {
      let t = this.passengers.length * ((this.busData.ticket - 0) + (this.insuranceSelcet - 0))
      this.setTotal(t)
      return t
    }
  },
  watch: {
    getTicketPerson: {
      deep: true,
      handler: function () {
        if (this.getTicketPerson !== '') {
          for (let i = 0; i < this.passengers.length; ++i) {
            if (this.passengers[i].getTick === true) {
              if (this.passengers[i].name !== this.getTicketPerson.name || this.passengers[i].id !== this.getTicketPerson.id) {
                this.passengers[i].getTick = false
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#booking
  width 980px
  margin 0 auto
  overflow hidden
  .content
    width 980px
    margin-top 15px
    color #333
    outline 0
    .sec
      padding 0 20px 20px
      border 1px solid #ddd
      margin-bottom 30px
    .bus-info
      color #666
      .title
        background-color #f0f0f0
        margin 0 -20px
        position relative
        margin-bottom 15px
        span
          font-size 20px
          text-indent 20px
          color #333
          line-height 40px
          display inline-block
          outline 0
        a
          color #00a0ff
          font-size 13px
          position absolute
          right 20px
          display inline-block
          line-height 40px
          cursor pointer
          outline 0
      .info
        display flex
        align-items center
        border-bottom 1px solid #ededed
        padding-bottom 15px
        .bus-type
          text-align left
          flex 1
          outline 0
          p
            color #999
            height 21px
            line-height 21px
          div
            height 24px
            line-height 24px
            font-size 16px
            padding-right 10px
        .bus-station
          display flex
          align-items center
          outline 0
          .depature, .arrive
            font-size 20px
            position relative
            max-width 200px
            line-height 1.2
          .date
            font-size 16px
            color #666
            min-width 150px
            text-align center
            padding 0 20px
            flex 1
            p:first-child
              line-height 1
              font-size 14px
            .long-arrow
              display block
              height 3px
              border-bottom 1px solid #ccc
              position relative
              overflow hidden
              font-style normal
              outline 0
              &:after
                content " "
                display block
                height 0
                width 0
                position absolute
                right -3px
                top 0
                border 3px solid transparent
                border-left-width 10px
                border-left-color #ccc
          .depature:before, .arrive:before
            font-size 12px
            color #fff
            text-align center
            line-height 14px
            content "\59CB"
            display inline-block
            width 14px
            height 14px
            position relative
            top -3px
            background-color #58b8ea
            border-radius 2px
            padding-left 1px
            margin-right 5px
          .arrive:before
            content "\7EC8"
            background-color #56d7ae
        .bus-ticket-price
          flex 1
          color #ff5346
          font-size 22px
          text-align right
      .alternate
        .alter-open
          padding-top 15px
          &>span
            font-size 16px
          .b-switch
            display inline-block
            vertical-align middle
            width 50px
            height 22px
            border 1px solid #e6e6e6
            border-radius 999px
            box-shadow 1px 1px 1px #efefef
            transition-property background-color, border
            background-color #fff
            transition-duration .2s
            margin-left 126px
            margin-right 20px
            &:after
              content ""
              display inline-block
              border 1px solid #e6e6e6
              border-radius 50%
              width 20px
              height 20px
              transition-property transform, margin-left
              pointer-events none
              background-color #fff
              transition-duration .2s
          .note
            font-size 12px
            color #999
    .ticket-info
      .title
        background-color #f0f0f0
        margin 0 -20px
        position relative
        margin-bottom 15px
        span
          display inline-block
          line-height 40px
          font-size 20px
          text-indent 20px
          color #333
        a
          width 10px
          height 10px
          border-top 1px solid #666
          border-right 1px solid #666
          transform rotate(-45deg)
          transform-origin center
          transition all .2s
          top 17px
          position absolute
          right 20px
          display inline-block
          cursor pointer
      .detail
        padding-bottom 15px
        color #666
        table
          width 100%
          font-size 16px
          tr
            height 24px
            line-height 24px
            td
              width 50%
              &:last-child
                text-align right
      .total
        border-top 1px solid #ccc
        margin 0 -20px
        padding 20px 20px 0
        table
          width 100%
          font-size 16px
          line-height 1
          border-spacing 0
          td:last-child
            text-align right
          .amount
            font-size 22px
            color #ff5346
    .ticket-info.shrink
      .title
        margin-bottom 0
      .detail
        padding-bottom 0
        height 0
        overflow hidden
      .total
        border-top 0
      a
        transform rotate(135deg)
        top 13px
    .fill-message
      .title
        background-color #f0f0f0
        margin 0 -20px
        position relative
        margin-bottom 15px
        span
          display inline-block
          line-height 40px
          font-size 20px
          text-indent 20px
          color #333
      .sub-title
        font-size 18px
        margin-bottom 10px
        i
          font-style normal
          font-size 12px
          color #999
          margin-left 10px
      .traveller
        display flex
        padding 10px 20px 10px 20px
        margin 0 -20px 15px -20px
        background-color #f5f5f5
        dt
          font-size 16px
        .wrapper
          display flex
          flex 1
          flex-wrap wrap
          margin-left 20px
          &>div
            width 95px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            vertical-align middle
            label
              input
                height 15px
                width 15px
                outline none
                vertical-align middle
      .passengers
        margin-bottom 20px
        .person
          position relative
          display flex
          padding 15px 20px
          margin 0 -20px 15px -20px
          background #f5f5f5
          dt
            font-size 16px
            padding-right 12px
          dd
            flex 1
            padding 10px 0
            .passenger-name
              .tips
                visibility hidden
                font-size 12px
                padding-left 72px
                line-height 18px
                margin-bottom 5px
                color #ff5346
              &>label
                span
                  display inline-block
                  min-width 70px
                input[type=text]
                  border 1px solid #ccc
                  line-height 26px
                  text-indent 5px
                  min-width 166px
                  border-radius 2px
                  outline none
              .take-ticket-person
                display inline-block
                margin-left 4px
                vertical-align middle
                input
                  height 15px
                  width 15px
                  vertical-align middle

            .passenger-id
              margin-top 15px
              vertical-align middle
              &>label
                span
                  display inline-block
                  min-width 70px
                input[type=text]
                  border 1px solid #ccc
                  line-height 22px
                  text-indent 5px
                  min-width 166px
                  vertical-align middle
                  outline none
            .delete
              position absolute
              top 36%
              right 15px
              cursor pointer
              &:after
                content ''
                background transparent url("./pcdelete.png") no-repeat scroll 50% 50%
                display block
                width 30px
                height 30px
                font-size 26px
                color #ababab
                text-align center
      .setting
        display flex
        align-items center
        margin-bottom 20px
        .add
          flex 1
          .btn
            border 0
            line-height 40px
            width 150px
            font-size 18px
            border-radius 2px
            margin-right 0
            padding 0
            transform scale(.8)
            transform-origin left
            color #fff
            background-color #ff5346
            outline 0
            cursor pointer
            &.gray
              background-color #ccc
          i
            display inline-block
            transform scale(1.4)
            font-weight 400
            color #fff
            font-style normal

          span
            i
              color #ff5346
        .insurance
          outline none
          visibility visible
          color rgb(153, 153, 153)
          height 30px
          line-height 30px
          width 160px
          border 1px solid #ccc
          -webkit-appearance: none
          -moz-appearance: none
          appearance: none
          background url("./pcarrowdown.png") no-repeat scroll 136px transparent
          padding-left 10px
          padding-right 28px
      .get-ticket-person-info
        dt
          font-size 16px
          padding 15px 0
          border-top 1px solid #ccc
        .box
          display flex
          justify-content space-between
          -webkit-box-pack justify
          div
            vertical-align middle
            label
              input[type=text]
                margin-left 10px
                text-indent 6px
                border 1px solid #ccc
                line-height 26px
                min-width 166px
                border-radius 2px
                outline none
    .summary
      display flex
      padding-top 20px
      .readme
        flex 1
        .headcount
          font-size 18px
          i
            font-style normal
            color #ff5346

        .agreement
          margin-top 10px
          color #999
          label
            vertical-align middle
            input
              vertical-align middle
              width 15px
              height 15px
              outline 0
          a
            vertical-align middle
            color #00a0ff
            cursor pointer
      .btn
        .submit
          color #fff
          border 0
          line-height 40px
          width 150px
          font-size 18px
          border-radius 2px
          margin-right 30px
          background-color #ff5346
          padding 0
          outline 0
          cursor pointer
</style>
