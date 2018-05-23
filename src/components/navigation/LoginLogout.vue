<template>
<div id="loginlogout">
  <ul class="fr" v-if="isLogin">
    <li class="nav-item face-wrapper"
        @mouseover="isOn = true"
        @mouseout="isOn = false"
        :class="{on:isOn}">
      <router-link class="t"
                   to="/"
                   ref="faceLink">
        <div class="i-face">
          <img class="face"
               v-if="db_navigation.Img"
               src="../../../static/img/login-face.gif"/>
          <img class="pendant"/>
          <!--<i class="legalize vip"></i>-->
        </div>
      </router-link>
      <transition name="fade">
        <div class="dd-bubble" v-show="isOn">
          <div class="header-u-info">
            <div class="header-uname">
              <b>火昱</b>
              <p class="vip-type">
                <router-link to="/">
                  <span>会员</span>
                </router-link>
              </p>
            </div>
            <div class="btns-profile clearfix">
              <!--<div class="coin fl">-->
                <!--<router-link to="/" title="硬币">-->
                  <!--<i></i>-->
                  <!--<span>90</span>-->
                <!--</router-link>-->
              <!--</div>-->
              <!--<div class="currency fl">-->
                <!--<router-link to="/" title="B币">-->
                  <!--<i></i>-->
                  <!--<span>0</span>-->
                <!--</router-link>-->
              <!--</div>-->
              <div class="phone fr" :class="{verified:true}">
                <router-link to="/">
                  <i></i>
                  <span>已绑定</span>
                </router-link>
              </div>
              <div class="email fr" :class="{verified:true}">
                <router-link to="/">
                  <i></i>
                  <span>已绑定</span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="member-menu">
            <ul class="clearfix">
              <li class="account"
                  v-for="(item, index) in db_navigation.MemberMenu"
                  :key="index">
                <router-link :to="item.to">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <span>{{ item.text }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="menber-bottom">
            <a href="javascript:;" class="logout" @click="logout">
              退出
            </a>
          </div>
        </div>
      </transition>
    </li>
    <li class="nav-item"
        v-for="(item, index) in db_navigation.NavContentRight"
        :key="index">
      <router-link class="t"
                   :class="{'font-white': fontColor}"
                   :to="item.to">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
  <ul class="fr" v-else>
    <li class="nav-item face-wrapper"
        @mouseover="isOn = true"
        @mouseout="isOn = false">
      <router-link class="t"
                   to="/"
                   ref="faceLink">
        <div class="i-face">
          <img class="face"
               src="./png/logout.jpg"/>
        </div>
      </router-link>
      <transition name="fade">
        <div class="login" v-show="isOn">
          <div class="img"></div>
          <router-link class="login-btn"
                       to="/login">
            登陆
          </router-link>
          <p class="reg">
            <span>首次使用？</span>
            <router-link to="/register">
              点我去注册
            </router-link>
          </p>
        </div>
      </transition>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'loginlogout',
  props: {
    db_navigation: {
      type: Object
    },
    hasBlur: {
      type: Boolean,
      default: false
    },
    fontColor: {
      type: Boolean,
      default: false
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOn: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('Logout')
      this.$Cookies.remove('userCode')
    }
  }
}
</script>

