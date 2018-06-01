<template>
<div id="account">
  <TopBanner />
  <div class="security-content">
    <div class="security-left">
      <span class="security-title">
        个人中心
      </span>
      <ul class="security-ul">
        <router-link tag="li"
                     class="security-list"
                     @click="selected"
                     to="/account/home">
          <i class="security-icon icon-1"></i>
          <span class="security-nav-name text-2">首页</span>
        </router-link>
        <router-link tag="li"
                     class="security-list"
                     to="/account/order">
          <i class="security-icon icon-2"></i>
          <span class="security-nav-name">
            我的订单
          </span>
        </router-link>
        <router-link tag="li"
                     class="security-list"
                     to="/account/setting">
          <i class="security-icon icon-3"></i>
          <span class="security-nav-name">
            我的信息
          </span>
        </router-link>
        <router-link tag="li"
                     class="security-list"
                     to="/account/general">
          <i class="security-icon icon-4"></i>
          <span class="security-nav-name">
            常用信息
          </span>
        </router-link>
      </ul>
    </div>
    <div class="security-right">
      <div class="security-right-title">
        <span class="security-right-title-icon"></span>
        <span class="security-right-title-text">
          {{titleText}}
        </span>
      </div>
      <div class="loading-mark" :class="{hidMark: hidMark}">数据加载中。。。</div>
      <router-view :setTitleText="setTitleText" :setHidMark="setHidMark"/>
    </div>
  </div>
</div>
</template>

<script>
import TopBanner from '@/components/topBanner/TopBanner'
export default {
  name: 'account',
  created () {
    if (this.$Cookies.get('userCode') && !this.$store.state.isLogin) {
      let tipsData = {
        tips: '',
        back: '/account/home',
        wait: 200
      }
      this.$router.push({path: '/informationtips', query: tipsData})
    } else if (!this.$Cookies.get('userCode') && !this.$store.state.isLogin) {
      let tipsData = {
        tips: '还没有登陆，3秒后返回首页,无反应可直接点击跳转',
        back: '/',
        wait: 3000
      }
      this.$router.push({path: '/informationtips', query: tipsData})
    }
  },
  data () {
    return {
      titleText: 'error',
      hidMark: false
    }
  },
  methods: {
    setTitleText (text) {
      this.titleText = text
    },
    selected () {
    },
    setHidMark (is) {
      this.hidMark = is
    }
  },
  components: {
    TopBanner
  }
}
</script>

<style lang="stylus" scoped>
#account
  .security-content
    overflow hidden
    width 980px
    height 100%
    margin 10px auto 100px
    border 1px solid #e1e2e5
    box-shadow 0 2px 4px rgba(0,0,0,.14)
    background #fafafa
    border-radius 4px
    font-size 12px
    .security-left
      float left
      width 150px
      height 100%
      overflow hidden
      .security-title
        display block
        width 150px
        height 50px
        text-align center
        line-height 50px
        font-size 16px
        color #99a2aa
        cursor default
        border-bottom 1px solid #e1e2e5
      .security-ul
        border-bottom 1px solid #e1e2e5
        .security-list
          width 150px
          height 48px
          line-height 48px
          &:hover
            background #e1e4ea
            cursor pointer
          &.active
            background-color #00a1d7!important
            .security-icon
              &.icon-1
                background-position -87px -15px!important
              &.icon-2
                background-position -87px -1231px!important
              &.icon-3
                background-position -23px -80px
              &.icon-4
                background-position -23px -80px
            .security-nav-name
              color #fff
          .security-icon
            vertical-align middle
            display inline-block
            width 18px
            height 36px
            margin-left 32px
            background url("./png/icons_m_2.57e5263.png")
            &.icon-1
              background-position -23px -15px
            &.icon-2
              background-position -23px -1231px
            &.icon-3
              background-position -23px -80px
            &.icon-4
              background-position -23px -80px
          .security-nav-name
            margin-left 12px
            font-size 14px
            color #222
            &.text-2
              letter-spacing 28px
            &.text-3
              letter-spacing 7px
    .security-right
      position relative
      float left
      width 829px
      border-left 1px solid #ddd
      background #fff
      min-height 890px!important
      overflow auto
      .security-right-title
        height 50px
        padding-left 30px
        border-bottom 1px solid #ddd
        .security-right-title-icon
          float left
          width 4px
          height 16px
          margin-top 18px
          background-color #00a1d6
          border-radius 4px
        .security-right-title-text
          float left
          margin 18px 0 0 5px
          color #00a1d6
          font-size 14px
          cursor default
      .loading-mark
        position absolute
        top 0
        left 0
        width 100%
        min-height 100%
        background-color #fff
        text-align center
        padding-top 200px
        box-sizing border-box
        font-size 30px
        z-index 101
        &.hidMark
          display none
</style>
