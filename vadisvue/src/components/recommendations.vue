<template>
  <div>
    <div class="jumbotron">
      <h2>{{ pageTitle.jumboHead[i18n] }}<br><small>{{ pageTitle.jumboSmall[i18n] }}</small></h2>
  
    </div>
    <div>
    
      <h4>today is {{today}} </h4><br>
      
     <div>
      <h4>{{ functions.titles.addNew[i18n] }}</h4>
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
    
    <div v-if='activeRecommendations'>
      <h2> {{ tables.activeRec[i18n] }} </h2>
      <table class='table table-hover table-striped table-bordered text-center'>
        <thead>
          <tr>
            <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>{{ header[i18n] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(data, index) in activeRecommendations'>
            <td>{{ index+1 }}.</td>
            <td v-for='(el, key) in data' v-show='key!=="actual"'>{{ el }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if='lateRecommendations'>
      <h2> {{ tables.lateRec[i18n] }} </h2>
      <table class='table table-hover table-striped table-bordered text-center'>
        <thead>
          <tr>
            <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>{{ header[i18n] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(data, index) in lateRecommendations'>
            <td>{{ index+1 }}.</td>
            <td v-for='(el, key) in data' v-show='key!=="actual"'>{{ el }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if='impledRecommendations'>
      <h2> {{ tables.impleRec[i18n] }} </h2>
      <table class='table table-hover table-striped table-bordered text-center'>
        <thead>
          <tr>
            <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>{{ header[i18n] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(data, index) in impledRecommendations'>
            <td>{{ index+1 }}.</td>
            <td v-for='(el, key) in data' v-show='key!=="actual"'>{{ el }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    </div>
  </div>
</template>

<script>

const apiData = require('../assets/recommend-table-data.json');
let userData = require('../assets/default-data.json');

export default{
    data(){
      return {
        pageTitle:{
          jumboHead : {
            en: "Recommendations",
            lt: "Rekomendacijų" 
          },
          jumboSmall : {
            en: "Implementation",
            lt: "Įgyvendinimas"
          }
        },
        tables: apiData.table.tables,
        functions: apiData.table.functions,
        recommendations: userData.recommendationsTable.tableElements,
        tableElements: apiData.table.header.elements
      };
    },
    props: ['i18n', 'editMode'],
    computed: {
      activeRecommendations: function (){ 
        let active = [];
        this.recommendations.map(function(e){
          if (e.actual) active.push(e);
        });
        return active;
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
        let str = "";
    
        let td = new Date;
        let thisYear = td.getFullYear();
        let thisMonth = td.getMonth()+1;
        let thisDay = td.getDate();
    
        if (thisMonth < 10) thisMonth = "0" + thisMonth;
        if (thisDay < 10) thisDay = "0" + thisDay;

        str += thisYear + "-" + thisMonth + "-" + thisDay + " ";

        return str;
      }

      // today: function(){
        // let td = new Date;
        // let thisYear = td.getFullYear();
      
        // let thisMonth = td.getMonth()+1;
        // // const months = ["sausio", "Vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"];
        // let thisDay = td.getDate();
        // let today = thisYear + '-' + thisMonth + '-'+ thisDay; 
        // // ("YY-mm-dd");
        // // console.log(td);
        // // let year = td.splice(0, 4);
      //   // return today;
      // }
    }
};

</script>