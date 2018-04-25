<template>
<div id="title-line">
  <span class="title" :style="{fontSize: `${fontSize}px`}">{{ title }}</span>
</div>
</template>

<script>
export default {
  name: 'title-line',
  props: {
    title: {
      type: String,
      default: '登陆'
    },
    fontSize: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style lang="stylus" scoped>
#title-line
  width 980px
  height 28px
  margin 0 auto
  border-bottom 1px solid #ddd
  margin-bottom 28px
  text-align center
  .title
    height 56px
    line-height 56px
    margin 0 auto
    padding 0 20px
    color #666
    background-color #fff
    text-align center
</style>
