// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.axios = axios

document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
