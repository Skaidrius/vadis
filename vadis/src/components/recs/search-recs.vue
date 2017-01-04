<!-- search recommendation-->
<template>
  <div><!--panel with search and search results-->

    <div class='panel panel-default'> <!--  SEARCH-->

      <div class="panel-body">
        <h2> {{ functions.search[i18n] }} </h2>
        <p>
            <input v-model="userInput" class="form-control" :placeholder="functions.search[i18n]"/>
        </p>

      </div>

      <div class='panel-heading'>
        <span v-if='userInput!== ""'> {{ tables.recSearchRes[i18n] }}</span>
      </div>
        
      <table v-if='userInput!== "" && filteredElements.length > 0' class='table table-hover table-striped table-bordered text-center' name='resultsTable'>
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
            </th>
            <th @click='sortByStatus()'><a>{{ functions.status.title[i18n] }}</a></th>
          </tr>
        </thead>

        <tbody v-for='( data, index ) in filteredElements'>
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
              <td>{{ data.recommendations.actual ? functions.status.actual[i18n] : functions.status.implemented[i18n] }}</td>
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

      <div v-if='userInput!== "" && filteredElements.length === 0' class='panel-footer'>{{ functions.noRes[i18n] }}</div>
    </div>
  </div>
</template>

<script>
  
const apiData = require('../../assets/recommend-table-data.json');
import ExpandRecsModule from './modules/expand-recs-module.vue';

module.exports =  {
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
  components: {
    expandRecs: ExpandRecsModule
  },
  computed:{
    filteredElements: function () {
      return this.recommendationsArray
        .filter(el => el.recommendations.auditReport.toLowerCase().indexOf(this.userInput.toLowerCase()) >-1
      );
    },
  },
  methods: {
      getMarked: function () {
        let temp = 0;
        this.filteredElements.map( function ( e ) {
          if ( e.marked ) {
            temp++;
          }
        });
        this.marked = temp; 
      },
      sortByStatus: function(){
        this.sorted *=-1;
        return this.recommendationsArray.sort((a, b) => a.recommendations.actual > b.recommendations.actual ? this.sorted : this.sorted*-1 );
      },
      // checks whether any rec is checked 
      expandRec: function ( data ) {
        this.filteredElements.map( function ( e ) {
          if ( e == data ) {
            e.checked = e.checked ? false : true;
          } else { e.checked = false; }
        });
    }
  },
  props: ['i18n', 'editMode', 'functions', 'tables', 'sortByDate', 'sortByRate','recommendationsArray', 'tableElements']
};
  
</script>