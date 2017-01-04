<!--Implemented recommendations-->
<template>
  <div>

    <recs-table :recommendations='impledRecommendations'
                :functions='functions'
                :tables='tables'
                :tableElements = 'tableElements'
                :i18n = 'i18n' 
                :editMode='editMode'
                :title='tables.impledRec'
                
                :changeImplemented = 'fromImplemented'
    >
    </recs-table>
    
  </div>
</template>

<script>
const apiData = require( '../../assets/recommend-table-data.json' );
import RecsTableModule from './modules/recs-table-module.vue';

module.exports =  {
  data(){
    return {
      header: apiData.header,
      sorted: true,
      marked: 0
    };
  },
  components: {
    recsTable: RecsTableModule
  },
  computed: {
    impledRecommendations: function () {
      let impled = [];
      this.recommendationsArray.map( function( e ){
        if ( !e.recommendations.actual ) {
          impled.push( e );
        }
      });
      return impled;
    }
  },
  methods: {
    // move to not implemented (changes actual to true or false)
    fromImplemented: function(){
      this.impledRecommendations.map( function( e ){
        if ( e.marked ) {
          e.recommendations.actual = true;
        } else { e.marked = false; }
      });
    }
  },
  props: [ 'i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendationsArray', 'tableElements' ]
};

</script>