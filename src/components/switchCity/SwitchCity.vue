<template>
<div id="switch-city" :style="{top: top + 'px', left: left + 'px'}">
  <span class="switch-arrows"></span>
  <div class="switch-tab">
    <h4 class="switch-tab-head">
      热门城市
      <span class="switch-tab-head-remark">
        (可直接输入城市或城市拼音)
      </span>
    </h4>
    <div class="search-citys">
      <h4 class="title">搜索历史</h4>
      <div class="search-content">
        <span class="item-city">上海</span>
      </div>
    </div>
    <div class="switch-tab-wrap switch-tab-leaveCity">
      <ul class="switch-tab-tray clearfix">
        <li class="switch-tab-item"
            :class="{'current': selected === switchTabItem[0]}"
            @click="select(switchTabItem[0])">
          {{switchTabItem[0]}}
        </li>
        <li class="switch-tab-item"
            :class="{'current': selected === switchTabItem[1]}"
            @click="select(switchTabItem[1])">
          {{switchTabItem[1]}}
        </li>
        <li class="switch-tab-item"
            :class="{'current': selected === switchTabItem[2]}"
            @click="select(switchTabItem[2])">
          {{switchTabItem[2]}}
        </li>
        <li class="switch-tab-item"
            :class="{'current': selected === switchTabItem[3]}"
            @click="select(switchTabItem[3])">
          {{switchTabItem[3]}}
        </li>
      </ul>
      <div class="switch-tab-content clearfix">
        <dl class="clearfix switch-block"
            v-for="(item, index) in showSelect"
            :key="'switch-block' + index">
          <dt class="switch-title">{{ item.initial }}</dt>
          <dd class="switch-def">
            <span class="switch-item" v-for="(i, idx) in item.all"
                  :key="'switch-item' + idx"
                  :title="i.showName"
                  @click="chooseItem(cityType, i.name)">
              {{ i.name }}
            </span>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'switch-city',
  props: {
    cityType: {
      type: String,
      default: 'leave'
    },
    left: {
      type: Number,
      default: 90
    },
    top: {
      type: Number,
      default: 35
    }
  },
  data () {
    return {
      citys: this.cityType === 'leave' ? require('./leaveCitys.json') : require('./arriveCitys.json'),
      selected: 'ABCDEF',
      switchTabItem: ['ABCDEF', 'GHJKLM', 'NPQRS', 'TWXYZ']
    }
  },
  methods: {
    select (str) {
      this.selected = str
      if (this.citys && this.citys.header.isSuccess) {
        let items = []
        for (let initial of str) {
          let item = {}
          item.initial = initial
          item.all = []
          for (let i of this.citys.body) {
            if (i.shortEnName[0].toUpperCase() === initial.toUpperCase()) {
              item.all.push(i)
            }
          }
          items.push(item)
        }
        return items
      }
    },
    chooseItem (type, val) {
      this.$emit('setInputText', type, val)
    }
  },
  computed: {
    showSelect () {
      return this.select(this.selected) || []
    }
  }
}
</script>

<style lang="stylus" scoped>
#switch-city
  position absolute
  z-index 2000
  margin-top 10px
  background-color #fff
  box-shadow 0 0 16px 2px rgba(0, 0, 0, .2)
  outline 0
  .switch-arrows, .switch-arrows:after
    position absolute
    display block
    top -15px
    left 15px
    height 0
    width 0
    font-size 0
    line-height 0
    border-style dashed dashed solid
    border-color transparent transparent #fff
    border-width 8px
    z-index 2000
  .switch-tab
    background #fff
    outline 0
    .switch-tab-head
      height 28px
      line-height 28px
      overflow hidden
      text-indent 10px
      font-size 12px
      font-weight 400px
      background #fff
      color #999
      padding 15px 10px 0 8px
      border 0
      .switch-tab-head-remark
        font-weight 400
    .search-citys
      padding 0 20px
      .title
        height 24px
        line-height 24px
      .search-content
        height 34px
        .item-city
          display inline-block
          width 50px
          height 28px
          line-height 28px
          padding-right 10px
          font-size 12px
          color #666
          cursor pointer
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
    .switch-tab-wrap
      border 0
      padding 5px 10px
      outline 0
      .switch-tab-tray
        display block
        margin-top 5px
        position relative
        z-index 1
        .switch-tab-item
          float left
          padding 0 12px
          height 22px
          line-height 22px
          font-size 14px
          font-weight 500
          cursor pointer
          &.current
            border 0
            border-bottom 1px solid #00c77b
            color #00c77b
            font-weight 700
      .switch-tab-content
        position relative
        z-index 0
        width 375px
        max-height 200px
        margin-top -1px
        padding 10px 5px 5px
        border-top 1px solid #ddd
        overflow auto
        .switch-block
          .switch-title
            width 25px
            float left
            display block
            text-align center
            color #f60
            padding 1px 0
            height 22px
            line-height 22px
            font-size 14px
          .switch-def
            width 304px
            float left
            .switch-item
              float left
              display block
              height 22px
              width 48px
              max-width 6em
              line-height 22px
              padding 2px 13px
              margin 0
              font-size 14px
              border transparent
              cursor pointer
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              &:hover
                color #ff8324
</style>
