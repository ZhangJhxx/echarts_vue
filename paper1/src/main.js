import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as echarts from 'echarts'
import './assets/style/reset.css'
import './assets/style/global.less'
import './assets/icon/iconfont.css'
import 'bootstrap'
import $ from 'jquery'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload);

//全局挂载axios
axios.defaults.baseURL = 'http://39.105.153.28:8080/'
Vue.prototype.echarts = echarts;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')