<!--Actual recommendations-->
<template>
  <div>
  
    <recs-table :recommendations='actualRecommendations'
                :functions='functions'
                :tables='tables'
                :tableElements = 'tableElements'
                :i18n = 'i18n' 
                :editMode='editMode'
                :title='tables.activeRec'
                
                :changeImplemented = 'toImplemented'
    >
    </recs-table>

  </div>
</template>

<script>
const apiData = require( '../../assets/recommend-table-data.json' );
import RecsTableModule from './modules/recs-table-module.vue';

module.exports = {
  data() {
    return {
      // apiData: apiData,
      header: apiData.header,
      sorted: true,
      marked: 0
    };
  },
  components: {
    recsTable: RecsTableModule
  },
  computed:{
    // get actual recommendations from recommendations
    actualRecommendations: function (){ 
      let actualRecs = [];
      this.recommendationsArray.map( function(e){
        if ( e.recommendations.actual ) {
          actualRecs.push( e );
        }
      });
      return actualRecs;
    },
  },
  methods: {
    // move to implemented (changes actual to true or false)
    toImplemented: function () {
      this.actualRecommendations.map(function ( e ){
        if ( e.marked ) {
            e.recommendations.actual = false;
        } else { e.marked = false; }
      });
    }
  },
  props: [ 'i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendationsArray', 'tableElements' ]
};

</script>

