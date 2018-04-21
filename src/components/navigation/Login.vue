<template>
<div id="login" :class="{'blur-black': hasBlur}">
  <ul class="fr">
    <li class="nav-item face-wrapper"
        @mouseover="isOn = true"
        @mouseout="isOn = false"
        :class="{on:isOn}">
      <router-link class="t" to="/" ref="faceLink">
        <div class="i-face">
          <img class="face"
               v-if="db_navigation.Img"
               :src="db_navigation.Img.face"/>
          <img class="pendant"/>
          <i class="legalize vip"></i>
        </div>
      </router-link>
      <transition name="fade">
        <div class="dd-bubble" v-show="isOn">
          <div class="header-u-info">
            <div class="header-uname">
              <b>火昱</b>
              <p class="vip-type">
                <router-link to="/">
                  <span>大会员</span>
                </router-link>
              </p>
            </div>
            <div class="btns-profile clearfix">
              <div class="coin fl">
                <router-link to="/" title="硬币">
                  <i></i>
                  <span>90</span>
                </router-link>
              </div>
              <div class="currency fl">
                <router-link to="/" title="B币">
                  <i></i>
                  <span>0</span>
                </router-link>
              </div>
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
            <router-link class="logout" to="/">
              退出
            </router-link>
          </div>
        </div>
      </transition>
    </li>
    <li class="nav-item"
        v-for="(item, index) in db_navigation.NavContentRight"
        :key="index">
      <router-link class="t"
                   :to="item.to">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'login',
  props: {
    db_navigation: {
      type: Object
    },
    hasBlur: {
      type: Boolean
    }
  },
  data () {
    return {
      isOn: false
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
#login
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
</style>
