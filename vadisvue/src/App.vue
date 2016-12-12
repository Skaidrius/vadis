<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-zoom-in"></i>
          Vadis
        </a>
        
        <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link">Admin</a>&nbsp;</p>
        
        <p class="navbar-text navbar-right">
          <button class='form-control'>
            <span v-if='i18n == "en"' @click='changeLocaleTo("lt")' >Lt</span>
            <span v-else @click='changeLocaleTo("en")'>En</span>
          </button>
        </p>
        <p class="navbar-text navbar-right">
          <button class='form-control'>
            <span v-if='editMode' @click='editMode = false' >{{ header.changeModeTo.regular[i18n] }}</span>
            <span v-else @click='editMode = true'>{{ header.changeModeTo.edit[i18n] }}</span>
          </button>
        </p>

        <ul class="nav navbar-nav">
          <!--/<li><router-link to="/ias-demand">IAS demand</router-link></li>-->
          <li><router-link to="/front">{{ pages.front[i18n]}}</router-link></li>
          <li><router-link to="/risk">{{ pages.risk[i18n] }}</router-link></li>
          <li><router-link to="/demand">{{ pages.demand[i18n] }}</router-link></li>
          <li><router-link to="/recommend">{{ pages.recommendations[i18n] }}</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="col-sm-1">
   
      </div>
      <div class="col-sm-11">
        <router-view class='view' :i18n='i18n' :editMode='editMode'></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  
const apiData = require('assets/demand-table-data.json');
let userData = require('assets/default-data.json');

    export default {
      data(){
        return {
          pages: {
            front: {
              en: "Front Page",
              lt: "Pagrindinis"
            },
            risk: {
              en: "Risk Selection",
              lt: "Rizikos Atranka"
            },
            demand: {
              en: "IA Demand",
              lt: "VA Poreikis"
            },
            recommendations: {
              en: "Recommendations",
              lt: "Rekomendacijos"
            }
          },
          header: apiData.header,
          editMode: false,
          i18n: 'en'
        };
      },
      methods: {
            // LOCALIZATION i18n
        changeLocaleTo: function(el){
          let newLocale = el;
          return this.i18n=newLocale;
        },
      }
    };
  
</script>

<style>

.table-condensed>thead>tr>th,
.table-condensed>thead>tr>td {
  padding: .7em;
}

.table > tbody > tr > td,
.table > thead > tr > th {
     vertical-align: middle;
     text-align:center
}

/* table header */

.table thead {
  padding: 10px;
} 

thead tr a {
  color: #eed;
  cursor: pointer;
}

thead tr a:hover {
  color: #0c0;
  text-decoration: none;
}

/* table footer */

tfoot tr {
  background: #7bd;
  color: #333;
}

.table select {
  text-align-last: center;
}

.input-group {
  width: 100%;
}

.table select, 
.table input {
  padding: 0;
  text-align: center;
}

.table select > option {
  text-align: center;
}

.insertedTable {
  padding: 0;
  margin: 0;
}

.insertedTable .col-xs-9,
.insertedTable .col-xs-3,
.insertedTable .col-xs-4{
  padding: 2px;
}

textarea {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  resize: none;
}

</style>