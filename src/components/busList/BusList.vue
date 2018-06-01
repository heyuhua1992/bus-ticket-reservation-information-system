<template>
<div id="bus-list">
  <div class="main">
    <div class="search">
      <div class="departure input-wrapper">
        <label class="label" for="hot-dpt-city">
          出发
        </label>
        <input type="text"
               class="input-box"
               id="hot-dpt-city"
               v-model="leaveCity"
               @focus="setLeaveCityBox(true)"
               @blur="focusInput = false">
        <div @mouseover="setHover(true)"
             @mouseout="setHover(false)"
             @click.stop
             v-show="leaveCityBox">
          <keep-alive>
            <SwitchCity :cityType="'leave'"
                        @setInputText="setInputText"
                        :left="52"/>
          </keep-alive>
        </div>
      </div>
      <div class="exchange" @click="toggle">
        <span>换</span>
      </div>
      <div class="destination  input-wrapper">
        <label class="label" for="hot-des-city">
          到达
        </label>
        <input type="text"
               id="hot-des-city"
               class="input-box"
               v-model="arriveCity"
               @focus="setArriveCityBox(true)"
               @blur="focusInput = false">
        <div @mouseover="setHover(true)"
             @mouseout="setHover(false)"
             @click.stop
             v-show="arriveCityBox">
          <keep-alive>
            <SwitchCity :cityType="'arrive'"
                        @setInputText="setInputText"
                        :left="52"/>
          </keep-alive>
        </div>
      </div>
      <div class="date input-wrapper">
        <label class="label" for="select-date">日期</label>
        <div class="input-box" id="select-date">
          <Datepicker :showDay="false"
                      ref="datepick"
                      :otherStyle="'inputbox2'"/>
        </div>
      </div>
      <button class="search-btn" @click="sendMsg">搜索</button>
    </div>
    <div class="msg-wrapper">
      <div class="change-date">
        <div class="arrowL"
             :class="{limite: move === 0}"
             @click="moveLeft"></div>
        <ul class="items">
          <li class="item "
              v-for="(item, index) in showDateMsg(move)"
              :key="'item' + index"
              :class="{current: item.day === current}"
              @click="selectAndSearch(item.day)">
            <p>{{item.day}}</p>
            <i>{{item.week}}</i>
          </li>
        </ul>
        <div class="arrowR"
             @click="moveRight"
             :class="{limite: move === ($store.state.ableRange - 7)}"></div>
      </div>
      <div class="filter">
        <dl class="leave-time">
          <dt>出发时段</dt>
          <dd class="shrink">
            <div class="unlimited"
                 :class="{selected: leaveTimeResult.unlimit}"
                 @click="initLists('leaveTime')">
              <label>
                <input type="checkbox"
                       value="0"
                       v-model="leaveTimeResult.unlimit">
                <span>不限</span>
              </label>
            </div>
            <div v-for="(item, index) in leaveTime"
                 :key="'leave-time' + index"
                 @click="initLists">
              <label>
                <input type="checkbox"
                       :value="item.value"
                       v-model="leaveTimeResult.other">
                <span>{{ item.text }}</span>
              </label>
            </div>
          </dd>
        </dl>
        <dl class="leave-station">
          <dt>出发车站</dt>
          <dd :class="{'shrink': leaveStation}">
            <div class="unlimited"
                 :class="{selected: leaveStationResult.unlimit}"
                 @click="initLists('leaveStation')">
              <label>
                <input type="checkbox"
                       value="0"
                       v-model="leaveStationResult.unlimit">
                <span>不限</span>
              </label>
            </div>
            <div v-for="(item, index) in stations.leaveStation"
                 v-show="stations.leaveStation"
                 :key="'leaveStation' + index"
                 @click="initLists">
              <label :title="item">
                <input type="checkbox"
                       :value="item"
                       v-model="leaveStationResult.other">
                <span>{{item}}</span>
              </label>
            </div>
            <a v-show="stations.leaveStation.length > 5"
               class="more"
               @click="leaveStation = !leaveStation">
              {{leaveStation? '更多' : '收起'}}
            </a>
          </dd>
        </dl>
        <dl class="arrive-station">
          <dt>到达车站</dt>
          <dd :class="{'shrink': arriveStation}">
            <div class="unlimited"
                 :class="{selected: arriveStationResult.unlimit}"
                 @click="initLists('arriveStation')">
              <label>
                <input type="checkbox" v-model="arriveStationResult.unlimit">
                不限
              </label>
            </div>
            <div v-for="(item, index) in stations.arriveStation"
                 v-show="stations.arriveStation"
                 :key="'arriveStation' + index"
                 @click="initLists">
              <label :title="item">
                <input type="checkbox"
                       :value="item"
                       v-model="arriveStationResult.other">
                <span>{{item}}</span>
              </label>
            </div>
            <a v-show="stations.arriveStation.length > 5"
               class="more"
               @click="arriveStation = !arriveStation">
              {{arriveStation? '更多' : '收起'}}
            </a>
          </dd>
        </dl>
        <template v-if="showAssistant">
          <dl class="passenger">
            <dt>乘车人</dt>
            <dd>
              <div class="unlimited">
                <label>
                  选择
                </label>
              </div>
              <div>
                <label>
                  <span v-for="i in 5" :key="'span' + i">
                    G66
                    <i>×</i>
                  </span>
                </label>
              </div>
            </dd>
          </dl>
          <dl class="priority">
            <dt>优先车次</dt>
            <dd>
              <div class="unlimited">
                <label>
                  选择
                </label>
              </div>
              <div>
                <label>
                  <span v-for="i in 5" :key="'span' + i">
                    G66
                    <i>×</i>
                  </span>
                </label>
              </div>
            </dd>
          </dl>
          <dl class="alternative">
            <dt>备选日期</dt>
            <dd>
              <div class="unlimited">
                <label>
                  选择
                </label>
              </div>
              <div>
                <label>
                  <span v-for="i in 5" :key="'span' + i">
                    2018-05-12
                    <i>×</i>
                  </span>
                </label>
              </div>
            </dd>
          </dl>
          <dl class="advanced">
            <dt>高级设置</dt>
            <dd>
              <div>
                <label title="勾选本选项并点击查询后，网站将自动查询符合设定条件的车票信息，如有符合条件的车次，将自动提交订单信息">
                  <input type="checkbox" value="自动提交">
                  <span>自动提交</span>
                </label>
                <label title="如果网站查询同一车次只有部分符合您设定条件的车票时，将按您设定的乘车人顺序进行提交">
                  <input type="checkbox" value="余票不足时部分提交">
                  <span>余票不足时部分提交</span>
                </label>
                <label>
                  <a class="small-btn">清空所有选项</a>
                </label>
              </div>
            </dd>
          </dl>
        </template>
        <div class="assistant" @click="showAssistant = !showAssistant">
              <a :class="{'down': showAssistant}">订票助手</a>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="title">
          <p class="go-time">
            发车时间
            <span>
              <i class="positive"
                 :class="{'selected': positive}"
                 @click="reverse(true)"></i>
              <i class="reverse"
                 :class="{'selected': !positive}"
                 @click="reverse(false)"></i>
            </span>
          </p>
          <p class="leave-arrive">
            出发/到达
          </p>
          <p class="bus-type">参考车型</p>
          <p class="price">票价</p>
        </div>
        <ul class="list">
          <li class="row"
              v-for="(item, index) in lists"
              :key="'row' + index"
              v-if="isShowPage(index)">
            <div class="dp-time">{{ hoursMinutes(item.departuretime) }}</div>
            <div class="station">
              <p class="start">{{ item.startstation }}</p>
              <p class="end">{{ item.endstation }}</p>
            </div>
            <div class="bus-type">
              <div class="type">{{ item.comment }}</div>
              <p>
                <span>{{ stationtype[item.stationtype] }}</span>
              </p>
            </div>
            <div class="price">
              <span>
                &yen;
                <i>{{ item.price }}</i>
              </span>
            </div>
            <div class="book">
              <a class="btn" @click="booking(item)">预订</a>
              <p class="remaining">剩余{{ item.ticketsleft }}张</p>
            </div>
          </li>
          <li v-show="lists.length === 0">
            没有数据
          </li>
        </ul>
      </div>
      <div class="pages-wrapper" v-show="lists.length > pageMsg.liNumber">
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
    </div>
  </div>
