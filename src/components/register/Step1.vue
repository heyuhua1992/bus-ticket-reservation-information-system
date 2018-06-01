<template>
<div id="step1">
  <div class="register-container">
    <div class="register-wrapper">
      <div class="new-phone center-div">
        <input type="text"
               v-model="userMsg.phone"
               v-validate="{required: true, regex: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/ }"
               name="phone"
               class="user-id-password"
               maxlength="11"
               placeholder="手机号码">
        <p class="tips" v-show="errors.has('phone')">
          {{ errors.first('phone') }}
        </p>
      </div>
      <SecurityLevel :level="level"/>
      <div class="center-div">
        <input type="password"
               v-model="userMsg.password"
               v-validate="{required: true,max: 16,min: 6, alpha_dash: true}"
               name="password"
               class="user-id-password"
               maxlength="16"
               placeholder="密码（6-16位，由字母、数字、破折号、下划线组成，区分大小写）">
        <p class="tips" v-show="errors.has('password')">
          {{ errors.first('password') }}
        </p>
      </div>
      <div class="register-hidden-gruop"></div>
      <div class="center-div code-wrapper">
        <input  class="code" type="text" v-model="userMsg.code">
        <!--<div class="check"></div>-->
        <a href="javascript:;" class="send-btn" @click="sendMsg">
          {{ btnText }}
        </a>
        <p class="tips" :class="{hid:hidTips}">验证码已发到你手机上了，5分钟内有效。</p>
      </div>
      <div class="register-hidden-gruop">
        <div class="pc-register-descript">
          <label>
            <input class="sm-box" name="agree" type="checkbox" v-model="agree">
            我已同意
            <a href="#">《XXXXX使用协议》</a>和
            <a href="#">《XXXXX规范》</a>
          </label>
        </div>
      </div>
      <input class="center-div register-btn"
             :class="{'no-check': !agree}"
             type="submit"
             @click="sendUserMsg"
             value="注册">
      <div class="register-hidden-gruop text-right">
        <router-link to="/login">已有账号，直接登录></router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SecurityLevel from '@/components/securityLevel/SecurityLevel'
/* eslint-disable no-unused-vars */
import { sendCaptcha, register } from '@/api/api'
export default {
  name: 'step1',
  props: {
    changeStep: {
      type: Function
    },
    userMsg: {
      type: Object
      // phone: '',
      // password: '',
      // code: ''
    }
  },
  data () {
    return {
      // 是否同意协议
      agree: false,
      // 发送短信btn 文字变化
      btnText: '点击获取',
      // 发送短信提示
      hidTips: true
    }
  },
  methods: {
    // 发送短信
    sendMsg () {
      let _pho = this.$validator.flags.phone
      let _psw = this.$validator.flags.password
      if (_pho && !_pho.valid) {
        /* eslint-disable no-useless-return */
        return
      } else if (_pho && _pho.valid && _psw && _psw.valid) {
        let phone = this.userMsg.phone
        sendCaptcha({username: phone})
          .then(data => {
            if (data.header.isSuccess === 0) {
              this.hidTips = false
              setTimeout(() => {
                this.hidTips = true
              }, 5000)
            } else {
              alert(data.header.msg)
            }
          })
      }
    },
    nextStep () {
      if (this.agree) {
        this.$validator.validateAll()
          .then(result => {
            if (result) {
              this.changeStep(2)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    hidMask () {
      this.showMask = false
    },
    sendUserMsg () {
      let u = this.userMsg
      if (u.code && u.password && u.phone) {
        let userInfo = {
          username: u.phone,
          password: u.password,
          captcha: u.code
        }
        register(userInfo)
          .then(data => {
            if (data.header.isSuccess === 0) {
              let tipsData = {
                tips: '注册成功，3秒后返回登陆页面,无反应可直接点击跳转',
                back: '/login',
                wait: 3000
              }
              this.$router.push({path: '/informationtips', query: tipsData})
            } else {
              alert(data.header.msg)
            }
          })
          .catch(() => {})
      }
    }
  },
  computed: {
    // 安全等级实时计算
    level () {
      let level = -1
      let _psw = this.$validator.flags.password
      // 如果密码的格式出错
      if (_psw && !_psw.valid) {
        return 0
      } else if (_psw && _psw.valid) {
        let psw = this.userMsg.password
        psw.length > 10 && level++
        (/[a-z]/).test(psw) && level++
        (/[A-Z]/).test(psw) && level++
        (/[0-9]/).test(psw) && level++
        (/-/g).test(psw) && level++
        // 最低等级是0
        level === -1 && level++
        return level
      }
    }
  },
  components: {
    SecurityLevel
  }
}
</script>

<style lang="stylus" scoped>
#step1
  .register-container
    width 980px
    margin 0 auto
    .register-wrapper
      .center-div
        position relative
        width 415px
        height 42px
        margin 0 auto
        border-radius 3px
        .user-id-password
          height 20px
          width 395px
          float left
          border-radius 3px
          padding 10px
          color #a5a5a5
          border 1px solid #dfdfdf
          outline none
        .tips
          color #f45d90
          position absolute
          right -20px
          top 12px
          transform translate3d(100%, 0, 0)
          font-size 12px
          &.hid
            display none
      .register-hidden-gruop
        width 415px
        height 40px
        margin 0 auto
        .pc-register-descript
          position relative
          width 415px
          height 42px
          text-align left
          line-height 1.625em
          margin 20px auto 0
          border-radius 3px
          label
            float left
            font-size 12px
            .sm-box
              vertical-align middle
              margin 0 5px 3px 0
              outline none
              color #717171
            a
              color #35a3d6
      .new-phone
        margin-top 40px
      .code-wrapper
        background #fff
        height 40px
        border 1px solid #dfdfdf
        text-align center
        .code
          width 234px
          float left
          border-radius 3px
          margin-right 30px
          padding 0 10px
          color #a5a5a5
          border none
          outline none
          line-height 40px
        .check
          position absolute
          width 19px
          height 19px
          background url("./png/right_s.png") no-repeat
          right 141px
          top 12px
        .send-btn
          float left
          width 130px
          height 38px
          line-height 38px
          border-radius 3px
          margin 1px 1px 1px 0
          background-color #00a1d6
          color #fff
          &:hover
            background-color #00b5e5
      .register-btn
        display block
        border none
        margin 10px auto 0
        padding 0
        font-size 14px
        background-color #00a0da
        color #fff
        outline none
        cursor pointer
        &.no-check,&.no-check:hover
          background #f9f9f9
          color #aaa
      .text-right
        line-height 40px
        text-align right
        a
          color #00a1d6
</style>
