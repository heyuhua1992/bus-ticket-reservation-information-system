<template>
<div>
  这里是homepage
</div>
</template>

<script>
export default {
  name: 'home',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.$store.commit('hasBlur', true)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$store.commit('hasBlur', false)
    next()
  }
}
</script>

<style lang="stylus" scoped>

</style>
