import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dayjs from "dayjs"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import router from './route'
import App from './App.vue'
import store from './store'
import { VueJsonp  } from 'vue-jsonp'
// 配置dayjs，是Vue上带有这个属性值
Vue.prototype.dayjs = dayjs;

Vue.use(VueRouter)
Vue.use(VueJsonp)
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
// 资源用途
Vue.prototype.rFunctions = [
  {
      value: '1',
      label: '教学'
  }, 
  {
      value: '2',
      label: '讲座'
  }, 
  {
      value: '3',
      label: '会议'
  }, 
  {
      value: '4',
      label: '活动'
  }, 
  {
      value: '5',
      label: '录播'
  }, 
  {
      value: '6',
      label: '直播'
  },
],
// 资源类型
Vue.prototype.rType = [
  {
      value: '1',
      label: '智慧教室'
  }, {
      value: '2',
      label: '录播室'
  }, {
      value: '3',
      label: '研讨教室'
  }, {
      value: '4',
      label: '投影教室'
  }, {
      value: '5',
      label: '非投影教室'
  }
]
// 时间节次对应
Vue.prototype.sectionTime = [
  {
      value: '1',
      label: '第一大节',
      disabled: false,
      startTime:'08:00:00',
      endTime:'10:00:00'
  },
  {
      value: '2',
      label: '第二大节',
      disabled: false,
      startTime:'10:00:00',
      endTime:'12:00:00'
  },
  {
      value: '3',
      label: '第三大节',
      disabled: false,
      startTime:'14:00:00',
      endTime:'16:00:00'
  },
  {
      value: '4',
      label: '第四大节',
      disabled: false,
      startTime:'16:00:00',
      endTime:'18:00:00'

  },
  {
      value: '5',
      label: '第五大节',
      disabled: false,
      startTime:'19:00:00',
      endTime:'21:00:00'
  }
]
// 使用状态对应
Vue.prototype.resourceUseStatusList = [
    {
        key:0,
        value:'未使用',
        type:'info'
    },
    {
        key:1,
        value:'使用中',
        type:'primary'
    },
    {
        key:2,
        value:'已使用',
        type:'success'
    }
]
new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
