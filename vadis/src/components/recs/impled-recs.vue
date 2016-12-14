<!--Implemented recommendations-->
<template id='impledRecommendations'>
    <div>
    <!--implimented recommnendations-->
    <div v-if='impledRecommendations' >
      <h2> {{ tables.impleRec[i18n] }} </h2>
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
          <tr v-for='(data, index) in impledRecommendations'>
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
  </div>
  
  </div>
</template>

<script>
const apiData = require('../../assets/demand-table-data.json');

export default {
  data(){
    return {
      header: apiData.header,
      sorted: true,
    };
  },
  computed: {
    impledRecommendations: function () {
      let impled = [];
      this.recommendations.map(function(e){
        if (!e.actual) impled.push(e);
      });
      return impled;
    },
  },
  props: ['i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendations', 'tableElements']
};

</script>