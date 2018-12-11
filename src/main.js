// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import home from './home'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  components: { home },
  template: '<home/>'
});

