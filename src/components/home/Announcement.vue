<template>
<div id="announcement">
  <ul class="announcement-wrapper">
    <li class="announcement-title"
        v-for="(item, index) of initData"
        :key="'announcement' + index"
        :class="{active: item.name === selected}"
        @click="selcteTitle(index)">
      {{item.title}}
    </li>
  </ul>
  <div class="content">
    <router-link class="content-title"
                 v-show="show"
                 v-for="(item, index) in announcementData[selected]"
                 :key="'content' + index"
                 :to="'/announcement/' + selected + '/' + item.to">
      <span class="type" v-show="selected === initData[0].name">
        【{{initData[item.type].title}}】
      </span>
      <span class="title">{{item.title}}</span>
      <span class="date fr">{{item.date}}</span>
    </router-link>
    <div v-show="!show" class="empty">
      还没有内容
    </div>
    <router-link class="more" :to="'/announcement/' + selected">
      更多&gt;&gt;&gt;
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'announcement',
  data () {
    return {
      initData: [
        {
          title: '综合',
          name: 'new'
        },
        {
          title: '最新动态',
          name: 'recentNews'
        },
        {
          title: '使用须知',
          name: 'noticeForUse'
        },
        {
          title: '相关规章',
          name: 'rules'
        },
        {
          title: '常见问题',
          name: 'questions'
        }
      ],
      announcementData: {
        new: [
          {
            type: 1,
            title: '今日大件事1',
            date: '[02-05]',
            to: '1'
          },
          {
            type: 1,
            title: '今日大件事2',
            date: '[02-08]',
            to: '2'
          },
          {
            type: 1,
            title: '今日大件事3',
            date: '[02-24]',
            to: '3'
          },
          {
            type: 2,
            title: '今日大件事1',
            date: '[02-05]',
            to: '4'
          },
          {
            type: 3,
            title: '今日大件事2',
            date: '[02-08]',
            to: '/'
          },
          {
            type: 3,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          },
          {
            type: 3,
            title: '今日大件事1',
            date: '[02-05]',
            to: '/'
          },
          {
            type: 2,
            title: '今日大件事2',
            date: '[02-08]',
            to: '/'
          },
          {
            type: 4,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          },
          {
            type: 4,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          }
        ],
        recentNews: [
          {
            type: 1,
            title: '今日大件事1',
            date: '[02-05]',
            to: '/'
          },
          {
            type: 1,
            title: '今日大件事2',
            date: '[02-08]',
            to: '/'
          },
          {
            type: 1,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          },
          {
            type: 2,
            title: '今日大件事1',
            date: '[02-05]',
            to: '/'
          },
          {
            type: 3,
            title: '今日大件事2',
            date: '[02-08]',
            to: '/'
          },
          {
            type: 3,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          },
          {
            type: 3,
            title: '今日大件事1',
            date: '[02-05]',
            to: '/'
          },
          {
            type: 2,
            title: '今日大件事2',
            date: '[02-08]',
            to: '/'
          },
          {
            type: 4,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          },
          {
            type: 4,
            title: '今日大件事3',
            date: '[02-24]',
            to: '/'
          }
        ],
        noticeForUse: [],
        rules: [],
        questions: []
      },
      selected: 'new'
    }
  },
  methods: {
    selcteTitle (index) {
      this.selected = this.initData[index].name
    }
  },
  computed: {
    show () {
      return this.announcementData[this.selected] && this.announcementData[this.selected].length > 0
    }
  }
}
</script>

<style lang="stylus" scoped>
#announcement
  font-size 18px
  border-radius 5px
  margin 20px 0 20px 0
  .announcement-wrapper
    display flex
    background-color #FAFAFA
    color #222
    border-radius 5px
    .announcement-title
      flex 1
      text-align center
      height 48px
      line-height 48px
      cursor pointer
      &:hover
        background-color #E1E4EA
      &.active
        background-color #01916c
        color #fff
  .content
    position relative
    height 340px
    overflow hidden
    background-color #eceff5
    .content-title
      display block
      height 30px
      line-height 30px
      &:hover
        background-color #fff
      &:active, &:visited, &:link
        color #000
    .empty
      width 100%
      text-align center
      margin-top 160px
    .more
      position absolute
      right 0
      bottom 5px
      &:active, &:visited, &:link
        color #000
</style>
