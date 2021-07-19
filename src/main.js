import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './assets/font icons/fonts.css';
import './styles/index.scss';

import dialog from '@/components/dialog';

Vue.component('tw-dialog', dialog)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
