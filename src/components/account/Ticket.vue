<template>
<div>
  this is ticket page
</div>
</template>

<script>
export default {
  name: 'ticket',
  props: {
    setTitleText: {
      type: Function
    }
  },
  beforeMount () {
    this.setTitleText('我的车票')
  }
}
</script>

<style scoped>

</style>
