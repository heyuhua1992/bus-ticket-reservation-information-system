<template>
<div id="home" class="wrapper">
  <div class="search-box">
    <h2 class="title">汽车票</h2>
    <ul class="search">
      <li class="label">
        <span class="span-left">出发城市</span>
        <div class="input-box">
          <input class="txt-input"
                 type="text"
                 v-model="leaveCity"
                 @focus="setLeaveCityBox(true)"
                 @blur="focusInput = false"
                 placeholder="中文/拼音/首字母">
        </div>
        <div @mouseover="setHover(true)"
             @mouseout="setHover(false)"
             @click.stop
             v-show="leaveCityBox">
          <SwitchCity :cityType="'leave'" @setInputText="setInputText"/>
        </div>
      </li>
      <li class="label">
        <span class="span-left">到达城市</span>
        <div class="input-box">
          <input class="txt-input"
                 type="text"
                 v-model="arriveCity"
                 @focus="setArriveCityBox(true)"
                 @blur="focusInput = false"
                 placeholder="中文/拼音/首字母">
        </div>
        <div @mouseover="setHover(true)"
             @mouseout="setHover(false)"
             @click.stop
             v-show="arriveCityBox">
          <SwitchCity :cityType="'arrive'" @setInputText="setInputText"/>
        </div>
      </li>
      <li class="label">
        <span class="span-left">出发日期</span>
        <div class="input-box">
          <Datepicker @showDay="showDay"/>
          <!--<input class="txt-input" type="text" readonly="readonly">-->
          <span class="txt-day">{{nowSlectedDay}}</span>
        </div>
      </li>
      <li class="label">
        <span class="span-left"></span>
        <div class="input-box">
          <input class="search-btn" type="button" value="汽车票查询">
        </div>
      </li>
      <li class="exchange" @click="toggle">
        <em>换</em>
      </li>
      <li class="history">
        <a href="javascript:;">
          上海 - 北京
        </a>
      </li>
    </ul>
  </div>
  <div class="slider">
    <SlidePic :allPage="allPage"/>
  </div>
  <div class="main clearfix">
    <div class="step"></div>
  </div>
</div>
</template>

<script>
import SlidePic from '@/components/slidePic/SlidePic'
import SwitchCity from '@/components/switchCity/SwitchCity'
import Datepicker from '@/components/datepicker/Datepicker'
export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.$store.commit('hasBlur', true)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$store.commit('hasBlur', false)
    next()
  },
  beforeCreate () {
    document.addEventListener('click', () => {
      if (!this.boxHover && !this.focusInput && (this.leaveCityBox || this.arriveCityBox)) {
        this.leaveCityBox = false
        this.arriveCityBox = false
      }
    })
  },
  data () {
    return {
      allPage: {
        pageArr: [
          {
            png: require('./png/advertising/1.png'),
            href: 'http://www.baidu.com'
          },
          {
            png: require('./png/advertising/2.png'),
            href: 'http://fanyi.youdao.com/'
          }
        ],
        num: 2 // 有多少滑动图片 (直接取pageArr的长度好像有点问题？)
      },
      leaveCity: '',
      arriveCity: '',
      leaveCityBox: false, // 是否显示出发城市的选择框
      arriveCityBox: false, // 是否显示到达城市的选择框
      boxHover: false, // 鼠标有没有在选择框里面
      focusInput: false, // 是否已经聚焦
      nowSlectedDay: '今天'
    }
  },
  methods: {
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
    showDay (state) { // 显示 《今天》 这个词
      this.nowSlectedDay = state
    }
  },
  computed: {
  },
  components: {
    SlidePic,
    SwitchCity,
    Datepicker
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl";
#home
  wrapper()
  margin-top 60px
  .search-box
    width 460px
    float left
    padding 4px
    background transparent url("./png/pro_bg.jpg") no-repeat scroll 0 0;
    background-size 100% 100%
    outline 0
    user-select none
    .title
      height 60px
      line-height 60px
      font-size 28px
      color #fff
      text-align center
      background  url("./png/pro_bg.jpg") repeat-y
      letter-spacing 5px
    .search
      padding 20px 30px
      position relative
      background-color #fff
      .label
        height 34px
        line-height 34px
        padding-bottom 20px
        position relative
        .span-left
          display inline
          height 34px
          font-size 16px
          color #666
          width 90px
          float left
        .input-box
          float left
          position relative
          .txt-input
            position relative
            width 230px
            height 22px
            background none
            padding 5px 10px
            border-radius 2px
            border 1px solid #ddd
            box-shadow inset 3px 3px 3px #f6f6f6
            font 400 16px/1.5 Arial,Lucida Grande,Verdana,Microsoft YaHei,hei
          .txt-day
            position absolute
            right 0
            top 0
            padding 0 10px
            color #333
            font-size 14px
            line-height 34px
          .search-btn
            width 250px
            height 40px
            line-height 40px
            background #ff5346
            border 0 none
            color #fff
            font-size 20px
            border-radius 3px
            cursor pointer
            outline 0
      .exchange
        width 30px
        height 54px
        border 1px solid #dfdfdf
        border-left 0 none
        position absolute
        top 37px
        right 40px
        cursor pointer
        em
          display block
          width 24px
          height 24px
          font-size 16px
          color #00bf76
          background #fff
          line-height 24px
          text-align center
          border-radius 3px
          margin-top 15px
          margin-left 17px
          border 1px solid #00bf76
      .history
        padding-left 96px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        a
          font-size 14px
          color #999
          margin-right 15px
  .slider
    float right
    width 500px
    height 343px
    position relative
  .main
    wrapper()
    padding-top 15px
    overflow hidden
    .step
      width 940px
      height 120px
      background url("./png/steps.jpg") no-repeat
      margin 0 auto
      background-color #f5f5f5
</style>
