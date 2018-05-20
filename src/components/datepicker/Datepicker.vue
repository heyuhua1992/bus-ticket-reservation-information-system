<template>
<div id="datepicker">
  <!--
  value 是输入框默认值
  openDate 是面板默认显示的年月

  -->
  <Datepicker :language="language"
              :format="format"
              :value="openDate"
              :openDate="openDate"
              v-model="selectedDate"
              ref="datepicker"
              :inputClass="otherStyle"
              wrapperClass="wrapperbox"
              @input="sendSelectedDate"
              :disabledDates="disabledDates"/>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
export default {
  name: 'datepicker',
  props: {
    showDay: {
      type: Boolean,
      default: true
    },
    otherStyle: {
      type: String,
      default: 'inputbox'
    }
  },
  beforeMount () {
    this.$nextTick(() => {
      let datepickerEl = this.$refs.datepicker.$el
      let inputbox = datepickerEl.querySelectorAll('input.' + this.otherStyle)[0]
      inputbox.readOnly = 'readOnly'
    })
  },
  data () {
    return {
      selectedDate: this.$store.state.searchMsg.startDateTime,
      language: zh,
      format: 'yyyy-MM-dd',
      openDate: this.$store.state.searchMsg.startDateTime,
      disabledDates: {
        from: new Date(...this.dateFormat('from')), // 禁用这个日期之后的日期
        to: new Date(...this.dateFormat('to')) // 禁用这个日期之前的日期
      }
    }
  },
  methods: {
    dateFormat (type) {
      let today = this.$store.state.today
      let ableRange = this.$store.state.ableRange
      let str = 'to'
      if (!type) {
        type = 'to'
      }
      if (type === 'to') {
        str = today.toLocaleDateString()
      } else if (type === 'from') {
        let dateFrom = new Date(today.getTime() + 24 * 60 * 60 * 1000 * ableRange)
        str = dateFrom.toLocaleDateString()
      }
      let arr = str.split('/')
      arr[1]-- // 月份减少1 ， 这个组件要求的输入就是这样
      return arr
    },
    sendSelectedDate () {
      if (this.showDay) {
        let today = this.$store.state.today
        let nowDay = today.toLocaleDateString()
        let selectedDay = this.selectedDate.toLocaleDateString()
        let result = this.selectedDate.getTime() - today.getTime()
        let sendData = ''

        if (nowDay === selectedDay) {
          sendData = '今天'
        } else if (result <= (24 * 3600 * 1000)) {
          sendData = '明天'
        } else if (result <= (24 * 3600 * 1000 * 2)) {
          sendData = '后天'
        } else {
          let week = this.selectedDate.getDay()
          let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          sendData = weekArr[week]
        }
        this.$emit('showDay', sendData)
      }
      this.$store.commit('setStartDateTime', this.selectedDate)
    },
    // 提供给外部使用的方法，选定日期
    selectDate (date) {
      this.selectedDate = date
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style lang="stylus">
#datepicker
  .wrapperbox
    color #000
    .inputbox
      width 252px
      height 34px
      background none
      padding 5px 10px
      margin 0
      border-radius 2px
      border 1px solid #ddd
      box-shadow inset 3px 3px 3px #f6f6f6
      font 400 16px/1.5 Arial,Lucida Grande,Verdana,Microsoft YaHei,hei
    .inputbox2
      display inline-block
      max-width 155px
      height 30px
      line-height 30px
      border 0
      font-size 15px
      vertical-align top
      outline none
</style>