<style lang="stylus" scoped>
#loginlogout
  .nav-item
    float left
    text-align center
    line-height 42px
    height 42px
    position relative
    background-color hsla(0,0%,100%,0)
    transition all .3s
    &:hover
      background-color rgba(10, 10, 10, .1)
    &:first-child
      .t
        padding-left 11px
    .t
      color #222
      height 100%
      display block
      padding 0 11px
      &.font-white:nth-of-type(n + 1)
        color #fff
  .face-wrapper
    width 58px
    margin-left 0
    padding-left 0
    box-sizing border-box
    .t
      .i-face
        position absolute
        z-index 20
        width 36px
        height 36px
        left 11px
        top 0
        .face
          border 0 solid #fff
          width 100%
          height 100%
          border-radius 50%
          vertical-align middle
        .pendant
          position absolute
          width 84px
          height 84px
          left -11px
          bottom -3px
          visibility hidden
          transition-delay 0s
          border none
          vertical-align middle
        .legalize.vip
          background-position -72px -52px
        .legalize
          background-image url("png/user-auth.png")
          width 20px
          height 20px
          position absolute
          bottom 10px
          right 7px
          visibility hidden
          transition-delay 0s
    .dd-bubble
      position absolute
      z-index 1
      opacity 1
      left 50%
      margin-left -130px
      width 260px
      padding 50px 0 0
      top 42px
      background #fff
      color #000
      box-shadow 0 2px 4px rgba(0,0,0,.16)
      border-radius 0 0 4px 4px
      line-height normal
      .header-u-info
        .header-uname
          padding-bottom 15px
          b
            display block
            margin-bottom 8px
            font-weight bold
            color #222
          .vip-type
            span
              padding 2px 3px
              background-color #fb7299
              color #fff
              border-radius 3px
        .btns-profile
          position relative
          margin 0 20px
          div
            a
              display block
              color #222
              i
                display inline-block
                width 18px
                height 18px
                vertical-align middle
                background-repeat no-repeat
                background-image url("png/icons.png")
              span
                vertical-align middle
                display inline-block
          .coin
            i
              background-position -343px -471px
              margin-right 2px
              position relative
              z-index 2
          .currency
            position absolute
            left 58px
            z-index 0
            i
              background-position -407px -471px
              margin-right 2px
              position relative
              z-index 2
          .phone,
          .email
            position relative
            span
              display none
              padding 0 6px
              height 20px
              line-height 20px
              border 1px solid #ccc
              border-radius 4px
              position absolute
              right 30px
              top -2px
              white-space nowrap
              background-color #fff
              color #222
              z-index 10
            &:hover
              span
                display inline-block
          .phone
            i
              background-position -279px -599px
            &.verified
              i
                background-position -343px -599px
          .email
            margin-right 10px
            i
              background-position -279px -534px
            &.verified
              i
                background-position -343px -534px
      .member-menu
        border-top 1px solid #e5e9ef
        padding 10px 20px 40px
        ul
          width 240px
          clear both
          zoom 1
          .account
            float left
            width 100px
            margin-right 20px
            position relative
            a
              &:hover
                color #00a1d6
                i
                  &.personal
                    background-position -536px -407px
                  &.order
                    background-position -344px -856px
                  &.ticket
                    background-position -344px -920px
              &:focus
                outline none
              white-space nowrap
              color #222
              text-align left
              margin 0 auto
              display block
              padding 5px 0
              line-height 16px
              i
                width 16px
                height 16px
                margin-right 10px
                vertical-align top
                background-image url("./png/icons.png")
                &.personal
                  display inline-block
                  background-position -472px -407px
                &.order
                  display inline-block
                  background-position -280px -856px
                &.ticket
                  display inline-block
                  background-position -280px -920px
      .menber-bottom
        position absolute
        bottom 0
        left 0
        right 0
        height 30px
        line-height 30px
        background-color #f4f5f7
        border-radius 0 0 4px 4px
        .logout
          float right
          padding-right 20px
          color #222
  .on
    &:hover
      background none
    .t
      .i-face
        left -4px
        top 15px
        height 64px
        width 64px
        outline none
        transition all .3s
    .dd-bubble
      transition all .3s
      &.fade-enter,
      &.fade-leave-to
        opacity 0
#loginlogout
  .nav-item
    &:hover
      background none
    .login
      background #fff
      padding-bottom 0
      padding-top 50px
      border-top none
      width 320px
      margin-left -140px
      padding 12px
      text-align left
      line-height normal
      border 1px solid #e5e9ef
      .img
        width 320px
        height 200px
        margin 12px 0
        overflow hidden
        position relative
        background url("./png/danmu.png") no-repeat 50%
      .login-btn
        display block
        height 43px
        line-height 43px
        text-align center
        background #00a1d6
        border-radius 4px
        font-size 14px
        color #fff
      .reg
        margin-top 8px
        text-align center
        font-size 12px
        color #282828
        a
          color #00a1d6
</style>
