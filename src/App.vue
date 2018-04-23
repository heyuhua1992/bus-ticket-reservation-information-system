<template>
  <div id="app">
    <Navigation :hasBlur="hasBlur"
                :fontColor="fontColor"
                :isLogin="isLogin"/>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
export default {
  name: 'App',
  data () {
    return {
      hasBlur: true, // 是否需要背景图片、背景模糊，默认为false
      fontColor: false, // true 为白色，false为黑色, 默认为false
      isLogin: false // 是否登陆
    }
  },
  components: {
    Navigation
  }
}
</script>

<style lang="stylus" scoped>

</style>
