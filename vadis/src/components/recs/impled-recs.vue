<!--Implemented recommendations-->
<template>
  <div>

    <div class='panel panel-default'>
        
      <!--implimented recommnendations-->
      <div v-if='impledRecommendations' >
        
        <div class="panel-body">
          <h3> {{ tables.impleRec[i18n] }} </h3>
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
          
          <tbody v-for='(data, index) in impledRecommendations'>
            <tr >
              <td>{{ index+1 }}.</td>
              <td v-for='(el, key) in data.recommendations' v-show='key!=="actual"'>
                <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
                <span v-else>{{ el }}</span>
              </td>
              <!--BUTTON FUNCTION-->
              <td v-if='editMode'>
                <input type='checkbox' v-model='impledRecommendations[index].marked' v-on:change='getMarked'/>
              </td>
            </tr>
          </tbody>
          
        </table>
        
        <!--button if adit mode and some are marked-->
        <div class='form-inline text-right' v-if='editMode && (marked > 0)'> 
          <button class='form-control' v-on:click='fromImplemented'>{{ functions.selectActual[i18n] }}</button>
        </div>
      
      <div class="panel-footer"></div>  
      </div>
      <div v-else class='panel-footer'>{{ functions.noRes[i18n] }}</div>

    </div>
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
    impledRecommendations: function () {
      let impled = [];
      this.recommendationsArray.map(function(e){
        if (!e.recommendations.actual) impled.push(e);
      });
      return impled;
    }
  },
  methods: {
    fromImplemented: function(){
      this.impledRecommendations.map(function(e){
        if (e.marked) {
          e.marked = false;
          e.recommendations.actual = true;
        }
      });
    },
    getMarked: function () {
      let temp = 0;
      this.impledRecommendations.map(function (e) {
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