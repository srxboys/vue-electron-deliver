import Vue from 'vue'
import App from './App.vue'

// import { sync } from 'vuex-router-sync'
import store from './store' // vuex store 实例
import router from './router' // vue-router 实例

// const unsync = sync(store, router) // 返回值是 unsync 回调方法

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
