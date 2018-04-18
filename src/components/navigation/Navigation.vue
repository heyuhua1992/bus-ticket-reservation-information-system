<template>
<div id="navigation">
  <div class="nav-menu">
    <div class="blur-bg"></div>
    <div class="nav-mark"></div>
    <div class="nav-wrapper clearfix">
      <div class="nav-content fl">
        <ul>
          <!--<li v-for="">-->
            <!--<router-link :to=""></router-link>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="nav-content fr"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
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
      width 1160px
      margin 0 auto
      @media screen and (max-width: 1400px)
        width 980px
</style>
