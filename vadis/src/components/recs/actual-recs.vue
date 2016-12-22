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
                <span v-else-if='header == tableElements[6]'>
                    <a @click='sortByDate()'>{{ header[i18n] }}</a>
                </span>
                <span v-else>{{ header[i18n] }}</span>
                </span>
              </th>
              <!--CHANGE TO 18n-->
              <th>{{ functions.mark[i18n] }}</th>
            </tr>
          </thead>
          
          <tbody v-for='(data, index) in actualRecommendations'>
            <tr>
              <td class='no-padding'>{{ index+1 }}.</td>
                <td v-for='(el, key) in data.recommendations' v-show='key!=="actual"' class='with-innertable'>
                  <!--SPLITTING CELL TO TEXT AND EXPAND symbol -->
                  <table class='table innertable'>
                    <tr class='row'>
                      <td class='col-xs-11 no-padding'>
                        <span v-if='key=="recRate"'>{{ functions.recRates[el-1][i18n] }}</span> <!-- to show low/med/high instead of 1,2,3 -->
                        <span v-else-if='editMode && key=="implementInfo"'>
                          <textarea v-model='data.recommendations[key]' :placeholder='data.recommendations[key]' class='form-control'></textarea>
                        </span>
                        <span v-else>{{ el }}</span>
                      </td>
                      <!--input checkbox = arrow-->
                      <td class='col-xs-1 expand expand-symbol'>
                        <input type='checkbox' class='check_box' v-on:click='expandRec(data)' v-model='data.checked'/>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- RECS mark as selected - -->
                <td class='no-padding'>
                  <input type='checkbox' v-model='actualRecommendations[index].marked' v-on:change='getMarked'/>
                </td>
            </tr>
            <!--Expanded recs table - shows if edit mode or cell checked -->
            <tr v-if='data.checked'>
              <td colspan = '9'>
                <table class='table'>
                  <thead v-for='datas in data.responsibles'>
                    <tr>
                      <th class='no-padding'></th>
                      <th class='no-padding'>{{ functions.person[i18n] }}</th>
                      <th class='no-padding'>{{ functions.position[i18n] }}</th>
                      <th class='no-padding'>{{ functions.email[i18n] }}</th>
                      <th v-if='editMode' class='no-padding'></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for='(responsibles, no) in data.responsibles'>
                      <!--RESPONSIBLE persons-->
                      <th class='pull-right no-padding'>{{ functions.responsible[i18n] }}</th>
                      <td v-if='editMode' class='no-padding'><input v-model='data.responsibles[no].person' :placeholder='data.responsibles[no].person' class='form-control'></td>
                      <td v-if='editMode' class='no-padding'><input v-model='data.responsibles[no].duties' :placeholder='data.responsibles[no].duties' class='form-control'/></td>
                      <td v-if='editMode' class='no-padding'><input v-model='data.responsibles[no].email' :placeholder='data.responsibles[no].email' class='form-control'/></td>
                      <td class='col-xs-1 no-padding' v-if='editMode'><button class='form-control' v-on:click='showResponsiblesModal = true'>{{ functions.addButton[i18n] }}</button></td>
                      
                      <td v-if='!editMode' v-for='( person, key ) in responsibles' class='no-padding'>
                        <!--CHANGE POINTER AND SEND MAIL COMMAND ??? -->
                        <a v-if='key == "email"'>{{ person }}</a>
                        <span v-else>{{ person }}</span>
                      </td>
                    </tr>
                    <!--ADD RESPONSIBLES MODAL-->
                    <modal v-if="showResponsiblesModal" @close="showResponsiblesModal = false">
      <!-- use custom content here to overwrite           -->
                      <h3 slot="header">{{ functions.addResponsible[i18n] }}</h3>
                      <h4 slot='body'>
                        <div class="form-horizontal">
                          <div class='form-group'>
                            <label class="col-xs-3 control-label">{{ functions.person[i18n] }}</label>
                            <div class="col-xs-9">
                              <input v-model='newResponsible.person' class='form-control text-center'>
                            </div>
                          </div>
                          <div class='form-group form-group-last'>
                            <label class="col-xs-3 control-label">{{ functions.position[i18n] }}</label>
                            <div class="col-xs-9">
                              <input v-model='newResponsible.position' class='form-control text-center'>
                            </div>
                          </div>
                          <div class='form-group form-group-last'>
                            <label class="col-xs-3 control-label">{{ functions.email[i18n] }}</label>
                            <div class="col-xs-9">
                              <input v-model='newResponsible.email' class='form-control text-center'>
                            </div>
                          </div>
                        </div>
                      </h4>
                      <h4 slot='footer'>
                        <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close" @click="showResponsiblesModal = false">{{ functions.cancelButton[i18n] }}</button>
                        <button type="button" class="btn btn-primary" @click='addNewResponcible(newResponsible.person, newResponsible.position, newResponsible.email); $emit("close")'>{{ functions.addButton[i18n] }}</button>
                      </h4>
                    </modal>
                    
                    <tr v-for='(curation, no) in data.curation'>
                      <!--CURATORS -->
                      <th class='pull-right no-padding'>{{ functions.responsible[i18n] }}</th>
                      <td v-if='editMode' class='no-padding'><input v-model='data.curation[no].person' :placeholder='data.curation[no].person' class='form-control'></td>
                      <td v-if='editMode' class='no-padding'><input v-model='data.curation[no].duties' :placeholder='data.curation[no].duties' class='form-control'/></td>
                      <td v-if='editMode' class='no-padding'><input v-model='data.curation[no].email' :placeholder='data.curation[no].email' class='form-control'/></td>
                      <td class='col-xs-1 no-padding' v-if='editMode'><button class='form-control' v-on:click='showCuratorsModal = true'>{{ functions.addButton[i18n] }}</button></td>
                      
                      <td v-if='!editMode' v-for='curator in curation' class='no-padding'>
                         <span>{{ curator }}</span>
                      </td>
                    </tr>
                    
                    <!--ADD RESPONSIBLES MODAL-->
                    <modal v-if="showCuratorsModal" @close="showCuratorsModal = false">
      <!-- use custom content here to overwrite           -->
                      <h3 slot="header">{{ functions.addCurators[i18n] }}</h3>
                      <h4 slot='body'>
                        <div class="form-horizontal">
                          <div class='form-group'>
                            <label class="col-xs-3 control-label">{{ functions.person[i18n] }}</label>
                            <div class="col-xs-9">
                              <input v-model='newCurators.person' class='form-control text-center'>
                            </div>
                          </div>
                          <div class='form-group form-group-last'>
                            <label class="col-xs-3 control-label">{{ functions.position[i18n] }}</label>
                            <div class="col-xs-9">
                              <input v-model='newCurators.position' class='form-control text-center'>
                            </div>
                          </div>
                          <div class='form-group form-group-last'>
                            <label class="col-xs-3 control-label">{{ functions.email[i18n] }}</label>
                            <div class="col-xs-9">
                              <input v-model='newCurators.email' class='form-control text-center'>
                            </div>
                          </div>
                        </div>
                      </h4>
                      <h4 slot='footer'>
                        <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close" @click="showCuratorsModal = false">{{ functions.cancelButton[i18n] }}</button>
                        <button type="button" class="btn btn-primary" @click='addNewCurator(newCurators.person, newCurators.position, newCurators.email); $emit("close")'>{{ functions.addButton[i18n] }}</button>
                      </h4>
                    </modal>
                    
                  </tbody>
              </table>
              </td>
            </tr>
          </tbody>

        </table>

        <div class="panel-footer">
          <!--button if adit mode and some are marked-->
          <div class='form-inline text-right' > 
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
import Modal from '../modal-component.vue';

