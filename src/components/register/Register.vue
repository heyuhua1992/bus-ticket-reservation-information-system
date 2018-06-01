<template>
<div id="register">
  <TopBanner />
  <TitleLine :title="'注册'" :fontSize="38"/>
  <div class="content">
    <Step1 v-if="step === 1" :changeStep = changeStep :userMsg="userMsg"/>
    <Step2 v-if="step === 2" :userMsg="userMsg"/>
  </div>
</div>
</template>

<script>
import TopBanner from '@/components/topBanner/TopBanner'
import TitleLine from '@/components/titleLine/TitleLine'
import Step1 from '@/components/register/Step1'
import Step2 from '@/components/register/Step2'
export default {
  name: 'register',
  data () {
    return {
      // 哪一个注册页面
      step: 1,
      // 存放用户的信息
      userMsg: {
        phone: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    changeStep (step) {
      this.step = step
    }
  },
  components: {
    TopBanner,
    TitleLine,
    Step1,
    Step2
  }
}
</script>

<style lang="stylus" scoped>
#register
  .content
    width 980px
    margin 0 auto
</style>
