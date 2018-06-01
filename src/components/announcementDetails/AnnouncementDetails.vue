<template>
<div class="container">
  <div class="container-title">
    <h1 class="title">{{setTitle()}}</h1>
    <p>发布时间 : {{$route.query.date}}</p>
  </div>
  <div v-html="article">
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      initData: [
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
      article: `
      <ul class=" list-paddingleft-2" style="width: 1537.09px; padding: 0px; white-space: normal; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 12px; background-color: rgb(255, 255, 255);">
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <h3 style="margin: 0px 0px 6px; padding: 0px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102);">
                <span style="font-size: 16px;">可以直接退票或改签吗？</span>
            </h3>
            <p>
                <span style="font-size: 16px;">暂不支持网上退票及改签，您需在先去车站换取纸质车票再前往窗口办理退改签。</span>
            </p>
        </li>
        <li>
            <h3 style="margin: 0px 0px 6px; padding: 0px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102);">
                <span style="font-size: 16px;">车站退改签要收取多少手续费？</span>
            </h3>
            <p>
                <span style="font-size: 16px;">一般情况下，离开车时间2小时前办理退改签，按票面额10%收取手续费；班车离开车时间2小时以内办理退改签，按票面额20%收取手续费；班车开车后1小时内办理退改签，按票面额50%收取手续费；班车开车1小时后不办理退改签。由于每个汽车站的规定不同，具体要以乘车站规定为准</span>
            </p>
        </li>
    </ul>
    <p>
        <a href="https://www.ly.com/newhelp/questionlist/15-2-940.html" class="more_btn" style="color: rgb(35, 190, 174); text-decoration: underline; outline: 0px; float: right; margin-right: 30px; width: 5px; height: 9px; display: inline-block; margin-left: 6px; background: url(&quot;//pic5.40017.cn/02/001/83/e0/rBLkCFj4X46Aeos2AAAEE-1FlrI356.png&quot;) 0px 0px no-repeat; font-size: 16px;"><span style="width: 5px; height: 9px; display: inline-block; margin-left: 6px; background: url(&quot;//pic5.40017.cn/02/001/83/e0/rBLkCFj4X46Aeos2AAAEE-1FlrI356.png&quot;) 0px 0px no-repeat; font-size: 16px;"></span></a>
    </p>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                <span style="position: absolute; bottom: 44px; right: 18px; color: rgb(102, 102, 102); font-size: 16px;">...</span>
            </p>
        </li>
        <li>
            <h3 style="margin: 0px 0px 6px; padding: 0px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102);">
                <span style="font-size: 16px;">订票时选错了出发日期/车票数量，可以退票或改签吗？</span>
            </h3>
            <p>
                <span style="font-size: 16px;">您可以先去车站将订错的车票取出来，然后前往人工窗口办理退票或改签，车站会收取部分手续费。</span>
            </p>
        </li>
        <li>
            <h3 style="margin: 0px 0px 6px; padding: 0px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102);">
                <span style="font-size: 16px;">一张订单包含3张车票，其中1张需要退票/改签，该如何操作？</span>
            </h3>
            <p>
                <span style="font-size: 16px;">您可以前往车站将3张车票一并取出，然后将需要退票/改签的车票拿到人工窗口办理。</span>
            </p>
        </li>
        <li>
            <h3 style="margin: 0px 0px 6px; padding: 0px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102);">
                <span style="font-size: 16px;">订单出票失败了，需要我发起退款申请吗？</span>
            </h3>
            <p>
                <span style="font-size: 16px;">订单出票失败后会自动变更为退款订单，系统会在3个工作日内自动办理原路退款，无需您主动发起退款申请，您可以实时查看订单状态了解退款进度，退款成功后系统会给您发送短信通知，请您留意查收。</span>
            </p>
        </li>
        <li>
            <h3 style="margin: 0px 0px 6px; padding: 0px; font-size: 14px; line-height: 22px; color: rgb(102, 102, 102);">
                <span style="font-size: 16px;">到车站退票，为什么我没有直接拿到退款？</span>
            </h3>
            <p>
                <span style="font-size: 16px;">部分车站退票需原支付渠道退款，您至始发站办理退票时若车站只同意退票未给予退款，请在3个工作日内联系客服核实并完成退款</span>
            </p>
            <p>
                <br/>
            </p>
        </li>
    </ul>
</ul>`
    }
  },
  methods: {
    setTitle () {
      let t = this.$route.query.title
      return `${t}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 980px
  margin 0 auto
  overflow hidden
  .container-title
    padding 20px 10px
    text-align center
    h1
      font-size 2em
      padding 10px 0
</style>
