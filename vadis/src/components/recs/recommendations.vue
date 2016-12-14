<template id='allRecommendations'>
  <div>
    <div class="jumbotron">
      <h2>{{ pageTitle.jumboHead[i18n] }}<br><small>{{ pageTitle.jumboSmall[i18n] }}</small></h2>

      <h4>{{pageTitle.todayIs[i18n]}} {{today}} </h4>
    </div>
    
    <nav class='container-fluid'>
      <ul class="my-tabs nav nav-pills">
        <router-link to="/recommendations/actual" class="active"><li class='col-xs-2'>{{ tables.activeRec[i18n] }}</li></router-link>
        <router-link to="/recommendations/late"><li class='col-xs-2'>{{ tables.lateRec[i18n] }}</li></router-link>
        <router-link to="/recommendations/implemented"><li class='col-xs-2'>{{ tables.impleRec[i18n] }}</li></router-link>
        <router-link to="/recommendations/search"><li class='col-xs-2'>{{ functions.search[i18n] }}</li></router-link>
        <router-link to="/recommendations/add"><li class='col-xs-2'>{{ functions.titles.addNew[i18n] }}</li></router-link>
      </ul>
      </nav>

    <div>
<!--</template>-->

<!--<template id='searchRecommendations'>-->
  <!--panel with search and search results-->
    <div class='panel panel-default' v-if='!editMode' > <!--  SEARCH-->
      <div >
        
        <div class="panel-body">
          <h2> {{ functions.search[i18n] }} </h2>
          <p>
            <input v-model="userInput" class="form-control" :placeholder="functions.search[i18n]"/>
          </p>
        </div>

        <div class='panel-heading'>
          <span v-if='userInput!== ""'> {{ tables.recSearchRes[i18n] }}</span>
        </div>
        
        <table v-if='userInput!== "" && filteredElements.length > 0' class='table table-hover table-striped table-bordered text-center' name='resultsTable'>
          <thead>
            <tr>
              <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>
                <span v-if='header == tableElements[4]'>
                  <a @click='sortByRate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else>
                  <span v-if='header == tableElements[6]'>
                    <a @click='sortByDate()'>{{ header[i18n] }}</a>
                  </span>
                  <span v-else>{{ header[i18n] }}</span>
                </span>
              </th>
              <th @click='sortByStatus()'><a>{{ functions.status.title[i18n] }}</a></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(data, index) in filteredElements'>
              <td>{{ index+1 }}.</td>
              <td v-for='(el, key) in data' v-show='key!=="actual"'>
                <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
                <span v-else>{{ el }}</span>
              </td>
              <td>{{ data.actual? functions.status.actual[i18n] : functions.status.implemented[i18n] }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if='userInput!== "" && filteredElements.length === 0' class='panel-footer'>{{ functions.noRes[i18n] }}</div>
      </div>
    </div>
<!--</template>-->

<!--<template id='activeRecommendations'>-->
    <!--active recommendations-->
    <div v-if='activeRecommendations' >
      <h2> {{ tables.activeRec[i18n] }} </h2>
      <table class='table table-hover table-striped table-bordered text-center'>
        <thead>
          <tr>
            <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>
              <span v-if='header == tableElements[4]'>
                  <a @click='sortByRate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else>
                  <span v-if='header == tableElements[6]'>
                    <a @click='sortByDate()'>{{ header[i18n] }}</a>
                  </span>
                  <span v-else>{{ header[i18n] }}</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(data, index) in activeRecommendations'>
            <td>{{ index+1 }}.</td>
            <td v-for='(el, key) in data' v-show='key!=="actual"'>
              <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
              <span v-else>{{ el }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

<!--</template>-->

<!--<template id='addNewRecommendation>-->

    <!--Add new recommendation-->
    <div class='panel panel-default'></div> 
      <div class='panel-heading'>{{ functions.titles.addNew[i18n] }}</div>
      <table class='table table-hover table-striped table-bordered table-condensed text-center'>
        <thead>
            <tr>
              <th class='col-xs-3'><input :placeholder="functions.report[i18n]" class='form-control'></th>
              <th class='col-xs-1'><input :placeholder="functions.recNo[i18n]" class='form-control'></th>
              <th class='col-xs-4'><input :placeholder="functions.content[i18n]" class='form-control'></th>
              <th class='col-xs-1'>
                <select class='form-control'>
                  <option selected disabled>{{ functions.recRate.title[i18n] }}</option>
                  <option v-for='rate in functions.recRate.values'>{{ rate[i18n] }}</option>
                </select>
              </th>
              <th class='col-xs-1'><input :placeholder="functions.measure[i18n]" class='form-control'></th>
              <th class='col-xs-1'><input :placeholder="functions.period[i18n]" class='form-control'></th>
              <th class='col-xs-1'><button class="form-control">{{ functions.addButton[i18n] }}</button></th>
            </tr>
          </thead>
      </table>
    </div>

<!--</template>-->
<!--<templateid="lateRecommendations">-->
    <!--Late recommedations table-->
    <div v-if='lateRecommendations' >
      <h2> {{ tables.lateRec[i18n] }} </h2>
      <table class='table table-hover table-striped table-bordered text-center'>
        <thead>
          <tr>
            <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>
              <span v-if='header == tableElements[4]'>
                  <a @click='sortByRate()'>{{ header[i18n] }}</a>
              </span>
              <span v-else>
                <span v-if='header == tableElements[6]'>
                  <a @click='sortByDate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else>{{ header[i18n] }}</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(data, index) in lateRecommendations'>
            <td>{{ index+1 }}.</td>
            <td v-for='(el, key) in data' v-show='key!=="actual"'>
              <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
              <span v-else>{{ el }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

<!--</template>-->
  
<!--<template id='impledRecommendations'>-->
    <!--implimented recommnendations-->
    <div v-if='impledRecommendations' >
      <h2> {{ tables.impleRec[i18n] }} </h2>
      <table class='table table-hover table-striped table-bordered text-center'>
        <thead>
          <tr>
            <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>
              <span v-if='header == tableElements[4]'>
                  <a @click='sortByRate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else>
                  <span v-if='header == tableElements[6]'>
                    <a @click='sortByDate()'>{{ header[i18n] }}</a>
                  </span>
                  <span v-else>{{ header[i18n] }}</span>
                </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(data, index) in impledRecommendations'>
            <td>{{ index+1 }}.</td>
            <td v-for='(el, key) in data' v-show='key!=="actual"'>
              <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
              <span v-else>{{ el }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    </div>
  </div>
</template>

<script>

const apiData = require('../../assets/recommend-table-data.json');
let userData = require('../../assets/default-data.json');

export default{
    data(){
      return {
        userInput: '',
        pageTitle:{
          jumboHead : {
            en: "Recommendations",
            lt: "Rekomendacijų" 
          },
          jumboSmall : {
            en: "Implementation",
            lt: "Įgyvendinimas"
          },
          todayIs : {
            en: "today is: ",
            lt: "šiandien yra: "
          }
        },
        sorted: true,
        tables: apiData.table.tables,
        functions: apiData.table.functions,
        recommendations: userData.recommendationsTable.tableElements,
        tableElements: apiData.table.header.elements
      };
    },
    props: ['i18n', 'editMode'],
    computed: {
      filteredElements: function () {
        return this.recommendations
          .filter(el => el.auditReport.toLowerCase().indexOf(this.userInput.toLowerCase()) >-1
        );
      },
      activeRecommendations: function (){ 
        let active = [];
        this.recommendations.map(function(e){
          if (e.actual) active.push(e);
        });
        return active;
      },
      rated: function (idx){
        return this.functions.recRates[idx][this.i18n];
      },
      // LACKS of checking whether it is implemented later than should be. Maybe needs 1 more criteria - implementation date - LATER WHEN BUTTON 'DONE' WILL BE IMPLEMENTED
      lateRecommendations: function () { 
        let late = [];
        this.recommendations.map(function(e){
          
          // TIMESTAMPS
          const todayTime = Date.now();
          const todayStamp = Math.floor(todayTime / 1000);
          const someTime = new Date(e["period"]).getTime();
          const getTimeStamp = Math.floor(someTime / 1000);
          
          // check whether is late (still active and period is earlear than today) 
          if (e.actual && (getTimeStamp < todayStamp)) {
            late.push(e);
          }
        }); 
        return late;
      },
      
      impledRecommendations: function () {
        let impled = [];
        this.recommendations.map(function(e){
          if (!e.actual) impled.push(e);
        });
        return impled;
      },

      today: function() {
        let i18n = this.i18n;
        let str = "";
    
        let td = new Date;
        let thisYear = td.getFullYear();
        let thisMonth = td.getMonth();
        let thisDay = td.getDate();
        let tempDay;
        
        const monthsLt = ["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"];
        const monthsEn = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        if (thisMonth < 10) thisMonth = "0" + thisMonth;
        if (thisDay < 10) thisDay = "0" + thisDay;
        
        if (i18n == 'lt'){
          // lithuanian date format
          str += thisYear + " m. " + monthsLt[thisMonth] + " " + thisDay + " d.";
        } else {
          // us date format 
          if (thisDay > 10 && thisDay < 14 ) {
            tempDay = thisDay + 'th';
          } else if (thisDay % 10 == 1) {
            tempDay = thisDay + 'st';
          } else if (thisDay % 10 == 2) {
            tempDay = thisDay + 'nd';
          } else if (thisDay % 10 == 3) {
            tempDay = thisDay + 'rd';
          } else {
            tempDay = thisDay + 'th';
          }
          str += tempDay + ' of ' + monthsEn[thisMonth] + ', ' + thisYear; 
        }
        return str;
      }

    },
    methods: {
      sortByRate: function(el){ //currently sorts middle/high by letter h l m, not by value l=1, m = 2, h = 3
        this.sorted *=-1;
        return this.recommendations.sort((a, b) => a.recRate > b.recRate ? this.sorted : this.sorted*-1 );
      },
      sortByDate: function(el){
        this.sorted *=-1;
        return this.recommendations.sort((a, b) => a.period > b.period ? this.sorted : this.sorted*-1 );
      },
      sortByStatus: function(){
        this.sorted *=-1;
        return this.recommendations.sort((a, b) => a.actual > b.actual ? this.sorted : this.sorted*-1 );
      }
    },
    components: {
      allRecs: {
        template: '#allRecommendations'
      },
      ActualRec: {
        template: '#activeRecommendations'
      },
      LateRec : {
        template: '#lateRecommendations'
      },
      ImpledRec : {
        template: '#impledRecommendations'
      },
      SearchRec: {
        template: '#searchRecommendations'
      },
      AddNewRec : {
        template: '#addNewRecommendation'
      }
    }
};

</script>