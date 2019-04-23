import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from '../static/routers'
import VueResource from 'vue-resource'
import axios from 'axios'
import '../static/css/app.css'
import '../static/iconfont/css/iconfont.css'

Vue.use(VueRouter);
Vue.prototype.$axios=axios;
Vue.use(VueResource);

const router=new VueRouter({
	routes,
	mode:'history'
})
new Vue({  el: '#app',
  router,
  render: h => h(App)
})
