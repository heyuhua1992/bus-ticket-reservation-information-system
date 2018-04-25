<template>
<div id="security-level">
  <div class="safe-window">
    <p>安全系数</p>
    <div class="level">
      <div class="level-line"
           v-for="(item, index) in levels"
           :key="'level-line' + index"
           :class="{[item.bgcolor]: index <= level}">
      </div>
      <span v-for="(item, index) in levels"
            :key="'level-span' + index"
            v-if="index === level"
            :class="{[item.bgcolor]: index === level}">
                {{ levels[level].level }}
      </span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'security-level',
  props: {
    level: {
      type: Number
    }
  },
  data () {
    return {
      // 安全等级
      levels: [
        {
          bgcolor: 'level1',
          level: '弱'
        },
        {
          bgcolor: 'level2',
          level: '中弱'
        },
        {
          bgcolor: 'level3',
          level: '中'
        },
        {
          bgcolor: 'level4',
          level: '中强'
        },
        {
          bgcolor: 'level5',
          level: '安全'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
#security-level
  width 415px
  height 40px
  margin 0 auto
  .safe-window
    width 415px
    height 40px
    border-radius 3px
    line-height 20px
    padding 10px 0
    margin 0 auto
    display block
    font-weight 700
    overflow hidden
    font-size 15px
    p
      float left
      color #717171
    .level
      .level-line
        float left
        width 30px
        height 5px
        border-radius 5px
        margin-left 15px
        margin-right 10px
        margin-top 7px
        &.level1
          background-color #ff0000
        &.level2
          background-color #ff7f00
        &.level3
          background-color #f0f028
        &.level4
          background-color #7ade18
        &.level5
          background-color #49c519
      span
        font-size 12px
        margin-left 5px
        &.level1
          color #ff0000
        &.level2
          color #ff7f00
        &.level3
          color #f0f028
        &.level4
          color #7ade18
        &.level5
          color #49c519
</style>
