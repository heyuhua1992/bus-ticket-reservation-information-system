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
/* eslint-disable no-unused-vars */
import { requestLogin } from '@/api/api'
export default {
  name: 'App',
  beforeMount () {
    if (this.$Cookies.get('userCode') && !this.$store.state.isLogin) {
      let cookieCode = JSON.parse(this.$Cookies.get('userCode'))
      requestLogin(cookieCode).then(data => {
        if (data.header.isSuccess === 0) {
          this.$store.dispatch('Login')
          this.$store.commit('setUserInfo', data.body[0])
        } else {
          alert(data.header.msg)
        }
      })
    }
  },
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
