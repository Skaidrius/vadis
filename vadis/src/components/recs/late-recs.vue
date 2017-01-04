<!--Late recommendations-->
<template>
  <div>
    
    <recs-table :recommendations='lateRecommendations'
                :functions='functions'
                :tables='tables'
                :tableElements = 'tableElements'
                :i18n = 'i18n' 
                :editMode='editMode'
                :title='tables.lateRec'
                
                :changeImplemented = 'toImplemented'
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
    lateRecommendations: function () { 
      let late = [];
      this.recommendationsArray.map( function( e ){
          
        // TIMESTAMPS
        const todayTime = Date.now();
        const todayStamp = Math.floor( todayTime / 1000 );
        const someTime = new Date( e.recommendations[ "period" ] ).getTime();
        const getTimeStamp = Math.floor( someTime / 1000 );
            
        // check whether is late (still active and period is earlear than today) 
        if ( e.recommendations.actual && ( getTimeStamp < todayStamp ) ) {
          late.push( e );
        }
      }); 
    return late;
    }
  },
  methods: {
    toImplemented: function () {
      this.lateRecommendations.map( function ( e ) {
        if ( e.marked ) {
          e.marked = false;
          e.recommendations.actual = false;
        }
      });
    }
  },
  props: [ 'i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendationsArray', 'tableElements' ]
};

</script>