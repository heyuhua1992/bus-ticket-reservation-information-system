<template>
<div id="top-banner">
  <div class="background"></div>
</div>
</template>

<script>
export default {
  name: 'top-banner'
}
</script>

<style lang="stylus" scoped>
@keyframes STAR-MOVE
  from
    background-position 0% 0%
  to
    background-position 600% 0%
#top-banner
  height 86px
  overflow hidden
  text-align center
  margin-bottom 20px
  .background
    width 100%
    height 100%
    background url('./png/background.png') repeat-x 5% 0%
    background-size 150% 100%
    animation STAR-MOVE 200s linear infinite
</style>
