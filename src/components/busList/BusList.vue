<template>
<div id="bus-list">
  <div class="main">
    <div class="search">
      <div class="departure input-wrapper">
        <label class="label" for="hot-dpt-city">
          出发
        </label>
        <input type="text" id="hot-dpt-city">
      </div>
      <div class="exchange">
        <span>换</span>
      </div>
      <div class="destination  input-wrapper">
        <label class="label" for="hot-des-city">
          到达
        </label>
        <input type="text" id="hot-des-city">
      </div>
      <div class="date input-wrapper">
        <label class="label" for="select-date">日期</label>
        <input type="text" id="select-date">
      </div>
      <button class="search-btn">搜索</button>
    </div>
    <div class="msg-wrapper">
      <div class="change-date">
        <div class="arrowL limite"></div>
        <ul class="items">
          <li class="item ">
            <p>05-09</p>
            <i>周三</i>
          </li>
          <li class="item ">
            <p>05-09</p>
            <i>周三</i>
          </li>
          <li class="item current">
            <p>05-09</p>
            <i>周三</i>
          </li>
          <li class="item ">
            <p>05-09</p>
            <i>周三</i>
          </li>
          <li class="item ">
            <p>05-09</p>
            <i>周三</i>
          </li>
          <li class="item ">
            <p>05-09</p>
            <i>周三</i>
          </li>
          <li class="item ">
            <p>05-09</p>
            <i>周三</i>
          </li>
        </ul>
        <div class="arrowR"></div>
      </div>
      <div class="filter">
        <dl class="leave-time">
          <dt>出发时段</dt>
          <dd class="shrink">
            <div class="unlimited selected">
              <label>
                <input type="checkbox">
                <span>不限</span>
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="1">
                <span>凌晨 (00:00-06:00)</span>
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="2">
                <span>上午 (06:00-12:00)</span>
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="3">
                <span>下午 (12:00-18:00)</span>
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="4">
                <span>晚上 (18:00-24:00)</span>
              </label>
            </div>
          </dd>
        </dl>
        <dl class="leave-station">
          <dt>出发车站</dt>
          <dd :class="{'shrink': leaveStation}">
            <div class="unlimited selected">
              <label>
                <input type="checkbox">
                <span>不限</span>
              </label>
            </div>
            <div v-for="i in 10" :key="'first' + i">
              <label title="广州东圃汽车客运站">
                <input type="checkbox" value="广州东圃汽车客运站">
                <span>广州东圃汽车客运站</span>
              </label>
            </div>
            <a class="more" @click="leaveStation = !leaveStation">
              {{leaveStation? '更多' : '收起'}}
            </a>
          </dd>
        </dl>
        <dl class="arrive-station">
          <dt>到达车站</dt>
          <dd :class="{'shrink': arriveStation}">
            <div class="unlimited selected">
              <label>
                <input type="checkbox">
                不限
              </label>
            </div>
            <div v-for="i in 10" :key="'second' + i">
              <label title="广州东圃汽车客运站">
                <input type="checkbox" value="广州东圃汽车客运站">
                <span>广州东圃汽车客运站</span>
              </label>
            </div>
            <a class="more" @click="arriveStation = !arriveStation">
              {{arriveStation? '更多' : '收起'}}
            </a>
          </dd>
        </dl>
        <template v-if="showAssistant">
          <dl class="passenger">
            <dt>乘车人</dt>
            <dd>
              <div class="unlimited">
                <label>
                  选择
                </label>
              </div>
              <div>
                <label>
                  <span v-for="i in 5" :key="'span' + i">
                    G66
                    <i>×</i>
                  </span>
                </label>
              </div>
            </dd>
          </dl>
          <dl class="priority">
            <dt>优先车次</dt>
            <dd>
              <div class="unlimited">
                <label>
                  选择
                </label>
              </div>
              <div>
                <label>
                  <span v-for="i in 5" :key="'span' + i">
                    G66
                    <i>×</i>
                  </span>
                </label>
              </div>
            </dd>
          </dl>
          <dl class="alternative">
            <dt>备选日期</dt>
            <dd>
              <div class="unlimited">
                <label>
                  选择
                </label>
              </div>
              <div>
                <label>
                  <span v-for="i in 5" :key="'span' + i">
                    2018-05-12
                    <i>×</i>
                  </span>
                </label>
              </div>
            </dd>
          </dl>
          <dl class="advanced">
            <dt>高级设置</dt>
            <dd>
              <div>
                <label title="勾选本选项并点击查询后，网站将自动查询符合设定条件的车票信息，如有符合条件的车次，将自动提交订单信息">
                  <input type="checkbox" value="自动提交">
                  <span>自动提交</span>
                </label>
                <label title="如果网站查询同一车次只有部分符合您设定条件的车票时，将按您设定的乘车人顺序进行提交">
                  <input type="checkbox" value="余票不足时部分提交">
                  <span>余票不足时部分提交</span>
                </label>
                <label>
                  <a class="small-btn">清空所有选项</a>
                </label>
              </div>
            </dd>
          </dl>
        </template>
        <div class="assistant" @click="showAssistant = !showAssistant">
              <a :class="{'down': showAssistant}">订票助手</a>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="title">
          <p class="go-time">
            发车时间
            <span>
              <i class="positive" :class="{'selected': positive}" @click="positive = true"></i>
              <i class="reverse" :class="{'selected': !positive}" @click="positive = false"></i>
            </span>
          </p>
          <p class="leave-arrive">
            出发/到达
          </p>
          <p class="bus-type">参考车型 / 车次</p>
          <p class="price">票价</p>
        </div>
        <ul class="list">
          <li class="row" v-for="n in pageMsg.liNumber" :key="'row' + n">
            <div class="dp-time">{{ pageMsg.currentPage > 3 ? '' : '0'}}{{ 6 + pageMsg.currentPage }}:20</div>
            <div class="station">
              <p class="start">广州海珠客运站</p>
              <p class="end">湛江</p>
            </div>
            <div class="bus-type">
              <div class="type">客车 / G66</div>
              <p>
                <span>过路车</span>
                <span>固定班</span>
              </p>
            </div>
            <div class="price">
              <span>
                &yen;
                <i>130</i>
              </span>
            </div>
            <div class="book">
              <a class="btn">预定</a>
              <p class="remaining">剩余33张</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="pages-wrapper">
        <VuejsPaginate :page-count="pageMsg.countPage"
                       :prevText="'上页'"
                       :nextText="'下页'"
                       :page-range="3"
                       :click-handler="showPage"
                       :containerClass="'pages-ul'"
                       :page-class="'page-li'"
                       :prev-class="'prev-li'"
                       :next-class="'next-li'"
                       :active-class="'active-li'"
                       :disabled-class="'disabled-li'"
                       :break-view-class="'break'"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VuejsPaginate from 'vuejs-paginate'
