<template>
<div id="forget-password">
  <TopBanner />
  <div class="retrieve-tab">
    <div class="retrieve-password">
      <div class="retrieve"
           :class="{'retrieve-currtent' : activeMobile}"
           @click="activeMobile = true">
        通过绑定的手机找回密码
      </div>
      <div class="retrieve"
           :class="{'retrieve-currtent' : !activeMobile}"
           @click="activeMobile = false">
        通过绑定的邮箱找回密码
      </div>
    </div>
    <div class="retrieve-line"></div>
  </div>
  <div class="verify-content" v-show="activeMobile">
    <div>
      <div class="box">
        <input class="password" type="text" placeholder="请输入手机号码">
      </div>
      <div class="box">
        <input class="code" type="text" placeholder="验证码">
        <img class="yzm">
        <p>换一张</p>
      </div>
      <input class="login" type="submit" value="发送到手机">
      <router-link to="/login" class="no-account">返回登陆</router-link>
    </div>
  </div>
  <div class="verify-content" v-show="!activeMobile">
    <div>
      <div class="box">
        <input class="password" type="text" placeholder="请输入邮箱">
      </div>
      <div class="box">
        <input class="code" type="text" placeholder="验证码">
        <img class="yzm">
        <p>换一张</p>
      </div>
      <input class="login" type="submit" value="发送到验证邮箱">
      <router-link to="/login" class="no-account">返回登陆</router-link>
    </div>
  </div>
</div>
</template>

<script>
import TopBanner from '@/components/topBanner/TopBanner'
export default {
  name: 'forget-password',
  data () {
    return {
      activeMobile: true
    }
  },
  methods: {
  },
  components: {
    TopBanner
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
      .password
        width 388px
        height 18px
        padding 10px 0 10px 10px
        border 1px solid #ddd
        border-radius 2px
        color #aaa
        font-size 14px
        outline 0
      .code
        position relative
        width 170px
        height 18px
        margin-top 30px
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
        top 30px
        margin-top 4px
        border 1px solid #dfdfdf
        vertical-align middle
      p
        position absolute
        font-size 12px
        color #00a0d8
        right 52px
        top 31px
        margin-top 10px
        cursor pointer
    .login
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
