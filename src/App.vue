<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/login/Login'
export default {
  name: 'App',
  data () {
    return {
      data: {}
    }
  },
  components: {
    Login
  }
}
</script>

<style lang="stylus" scoped>

</style>
