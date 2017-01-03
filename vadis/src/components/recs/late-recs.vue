<!--Late recommendations-->
<template>
  <div>
    
    <div class='panel panel-default'>
          
    <!--Late recommedations table-->
      <div v-if='lateRecommendations' >
        
        <div class="panel-body">
          <h3> {{ tables.lateRec[i18n] }} </h3>
        </div>
        
        <table class='table table-hover table-bordered text-center'>
        
          <thead>
            <tr>
              <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[tableElements.length-1]'>
                <span v-if='header == tableElements[4]'>
                  <a @click='sortByRate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else-if='header == tableElements[6]'>
                  <a @click='sortByDate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else>{{ header[i18n] }}</span>
                </span>
              </th>
              <!--NEED TO CHANGE DONE TO 18n-->
              <th v-if='editMode'>{{ functions.mark[i18n] }}</th>
            </tr>

          </thead>
          
          <tbody v-for='(data, index) in lateRecommendations'>
            <tr >
              <td>{{ index+1 }}.</td>
              <td v-for='(el, key) in data.recommendations' v-show='key!=="actual"'>
                <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
                
                <span v-else-if='editMode && key=="implementInfo"'><textarea v-model='data.recommendations[key]' :placeholder='data.recommendations[key]' class='form-control'></textarea></span>
                <span v-else>{{ el }}</span>
              </td>
              <!--BUTTON FUNCTION-->
              <td v-if='editMode'>
                <input type='checkbox' v-model='lateRecommendations[index].marked' v-on:change='getMarked'/>
              </td>
            </tr>
            
          </tbody>

        </table>

        <div class="panel-footer">
          <!--button if adit mode and some are marked-->
          <div class='form-inline text-right' v-if='editMode'> 
            <button class='form-control' v-on:click='toImplemented' v-show='marked > 0'>{{ functions.selectDone[i18n]}}</button>
          </div>
        </div>  
        
      </div>
      
      <div v-else class='panel-footer'>{{ functions.noRes[i18n] }}</div>
    
    </div>
    
  </div>
</template>

<script>
const apiData = require('../../assets/recommend-table-data.json');

module.exports =  {
  data(){
    return {
      header: apiData.header,
      sorted: true,
      marked: 0
    };
  },
  computed: {
    lateRecommendations: function () { 
      let late = [];
      this.recommendationsArray.map(function(e){
          
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
  methods: {
    toImplemented: function () {
      this.lateRecommendations.map(function (e) {
        if (e.marked) {
          e.marked = false;
          e.recommendations.actual = false;
        }
      });
    },
    getMarked: function () {
      let temp = 0;
      this.lateRecommendations.map(function (e) {
        if (e.marked) {
          temp++;
        }
      });
      this.marked = temp; 
    }
  },
  props: ['i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendationsArray', 'tableElements']
};

</script>