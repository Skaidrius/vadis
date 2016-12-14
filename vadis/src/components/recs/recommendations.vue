<template>
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

    <router-view class="child"  :i18n='i18n' 
                                :editMode='editMode' 
                                :functions='functions'
                                :tables='tables'
                                :userData='userData'
                                :recommendations='recommendations' 
                                :tableElements='tableElements'
                                :sortByDate='sortByDate'
                                :sortByRate='sortByRate'
                                :sortByStatus='sortByStatus'>
    </router-view>

    <div>

  </div>
</template>

<script>

const apiData = require('../../assets/recommend-table-data.json');
let userData = require('../../assets/default-data.json');

export default{
    data(){
      return {
        userData: userData,
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
      rated: function (idx){
        return this.functions.recRates[idx][this.i18n];
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
    }
};

</script>