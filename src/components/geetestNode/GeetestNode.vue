<template>
<div id="geetest-node">
  <div id="captcha">
    <p id="wait" class="show" ref="wait">正在加载验证码......</p>
  </div>
</div>
</template>

<script>
import './js/jquery'
import './js/gt'
export default {
  name: 'geetest-node',
  data () {
    return {
      result: false
    }
  },
  beforeMount () {
    let _this = this
    this.$nextTick(() => {
      let handler = function (captchaObj) {
        captchaObj.appendTo('#captcha') // 同时插入三个input表单时，geetest_challenge, geetest_validate, geetest_seccode
        captchaObj.onReady(function () {
          /* eslint-disable no-undef */
          $('#wait').hide()
        })
        captchaObj.onSuccess(function () {
          _this.result = true
        })
        captchaObj.onError(function () {
          _this.result = false
        })
      }
      this.$axios.get('/gt/register-fullpage')
        .then(rep => {
          if (rep.statusText === 'OK') {
            let data = JSON.parse(rep.data.data.text)
            // console.log(data)
            window.initGeetest({
              // 以下 4 个配置参数为必须，不能缺少
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机
              new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
              product: 'float',
              width: '100%'
            }, handler)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
