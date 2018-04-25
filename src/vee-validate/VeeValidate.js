import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

Validator.localize('zhCN', zhCN)

const config = {
  events: 'input|blur' // 失去焦点才触发验证
}
Vue.use(VeeValidate, config)
/*
{{ fields }}
touched：表示该字段已被触摸或聚焦。
untouched：表示该字段没有被触及也没有关注。
dirty：表示该字段已被操纵。
pristine：表示该字段尚未被操纵。
valid：表示该字段已被验证至少一次，并且通过验证。
invalid：表示该字段已被验证至少一次，并且验证失败。
#
#
after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
alpha - 只包含英文字符
alpha_dash - 可以包含英文、数字、下划线、破折号
alpha_num - 可以包含英文和数字
before:{target} - 和after相反
between:{min},{max} - 在min和max之间的数字
confirmed:{target} - 必须和target一样
date_between:{min,max} - 日期在min和max之间
date_format:{format} - 合法的format格式化日期
decimal:{decimals?} - 数字，而且是decimals进制
digits:{length} - 长度为length的数字
dimensions:{width},{height} - 符合宽高规定的图片
email - 不解释
ext:[extensions] - 后缀名
image - 图片
in:[list] - 包含在数组list内的值
ip - ipv4地址
max:{length} - 最大长度为length的字符
mimes:[list] - 文件类型
min - max相反
mot_in - in相反
numeric - 只允许数字
regex:{pattern} - 值必须符合正则pattern
required - 不解释
size:{kb} - 文件大小不超过
url:{domain?} - (指定域名的)url
 */
