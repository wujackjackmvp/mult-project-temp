import Vue from 'vue'
import App from './App.vue'
import VueStorage from "vue-ls";
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import config from "./config/index";
import './permission'
import './assets/style.css'
Vue.use(VueStorage, config.storageOptions);



/** 注册类 */
import filter from "./utils/filter/index";
import vaild from "./utils/vaild/index";
import $bus from "./utils/$bus";
import mixins from "./utils/mixins";
import api from "./utils/api";
import ajax from "./utils/ajax";

Vue.prototype.api = api;
Vue.prototype.ajax = ajax;

Vue.prototype.$bus = new $bus();
Vue.use(filter);
Vue.use(vaild);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mixins: [mixins],
  render: h => h(App)
}).$mount('#app')
