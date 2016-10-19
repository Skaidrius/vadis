import Vue from 'vue';
// import App from './App.vue';
// import Demand from './components/ias-demand.vue';
import RiskSelection from './components/risk-selection.vue';
import Demand from './components/demand-table.vue';

const App = Vue.extend(require('./App.vue'));

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // { path: '/ias-demand', component: Demand },
    { path: '/risk-selection', component: RiskSelection },
    { path: '/demand', component: Demand },
    { path: '*', redirect: '/demand' },
  ],
});

// Pointing routes to the components they should use
// Any invalid route will redirect to home

new App({
  router,
}).$mount('#app');
