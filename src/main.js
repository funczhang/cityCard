// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
// import $ from 'jquery'
import 'weui'
import './assets/css/style.css'
// import './assets/js/jquery-weui.min.js'
import './assets/css/jquery-weui.css'
import './assets/js/scale.js'
// import './assets/css/animate.css'
import ElementUI from 'element-ui'
// import './assets/js/jquery-weui.min'
Vue.config.productionTip = false
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})