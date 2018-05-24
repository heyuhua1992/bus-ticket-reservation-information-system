<template>
<div id="general">
  <div class="add-box clearfix">
    <div class="add-person" @click="add">
      <span>+</span>&nbsp;新增常用旅客
    </div>
  </div>
  <div class="pageData">
    <table v-if="generalInfos">
      <tbody>
        <tr class="tb-title">
          <th width="100">姓名</th>
          <th width="100">性别</th>
          <th width="160">手机号码</th>
          <th width="100">证件类型</th>
          <th width="180">证件号码</th>
          <th class="operate" width="100">操作</th>
        </tr>
        <tr v-for="(item, index) in generalInfos"
            :key="'generalInfos' + index"
            :class="{edit: item.edit}">
          <td>
            <span>{{ item.name }}</span>
            <div class="edit-box">
              <input type="text"
                     v-model="item.name"
                     name="name"
                     v-validate="{required: true, min: 2}">
              <p class="tips"
                 v-show="errors.has('name')">
                {{ errors.first('name') }}
              </p>
            </div>
          </td>
          <td>
            <span>{{ item.gender }}</span>
            <div class="edit-box">
              <select v-model="item.gender">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </td>
          <td>
            <span>{{ item.phone }}</span>
            <div class="edit-box">
              <input type="text"
                     v-model="item.phone"
                     v-validate="{required: true, regex: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/ }"
                     name="phone">
              <p style="margin-left: -75px"
                 class="tips"
                 v-show="errors.has('phone')">
                {{ errors.first('phone') }}
              </p>
            </div>
          </td>
          <td>
            <span>{{ item.IDType }}</span>
            <div class="edit-box">
              <select v-model="item.IDType">
                <option value="身份证">身份证</option>
              </select>
            </div>
          </td>
          <td>
            <span>{{ item.IDNumber }}</span>
            <div class="edit-box">
              <input type="text"
                     name="IDNumber"
                     v-validate="{required: true, regex: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/ }"
                     v-model="item.IDNumber">
              <p style="margin-left: -80px"
                 class="tips"
                 v-show="errors.has('IDNumber')">
                {{ errors.first('IDNumber') }}
              </p>
            </div>
          </td>
          <td class="td-last">
            <a @click="editORSave(item, true)"
               v-show="!item.edit">
              编辑
            </a>
            <a @click="editORSave(item, false)"
               v-show="item.edit">
              保存
            </a>
            <a @click="del(item)">删除</a>
          </td>
        </tr >
      </tbody>
    </table>
    <div v-else>
      您还没有常用旅客
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'general',
  props: {
    setTitleText: {
      type: Function
    },
    orderData: {
      type: Object
    }
  },
  beforeMount () {
    this.setTitleText('常用信息')
    this.init()
  },
  data () {
    return {
      generalInfos: {},
      generalInfosBK: '' // 在每次添加之前存入，用于回退
    }
  },
  methods: {
    init () {
      this.generalInfos = require('./generalInfos').generalInfos
      for (let item of this.generalInfos) {
        this.$set(item, 'edit', false)
      }
    },
    add () {
      let gi = this.generalInfos
      for (let item of gi) {
        if (item.edit) {
          return
        }
      }
      this.generalInfosBK = JSON.stringify(gi)
      let newPerson = {
        name: '',
        gender: '男',
        phone: '',
        IDType: '身份证',
        IDNumber: '',
        edit: true
      }
      gi.push(newPerson)
    },
    del (item) {
      this.generalInfos = this.generalInfos.filter((_item) => {
        if (item === _item) {
          return
        }
        return item
      })
    },
    editORSave (item, bool) {
      if (bool) {
        for (let i of this.generalInfos) {
          if (i.edit) {
            alert('您还没有保存')
            return
          }
        }
        item.edit = bool
        return
      }
      if (this.checkValidation) {
        // 如果不是新增的 ， 就不需要进行这一步
        if (this.generalInfosBK) {
          let bk = JSON.parse(this.generalInfosBK)
          // 检查是否有重复的
          for (let i of bk) {
            if (item.name === i.name && item.gender === i.gender && item.phone === i.phone && item.IDType === i.IDType && item.IDNumber === i.IDNumber) {
              alert('这条信息已存在')
              return
            }
          }
        }
        item.edit = bool
      }
    }
  },
  computed: {
    checkValidation () {
      let flag = this.$validator.flags
      let arr = ['phone', 'name', 'IDNumber']
      for (let item of arr) {
        if (!flag[item] || !flag[item].valid) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
#general
  margin-top 15px
  font-size 14px
  padding 0 10px 20px
  box-sizing border-box
  .add-box
    .add-person
      width 124px
      height 32px
      background-color #ff7800
      border-radius 2px
      display block
      color #fff
      text-align center
      line-height 32px
      float left
      margin-bottom 5px
      cursor pointer
      &:hover
        background-color #f60
      span
        width 15px
        height 15px
        line-height 15px
        font-size 16px
  .pageData
    &>table
      border-spacing 0
      &>tbody
        .tb-title
          user-select none
          color #999
          padding 15px 0
          &>th
            text-align center
            padding 15px 0
            border-bottom 1px solid#eee
            &.operate
              text-align left
              padding-left 40px
          &>th:first-child
            text-align left
        &>tr
          &>td
            text-align center
            padding 30px 0
            border-bottom 1px solid #eee
            box-sizing border-box
            span
              display block
              height 30px
              line-height 30px
              appearance none
              box-sizing border-box
            .edit-box
              display none
              input
                display inline-block
                width 100px
                height 29px
                appearance none
                background-color #fff
                border-radius 4px
                border 1px solid #bfcbd9
                box-sizing border-box
                color #1f2d3d
                line-height 1
                outline 0
                padding 3px 10px
                margin-left 0 auto
              input[name=name]
                width 80px
              input[name=phone]
                width 140px
              input[name=IDNumber]
                width 160px
              select
                height 30px
                appearance none
                background-color #fff
                border-radius 4px
                box-sizing border-box
                line-height 1
                outline 0
                padding 3px 10px
              &>p.tips
                position absolute
                display inline-block
                color #f66495
                font-size 12px
                margin-top 5px
              &:first-of-type
                input
                  margin-left 0
          &>td:first-child
            text-align left
          &>td.td-last
            text-align left
            padding-left 40px
            &>a
              user-select none
              color #0185c6
              cursor pointer
              outline 0
              margin-right 15px
              &:hover
                color #ff5d3d
          &.edit
            &>td>span
              display none
              height 0
            .edit-box
              display inline-block
</style>
