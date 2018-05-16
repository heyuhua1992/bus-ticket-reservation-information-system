<template>
<div id="reset-password">
  <TopBanner />
  <TitleLine :title="'忘记密码'" :fontSize="38"/>
  <div class="verify-content">
    <div>
      <div class="box">
        <input type="password"
               v-model="password"
               v-validate="{required: true,max: 16,min: 6, alpha_dash: true}"
               name="password"
               class="inputbox"
               placeholder="请输入密码">
        <div class="text clearfix">
          <p class="tips" v-show="errors.has('password')">
            {{errors.first('password')}}
          </p>
        </div>
      </div>
      <div class="box">
        <input type="password"
               v-model="password_s"
               v-validate="{required: true,max: 16,min: 6, alpha_dash: true}"
               name="password_s"
               class="inputbox"
               placeholder="请再次输入密码">
        <div class="text clearfix">
          <p class="tips" v-show="errors.has('password_s')">
            {{ errors.first('password_s') }}
          </p>
          <p class="tips" v-show="!errors.has('password_s') && password_s != password">
            请输入相同的密码
          </p>
        </div>
      </div>
      <div class="box">
        <input class="code" type="text" placeholder="收到的验证码" v-model="inputIdentifyCode">
      </div>
      <input class="send" type="submit" value="确认修改" @click="sendMobile">
    </div>
  </div>
</div>
</template>

<script>
import TopBanner from '@/components/topBanner/TopBanner'
import TitleLine from '@/components/titleLine/TitleLine'
export default {
  name: 'reset-password',
  data () {
    return {
      inputIdentifyCode: '',
      password: '',
      password_s: ''
    }
  },
  methods: {
    sendMobile () {
      let _pas = this.$validator.flags.password
      let _pasS = this.$validator.flags.password_s
      let isTrue = this.inputIdentifyCode.length > 0
      if (_pas && _pas.valid && _pasS && _pasS.valid && isTrue) {
        alert('发送成功')
        // 把数据发送到后台请求 返回验证结果
        if (!this.$route.query) {
          return
        }
        let data = {
          inputIdentifyCode: this.inputIdentifyCode,
          password: this.password,
          phone: this.$route.query.phone || '',
          email: this.$route.query.email || ''
        }
        console.log(data)
      }
    }
  },
  components: {
    TopBanner,
    TitleLine
  }
}
</script>

<style lang="stylus" scoped>
#reset-password
  .verify-content
    width 400px
    position relative
    margin 40px auto 0
    text-align center
    .box
      position relative
      overflow hidden
      .inputbox
        width 388px
        height 18px
        padding 10px 0 10px 10px
        border 1px solid #ddd
        border-radius 2px
        color #aaa
        font-size 14px
        outline 0
      .text
        margin 6px 0
        font-size 12px
        height 20px
        line-height 20px
        .tips
          display block
          color #f66495
          float left
      .code
        position relative
        width 170px
        height 18px
        margin-right 235px
        padding 10px 0 10px 10px
        border 1px solid #ddd
        border-radius 2px
        color #aaa
        background #f9fafc
        font-size 14px
        outline 0
    .send
      display block
      height 38px
      width 398px
      border 1px solid #0381aa
      border-radius 2px
      line-height 38px
      text-align center
      color #fff
      font-size 15px
      background-color #00a7de
      cursor pointer
      margin 25px 0 6px
      outline 0
</style>
