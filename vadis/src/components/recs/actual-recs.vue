<!--Actual recommendations-->
<template>
  <div>
  
    <div class='panel panel-default'>
        
      <!--actual recommendations-->
      <div v-if='actualRecommendations' >
        
        <div class="panel-body">
          <h3> {{ tables.activeRec[ i18n ] }} </h3>
        </div>
        
        <table class='table table-hover table-bordered text-center'>
          
          <thead>
            <tr>
              <th v-for='header in tableElements' :class='header.style' v-show='header!==tableElements[ tableElements.length-1 ]'>
                <span v-if='header == tableElements[ 4 ]'>
                  <a @click='sortByRate()'>{{ header[ i18n ] }}</a>
                </span>
                <span v-else-if='header == tableElements[ 6 ]'>
                  <a @click='sortByDate()'>{{ header[ i18n ] }}</a>
                </span>
                <span v-else>{{ header[ i18n ] }}</span>
                </span>
              </th>
              
              <th>{{ functions.mark[ i18n ] }}</th>
            </tr>
          </thead>
          
          <tbody v-for='( data, index ) in actualRecommendations'>
            <tr>
              <td>{{ index+1 }}.</td>
              <td v-for='( el, key ) in data.recommendations' v-show='key!=="actual"' class='with-innertable'>
                <!--SPLIT CELL TO TEXT AND EXPAND symbol -->
                <table class='table innertable'>
                  <tr class='row'>
                    <td class='col-xs-11'>
                      <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
                      <span v-else-if='editMode && key=="implementInfo"'>
                        <textarea v-model='data.recommendations[ key ]' :placeholder='data.recommendations[ key ]' class='form-control'></textarea>
                      </span>
                      <span v-else>{{ el }}</span>
                    </td>
                    <!--input checkbox = arrow-->
                    <td class='col-xs-1 expand expand-symbol'>
                      <input type='checkbox' class='check_box' v-on:click='expandRec( data )' v-model='data.checked'/>
                    </td>
                  </tr>
                </table>
              </td>
              <!-- RECS mark as selected - -->
              <td>
                <input type='checkbox' v-model='actualRecommendations[ index ].marked' v-on:change='getMarked'/>
              </td>
            </tr>
            
            <!--EXPAND INFO ABOUT IMPLEMENTATION ON MARK-->
            <tr v-if='data.marked'>
              <td></td>
              <td colspan='8'>
                <table class='table innertable'>
                  <tr>
                    <th class='text-center'>{{ functions.describeImplementation[ i18n ]}}</th>
                  </tr>
                  <tr>
                    <td><textarea class='form-control' v-model='data.recommendations.implementInfo'></textarea></td>
                  </tr>
                </table>
              </td>
              
            </tr>

            <!--EXPAND RECOMMENDATIONS MODULE-->
            <tr v-if='data.checked'>
              <td colspan = '9'>
                <expand-recs 
                        :data='data' 
                        :i18n='i18n'
                        :editMode='editMode'
                >
                </expand-recs>
              </td>
            </tr>
          </tbody>

        </table>

        <div class="panel-footer">
          <!--button if edit mode and some are marked-->
          <div class='form-inline text-right' > 
            <button class='form-control' v-on:click='toImplemented' v-show='marked > 0'>{{ functions.selectDone[ i18n ] }}</button>
          </div>
          
        </div>
      </div>
      
      <div v-else class='panel-footer'>{{ functions.noRes[ i18n ] }}</div>
    
    </div>

  </div>
</template>

<script>
const apiData = require( '../../assets/recommend-table-data.json' );
import ExpandRecsModule from './modules/expand-recs-module.vue';

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
    expandRecs: ExpandRecsModule
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
    },
    // checks whether any rec is marked
    getMarked: function () {
      let temp = 0;
      this.actualRecommendations.map( function ( e ) {
        if ( e.marked ) {
          temp++;
        }
      });
      this.marked = temp; 
    },
    // checks whether any rec is checked 
    expandRec: function ( data ) {
      this.actualRecommendations.map( function ( e ) {
        if ( e == data ) {
          e.checked = e.checked ? false : true;
        } else { e.checked = false; }
      });
    }
  },
  props: [ 'i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendationsArray', 'tableElements' ]
};

</script>

