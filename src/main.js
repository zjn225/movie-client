import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'normalize.css/normalize.css'
import VueLazyload from 'vue-lazyload'  //引入图片懒加载插件

Vue.config.productionTip = false

Vue.use(iView);
Vue.use(VueLazyload, {
  error: require('assets/error.png'),
  loading: require('assets/loading.png'),
  attempt: 3
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})