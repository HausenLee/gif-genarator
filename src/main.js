import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui';
import StoreOptions from './store/index'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex)
const store = new Vuex.Store(StoreOptions)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
