<!--Recommendations main-->
<template>
  <div>
    
    <div class="jumbotron">
      <div class="row">
        <div class='col-xs-10'>
          <h2>{{ pageTitle.jumboHead[ i18n ] }}<br><small>{{ pageTitle.jumboSmall[ i18n ] }}</small></h2>
    
          <h4>{{pageTitle.todayIs[ i18n ]}} {{ today }} </h4>
        </div>
        
        <div class='col-xs-2'>
          <br/><br/>
          <div class='form-inline text-right'>
            <small>
              <span v-if='editMode' class='btn-danger '>{{ header.mode.edit[ i18n ] }}</span>
              <span v-else class='btn-success '>{{ header.mode.regular[ i18n ] }}</span>
            </small>
          </div>

          <!--insertData-->
          <div class='form-inline text-right'>
            <button class='form-control' @click='insertUserData()' >InsertData</button>
          </div>
          <!--/insertData-->

        </div>
      </div>
    </div>
    
    <nav class='container-fluid'>
      <ul class="nav nav-pills text-center my-tabs row">
        <li class='col-xs-2 active' data-toggle="tab"><router-link to="/recommendations/actual">{{ tables.activeRec[ i18n ] }}</router-link></li>
        <li class='col-xs-2' data-toggle="tab"><router-link to="/recommendations/late">{{ tables.lateRec[ i18n ] }}</router-link></li>
        <li class='col-xs-2' data-toggle="tab"><router-link to="/recommendations/implemented">{{ tables.impleRec[ i18n ] }}</router-link></li>
        <li class='col-xs-2' data-toggle="tab"><router-link to="/recommendations/add">{{ functions.titles.addNew[ i18n ] }}</router-link></li>
        <li class='col-xs-2' data-toggle="tab"><router-link to="/recommendations/search">{{ functions.search[ i18n ] }}</router-link></li>
      </ul>
      </nav>

    <router-view class="child"  :i18n='i18n' 
                                :editMode='editMode' 
                                :functions='functions'
                                :tables='tables'
                                :userData='userData'
                                :recommendationsArray='recommendationsArray' 
                                :tableElements='tableElements'
                                :sortByDate='sortByDate'
                                :sortByRate='sortByRate'
    >
    </router-view>

    <div>

  </div>
</template>

<script>

const apiData = require('../../assets/recommend-table-data.json');
let userData = require('../../assets/default-data.json');

module.exports = {
    data(){
      return {
        apiData: apiData,
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
        recommendationsArray: userData.recommendationsTable.tableElements,
        tableElements: apiData.table.header.elements,
        header: apiData.table.header,
      };
    },
    props: [ 'i18n', 'editMode' ],
    computed: {
      rated: function ( idx ){
        return this.functions.recRates[ idx ][ this.i18n ];
      },

      today: function() {
        let i18n = this.i18n;
        let str = "";
    
        let td = new Date;
        let thisYear = td.getFullYear();
        let thisMonth = td.getMonth();
        let thisDay = td.getDate();
        let tempDay;
        
        const monthsLt = [ "sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio" ];
        const monthsEn = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        
        //if (thisMonth < 10) thisMonth = "0" + thisMonth;
        //if (thisDay < 10) thisDay = "0" + thisDay;
        
        if ( i18n == 'lt' ){
          // lithuanian date format
          str += thisYear + " m. " + monthsLt[ thisMonth ] + " " + thisDay + " d.";
        } else {
          // us date format 
          if (thisDay > 10 && thisDay < 14 ) {
            tempDay = thisDay + 'th';
          } else if ( thisDay % 10 == 1 ) {
            tempDay = thisDay + 'st';
          } else if ( thisDay % 10 == 2 ) {
            tempDay = thisDay + 'nd';
          } else if ( thisDay % 10 == 3 ) {
            tempDay = thisDay + 'rd';
          } else {
            tempDay = thisDay + 'th';
          }
          str += tempDay + ' of ' + monthsEn[ thisMonth ] + ', ' + thisYear; 
        }
        return str;
      }

    },
    methods: {
      sortByRate: function( el ){ //currently sorts middle/high by letter h l m, not by value l=1, m = 2, h = 3
        this.sorted *=-1;
        return this.recommendationsArray.sort( ( a, b ) => a.recommendations.recRate > b.recommendations.recRate ? this.sorted : this.sorted*-1 );
      },
      sortByDate: function( el ){
        this.sorted *=-1;
        return this.recommendationsArray.sort( ( a, b ) => a.recommendations.period > b.recommendations.period ? this.sorted : this.sorted*-1 );
      }
    }
};

</script>

<style>
  
  .table, td .table {
    margin-bottom: 0;
  }
  
table {
  overflow: hidden
}

  .table tr>th, .table tr>td, .table .with-innertable, .table .expand{  
  /*.table .no-padding, .table .with-innertable, .table .expand{*/
    padding: 2px 0;
  }

  .check_box {
        position: relative;
    left: -2050px;
  }
  
  .expand input[ type=checkbox ]:before { 
    position: relative;
    left: 2050px;
    content: "\003E";
    cursor: pointer;
    font-weight: bold;
    color: OliveDrab ;
  }
  
  .expand input[ type=checkbox ]:checked:before {
    content: "\2227";
    font-weight: bold;
    color: DarkCyan;
}
  
  .email {
    cursor: pointer;
  }
  
  .responsibles {
    background: rgba(100,255,100,.1);
  }
  .curation {
    background: rgba(255,50,50,.1);
  }
  

  /*.check_box:after { */
  /*  position: relative;*/
  /*  left: -2050px;*/
  /*  content: "\25b4"; float: right; */
  /*}*/
  

</style>