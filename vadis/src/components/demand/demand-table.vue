<!--Demand table -->
<template>
  <div>
    
    <div class='panel panel-default'>
    
      <div class="panel-body">
        <h3>{{ header.demandtabletitle[i18n] }}</h3>
      </div>

      <table id='demandTable' class='table table-hover table-striped table-bordered table-condensed text-center'> 
    
      <thead>  
        <tr>
          <!--  HEADER 1ST LINE (H1) -->
          <td rowspan='2'></td>
          
              <!--  H1 ACTIVITY TITLE-->
          <th rowspan='2' class='col-xs-2'> 
          
            <span v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
              <input v-model='table.title[i18n]' rows='6' class='form-control text-center' :placeholder="table.title[i18n]"> <!-- EDIT TITLES -->
            </span>
            
            <span v-else @click='sortByTitle()'>                                      <!-- READ MODE -->
              <a>{{ table.title[i18n] }}</a>
            </span> <!-- SORT TITLES -->
          </th>
    
              <!--  H1 CRITERIAS  -->
          <th :colspan='getCriteriasLength' class='text-center col-xs-7' > 
          
            <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
              <div class='col-xs-9'>
                <input v-model='table.header.criterias.titles.criterias[i18n]' class='form-control text-center' :placeholder="table.header.criterias.titles.criterias[i18n]">
              </div>
              <div class="col-xs-3">
                <input v-model='table.header.criterias.titles.rate[i18n]' class='form-control text-center' :placeholder="table.header.criterias.titles.rate[i18n]">
              </div>
              <span class="input-group-btn">
                <button class='form-control btn btn-success' id="show-modal" @click="showModal = true">+</button>
                  
                  <!--MODAL-->
                  <modal v-if="showModal" @close="showModal = false">
      <!-- use custom content here to overwrite           -->
                      <h3 slot="header">{{ table.modal.newCrit[i18n] }}</h3>
                      <h4 slot='body'>
                        <div class="form-horizontal">
                          <div class='form-group'>
                            <label class="col-xs-2 control-label">{{ table.modal.critTitle[i18n] }}</label>
                            <div class="col-xs-10">
                              <input v-model='newCrit.title' class='form-control text-center' :placeholder="table.modal.enterTitle[i18n]">
                            </div>
                          </div>
                          <div class='form-group'>
                            <label class="col-xs-2 control-label">{{ table.modal.critRate[i18n] }}</label>
                            <div class="col-xs-10">
                              <select v-model='newCrit.rate' class="form-control"> <!-- need to change it to show rate when adding new criteria   -->
                                <!--<option disabled>{{ table.modal.pickOne[i18n] }}</option>-->
                                <option v-for='val in table.options.riskRates.values' :value="val" :selected="table.options.riskRates.selectedVal">{{val}}</option>
                              </select>
                            </div>
                          </div>
                          <div class='form-group form-group-last'>
                            <label class="col-xs-2 control-label"><br>{{ table.modal.critValues[i18n] }}</label>
                            <div class="col-xs-10">
                              <input v-model='newCrit.values.low' class='form-control text-center' :placeholder="table.modal.newCritValues.lowRiskValue[i18n]">
                              <input v-model='newCrit.values.middle' class='form-control text-center' :placeholder="table.modal.newCritValues.middleRiskValue[i18n]">
                              <input v-model='newCrit.values.high' class='form-control text-center' :placeholder="table.modal.newCritValues.highRiskValue[i18n]">
                            </div>
                          </div>
                        </div>
                      </h4>
                      <h4 slot='footer'>
                        <button type="button" class="btn btn-primary" @click='addNewCriteria(newCrit.title, newCrit.rate, [newCrit.values.low, newCrit.values.middle, newCrit.values.high]); $emit("close")'>{{ table.modal.saveChanges[i18n] }}</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close" @click="showModal = false">{{ table.modal.cancel[i18n] }}</button>
                      </h4>
                </modal>
                
              </span>
            </div>
            
            <span v-else>                                                             <!-- READ MODE -->
              {{ table.header.criterias.titles.criterias[i18n] }} <span class='badge pull-right alert-success'>{{ table.header.criterias.titles.rate[i18n] }}</span>
            </span>
          </th>
    
              <!--  H1 IMPORTANCE  -->
          <th  colspan='3' class='col-xs-2'> 
          
            <input v-if='editMode' v-model='table.header.importance.name[i18n]' class='form-control  text-center' placeholder='Importance'> <!-- EDIT MODE -->
            
            <span v-else>{{ table.header.importance.name[i18n] }}</span>                                                            <!-- READ MODE -->
          </th>
    
              <!--  H1 DEMAND  --> 
          <th :colspan='table.header.demand.subElements.length' class='col-xs-1'> 
          
            <input v-if='editMode' v-model='table.header.demand.name[i18n]' class='form-control  text-center' placeholder='Demand'>  <!-- EDIT MODE -->
            
            <span v-else>{{ table.header.demand.name[i18n] }}</span>                                                                 <!-- READ MODE -->
          </th>
          <th rowspan='2'></th>
    
        </tr>
        <tr>
          <!--  HEADER 2ND LINE  -->
            <!--  H2 CRITERIAS  -->
          <th v-for='(crit, index) in userTable'>
            
            <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
              <tr>
                <td colspan='2'>
                  <button class='form-control btn btn-danger' @click='removeCriteria(crit, index)'>x</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input v-model='crit.title' rows='2' @keyup='renameCriteria(index, crit.title)' class='form-control'>
                </td>
                <td>
                  <span class="input-group">                                 <!-- EDIT MODE -->
                      <select v-model='crit.rate' @change='reRate(index, crit.rate)' class="form-control"> <!-- need to change it to show rate when adding new criteria   -->
                        <option disabled>{{ table.modal.pickOne[i18n] }}</option>
                        <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                      </select>
                  </span>
                </td>
              </tr>
            </table>
            <span v-else @click='sortByCrit(index)'><a>{{ crit.title }}</a><span class='badge pull-right alert-success'>{{ crit.rate }}</span></span> <!-- READ MODE -->
    
          </th> 
            <!--  H2 IMPORTANCE  -->
    
          <th v-for='imp in table.header.importance.subElements'>
            
            <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
              <textarea v-model='imp.name[i18n]' rows='3' class='form-control' placeholder='Enter new value'></textarea> <!--  H2 IMPORTANCE / RANGE | TOTA | LEVEL -->
            </div>
            
            <span v-else rows='3' @click='sortByDemand()'>                            <!-- READ MODE -->
              <a>{{ imp.name[i18n] }}</a>
            </span> 
          </th>
            <!--  H2 DEMAND  -->
          <th v-for='dem in table.header.demand.subElements'>
            
            <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
              <textarea v-model='dem.name[i18n]' rows='3' class='form-control' placeholder='Enter new value'></textarea>
            </div>
            
            <span v-else rows='3' @click='sortByDemand()'>                            <!-- READ MODE -->
              <a>{{ dem.name[i18n] }}</a>
            </span>
          </th>
        </tr>
      </thead>
    
      <tbody>
        
        <tr v-if='!editMode'>
          <td></td>
          <td><input v-model="userInput" class="form-control col-xs-4" :placeholder="table.functions.search[i18n]"></td> <!-- TBODY / SEARCH-->
          <td :colspan='getCriteriasLength + 5'></td>
        </tr>
        <!-- TBODY ROW -->
        <tr v-for='(el, index) in filteredElements'>
          <td>{{ index+1 }}.</td>                                                                <!-- TBODY / INDEX-->
          <td>
            <textarea v-if='editMode' v-model='el.title' rows='3' class='form-control text-center' placeholder="New Entry"></textarea>
            <div v-else><strong>{{ el.title }}</strong></div>                                     <!-- TBODY / ENTRY TITLE-->
          </td>
          
          <!-- CRITERIAS -->
          <td v-for='(item, indextwo) in el.risks' :class='getRiskStyle(item.level) || "alert-default"'>
            
            <select v-if='editMode' v-model='item.level' class='form-control col-xs=10' > <!-- EDIT MODE --> <!-- @change='createDescription(index, indextwo, item.level)' <---maybe use w/o this, but in json it is good information-->
              <option disabled>{{ table.modal.pickOne[i18n] }}</option>
              <option  v-for='elem in table.options.risks' :value= 'elem.value'>{{ elem.name[i18n] }}</option> <!-- TBODY / CRITERIAS-->
            </select>
            
            <div v-else>{{ getRiskName(item.level)[i18n] }}</div>                         <!-- READ MODE -->
          </td>
          
          <!-- IMPORTANCE-->
          <td :value='getImpDescr(index)'> {{ getRangeMin(index) }} - {{ getRangeMax(index) }} </td>                                        <!-- TBODY / IMPORTANCE / RANGE-->
          <td> {{ getImpSum(index) }}</td>                                                        <!-- TBODY / IMPORTANCE / SUM-->
          <td :class='el.impValue.style'>{{ el.impValue.name[i18n] }}</td>                              <!-- TBODY / IMPORTANCE / VALUE-->
          <!-- DEMAND-->
          <td>{{ el.impValue.days }}</td>                                                         <!-- TBODY / DEMAND DAYS-->
          
          <td v-if='editMode'>
            <button class='btn btn-danger' @click='removeRow(index)'>X</button>                   <!-- TBODY / REMOVE ENTRY BUTTON -->
          </td>
          
          <td v-else>
            <button class='btn btn-default' @click='removeRow(index)'>X</button>                   <!-- TBODY / REMOVE ENTRY BUTTON -->
          </td>
        </tr>
        
        <!--ADD NEW ENTRY-->
        <tr>
          <td></td>
          <td><br>
            <div>{{ table.functions.addEntry[i18n] }}</div>
          </td>
          <td :colspan='getCriteriasLength + 5'></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input class='form-control' :placeholder='table.functions.newTitle[i18n]' v-model='newRow.title'>
          </td>
          <td v-for='(el, index) in userDataTable[0].risks'>
            <select class='form-control' v-model='newRow.risks[index]'>            <!-- EDIT MODE -->
              <option disabled>{{ table.functions.pickOne[i18n] }}...</option>
              <option  v-for='(elem, elemIndex) in table.options.risks' :value='elem.value || elem[0]'>
                <div class="row">{{ elem.name[i18n]}} &nbsp; {{ userTable[index].values[elemIndex].value }}</div>
                </option>  <!-- INSTEAD OF NOME NEED DESCRIPTION OF RISK VALUES  -->
            </select>
          </td>
          <td colspan='5'>
            <button class='form-control' @click='addNewRow()'>{{ table.functions.addButton[i18n] }}</button>
          </td>
        </tr>
      </tbody>
      
                <!-- TFOOT MODE -->
      <tfoot class='table table-stripped'>
        <tr>
          <th :colspan='getCriteriasLength + 3' class='text-right'>
            
            <span v-if='editMode'><input class='form-control text-right' placeholder='Title' v-model='table.header.demandCalc.title[i18n]'></span>
            
            <span v-else :colspan='getCriteriasLength +3' class='text-right'> {{ table.header.demandCalc.title[i18n] }}</span> 
          </th>
          <td>{{ daysDemand }}</td>
          <td colspan = '3'></td>
    
        </tr>
        <tr>
          <td :colspan='getCriteriasLength + 3' class='text-right'>
            
            <span v-if='editMode'><input class='form-control text-right' placeholder='Method' v-model='table.header.demandCalc.method[i18n]'></span>
            
            <span v-else :colspan='getCriteriasLength +3' class='text-right'>{{ table.header.demandCalc.method[i18n] }}</span>
          </td>
          <td>{{ demandCalculated.toFixed(2) }}</td>
          <td colspan = '3'></td>
        </tr>
        <tr>
          <th :colspan='getCriteriasLength + 3' class='text-right'>
            
            <span v-if='editMode'><input class='form-control text-right' placeholder='Description' v-model='table.header.demandCalc.description[i18n]'></span>
            
            <span v-else :colspan='getCriteriasLength +3' class='text-right'>{{ table.header.demandCalc.description[i18n] }}</span>
          </th>
          <td class='text-center'> {{demandCalculated.toFixed(0) }} </td>
          <th class='text-left' colspan='3'>
            
            <span v-if='editMode' >
              <input class='form-control text-left' placeholder="IA's" v-model='table.header.demandCalc.iAuditors[i18n]'>
            </span>
            
            <span v-else> {{ table.header.demandCalc.iAuditors[i18n] }}  </span>
          </th>
        </tr>
      </tfoot>
    
      </table>
    
    </div>

