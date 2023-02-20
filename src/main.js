import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AppMain from './components/app-main'
import './plugins/element.js'
import '../src/assets/style/cssReset.css'
import '../src/assets/fonts/iconfont.css'
import '../src/assets/font_exit/iconfont.css'
import '../src/assets/font_exit1/iconfont.css'
import '../src/assets/font-exit2/iconfont.css'
// 工具类utils
import DateTools from './utils/Datetools.js'
import RulesTools from './utils/Rulestools.js'
import Tools from './utils/Tools'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$videos = Video
Vue.prototype.DateTools = DateTools
Vue.prototype.RulesTools = RulesTools
Vue.prototype.Tools = Tools
Vue.component('AppMain', AppMain)
Vue.config.productionTip = false
const axios = require('axios')
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true
axios.defaults.timeout = 60000

function http (method, url, params) {
  return axios({
    method: method,
    url: url,
    data: params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: sessionStorage.getItem('Authorization')
    }
  }).then((res) => {
    return res.data.data
  }).catch((e) => {
    console.log(e)
  })
}

Vue.prototype.$http = http

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
