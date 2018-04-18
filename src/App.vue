<template>
  <div id="app">
    <Login :data="data"/>
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
  beforeCreate () {
    this.$axios.get('/db')
      .then(rep => {
        if (rep.statusText === 'OK') {
          this.data = rep.data.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    Login
  }
}
</script>

<style>

</style>
5