<!--<pre>{{ $data.userDataTable }}</pre>  -->
<!--FOR TESTING AND VIEWING OF JSON ONLY -->
  </div>
</template>

<script>
const apiData = require('../../assets/demand-table-data.json');
import Modal from '../modal-component.vue';

export default {
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
  props: ['i18n', 'editMode', 'userData', 'userDataTable', 'userTable'],
  components: {
    modal: Modal
  },
  computed: {
    filteredElements: function () {
        return this.userDataTable
          .filter(el => el.title.toLowerCase().indexOf(this.userInput.toLowerCase()) >-1
        );
    },
    getCriteriasLength: function(){
      return this.userTable.length;
    },
    demandCalculated: function(){ 
      return this.daysDemand / 175 / 3;
    },
    daysDemand: function(){ 
      return this.userDataTable.reduce(function(a, b){
        return a + b.impValue.days;
      }, 0);
    },
  },
  // // FOR AJAX  - NOT WORKING YET
  // created: function () {
  //     this.fetchData();
  // },
  methods: {
  // // AJAX CALL
  //   fetchData: function () {
  //     var xhr = new XMLHttpRequest();
  //     var self = this;
  //     xhr.open('GET', apiURL);
  //     xhr.onload = function () {
  //       self.table = JSON.parse(xhr.responseText);
  //       console.log(self.table);
  //       console.log(self.table[0].html_url);
  //     };
  //     xhr.send();
  //   },
    createDescription: function(idx, idxtwo, val){
      this.userDataTable[idx].risks[idxtwo].description = this.userTable[idxtwo].values[val-1].value;
    },
    getImpSum: function(idx) { // sums up all importance values
      return this.userDataTable[idx].risks.reduce(function(a, item){
        return a + (item.rate*item.level);
      }, 0);
    },
    getRangeMin: function(idx){
      return this.userDataTable[idx].risks.reduce(function(a, b){
        return a + b.rate;
      }, 0);
    },
    getRangeMax: function(idx){
      let length = this.table.options.riskRates.values.length;
      return this.userDataTable[idx].risks.reduce(function(a, b){
        return a + b.rate * length;
      }, 0);
    },
    getRiskStyle: function(el){
      return this.table.options.risks[el-1].style;
    },
    getRiskName: function(el){
      return this.table.options.risks[el-1].name;
    },
    getImpDescr: function(idx){                     //sets importance description
      const thisValue = this.getImpSum(idx); 
      const minRange = this.getRangeMin(idx);
      const maxRange = this.getRangeMax(idx);
      const range = maxRange - minRange;

      let temp = 0;
      const values = this.table.options.importanceValues;  
      if (thisValue >= range * .6667 + minRange) {      //if >= 2/3 of difference + minRange        => high 
        temp = values[3];
      } else if (thisValue >= range * .3337 + minRange) {//if >= 1/3 of difference + minRange       => middle
        temp = values[2];
      } else if (thisValue > 0) {                         // > 0 && < 1/3 of difference + min range => low
        temp = values[1];
      } else temp = values[0];                            // 0 - just for calculation
      this.userDataTable[idx].impValue = temp;
    },
    reRate: function(index, newVal){
      for (let a of this.userDataTable){
        a.risks[index].rate = newVal;
      }
    },
    renameCriteria: function(index, newVal){
      for (let a of this.userDataTable){
        a.risks[index].title = newVal;
      }
    },
    // ADD/REMOVE CRITERIAS
    addNewCriteria: function(title, rate, descriptions){ 
      if (window.confirm('Are you sure you add this Criteria?')) {
        this.userTable.push({ 
          'title': title, 
          'rate': rate || 1,
          'values': [{ 
            'value': descriptions[0]
          }, {
            'value': descriptions[1] 
          },{ 
            'value': descriptions[2] 
          }]
        });
        for (var a of this.userDataTable.entries()){
          a[1].risks.push({ 
            'title': title, 
            'rate': rate || 1, 
            'level': 1 
          });
        }
        this.newCrit.title = '',
        this.newCrit.rate = 1,
        this.newCrit.values.low = '',
        this.newCrit.values.middle = '',
        this.newCrit.values.high = '',
        this.showModal = false;
      }
    },
    removeCriteria: function(el, idx){
      let elements = this.userTable;
      if (window.confirm('Are you sure you want to delete this criteria?')) {
        elements.splice(idx, 1);
        for (var a of this.userDataTable){
          a.risks.splice(idx, 1);
        }
      }
    },
    // ADD/REMOVE ROWS
    removeRow: function(index){                        
      if (window.confirm('Are you sure you want to delete this entry?')) {
        this.userDataTable.splice(index, 1);
      }
    },
    addNewRow: function(){
      if (window.confirm('Are you sure to write new entry?')) {
        const newTitle = this.newRow.title;
        let newRisks = this.newRow.risks;
        let elements = this.userTable;
        const table = this.table;
        let getRisks = function(){
        let arr = [];
          for (let [key, value] of Object.entries(elements)){
            let newValue = newRisks[key] ? newRisks[key] : table.options.risks[0].value;
            arr.push({
              title: elements[key].title, 
              rate: elements[key].rate, 
              level: newValue
            });
          }
        return arr;
        };
        getRisks();
        this.userDataTable.push({ 
          title: newTitle, 
          risks: getRisks()
        });
        this.newRow.title = '';
        this.newRow.risks = [];
      }
    },
    sortByTitle: function(){
      this.sorted *=-1;
      return this.userDataTable.sort((a, b) => a.title > b.title ? this.sorted : this.sorted*-1 );
    },
    sortByCrit: function(index){
      this.sorted *=-1;
      return this.userDataTable.sort((a, b) => a.risks[index].level > b.risks[index].level ? this.sorted : this.sorted*-1 );
    },
    sortByDemand: function(){
      this.sorted *=-1;
      return this.userDataTable.sort((a, b) => a.impValue.days > b.impValue.days ? this.sorted : this.sorted*-1 );
    }
  }
};

</script>

<style>

#demandTable thead {
  /*background: #27a;*/
  color: #000;
}

</style>

