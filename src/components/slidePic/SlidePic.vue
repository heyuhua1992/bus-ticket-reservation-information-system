<template>
<div id="slide-pic">
  <!-- 制作一个框架包裹slider -->
  <div class="slide-pic-container">
    <!-- 配置slider组件 -->
    <slider :pages="pages" :sliderinit="sliderinit">
      <!-- 设置loading,可自定义 -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
</div>
</template>

<script>
import slider from 'vue-concise-slider'
export default {
  name: 'slide-pic',
  props: {
    allPage: {
      type: Object,
      default: () => {
        return {
          pageArr: [
            // {
            //   png: require('./png/advertising/1.png'),
            //   href: '/'
            // }
          ],
          num: 0
        }
      }
    }
  },
  data () {
    return {
      pages: this.createPage(),
      // Sliding configuration [obj]
      sliderinit: {
        currentPage: 0, // 当前页码
        thresholdDistance: 80, // 滑动判定距离
        thresholdTime: 1000, // 滑动判定时间
        autoplay: 5000, // 自动滚动[ms]
        loop: true, // 循环滚动
        direction: 'horizontal', // 方向设置，垂直滚动 vertical
        infinite: 1, // 无限滚动前后遍历数
        slidesToScroll: 1, // 每次滑动项数
        timingFunction: 'ease', // 滑动方式
        duration: 300 // 滑动持续时间[ms]
      }
    }
  },
  methods: {
    createPage () {
      let arr = []
      for (let i = 1; i <= this.allPage.num; i++) {
        let png = this.allPage.pageArr[i - 1].png
        let _href = this.allPage.pageArr[i - 1].href
        let href = `<a href="${_href}" style="font-size: 16px; position: absolute; top: 10px; right: 10px; color: #ffce33">
                      更多
                    </a>`
        arr.push({
          html: `<div>${href}</div>`,
          style: {
            'backgroundImage': `url(${png})`
          }
        })
      }
      arr.push({
        html: `<div>广告招租</div>`,
        style: {
          'background': '#4bbfc3'
        }
      })
      return arr
    }
  },
  components: {
    slider
  }
}
</script>

<style lang="stylus" scoped>
#slide-pic
  width 100%
  height 100%
  .slide-pic-container
    width 100%
    height 100%
</style>
