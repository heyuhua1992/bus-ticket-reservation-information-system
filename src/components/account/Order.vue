<template>
<div>
  this is ticket page
</div>
</template>

<script>
export default {
  name: 'order',
  props: {
    setTitleText: {
      type: Function
    }
  },
  beforeMount () {
    this.setTitleText('我的订单')
  }
}
</script>

<style scoped>

</style>
