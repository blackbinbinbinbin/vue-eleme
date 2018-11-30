import Vue from 'vue/dist/vue.js';
import './cube-ui';
import App from './App.vue';
import VueRouter from 'vue-router';
import Goods from 'components/goods/goods.vue';
import Ratings from 'components/ratings/ratings.vue';
import Seller from 'components/seller/seller.vue';
// stylus
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

// router
Vue.use(VueRouter);
const routes = [
  { path: '/goods', component: Goods },
  { path: '/rating', component: Ratings },
  { path: '/seller', component: Seller }
]
const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
