<template>
<div id="login">
  <TopBanner />
  <TitleLine :title="'登陆'" :fontSize="38"/>
  <div class="login-box">
    <div class="input-box">
      <ul>
        <li class="username status-box">
          <input class="input"
                 type="text"
                 placeholder="你的手机号"
                 maxlength="20"
                 v-validate="{required: true, regex: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/ }"
                 name="phone"
                 autocomplete="off"/>
          <div class="text clearfix" >
            <p class="tips" v-show="errors.has('phone')">
              {{ errors.first('phone') }}
            </p>
          </div>
        </li>
        <li class="password status-box">
          <input class="input"
                 type="password"
                 v-validate="{required: true,max: 16,min: 6, alpha_dash: true}"
                 name="password"
                 placeholder="密码"/>
          <div class="text clearfix">
            <p class="tips" v-show="errors.has('password')">
              {{ errors.first('password') }}
            </p>
          </div>
        </li>
        <li class="gc"></li>
        <li class="remember">
          <label>
            <input type="checkbox"/>记住我
            <span>不是自己的电脑上不要勾选此项</span>
            <router-link class="forget-password" to="/forgetpassword">忘记密码</router-link>
            <router-link class="not-checkout" to="/notcheckout">无法验证</router-link>
          </label>
        </li>
        <li class="btn-box">
          <a class="btn btn-login">
            登陆
          </a>
          <router-link  class="btn btn-reg"
                        to="/register">
            注册
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import TopBanner from '@/components/topBanner/TopBanner'
import TitleLine from '@/components/titleLine/TitleLine'
export default {
  name: 'login',
  components: {
    TopBanner,
    TitleLine
  }
}
</script>

<style lang="stylus" scoped>
#login
  .login-box
    position relative
    width 980px
    height 325px
    margin 0 auto
  .input-box
    text-align center
    margin 0 auto
    padding-top 20px
    width 410px
    .status-box
      position relative
      .input
        width 388px
        border 1px solid #ddd
        border-radius 4px
        color #aaa
        font-size 14px
        padding 10px
        height 18px
        vertical-align middle
        background-image none
        color #000
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
    .remember
      margin 10px 0
      color #717171
      text-align left
      input
        vertical-align middle
        margin-bottom 3px
      span
        color #bbb
        margin-left 10px
      a
        outline 0
        color #00a1d6
        text-decoration none
        cursor pointer
        &.forget-password
          float right
        &.not-checkout
          float right
          margin-right 10px
    .btn-box
      .btn
        color #555
        display inline-block
        height 36px
        border 1px solid #ccc
        border-radius 2px
        width 184px
        line-height 38px
        font-size 14px
        text-align center
        cursor pointer
        transition all .3s
      .btn-login
        border 1px solid #0381aa
        color #fff
        background-color #00a7de
        &:hover
          background-color #00bee7
      .btn-reg
        margin-left 34px
        &:hover
          background-color #f7f7f7
</style>
