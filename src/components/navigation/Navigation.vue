<template>
<div id="navigation">
  <div class="nav-menu">
    <div class="blur-bg"></div>
    <div class="nav-mark"></div>
    <div class="nav-wrapper clearfix">
      <div class="nav-content fl">
        <ul>
          <li class="nav-item"
              v-for="(item, index) in db_navigation.NavContentLeft"
              :key="index">
            <router-link class="t"
                         :to="item.to" >
              <i v-if="item.icon">这里放图标</i>
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="nav-content fr">
        <ul class="fr">
          <li class="nav-item face-wrapper">
            <router-link class="t" to="/" ref="faceLink">
              <div class="i-face">
                <img class="face" :src="db_navigation.Face.src">
                <img class="pendant">
                <i class="legalize vip"></i>
              </div>
            </router-link>
            <transition name="fade">
              <div class="dd-bubble">
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
                      <router-link to="/">
                        <span>硬币90</span>
                      </router-link>
                    </div>
                    <div class="currency fl">
                      <router-link to="/">
                        <span>B币0</span>
                      </router-link>
                    </div>
                    <div class="ver phone fr verified">
                      <router-link to="/">
                        <i class="icon">O</i>
                        <span>已绑定</span>
                      </router-link>
                    </div>
                    <div class="ver eail fr verified">
                      <router-link to="/">
                        <i class="icon">O</i>
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
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'navigation',
  beforeCreate () {
    this.$axios.get('/db')
      .then(rep => {
        if (rep.statusText === 'OK') {
          this.db_navigation = rep.data.data
          console.log(this.db_navigation)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  data () {
    return {
      db_navigation: {}
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#navigation
  position absolute
  top 0
  left 0
  right 0
  z-index 1000
  background-color #fff
  font-size 12px
  color #000
  font-weight 400
  img
    border none
    vertical-align middle
  .nav-menu
    position relative
    z-index 200
    height 42px
    color #222
    .blur-bg,
    .nav-mark
      position absolute
      top 0
      left 0
      right 0
      height 100%
    .blur-bg
      background-position center -10px
      background-repeat no-repeat
      filter blur(4px)
      background-image url("https://i0.hdslb.com/bfs/archive/0ac04c23af3b3297bf02dca163474326898d211d.png")
    .nav-mark
      background-color hsla(0,0%,100%,.4)
      box-shadow 0 1px 2px rgba(0,0,0,.1)
    .nav-wrapper
      display block
      width 1160px
      margin 0 auto
      @media screen and (max-width: 1400px)
        width 980px
      .nav-content
        .nav-item
          float left
          display list-item
          text-align center
          line-height 42px
          height 42px
          position relative
          background-color hsla(0,0%,100%,0)
          transition all .3s
          &:hover
            background-color rgba(10, 10, 10, .1)
          &:first-child
            margin-left -10px
            padding-left 12px
            .t
              padding-left 20px
          .t
            color #222
            height 100%
            display block
            padding 0 11px
        .face-wrapper
          width 58px
          margin-left 0!important
          padding-left 0!important
          &:hover
            background none
          .t
            padding-left 11px!important
            .i-face
              position absolute
              z-index 20
              width 36px
              height 36px
              top 0
              transition .3s
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
            z-index 3000
            left 50%
            margin-left -130px
            width 260px
            padding 50px 0 0
            top 42px
            background #fff
            color: #000
            box-shadow 0 2px 4px rgba(0,0,0,.16)
            border-radius 0 0 4px 4px
            line-height normal
            &.fade-enter-active,
            &.fade-leave-active
              transition all .3s
            &.fade-enter,
            &.fade-leave-active
              opacity 30
            &:hover
              display block
</style>
