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
        <input  class="code" type="text">
        <div class="check"></div>
        <a href="javascript:;" class="send-btn" @click="sendMsg">
          {{ btnText }}
        </a>
        <p class="tips">验证码已发到你手机上了，5分钟内有效。</p>
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
             @click="nextStep"
             value="注册">
      <div class="register-hidden-gruop text-right">
        <a href="/login">已有账号，直接登录></a>
      </div>
    </div>
  </div>
  <div class="popup-mask" v-show="showMask">
    <div class="popup-box">
      <div class="popup-titleBar">
        <div class="popup-title">
          <i class="topIcon"></i>
          请输入验证码
        </div>
        <a class="popup-close" href="javascript:;" @click="hidMask"></a>
      </div>
      <div class="popup-main">
        <div class="popup-content">
          <img class="popup-captchaImg" src="">
          <p class="popup-change">
            <a href="javascript:;">换一张</a>
          </p>
          <input class="popup-text" type="text" placeholder="请输入图片中的内容">
        </div>
        <div class="popup-buttons">
          <input type="button" value="确定" class="popup-btn popup-btn-primary">
          <input type="button" value="取消" class="popup-btn" @click="hidMask">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SecurityLevel from '@/components/securityLevel/SecurityLevel'
export default {
  name: 'step1',
  props: {
    changeStep: {
      type: Function
    },
    userMsg: {
      type: Object
    }
  },
  data () {
    return {
      // 是否同意协议
      agree: false,
      // 发送短信btn 文字变化
      btnText: '点击获取',
      // 遮罩层
      showMask: false
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
        console.log('发送短信')
        this.showMask = true
      }
    },
    hidMask () {
      this.showMask = false
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
  .popup-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    margin 0
    padding 0
    background-color rgba(0, 0, 0, .7)
    z-index 999
    .popup-box
      border-radius 8px
      box-shadow 0 3px 26px rgba(0,0,0,.9)
      position absolute
      left 50%
      top 50%
      width 326px
      transform translate3d(-50%,-50%,0)
      background-color #fff
      .popup-titleBar
        height 29px
        font-size 14px
        line-height 29px
        padding 13px 25px 10px
        text-indent 5px
        color #222
        font-weight 700
        border-bottom 1px solid #ddd
        overflow hidden
        text-overflow ellipsis
        cursor default
        .popup-title
          .topIcon
            display block
            float left
            width 6px
            height 13px
            margin-top 8px
            margin-right 2px
            background url("./png/icons.png") -43px -9px
        .popup-close
          position absolute
          margin-top 17px
          top 4px
          right 12px
          width 12px
          height 12px
          text-indent -9999em
          background url("./png/icons.png") -162px -68px
      .popup-main
        text-align center
        vertical-align middle
        min-width 9em
        padding 20px 0 21px
        .popup-content
          .popup-captchaImg
            display block
            width 100px
            height 30px
            margin 0 auto
          .popup-change
            padding 10px 0
            text-align center
            a
              color #00a1d6
              border none
              font-size 12px
          .popup-text
            border 0
            border-bottom 1px solid #ddd
            outline none
            color #a5a5a5
            text-align center
            font-size 13px
            line-height 24px
        .popup-buttons
          margin-top 20px
          .popup-btn
            border 1px solid #ddd
            transition all .2s
            border-radius 4px
            background-image linear-gradient(0deg,#f8f8f8,#fff)
            margin 0 20px
            padding 10px 40px
            cursor pointer
            display inline-block
            min-height 2.2em
            text-align center
            letter-spacing 2px
            font-family 10.81081081px,Microsoft Yahei,Tahoma,Arial,Helvetica,STHeiti
            width auto
            overflow visible
            color #222
            border-radius 5px
            box-sizing border-box
            &:hover
              color #000
              border-color #666
          .popup-btn-primary
            color #fff
            background-color #00a0d8
            border 1px solid #0082b0
            vertical-align middle
            background-image linear-gradient(0deg,#009cd6,#00aae0)
            transition all .2s
            &:hover
              color #fff
              border 1px solid #008bbc
              background-image linear-gradient(0deg,#00a6dc,#00bee7)
</style>
