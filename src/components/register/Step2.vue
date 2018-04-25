<template>
<div id="step2">
  <div class="content">
    <ul class="mt">
      <li class="top">
        <i></i>
        <p>
          手机验证成功，你的手机是
          <span>&nbsp;{{userMsg.phone}}</span>
        </p>
      </li>
      <li>
        <img src="./png/lr_22_03.jpg">
      </li>
      <li class="tips">请继续完善下面的信息</li>
      <li class="md">
        <input type="text" placeholder="信息一">
        <p>信息输入错误</p>
      </li>
      <li class="md">
        <input type="text" placeholder="信息一">
        <p>信息输入错误</p>
      </li>
      <li class="md">
        <input type="text" placeholder="信息一">
        <p>信息输入错误</p>
      </li>
      <li class="md">
        <input type="text" placeholder="信息一">
        <p>信息输入错误</p>
      </li>
      <li class="md">
        <input type="text" placeholder="信息一">
        <p>信息输入错误</p>
      </li>
      <li class="md">
        <input type="text" placeholder="信息一">
        <p>信息输入错误</p>
      </li>
      <li class="ft">
        <input class="create" type="button" value="创建账号" />
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'step2',
  props: {
    userMsg: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
#step2
  .content
    .mt
      margin-top 25px
      text-align center
      li
        img
          margin 30px auto
      .top
        position relative
        i
          position absolute
          display block
          width 19px
          height 19px
          background url("./png/right_s.png") no-repeat
          top -1px
          left 295px
        p
          text-align center
          span
            font-size 12px
            font-weight 700
      .tips
        width 400px
        margin 0 auto 15px
        font-size 12px
        text-align left
      .md
        position relative
        &:first-child
         input
           margin-top 0
        input
          height 18px
          width 388px
          margin 10px auto 0
          padding 10px 0 10px 10px
          border 1px solid #ddd
          border-radius 2px
          color #AAA
          font-size 14px
          font 12px/1.125 Arial,Helvetica,sans-serif
        p
          position absolute
          text-align left
          top 20px
          left 717px
          font-size 12px
          color #F66495
          line-height 18px
          display inline-block
      .ft
        .create
          height 38px
          width 398px
          margin 10px auto 0
          padding 0
          border-radius 2px
          line-height 38px
          text-align center
          font-size 14px
          color #FFF
          background-color #00A7DE
          cursor pointer
          border none
</style>
