import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import VueDragscroll from 'vue-dragscroll';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueDragscroll);
Vue.use(vClickOutside);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