export default {
  name: 'bus-list',
  data () {
    return {
      showTest: this.$route.query,
      leaveStation: true,
      arriveStation: true,
      positive: true,
      showAssistant: false,
      pageMsg: {
        currentPage: 1, // 当前页
        countPage: 10, // 总页数
        liNumber: 8 // 每页显示内容数量
      }
    }
  },
  methods: {
    showPage (page) {
      this.pageMsg.currentPage = page
    }
  },
  components: {
    VuejsPaginate
  }
}
</script>
<style lang="stylus" scoped>
#bus-list
  .main
    width 980px
    margin 0 auto
    padding-top 15px
    overflow hidden
    .search
      display flex
      padding 15px 20px
      margin-bottom 30px
      background-color #f3f3f3
      border-radius 2px
      outline 0
      .input-wrapper
        border 1px solid #ccc
        border-radius 2px
        font-size 16px
        padding 4px 0
        background-color #fff
        outline 0
        .label
          display inline-block
          border-right 1px solid #ccc
          padding 0 10px
          vertical-align middle
          color #999
          line-height 30px
          cursor default
          outline 0
        input
          display inline-block
          max-width 155px
          height 30px
          line-height 30px
          padding 0 15px
          border 0
          font-size 15px
          vertical-align middle
          outline none
      .exchange
        margin 0 20px
        outline 0
        vertical-align middle
        &:after, &:before
          content '.'
          color transparent
          display inline-block
          width 13px
          height 13px
          position relative
          top 10px
          border-top 2px solid #ccc
          border-left 2px solid #ccc
          transform rotate(-45deg)
        &:after
          transform rotate(135deg)
        span
          display inline-block
          position relative
          top 7px
          width 26px
          height 26px
          line-height 26px
          font-size 16px
          text-align center
          border-radius 3px
          background-color #01c77c
          vertical-align middle
          color #fff
          cursor pointer
          outline 0
      .date
        margin-left 30px
      .search-btn
        width 55px
        margin-left 10px
        background-color #fe5342
        border 0
        color #fff
        font-size 16px
        padding 0 5px
        border-radius 3px
        cursor pointer
        outline 0
    .msg-wrapper
      width 980px
      .change-date
        border 1px solid #f0f0f0
        border-bottom 0
        display flex
        height 62px
        line-height 21px
        .arrowL, .arrowR
          width 40px
          cursor pointer
          position relative
          border-bottom 1px solid #01c77c
          outline 0
        .arrowL:before, .arrowR:before
          content ""
          display block
          position absolute
          border 10px solid transparent
          top 50%
          margin-top -10px
        .arrowL
          &:before
            border-right 10px solid #01c77c
          &.limite:before
            border-right-color #ccc
        .arrowR
          &:before
            border-left 10px solid #01c77c
            right 0
          &.limite:before
            border-left-color #ccc
        .items
          background-color #f3f3f3
          display flex
          flex 1
          .item
            flex 1
            height 46px
            line-height 21px
            border-right 1px solid #dcdcdc
            text-align center
            padding 8px 0 6px
            cursor pointer
            border-bottom 1px solid #01c77c
            p
              font-size 15px
              height 22px
              line-height 22px
            i
              font-size 16px
          .current
            background-color #fff
            border 1px solid #01c77c!important
            border-bottom-color #fff!important
      .filter
        position relative
        margin-top 20px
        padding 20px
        border 1px solid #dfdfdf
        font-size 14px
        &>dl
          position relative
          display flex
          margin-bottom 10px
          &:nth-of-type(n+4)
            margin-bottom 0
          &>dt
            font-size 15px
            width 120px
            height 30px
            line-height 30px
          &>dd
            display flex
            flex-wrap wrap
            flex 1
            line-height 30px
            &>div
              width 154px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              &>label
                input
                  margin 0
                  height 15px
                  width 15px
                  margin-right 2px
                  vertical-align middle
                span
                  vertical-align middle
            .unlimited
              position absolute
              left 70px
              width 64px
              transform scale(.8)
              transform-origin left
              &>label
                border-radius 3px
                padding 2px 4px
                vertical-align middle
                input
                  position absolute
                  opacity 0
                  width 0
                  height 0
                span
                  vertical-align middle
            .selected>label
              color #fff
              background-color #01c77c
            .more
              position absolute
              right 0
              top 1px
              color #30a5f4
              font-size 14px
              width 40px
              cursor pointer
              &:after
                content ""
                position absolute
                right -1px
                top 13px
                display block
                width 8px
                height 8px
                border-top 1px solid #30a5f4
                border-right 1px solid #30a5f4
                transform rotate(-45deg)
                transition transform .2s
          .shrink
            height 30px
            overflow hidden
            .more:after
              top 8px
              transform rotate(135deg)
        dl.passenger,
        dl.priority,
        dl.alternative
          dd
            div
              overflow visible
            div.unlimited>label
              border 1px solid #6e6e6e
              background #6e6e6e
              color #fff
              text-align center
              border-radius 3px
              padding 2px 4px
              vertical-align middle
              cursor pointer
              user-select none
              &:hover
                background #292929
                border 1px solid #292929
            div:nth-of-type(n+2)>label>span
              display inline-block
              width 100px
              height 18px
              line-height 18px
              overflow hidden
              border 1px solid #cfcdc7
              margin-right 15px
              text-align center
              vertical-align middle
              background #eef1f8
              font-size 12px
              i
                display block
                float right
                width 14px
                height 14px
                line-height 14px
                font-size 18px
                margin-top 2px
                margin-right 2px
                border-radius 50%
                background-color #999999
                color #fff
                cursor pointer
                &:hover
                  background-color #0e0e0e
        dl.advanced
          dd>div
            width auto
            overflow visible
            text-overflow clip
            white-space normal
            label
              margin-right 20px
              .small-btn
                display inline-block
                height 18px
                line-height 18px
                font-size 12px
                border 1px solid #6e6e6e
                background #6e6e6e
                color #fff
                text-align center
                border-radius 3px
                vertical-align middle
                cursor pointer
                user-select none
                &:hover
                  background #292929
                  border 1px solid #292929
        div.assistant
          position absolute
          display block
          bottom 1px
          right 1px
          width 80px
          height 22px
          line-height 22px
          cursor pointer
          a
            display block
            height 22px
            line-height 22px
            color #fff
            background-color #FF7F00
            padding-left 10px
            &:after
              content ""
              position absolute
              right 2px
              top 8px
              display block
              width 0
              height 0
              border 6px solid transparent
              border-top 6px solid #fff
              transition transform .2s
            &.down:after
              top 2px
              transform rotate(180deg)
      .list-wrapper
        margin-top 20px
        margin-bottom 40px
        .title
          display flex
          font-size 15px
          background-color #f3f3f3
          line-height 40px
          color #7e7e7e
          p.go-time
            position relative
            display block
            width 120px
            text-align center
            font-size 15px
            background-color #f3f3f3
            line-height 40px
            color #7e7e7e
            span
              position absolute
              top 6px
              right 14px
              .positive, .reverse
                display block
                margin-bottom 3px
                border 6px solid transparent
                cursor pointer
              .positive
                border-bottom-color #ccc
                &.selected
                  border-bottom-color #01c77c
              .reverse
                border-top-color #ccc
                margin-bottom 0
                &.selected
                  border-top-color #01c77c
          p.leave-arrive
            width 194px
          p.bus-type
            width 230px
        .list
          .row
            display flex
            font-size 15px
            padding 18px 0 16px
            border-bottom 1px solid #eaeaea
            align-items center
            .dp-time
              width 120px
              font-size 28px
              text-align center
            .station
              width 170px
              padding-left 24px
              .start:before, .end:before
                content "\59CB"
                position absolute
                top 50%
                left -20px
                margin-top -7px
                display block
                width 14px
                height 14px
                line-height 14px
                font-size 12px
                text-align center
                color #fff
                background-color #58b8ea
                border-radius 2px
                padding-left 1px
              .start
                position relative
                margin-bottom 28px
              .end
                position relative
                &:before
                  content "\7EC8"
                  background-color #56d7ae
            .bus-type
              width 230px
              .type
                margin-bottom 28px
              p>span
                position relative
                top -5px
                padding 2px 6px
                border 1px solid #01c77c
                border-radius 3px
                font-size 12px
                color #01c77c
            .price
              font-size 13px
              width 140px
              color #fe5342
              span>i
                font-size 26px
            .book
              position relative
              flex 1
              text-align center
              a.btn
                display block
                border 0
                margin 0 auto
                color #fff
                background-color #fe5342
                border-radius 2px
                width 90px
                line-height 30px
                font-size 16px
                cursor pointer
              p.remaining
                color #fe5342
                text-align center
                font-size 13px
                position absolute
                width 100%
                top 34px
</style>
<style lang="stylus">
#bus-list>.main>.msg-wrapper>
  .pages-wrapper
    .pages-ul
      display flex
      float right
      height auto
      border-radius 4px
      color #fff
      margin-bottom 20px
      font-size 16px
      vertical-align middle
      li
        display inline-block
        color #337ab7
        margin-left -1px
        border 1px solid #ddd
        text-align center
        a
          display inline-block
          height 26px
          line-height 26px
          padding 6px 12px
          outline 0
          user-select none
      .disabled-li
        a
          cursor not-allowed
          color #c9c9c9
      .active-li
        border-color #337ab7
        a
          color #fff
          border-color #337ab7
          background-color #337ab7
</style>
