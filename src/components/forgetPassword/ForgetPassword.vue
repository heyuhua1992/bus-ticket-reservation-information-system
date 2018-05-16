<template>
<div id="forget-password">
  <TopBanner />
  <div class="retrieve-tab">
    <div class="retrieve-password">
      <div class="retrieve"
           :class="{'retrieve-currtent' : targger}"
           @click="activeMobile = true">
        通过绑定的手机找回密码
      </div>
      <div class="retrieve"
           :class="{'retrieve-currtent' : !targger}"
           @click="activeMobile = false">
        通过绑定的邮箱找回密码
      </div>
    </div>
    <div class="retrieve-line"></div>
  </div>
  <div class="verify-content" v-show="activeMobile">
    <div>
      <div class="box">
        <input class="inputbox"
               type="text"
               placeholder="请输入手机号码"
               v-model="phone"
               v-validate="{required: true, regex: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/ }"
               name="phone"
               ref="phone"
               autocomplete="off">
        <div class="text clearfix">
          <p class="tips" v-show="errors.has('phone')">
            {{ errors.first('phone') }}
          </p>
        </div>
      </div>
      <div class="box">
        <input class="code" type="text" placeholder="验证码" v-model="inputIdentifyCode">
        <SIdentify class="yzm"
                   v-if="activeMobile"
                   :identifyCode="identifyCode"/>
        <p class="change" @click="refreshCode">换一张</p>
      </div>
      <input class="send" type="submit" value="发送到手机" @click="sendMobile">
      <router-link to="/login" class="no-account">返回登陆</router-link>
    </div>
  </div>
  <div class="verify-content" v-show="!activeMobile">
    <div>
      <div class="box">
        <input class="inputbox"
               type="text"
               placeholder="请输入邮箱"
               v-model="email"
               v-validate="{required: true, email: true}"
               name="email"
               ref="email"
               autocomplete="off">
        <div class="text clearfix">
          <p class="tips" v-show="errors.has('email')">
            {{ errors.first('email') }}
          </p>
        </div>
      </div>
      <div class="box">
        <input class="code" type="text" placeholder="验证码" v-model="inputIdentifyCode">
        <SIdentify class="yzm"
                   v-if="!activeMobile"
                   :identifyCode="identifyCode"/>
        <p class="change" @click="refreshCode">换一张</p>
      </div>
      <input class="send" type="submit" value="发送到验证邮箱" @click="sendEmail">
      <router-link to="/login" class="no-account">返回登陆</router-link>
    </div>
  </div>
</div>
</template>

<script>
import TopBanner from '@/components/topBanner/TopBanner'
import SIdentify from '@/components/identify/Identify'
export default {
  name: 'forget-password',
  data () {
    return {
      activeMobile: true,
      identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      identifyCode: '',
      inputIdentifyCode: '',
      email: '',
      phone: ''
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    initCode () {
      this.inputIdentifyCode = ''
    },
    sendMobile () {
      let identifyCode = this.identifyCode.toLowerCase()
      let inputIdentifyCode = this.inputIdentifyCode.toLowerCase()
      let _pho = this.$validator.flags.phone
      if (identifyCode === inputIdentifyCode && _pho && _pho.valid) {
        alert('发送成功')
        // 告诉后台执行发送操作
        this.$router.push({path: '/resetpassword', query: {email: this.email, phone: this.phone}})
      }
      if (inputIdentifyCode.length > 0 && identifyCode !== inputIdentifyCode) {
        alert('验证码输入错误')
        this.refreshCode()
      }
      if (_pho && _pho.valid && inputIdentifyCode.length === 0) {
        alert('请输入验证码')
      }
    },
    sendEmail () {
      let identifyCode = this.identifyCode.toLowerCase()
      let inputIdentifyCode = this.inputIdentifyCode.toLowerCase()
      let _eml = this.$validator.flags.email
      if (identifyCode === inputIdentifyCode && _eml && _eml.valid) {
        alert('发送成功')
        this.$router.push({path: '/resetpassword', query: {email: this.email, phone: this.phone}})
      }
      if (inputIdentifyCode.length > 0 && identifyCode !== inputIdentifyCode) {
        alert('验证码输入错误')
        this.refreshCode()
      }
      if (_eml && _eml.valid && inputIdentifyCode.length === 0) {
        alert('请输入验证码')
      }
    }
  },
  computed: {
    targger () {
      this.refreshCode()
      this.initCode()
      return this.activeMobile
    }
  },
  components: {
    TopBanner,
    SIdentify
  }
}
</script>

<style lang="stylus" scoped>
#forget-password
  .retrieve-tab
    width 980px
    .retrieve-password
      width 420px
      margin 0 auto
      .retrieve
        float left
        padding 14px
        cursor pointer
        background #fff
      .retrieve-currtent
        border 1px solid #bbb
        border-bottom 1px solid #fff
        border-radius 6px 6px 0 0
        height 21px
    .retrieve-line
      width 100%
      height 50px
      border-bottom 1px solid #bbb
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
      .yzm
        width 110px
        height 30px
        position absolute
        left 190px
        top 10px
        margin-top 4px
        border none
        vertical-align middle
      .change
        position absolute
        font-size 12px
        color #00a0d8
        right 52px
        top 11px
        margin-top 10px
        cursor pointer
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
    .no-account
      font-size 12px
      color #00a0d8
      float right
      padding-top 6px
</style>
