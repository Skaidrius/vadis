import Vue from 'vue';
// import App from './App.vue';
// import Demand from './components/ias-demand.vue';
import FrontPage from './components/front-page.vue';

import RiskSelection from './components/risk/risk-selection.vue';
import RiskTableSelections from './components/risk/risk-table-selections.vue';
import RiskTable from './components/risk/risk-table.vue';

import Demand from './components/demand/demand.vue';
import DemandTable from './components/demand/demand-table.vue';
import DemandTableSelections from './components/demand/demand-table-selections.vue';

import Recommendations from './components/recs/recommendations.vue';

import ActualRec from './components/recs/recommendations.vue';
import LateRec from './components/recs/recommendations.vue';
import ImpledRec from './components/recs/recommendations.vue';
import SearchRec  from './components/recs/recommendations.vue';
import AddNewRec from './components/recs/recommendations.vue';

const App = Vue.extend(require('./App.vue'));

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

global.jQuery = require('jquery');
require("bootstrap-webpack");

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/main', component: FrontPage },
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
        path: 'demand-table-selections', component: DemandTableSelections
      }]
    },
    { path: '/recommendations', component: Recommendations,
      children: [{ 
        path: '', component: ActualRec, 
      },{ 
        path: 'actual', component: ActualRec 
      }, { 
        path: 'late', component: LateRec 
      }, { 
        path: 'implemented', component: ImpledRec
      }, { 
        path: 'search', component: SearchRec 
      }, { 
        path: 'add', component: AddNewRec
      }]
    },
    { path: '*', redirect: '/main' }
    
  ],
});

// Pointing routes to the components they should use
// Any invalid route will redirect to home

new App({
  router,
}).$mount('#app');
