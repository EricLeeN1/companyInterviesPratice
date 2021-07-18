import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import 'normalize.css' // a modern alternative to CSS resets
import './assets/font icons/fonts.css';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
