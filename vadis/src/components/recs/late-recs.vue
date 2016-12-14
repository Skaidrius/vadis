<template>
    <div>
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
    
    </div>
</template>

<script>
const apiData = require('../../assets/demand-table-data.json');

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
  computed: {
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
    }
  },
  methods: {
    actualRecommendations: function (){ 
      let actualRecs = [];
      this.recommendations.map(function(e){
        if (e.actual) actualRecs.push(e);
      });
      return actualRecs;
    },
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
  props: ['i18n', 'editMode', 'userData', 'functions', 'tables', 'recommendations', 'tableElements']
};

</script>