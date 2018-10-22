// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/index.scss'
import ElementUI from 'element-ui'
import fastclick from 'fastclick'

Vue.config.productionTip = false


Vue.use(ElementUI);

fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
