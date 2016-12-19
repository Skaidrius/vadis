<!-- search recommendation-->
<template>
  <div><!--panel with search and search results-->

    <div class='panel panel-default'> <!--  SEARCH-->

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
            <td v-for='(el, key) in data.recommendations' v-show='key!=="actual"'>
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
</template>

<script>
  
const apiData = require('../../assets/recommend-table-data.json');

export default {
  data(){
    return {
      header: apiData.header,
      tableNav: apiData.tableNav,
      table: apiData.table,
      showModal: false,
      newRow: { title: '', risks: [] },
      newCrit: { title: '', rate: '', values: { low: '', middle: '', high:'' } },
      userInput: '',
      sorted: true,
    };
  },
  computed:{
    filteredElements: function () {
      return this.recommendations
        .filter(el => el.recommendations.auditReport.toLowerCase().indexOf(this.userInput.toLowerCase()) >-1
      );
    },
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
  props: ['i18n', 'editMode', 'functions', 'tables', 'recommendations', 'tableElements']
};
  
</script>