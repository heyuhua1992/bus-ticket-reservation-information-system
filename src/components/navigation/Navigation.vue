<template>
<div id="navigation">
  <div class="nav-menu">
    <div class="blur-bg"
         v-if="hasBlur"></div>
    <div class="nav-mark"></div>
    <div class="nav-wrapper clearfix">
      <div class="nav-content fl">
        <ul>
          <li class="nav-item fl"
              v-for="(item, index) in db_navigation.NavContentLeft"
              :key="index">
            <router-link class="t"
                         :class="{'font-white': fontColor}"
                         :to="item.to" >
              <i v-if="item.icon">这里放图标</i>
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="nav-content fr">
        <LoginLogout :hasBlur="hasBlur"
                     :fontColor="fontColor"
                     :db_navigation="db_navigation"
                     :isLogin="isLogin"/>
      </div>
    </div>
  </div>
  <BannerLink v-if="hasBlur"
              :db_navigation="db_navigation"/>
</div>
</template>

<script>
import LoginLogout from './LoginLogout'
import BannerLink from './BannerLink'
export default {
  name: 'navigation',
  props: {
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
      db_navigation: {}
    }
  },
  created () {
    this.$axios.get('/db')
      .then(rep => {
        if (rep.statusText === 'OK') {
          this.db_navigation = rep.data.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    LoginLogout,
    BannerLink
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl";
#navigation
  position relative
  z-index 1000
  background-color #fff
  font-size 12px
  color #717171
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
      width 100%
      height 100%
    .blur-bg
      background-image url("./png/bg.png")
      background-position center -10px
      background-repeat no-repeat
      filter blur(4px)
    .nav-mark
      background-color hsla(0,0%,100%,.4)
      box-shadow 0 1px 2px rgba(0,0,0,.1)
    .nav-wrapper
      wrapper()
      .nav-content
        .nav-item
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
            &.font-white
              color #fff
</style>