export default {
  data(){
    return {
      header: apiData.header,
      sorted: true,
      marked: 0,
      newResponsible: { person: '', position: '', email: ''},
      newCurators: { person: '', position: '', email: ''},
      showResponsiblesModal: false,
      showCuratorsModal: false
    };
  },
  components: {
    modal: Modal
  },
  computed:{
    // get actual recommendations from recommendations
    actualRecommendations: function (){ 
      let actualRecs = [];
      this.recommendationsArray.map(function(e){
        if (e.recommendations.actual) {
          actualRecs.push(e);
        }
      });
      return actualRecs;
    },
  },
  methods: {
    
    toImplemented: function () {
      this.actualRecommendations.map(function (e){
        if (e.marked) {
            e.recommendations.actual = false;
        } else { e.marked = false; }
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
    expandRec: function (data) {
      this.actualRecommendations.map( function (e) {
        if (e == data) {
          e.checked = e.checked ? false : true;
        } else { e.checked = false; }
      });
    }
  },
  props: ['i18n', 'editMode', 'sortByDate', 'sortByRate', 'sortByStatus', 'functions', 'tables', 'recommendationsArray', 'tableElements']
};

</script>

<style>
  
  .table, td .table {
    margin-bottom: 0;
  }
  
table {
  overflow: hidden
}
  
  .table .no-padding, .table .with-innertable, .table .expand{
    padding: 2px 0;
  }

  .check_box {
        position: relative;
    left: -2050px;
  }
  
  .expand input[type=checkbox]:before { 
    position: relative;
    left: 2050px;
    content: "\25b8";
  }
  
  .expand input[type=checkbox]:checked:before {
    content: "\25b2";
}
  /*.check_box:after { */
  /*  position: relative;*/
  /*  left: -2050px;*/
  /*  content: "\25b4"; float: right; */
  /*}*/
  

</style>