import Vue from 'vue';
// import App from './App.vue';
// import Demand from './components/ias-demand.vue';
import FrontPage from './components/front-page.vue';
import RiskSelection from './components/risk-selection.vue';
import RiskTableSelections from './components/risk-table-selections.vue';
import RiskTable from './components/risk-table.vue';
import Demand from './components/demand.vue';
import DemandTable from './components/demand-table.vue';
import DemandTableLegend from './components/demand-table-legend.vue';

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
    { path: '/front', component: FrontPage },
    { path: '/risk', component: RiskSelection, 
      children: [{ 
        path: '', component: RiskTable
      }, {
        path: 'risk-table', component: RiskTable
      }, {
        path: 'risk-table-selections', component: RiskTableSelections
      }]
    },
    { path: '/demand', component: Demand,
      children: [{ 
        path: '', component: DemandTable 
      }, { 
        path: 'demand-table', component: DemandTable 
      }, { 
        path: 'demand-table-legend', component: DemandTableLegend 
      }]
    },
    { path: '*', redirect: '/demand' },
  ],
});

// Pointing routes to the components they should use
// Any invalid route will redirect to home

new App({
  router,
}).$mount('#app');
