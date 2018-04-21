<template>
<div id="banner-link">
  <div class="head-banner"
       v-if="db_navigation.Img"
       :style="{backgroundImage: `url(${db_navigation.Img.bg})`}">
    <div class="head-content">
      <transition name="fade">
        <p class="head-title"
           v-show="db_navigation.Msg">
          {{ db_navigation.Msg }}
        </p>
      </transition>
    </div>
    <a class="banner-link" v-if="db_navigation.Link" :href="db_navigation.Link"></a>
  </div>
</div>
</template>

<script>
export default {
  name: 'banner-link',
  props: {
    db_navigation: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
#banner-link
  .head-banner
    position relative
    z-index 199
    height 170px
    margin-top -42px
    background-color #eee
    background-position center -10px
    background-repeat no-repeat
    &:hover
      .head-content
        .head-title
          opacity 1
          &.fade-enter,
          &.fade-leave-active
            opacity 0
    .head-content
          position relative
          height 170px
          width 1160px
          margin 0 auto
          @media screen and (max-width 1400px)
            width 980px
          .head-title
            position absolute
            top 114px
            left 255px
            line-height 20px
            padding 6px 10px
            background-color rgba(0,0,0,.68)
            color #fff
            border-radius 4px
            font-size 14px
            max-width 350px
            opacity 0
            transition all .2s
    .banner-link
      position absolute
      left 0
      top 0
      height 100%
      width 100%
      text-decoration none
      cursor pointer
</style>
