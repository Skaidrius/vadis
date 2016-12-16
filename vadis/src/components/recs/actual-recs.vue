<!--Actual recommendations-->
<template>
  <div>
  
    <div class='panel panel-default'>
        
      <!--actual recommendations-->
      <div v-if='actualRecommendations' >
        
        <div class="panel-body">
          <h3> {{ tables.activeRec[i18n] }} </h3>
        </div>
        
        <table class='table table-hover table-bordered text-center'>
          
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
              <!--NEED TO CHANGE DONE TO 18n-->
              <th v-if='editMode'>{{ functions.mark[i18n] }}</th>
            </tr>
          </thead>
          
          <tbody v-for='(data, index) in actualRecommendations'>
            <tr v-on:click='expandRec(data)'>
              <td>{{ index+1 }}.</td>
              <td v-for='(el, key) in data.recommendations' v-show='key!=="actual"'>
                <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->

                <span v-else>
                  <span v-if='editMode && key=="implementInfo"'><textarea v-model='data.recommendations[key]' :placeholder='data.recommendations[key]' class='form-control'></textarea></span>
                  <span v-else>
                    {{ el }}
                  </span>
                </span>
              </td>
              <!--BUTTON FUNCTION-->
              <td v-if='editMode'>
                <input type='checkbox' v-model='actualRecommendations[index].marked' v-on:change='getMarked'/>
              </td>
            </tr>
            <tr v-if='data.contentVisible'>
              <td colspan=8>{{ data.responsibles }}</td>
            </tr>
          </tbody>

        </table>


        <div class="panel-footer">
          <!--button if adit mode and some are marked-->
          <div class='form-inline text-right' v-if='editMode' > 
            <button class='form-control' v-on:click='toImplemented' v-show='marked > 0'>{{ functions.selectDone[i18n] }}</button>
          </div>
          
        </div>
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
      marked: 0
    };
  },
  computed:{
    actualRecommendations: function (){ 
      let actualRecs = [];
      this.recommendations.map(function(e){
        if (e.recommendations.actual) {
          actualRecs.push(e);
        }
      });
      return actualRecs;
    },
  },
  methods: {
    toImplemented: function(){
      this.actualRecommendations.map(function(e){
        if (e.marked) {
          e.marked = false;
          e.recommendations.actual = false;
        }
      });
    },
    getMarked: function () {
      let temp = 0;
      this.actualRecommendations.map(function (e) {
        if (e.marked) {
          temp++;
        }
      });
      this.marked = temp; 
    },
    expandRec: function(data){
      this.actualRecommendations.map(function (e) {
        if (e == data) { 
          data.contentVisible = !data.contentVisible;
        } else { 
          e.contentVisible = false; 
        }
      });
      console.log("changed to "+data.contentVisible);
    }
  },
  props: ['i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendations', 'tableElements']
};

</script>