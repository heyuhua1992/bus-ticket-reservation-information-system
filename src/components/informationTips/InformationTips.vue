<template>
<div id="information-tips">
  <router-link :to="back">
    {{ tips }}
  </router-link>
</div>
</template>

<script>
export default {
  name: 'information-tips',
  created () {
    let query = this.$route.query
    if (query) {
      // tips: '登陆成功，3秒后返回首页,无反应可直接点击跳转',
      // back: '/',
      // wait: 3000
      this.tips = query.tips
      this.back = query.back
      this.wait = query.wait
      let time = setTimeout(() => {
        this.$router.push({path: this.back})
        window.clearTimeout(time)
      }, this.wait)
    }
  },
  data () {
    return {
      tips: 'error',
      back: '/',
      wait: 3000
    }
  }
}
</script>

<style lang="stylus" scoped>
#information-tips
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background #fff
  z-index 500000
  a
    display block
    text-align center
    margin-top 300px
    font-size 20px
</style>
