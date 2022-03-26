import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dayjs from "dayjs"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import router from './route'
import App from './App.vue'

// 配置dayjs，是Vue上带有这个属性值
Vue.prototype.dayjs = dayjs;

Vue.use(VueRouter)

// import transPxStr from './assets/Tools/fans' 
require('./mock')

Vue.use(ElementUI)

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
// Vue.prototype.$transPxStr = transPxStr
Vue.config.productionTip = false
Vue.prototype.transPxStr = function(val){
  return val+'px'
}
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
