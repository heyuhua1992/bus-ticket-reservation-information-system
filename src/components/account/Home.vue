<template>
<div>
  home page
</div>
</template>

<script>
export default {
  name: 'home',
  props: {
    setTitleText: {
      type: Function
    }
  },
  beforeMount () {
    this.setTitleText('首页')
  }
}
</script>

<style scoped>

</style>
