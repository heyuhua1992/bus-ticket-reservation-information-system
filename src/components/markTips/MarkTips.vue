<template>
  <div class="popup-mask" v-show="showMask">
    <div class="popup-box">
      <div class="popup-titleBar">
        <div class="popup-title">
          <i class="topIcon"></i>
         {{ title }}
        </div>
        <a class="popup-close" href="javascript:;" @click="hidMask(false)"></a>
      </div>
      <div class="popup-main">
        <div class="popup-content">
          {{text}}
        </div>
        <div class="popup-buttons">
          <input type="button"
                 value="确定"
                 class="popup-btn popup-btn-primary"
                 @click="goPage()">
          <input type="button"
                 value="取消"
                 class="popup-btn"
                 @click="hidMask(false)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 遮罩层
      showMask: false,
      text: '',
      title: ''
    }
  },
  methods: {
    markConfig (data) {
      if (data.ishid) {
        this.showMask = data.ishid
      }
      if (data.title) {
        this.title = data.title
      }
      if (data.text) {
        this.text = data.text
      }
      if (data.path && data.data) {
        this.$router.push({path: data.path, query: data.data})
      }
      if (data.path && !data.data) {
        this.$router.push({path: data.path})
      }
    },
    hidMask () {
      this.showMask = false
    },
    goPage () {
      this.hidMask()
    }
  }
}
</script>

<style lang="stylus">
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
