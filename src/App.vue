<template>
  <div id="app">
    <Navigation :hasBlur="hasBlur"
                :fontColor="fontColor"
                :isLogin="isLogin"/>
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
export default {
  name: 'App',
  data () {
    return {
      // true 为白色，false为黑色, 默认为false
      fontColor: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    // 是否需要背景图片、背景模糊，默认为false
    hasBlur () {
      return this.$store.state.hasBlur
    }
  },
  components: {
    Navigation
  }
}
</script>

<style lang="stylus" scoped>

</style>
