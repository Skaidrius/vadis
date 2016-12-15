<!--Late recommendations-->
<template>
  <div>
    
    <div class='panel panel-default'>
          
    <!--Late recommedations table-->
      <div v-if='lateRecommendations' >
        
        <div class="panel-body">
          <h3> {{ tables.lateRec[i18n] }} </h3>
        </div>
        
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
              <td v-for='(el, key) in data.recommendations' v-show='key!=="actual"'>
                <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
                <span v-else>{{ el }}</span>
              </td>
            </tr>
          </tbody>
          
        </table>
      
      <div class="panel-footer"></div>  
      </div>
      <div v-else class='panel-footer'>{{ functions.noRes[i18n] }}</div>
    
    </div>
    
  </div>
</template>

<script>
const apiData = require('../../assets/recommend-table-data.json');

export default {
  data(){
    return {
      header: apiData.header,
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
        const someTime = new Date(e.recommendations["period"]).getTime();
        const getTimeStamp = Math.floor(someTime / 1000);
            
        // check whether is late (still active and period is earlear than today) 
        if (e.recommendations.actual && (getTimeStamp < todayStamp)) {
          late.push(e);
        }
      }); 
    return late;
    }
  },
  props: ['i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendations', 'tableElements']
};

</script>