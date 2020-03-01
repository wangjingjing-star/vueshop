import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css' //样式初始化
import './assets/fonts/iconfont.css' //导入阿里图标
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'

//配置请求的路径
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config=>{
  // console.log(config)
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http=axios
Vue.component('tree-table',TreeTable )

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
