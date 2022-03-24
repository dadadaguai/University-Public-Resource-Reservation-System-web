import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import transPxStr from './assets/Tools/fans' 
Vue.use(ElementUI)
// Vue.prototype.$transPxStr = transPxStr
Vue.config.productionTip = false
Vue.prototype.transPxStr = function(val){
  return val+'px'
}
new Vue({
  render: h => h(App),
}).$mount('#app')
