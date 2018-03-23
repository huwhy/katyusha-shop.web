// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from '@/axios'
import wx from 'weixin-js-sdk'
import store from '@/vuex'
import router from '@/router'
import 'lib-flexible'
import VueLazyLoad from 'vue-lazyload'
import Footer from '@/components/footer.vue'
import Slider from '@/components/Slider'
import MyScroll from '@/components/Scroll/scroll'
import Message from '@/components/Message'
import Layout from '@/components/Layout'
import Layout2 from '@/components/Layout/scroll-layout'
// import qs from 'qs'

Vue.config.productionTip = false
Vue.component('v-footer', Footer)
Vue.component('v-slider', Slider)
Vue.component('v-scroll', MyScroll)
Vue.component('message', Message)
Vue.component('v-layout', Layout)
Vue.component('v-layout2', Layout2)

/* title, desc, link, img */
Vue.prototype.wxShare = function (option) {
  console.log('wx share: ', option)
  Promise.all(
    [
      new Promise((resolve) => {
        if (this.$store.getters.mid === 0) {
          axios.get('/api/mid', {params: {mid: 1}}).then((res) => {
            let mid = res.data.data
            store.dispatch('SET_MID', mid).then((res) => {
              resolve()
            })
          })
        } else {
          resolve()
        }
      })
    ]).then((res) => {
    let link = 'https://' + window.location.host
    if (option.link) {
      link += option.link
    }
    if (link.indexOf('?') > 0) {
      link += '&mid=' + this.$store.getters.mid
    } else {
      link += '?mid=' + this.$store.getters.mid
    }
    option = {
      title: option.title || '好用商品尽在此',
      desc: option.desc || '不做无味的转发，只为热爱而分享',
      link: link,
      img: option.img || 'http://img.beeshop.vip/mifengyouhuo/icon.jpeg@300h_300w_1e_1c.src'
    }
    console.log(option.link)
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: option.title,
        link: option.link,
        imgUrl: option.img,
        success: function () {
          console.log('分享朋友圈成功')
        },
        cancel: function () {
          console.log('取消朋友圈分享')
        }
      })
      wx.onMenuShareAppMessage({
        title: option.title,
        desc: option.desc,
        link: option.link,
        imgUrl: option.img,
        success: function () {
          console.log('分享朋友成功')
        },
        cancel: function () {
          console.log('取消朋友分享')
        }
      })
    })
  })
}

Vue.prototype.getCurURL = function () {
  let link = 'https://' + window.location.host + this.$route.path
  let queryParas = Object.keys(this.$route.query)
  if (queryParas.length > 0) {
    link += '?'
    let tm = ''
    for (let key of queryParas) {
      if (key !== 'mid') {
        link += tm + key + '=' + this.$route.query[key]
        tm = '&'
      }
    }
  }
  return link
}

Vue.prototype.getCurPath = function () {
  let link = this.$route.path
  let queryParas = Object.keys(this.$route.query)
  if (queryParas.length > 0) {
    link += '?'
    let tm = ''
    for (let key of queryParas) {
      if (key !== 'mid') {
        link += tm + key + '=' + this.$route.query[key]
        tm = '&'
      }
    }
  }
  return link
}

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  error: 'http://img.beeshop.vip/mifengyouhuo/mifengyouhuo.png',
  loading: 'http://img.beeshop.vip/mifengyouhuo/mifengyouhuo.png'
})
axios.get('/api/member/login').then(res => {
})

/* 微信分享方法 */
axios.get('/api/mp/js-sign').then(res => {
  let json = res.data
  let sign = json.data
  var wxConfig = {
    debug: false,
    appId: sign.appId,
    timestamp: sign.timestamp,
    nonceStr: sign.nonce,
    signature: sign.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
  }
  wx.config(wxConfig)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