</div>
</template>

<script>
import VuejsPaginate from 'vuejs-paginate'
import SwitchCity from '@/components/switchCity/SwitchCity'
import Datepicker from '@/components/datepicker/Datepicker'
/* eslint-disable no-unused-vars */
import { getTicket } from '@/api/api'
export default {
  name: 'bus-list',
  beforeCreate () {
    document.addEventListener('click', () => {
      if (!this.boxHover && !this.focusInput && (this.leaveCityBox || this.arriveCityBox)) {
        this.leaveCityBox = false
        this.arriveCityBox = false
      }
    })
  },
  beforeMount () {
    this.init()
  },
  data () {
    return {
      stations: {
        arriveStation: [],
        leaveStation: []
      },
      leaveCity: this.$route.query.leave,
      arriveCity: this.$route.query.arrive,
      leaveCityBox: false, // 是否显示出发城市的选择框
      arriveCityBox: false, // 是否显示到达城市的选择框
      boxHover: false, // 鼠标有没有在选择框里面
      focusInput: false, // 是否已经聚焦
      // 显示更多、收起
      leaveStation: true,
      arriveStation: true,
      // 正序、倒序显示列表
      positive: true,
      // 订票助手 显示 收起
      showAssistant: false,
      // 分页
      pageMsg: {
        currentPage: 1, // 当前页，默认为第一页
        countPage: 10, // 总页数,根据拿到的数据进行设置（自动）
        liNumber: 8 // 每页显示内容数量，在这里进行设置
      },
      // 显示的起始时间向右位移多少
      move: 0,
      current: -1,
      leaveTime: [
        {
          text: '凌晨 (00:00-06:00)',
          value: 1,
          timeStamp: 6 * 3600 * 1000
        },
        {
          text: '上午 (06:00-12:00)',
          value: 2,
          timeStamp: 12 * 3600 * 1000
        },
        {
          text: '下午 (12:00-18:00)',
          value: 3,
          timeStamp: 18 * 3600 * 1000
        },
        {
          text: '晚上 (18:00-24:00)',
          value: 4,
          timeStamp: 24 * 3600 * 1000
        }
      ],
      leaveTimeResult: {
        unlimit: true,
        other: []
      },
      leaveStationResult: {
        unlimit: true,
        other: []
      },
      arriveStationResult: {
        unlimit: true,
        other: []
      },
      buslists: [],
      lists: [],
      weekArr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      stationtype: this.$store.state.stationtype
    }
  },
  methods: {
    init () {
      if (!this.$route.query.leave || !this.$route.query.arrive) {
        let tipsData = {
          tips: '您还没有输入出发站点、到达站点，3s后回到首页,无反应可直接点击跳转',
          back: '/',
          wait: 3000
        }
        this.$router.push({path: '/informationtips', query: tipsData})
      }
      this.$nextTick(() => {
        let arr = this.$route.query.time.split('-')
        arr[1]--
        this.$refs.datepick.selectDate(new Date(...arr))
      })
      this.refresh()
    },
    showPage (page) {
      this.pageMsg.currentPage = page
    },
    setHover (hover) {
      this.boxHover = hover
    },
    setLeaveCityBox (state) {
      this.initBox()
      if (state) {
        this.focusInput = true
      }
      this.leaveCityBox = state
    },
    setArriveCityBox (state) {
      this.initBox()
      if (state) {
        this.focusInput = true
      }
      this.arriveCityBox = state
    },
    initBox () {
      this.leaveCityBox = false
      this.arriveCityBox = false
      this.boxHover = false
      this.focusInput = false
    },
    toggle () {
      // 解构
      [this.arriveCity, this.leaveCity] = [this.leaveCity, this.arriveCity]
    },
    setInputText (type, val) {
      if (type === 'leave') {
        this.leaveCity = val
        this.initBox()
      }
      if (type === 'arrive') {
        this.arriveCity = val
        this.initBox()
      }
    },
    sendMsg () {
      if (this.leaveCity && this.arriveCity) {
        let searchMsg = this.$store.state.searchMsg
        searchMsg.leaveCity = this.leaveCity
        searchMsg.arriveCity = this.arriveCity
        let msg = {
          leave: this.leaveCity,
          arrive: this.arriveCity,
          time: searchMsg.startDateTime.toLocaleDateString().replace(/\//g, '-')
        }
        this.$router.push({path: '/buslist', query: msg})
        this.init()
      }
    },
    showDateMsg (addDay) {
      if (addDay < 0) {
        addDay = 0
      }
      if (addDay > this.$store.state.ableRange - 7) {
        addDay = this.$store.state.ableRange - 7
      }
      let showData = []
      for (let i = 0; i < 7; i++) {
        let add = 24 * 3600 * 1000 * (addDay + i)
        let today = new Date(this.$store.state.today.getTime() + add)
        let str = this.dayFormatting(today)
        let week = today.getDay()
        showData.push({
          week: this.weekArr[week % 7],
          day: str
        })
      }
      return showData
    },
    moveRight () {
      if (Math.ceil(this.move) < this.$store.state.ableRange - 7) {
        this.move++
      }
    },
    moveLeft () {
      if (Math.floor(this.move) > 0) {
        this.move--
      }
    },
    // 把输入的日期提取并格式化为 01-09 这种日期格式
    dayFormatting (date) {
      if (!date) {
        let arr = this.$route.query.time.split('-')
        arr[1]--
        date = new Date(...arr)
      }
      let selectDay = new Date(date)
      let str = selectDay.toLocaleDateString().slice(5).split('/')
      for (let i in str) {
        if (str[i].length < 2) {
          str[i] = '0' + str[i]
        }
      }
      str = str.join('-')
      return str
    },
    // 选择日期 并执行搜索
    selectAndSearch (str) {
      if (this.leaveCity && this.arriveCity) {
        let selectDay = this.dateTransform(str)
        this.current = this.dayFormatting(selectDay)
        this.$refs.datepick.selectDate(selectDay)
        this.$store.commit('setStartDateTime', selectDay)
        this.sendMsg()
      }
    },
    // 把 01-03 这种字符串转换为 date类型数据
    dateTransform (str) {
      let today = this.$store.state.today
      let year = today.getFullYear() + ''
      str = str.split('-')
      let dateStr = [year, ...str]
      dateStr = dateStr.join('/')
      let date = new Date(dateStr)
      if (date.getTime() >= today.getTime()) { // 没有跨年
        return date
      } else if ((date.getTime() + 24 * 3600 * 1000) >= today.getTime()) { // 今天
        return date
      } else { // 跨年
        year = year - 0 + 1
        dateStr = [year, ...str]
        dateStr = dateStr.join('/')
        date = new Date(dateStr)
        return date
      }
    },
    initMove () {
      let arr = this.$route.query.time.split('-')
      arr[1]--
      let startDateTime = new Date(...arr)
      let today = this.$store.state.today
      let move = (startDateTime.getTime() - today.getTime()) / (24 * 3600 * 1000)
      this.move = Math.ceil(move)
      this.current = this.dayFormatting()
    },
    initLists (str) {
      this.pageMsg.currentPage = 1
      if (str === 'leaveTime') {
        this.leaveTimeResult.unlimit = true
        this.leaveTimeResult.other = []
      }
      if (str === 'leaveStation') {
        this.leaveStationResult.unlimit = true
        this.leaveStationResult.other = []
      }
      if (str === 'arriveStation') {
        this.arriveStationResult.unlimit = true
        this.arriveStationResult.other = []
      }
      this.$nextTick(() => {
        this.lists = this.buslists.filter((item) => {
          // 根据出发时间筛选
          let filter1 = this.leaveTimeFilter(item)
          // 根据出发站点筛选
          filter1 = this.stationFilter(filter1, this.leaveStationResult, 'leave')
          filter1 = this.stationFilter(filter1, this.arriveStationResult, 'arrive')
          return filter1
        })
        this.initPage()
      })
    },
    // 把06:20 或者6:3 这种格式的时间转换为时间戳
    timeTransform (str) {
      let arr = str.split(':')
      arr = arr.map((item) => {
        return item - 0
      })
      let timeStamp = (arr[0] * 3600 + arr[1] * 60) * 1000
      return timeStamp
    },
    // 把时间戳转化为 小时分钟
    hoursMinutes (timeStamp) {
      let date = new Date(timeStamp)
      let hours = date.getHours()
      let minute = date.getMinutes()
      hours = hours.length === 1 ? '0' + hours : hours
      minute = minute.length === 1 ? '0' + minute : minute
      return `${hours}:${minute}`
    },
    // 根据时间段进行过滤
    leaveTimeFilter (item) {
      let lt = this.leaveTimeResult
      let st = this.timeTransform(this.hoursMinutes(item.departuretime)) // 出发时间戳
      if (lt.other.length > 0) {
        lt.unlimit = false
      } else if (lt.other.length < 1) {
        lt.unlimit = true
      }
      if (lt.unlimit) {
        return item
      } else {
        let oth = lt.other
        for (let i = 0; i < oth.length; i++) {
          let right = this.leaveTime[oth[i] - 0 - 1].timeStamp // 拿到选择的时段的时间戳
          let left = oth[i] === 1 ? 0 : this.leaveTime[oth[i] - 2].timeStamp
          if (st <= right && st > left) {
            return item
          }
        }
      }
    },
    // 根据站点进行过滤
    stationFilter (data, result, type) {
      if (result.other.length > 0) {
        result.unlimit = false
      } else if (result.other.length < 1) {
        result.unlimit = true
      }
      if (data && !result.unlimit) {
        let d = type === 'leave' ? data.startstation : data.endstation
        if (result.other.indexOf(d) === -1) {
          return
        }
        return data
      }
      return data
    },
    initPage () {
      let num = Math.ceil(this.lists.length / this.pageMsg.liNumber)
      this.pageMsg.countPage = num
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
    // 初始化出发站点列表\到达站点列表
    initStation (buslists) {
      let s = new Set()
      let e = new Set()
      buslists.map((item) => {
        s.add(item.startstation)
        e.add(item.endstation)
      })
      this.stations.leaveStation = [...s]
      this.stations.arriveStation = [...e]
    },
    // 倒序
    reverse (type) {
      if (this.positive !== type) {
        this.buslists.reverse()
        this.positive = type
        this.initLists()
      }
    },
    // 预订
    booking (item) {
      if (this.$store.state.isLogin) {
        let ct = this.dateTransform(this.current)
        let busData = {
          ticketid: item.ticketid,
          startTime: item.departuretime,
          start: item.startstation,
          end: item.endstation,
          busType: item.comment,
          ticket: item.price,
          weekDay: this.weekArr[ct.getDay() % 7],
          date: ct.toLocaleDateString().replace(/\//g, '-')
        }
        this.$router.push({path: '/booking', query: busData})
      } else {
        alert('请先登录')
      }
    },
    refresh () {
      let q = this.$route.query
      let sendMsg = {
        startcity: q.leave,
        endcity: q.arrive,
        date: q.time
      }
      getTicket(sendMsg)
        .then(data => {
          if (data.header.isSuccess === 0) {
            this.$set(this, 'buslists', data.body)
            this.initStation(this.buslists)
            this.initMove()
            this.initLists()
          } else {
            alert(data.header.msg)
          }
        })
        .catch()
    }
  },
  components: {
    VuejsPaginate,
    SwitchCity,
    Datepicker
  }
}
</script>
<style lang="stylus" scoped>
#bus-list
  .main
    width 980px
    margin 0 auto
    padding-top 15px
    user-select none
    .search
      display flex
      padding 15px 20px
      margin-bottom 30px
      background-color #f3f3f3
      border-radius 2px
      outline 0
      .input-wrapper
        border 1px solid #ccc
        border-radius 2px
        font-size 16px
        padding 4px 0
        background-color #fff
        outline 0
        position relative
        .label
          display inline-block
          border-right 1px solid #ccc
          padding 0 10px
          vertical-align middle
          color #999
          line-height 30px
          cursor default
          outline 0
        .input-box
          display inline-block
          max-width 155px
          height 30px
          line-height 30px
          padding 0 15px
          border 0
          font-size 15px
          vertical-align middle
          outline none
      .exchange
        margin 0 20px
        outline 0
        vertical-align middle
        &:after, &:before
          content '.'
          color transparent
          display inline-block
          width 13px
          height 13px
          position relative
          top 10px
          border-top 2px solid #ccc
          border-left 2px solid #ccc
          transform rotate(-45deg)
        &:after
          transform rotate(135deg)
        span
          display inline-block
          position relative
          top 7px
          width 26px
          height 26px
          line-height 26px
          font-size 16px
          text-align center
          border-radius 3px
          background-color #01c77c
          vertical-align middle
          color #fff
          cursor pointer
          outline 0
      .date
        margin-left 30px
      .search-btn
        width 55px
        margin-left 10px
        background-color #fe5342
        border 0
        color #fff
        font-size 16px
        padding 0 5px
        border-radius 3px
        cursor pointer
        outline 0
    .msg-wrapper
      width 980px
      .change-date
        border 1px solid #f0f0f0
        border-bottom 0
        display flex
        height 62px
        line-height 21px
        .arrowL, .arrowR
          width 40px
          cursor pointer
          position relative
          border-bottom 1px solid #01c77c
          outline 0
        .arrowL:before, .arrowR:before
          content ""
          display block
          position absolute
          border 10px solid transparent
          top 50%
          margin-top -10px
        .arrowL
          &:before
            border-right 10px solid #01c77c
          &.limite:before
            border-right-color #ccc
        .arrowR
          &:before
            border-left 10px solid #01c77c
            right 0
          &.limite:before
            border-left-color #ccc
        .items
          background-color #f3f3f3
          display flex
          flex 1
          .item
            flex 1
            height 47px
            line-height 21px
            border-right 1px solid #dcdcdc
            text-align center
            padding 8px 0 6px
            cursor pointer
            border-bottom 1px solid #01c77c
            p
              font-size 15px
              height 22px
              line-height 22px
            i
              font-size 16px
          .current
            background-color #fff
            border 1px solid #01c77c!important
            border-bottom-color #fff!important
      .filter
        position relative
        margin-top 20px
        padding 20px
        border 1px solid #dfdfdf
        font-size 14px
        &>dl
          position relative
          display flex
          margin-bottom 10px
          &:nth-of-type(n+4)
            margin-bottom 0
          &>dt
            font-size 15px
            width 120px
            height 30px
            line-height 30px
          &>dd
            display flex
            flex-wrap wrap
            flex 1
            line-height 30px
            &>div
              width 154px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              &>label
                input
                  margin 0
                  height 15px
                  width 15px
                  margin-right 2px
                  vertical-align middle
                span
                  vertical-align middle
            .unlimited
              position absolute
              left 70px
              width 64px
              transform scale(.8)
              transform-origin left
              &>label
                border-radius 3px
                padding 2px 4px
                vertical-align middle
                input
                  position absolute
                  opacity 0
                  width 0
                  height 0
                span
                  vertical-align middle
            .selected>label
              color #fff
              background-color #01c77c
            .more
              position absolute
              right 0
              top 1px
              color #30a5f4
              font-size 14px
              width 40px
              cursor pointer
              &:after
                content ""
                position absolute
                right -1px
                top 13px
                display block
                width 8px
                height 8px
                border-top 1px solid #30a5f4
                border-right 1px solid #30a5f4
                transform rotate(-45deg)
                transition transform .2s
          .shrink
            height 30px
            overflow hidden
            .more:after
              top 8px
              transform rotate(135deg)
        dl.passenger,
        dl.priority,
        dl.alternative
          dd
            div
              overflow visible
            div.unlimited>label
              border 1px solid #6e6e6e
              background #6e6e6e
              color #fff
              text-align center
              border-radius 3px
              padding 2px 4px
              vertical-align middle
              cursor pointer
              user-select none
              &:hover
                background #292929
                border 1px solid #292929
            div:nth-of-type(n+2)>label>span
              display inline-block
              width 100px
              height 18px
              line-height 18px
              overflow hidden
              border 1px solid #cfcdc7
              margin-right 15px
              text-align center
              vertical-align middle
              background #eef1f8
              font-size 12px
              i
                display block
                float right
                width 14px
                height 14px
                line-height 14px
                font-size 18px
                margin-top 2px
                margin-right 2px
                border-radius 50%
                background-color #999999
                color #fff
                cursor pointer
                &:hover
                  background-color #0e0e0e
        dl.advanced
          dd>div
            width auto
            overflow visible
            text-overflow clip
            white-space normal
            label
              margin-right 20px
              .small-btn
                display inline-block
                height 18px
                line-height 18px
                font-size 12px
                border 1px solid #6e6e6e
                background #6e6e6e
                color #fff
                text-align center
                border-radius 3px
                vertical-align middle
                cursor pointer
                user-select none
                &:hover
                  background #292929
                  border 1px solid #292929
        div.assistant
          position absolute
          display block
          bottom 1px
          right 1px
          width 80px
          height 22px
          line-height 22px
          cursor pointer
          a
            display block
            height 22px
            line-height 22px
            color #fff
            background-color #FF7F00
            padding-left 10px
            &:after
              content ""
              position absolute
              right 2px
              top 8px
              display block
              width 0
              height 0
              border 6px solid transparent
              border-top 6px solid #fff
              transition transform .2s
            &.down:after
              top 2px
              transform rotate(180deg)
      .list-wrapper
        margin-top 20px
        margin-bottom 40px
        .title
          display flex
          font-size 15px
          background-color #f3f3f3
          line-height 40px
          color #7e7e7e
          p.go-time
            position relative
            display block
            width 120px
            text-align center
            font-size 15px
            background-color #f3f3f3
            line-height 40px
            color #7e7e7e
            span
              position absolute
              top 6px
              right 14px
              .positive, .reverse
                display block
                margin-bottom 3px
                border 6px solid transparent
                cursor pointer
              .positive
                border-bottom-color #ccc
                &.selected
                  border-bottom-color #01c77c
              .reverse
                border-top-color #ccc
                margin-bottom 0
                &.selected
                  border-top-color #01c77c
          p.leave-arrive
            width 194px
          p.bus-type
            width 230px
        .list
          .row
            display flex
            font-size 15px
            padding 18px 0 16px
            border-bottom 1px solid #eaeaea
            align-items center
            .dp-time
              width 120px
              font-size 28px
              text-align center
            .station
              width 170px
              padding-left 24px
              .start:before, .end:before
                content "\59CB"
                position absolute
                top 50%
                left -20px
                margin-top -7px
                display block
                width 14px
                height 14px
                line-height 14px
                font-size 12px
                text-align center
                color #fff
                background-color #58b8ea
                border-radius 2px
                padding-left 1px
              .start
                position relative
                margin-bottom 28px
              .end
                position relative
                &:before
                  content "\7EC8"
                  background-color #56d7ae
            .bus-type
              width 230px
              .type
                margin-bottom 28px
              p>span
                position relative
                top -5px
                padding 2px 6px
                border 1px solid #01c77c
                border-radius 3px
                font-size 12px
                color #01c77c
            .price
              font-size 13px
              width 140px
              color #fe5342
              span>i
                font-size 26px
            .book
              position relative
              flex 1
              text-align center
              a.btn
                display block
                border 0
                margin 0 auto
                color #fff
                background-color #fe5342
                border-radius 2px
                width 90px
                line-height 30px
                font-size 16px
                cursor pointer
              p.remaining
                color #fe5342
                text-align center
                font-size 13px
                position absolute
                width 100%
                top 34px
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
