<template>
<div id="setting">
  <div class="account-info">
    <ul class="info-list" :class="{edit: isEdit}">
      <li class="phone">
        <span>手机</span>
        <p>+86  {{ accountInfo.phone }}</p>
        <div class="edit-box">
          <em>+86</em>
          <input type="text"
                 v-model="accountInfo.phone"
                 v-validate="{required: true, regex: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/ }"
                 name="phone">
          <p class="tips" v-show="errors.has('phone')">
            {{ errors.first('phone') }}
          </p>
        </div>
      </li>
      <li class="email">
        <span>邮箱</span>
        <p>{{ accountInfo.email }}</p>
        <div class="edit-box">
          <input type="text"
                 v-model="accountInfo.email"
                 v-validate="{required: true, email: true}"
                 name="email">
          <p class="tips" v-show="errors.has('email')">
            {{ errors.first('email') }}
          </p>
        </div>
      </li>
      <li class="nickname">
        <span>昵称</span>
        <p>{{ accountInfo.nickname }}</p>
        <div class="edit-box">
          <input type="text"
                 v-model="accountInfo.nickname"
                 v-validate="{required: true, max: 6, min: 2}"
                 name="nickname">
          <p class="tips" v-show="errors.has('nickname')">
            {{ errors.first('nickname') }}
          </p>
        </div>
      </li>
      <li class="gender">
        <span>性别</span>
        <p>{{ accountInfo.gender }}</p>
        <div class="edit-box">
          <div class="radio-group">
            <label class="radio-btn is-active">
              <input type="radio"
                     class="orig-radio"
                     name="gender"
                     v-model="accountInfo.gender"
                     value="男">
              <span class="btn-inner">男</span>
            </label>
            <label class="radio-btn">
              <input type="radio"
                     class="orig-radio"
                     name="gender"
                     v-model="accountInfo.gender"
                     value="女">
              <span class="btn-inner">女</span>
            </label>
          </div>
        </div>
      </li>
      <li class="date-of-birth">
        <span>出生日期</span>
        <p>{{ accountInfo.dateOfBirth }}</p>
        <div class="edit-box">
          <input type="text"
                 v-model="accountInfo.dateOfBirth"
                 v-validate="{required: true, date_format: ('YYYY-MM-DD')}"
                 name="date-of-birth">
          <p class="tips" v-show="errors.has('date-of-birth')">
            {{ errors.first('date-of-birth') }}
          </p>
        </div>
      </li>
      <li class="address">
        <span>地址</span>
        <p>{{ accountInfo.address }}</p>
        <div class="edit-box">
          <input type="text"
                 v-model="accountInfo.address"
                 v-validate="{required: true}"
                 name="address">
          <p class="tips" v-show="errors.has('address')">
            {{ errors.first('address') }}
          </p>
        </div>
      </li>
      <li class="name no-edit">
        <span>姓名</span>
        <p>{{ accountInfo.name }}</p>
      </li>
      <li class="ID no-edit">
        <span>{{ accountInfo.IDType }}</span>
        <p>{{ accountInfo.IDNumber }}</p>
      </li>
      <li class="accountStatus no-edit">
        <span>账号状态</span>
        <p>{{ accountInfo.accountStatus }}</p>
      </li>
      <li class="joinDate no-edit">
        <span>注册时间</span>
        <p>{{ accountInfo.joinDate }}</p>
      </li>
    </ul>
    <div class="btns">
      <div class="view" v-if="!isEdit">
        <button @click="goEdit(true)">
          <span>编辑</span>
        </button>
      </div>
      <div v-else>
        <button @click="goEdit(false)">
          <span>保存</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'setting',
  props: {
    setTitleText: {
      type: Function
    }
  },
  created () {
    this.initPage()
  },
  data () {
    return {
      accountInfo: {},
      accountInfoStr: '', // 原始的数据，用于判断用于有没有修改数据
      isEdit: false
    }
  },
  methods: {
    initPage () {
      this.accountInfo = require('./accountInfo').user
      this.accountInfoStr = JSON.stringify(this.accountInfo)
    },
    goEdit (bool) {
      if (bool) {
        this.isEdit = bool
      } else {
        let flag = this.$validator.flags
        let arr = ['phone', 'email', 'nickname', 'date-of-birth', 'address']
        for (let item of arr) {
          if (!flag[item] || !flag[item].valid) {
            return
          }
        }
        this.sendToServer()
        this.isEdit = bool
      }
    },
    sendToServer () {
      if (this.accountInfoStr !== JSON.stringify(this.accountInfo)) {
        console.log('已经更新数据')
        this.initPage()
      }
    }
  },
  beforeMount () {
    this.setTitleText('我的信息')
  }
}
</script>

<style lang="stylus" scoped>
#setting
  font-size 14px
  padding 0 10px 20px
  box-sizing border-box
  .account-info
    margin-top 20px
    .info-list
      margin-left 40px
      &>li
        display flex
        padding 5px 0
        &:last-child
          border-bottom none
        &.no-edit
          &>p
            color #aaa
            user-select none
        &.accountStatus
          &>p
            color green
        &>span
          display block
          width 100px
          height 30px
          line-height 30px
          font-size 20px
          font-weight 500
          padding-right 15px
          border-right 1px solid #9a9a9a
          text-align right
          user-select none
        &>p
          display block
          height 30px
          line-height 30px
          padding-left 15px
          font-size 16px
          font-weight 400
        .edit-box
          display none
          &>em
            display block
            position absolute
            font-size 16px
            line-height 30px
            margin-left 20px
            user-select none
          &>input
            display inline-block
            width 225px
            height 30px
            appearance none
            background-color #fff
            background-image none
            border-radius 4px
            border 1px solid #bfcbd9
            box-sizing border-box
            color #1f2d3d
            line-height 1
            outline 0
            padding 3px 10px
            margin-left 15px
            transition border-color .2s cubic-bezier(.645,.045,.355,1)
          &>p.tips
            display inline-block
            color #f66495
            font-size 12px
            margin-left 20px
          .radio-group
            display inline-block
            font-size 0
            line-height 30px
            vertical-align middle
            margin-left 15px
            .radio-btn
              position relative
              display inline-block
              .orig-radio
                opacity 0
                outline 0
                position absolute
                z-index -1
                left -999px
              .btn-inner
                position relative
                display inline-block
                margin 0 20px 0 0
                padding 5px 8px
                margin-right 20px
                border 1px solid #bfcbd9
                border-radius 5px!important
                font-size 14px
                line-height 1
                text-align center
                background #f4f4f4
                color #717171
                white-space nowrap
                -webkit-appearance none
                box-sizing border-box
                outline 0
                cursor pointer
                box-shadow none
                transition all .3s cubic-bezier(.645,.045,.355,1)
                vertical-align middle
              .orig-radio:checked+.btn-inner
                background-color #22a1d6!important
                border-color #22a1d6!important
                color #fff
      &>li.phone
        .edit-box
          &>input
            padding-left 40px
    .edit
      .phone, .email, .nickname,
      .gender, .date-of-birth, .address
        &>p
          display none!important
        .edit-box
          display block
    .btns
      padding-top 70px
      padding-left 450px
      height 36px
      line-height 36px
      &>div>button
        display inline-block
        width 110px
        line-height 1
        margin 0
        padding 10px 15px
        font-size 14px
        text-align center
        border 1px solid #20a0ff
        border-radius 4px
        background-color #00a1d6!important
        color #fff
        white-space nowrap
        cursor pointer
        outline 0
        transform translate(-50%, -50%)
        &:hover
          background-color #00b5e5!important
</style>
