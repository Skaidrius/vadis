<template>
  <div>
  
    <!--control buttons-->

    <div class='form-inline text-right'>
      <small>
        <span v-if='editMode' class='btn-danger '>{{ header.mode.edit[i18n] }}</span>
        <span v-else class='btn-success '>{{ header.mode.regular[i18n] }}</span>
      </small>
    </div>
    <!--control buttons-->
    <div class='form-inline text-right'>
        <!--insertData-->
      <button class='form-control' @click='insertUserData()' >InsertData</span></button>
      <!--/insertData-->
    <!--/insertData-->

  </div><br/>
  
  <nav>
    <ul class="my-tabs nav nav-tabs">
      <router-link to="/risk/risk-table" class="active"><li class='col-xs-2'>{{ tableNav.table[i18n] }}</li></router-link>
      <router-link to="/risk/risk-table-selections"><li class='col-xs-2'>{{ tableNav.legend[i18n] }}</li></router-link>
    </ul>
  </nav>
  <!--.--- control buttons-->
  
  <!--risk table-->
  <table id='risksTable' class='table table-hover table-striped table-bordered table-condensed text-center'> 

  <!--HEADER-->
  <thead class="row">  
    <tr >
        <!--HEADER 1ST LINE (H1) -->
      <th rowspan='2'></th>
      
      <!--H1 ACTIVITY TITLE-->
      <th rowspan='2' class='col-xs-2 text-center'> 
      
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <input v-model='table.title[i18n]' rows='6' class='form-control text-center' :placeholder="table.title[i18n]"> <!-- EDIT TITLES -->
        </div>
        
        <span v-else @click='sortByTitle()'>                                      <!-- READ MODE -->
          <a>{{ table.title[i18n] }}</a>
        </span> <!-- SORT TITLES -->
      </th>

      <!--H1 RISK FACTORS  -->
      <th :colspan='getRiskslength' class='text-center col-xs-7' > 
      
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <!--risks and rate EDIT mode-->
          <div class='col-xs-9'>
            <input v-model='table.header.risks.title.risks[i18n]' class='form-control text-center' :placeholder="table.header.risks.title.risks[i18n]">
          </div>
          <div class="col-xs-3">
            <input v-model='table.header.risks.title.rate[i18n]' class='form-control text-center' :placeholder="table.header.risks.title.rate[i18n]">
          </div>
          
          <span class="input-group-btn">
            <button class='form-control btn btn-success' id="show-modal" @click="showModal = true">+</button>
              
              <!--MODAL-->
              <modal v-if="showModal" @close="showModal = false">
                  <h3 slot="header">{{ table.modal.newRisk[i18n]}}</h3>
                  <h4 slot='body'>
                    <div class="form-horizontal">
                      <div class='form-group'>
                        <label class="col-xs-2 control-label">{{ table.modal.riskTitle[i18n] }}</label>
                        <div class="col-xs-10">
                          <input v-model='newRisk.title' class='form-control text-center' :placeholder="table.modal.enterTitle[i18n]">
                        </div>
                      </div>
                      <div class='form-group'>
                        <label class="col-xs-2 control-label">{{ table.modal.riskRate[i18n] }}</label>
                        <div class="col-xs-10">
                          <select v-model='newRisk.rate' class="form-control"> <!-- need to change it to show rate when adding new risk factor   -->
                            <!--<option disabled>{{ table.modal.pickOne[i18n] }}</option>-->
                            <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                          </select>
                        </div>
                      </div>
                      <div class='form-group form-group-last'>
                        <label class="col-xs-2 control-label"><br><br>{{  table.modal.riskValues[i18n] }}</label>
                        <div class="col-xs-10">
                          <input v-model='newRisk.values.low' class='form-control text-center' :placeholder="table.modal.lowRiskValue[i18n]">
                          <input v-model='newRisk.values.middle' class='form-control text-center' :placeholder="table.modal.middleRiskValue[i18n]">
                          <input v-model='newRisk.values.high' class='form-control text-center' :placeholder="table.modal.highRiskValue[i18n]">
                        </div>
                      </div>
                    </div>
                  </h4>
                  <h4 slot='footer'>
                    <button type="button" class="btn btn-primary" @click='addnewRiskeria(newRisk.title, newRisk.rate, [newRisk.values.low, newRisk.values.middle, newRisk.values.high]); $emit("close")'>{{ table.modal.saveChanges[i18n] }}</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close" @click="showModal = false">{{ table.modal.cancel[i18n] }}</button>
                  </h4>
            </modal>
            
          </span>
        </div>
        
        <span v-else>                                                             <!-- READ MODE -->
          {{ table.header.risks.title.risks[i18n] }} <span class='badge pull-right alert-success'>{{ table.header.risks.title.rate[i18n] }}</span>
        </span>
      </th>

            <!--H1 IMPORTANCE  -->
      <th  colspan='3' class='col-xs-2'> 
        <input v-if='editMode' v-model='table.header.importance.name[i18n]' class='form-control  text-center' placeholder='Importance'> <!-- EDIT MODE -->
        <span v-else>{{ table.header.importance.name[i18n] }}</span>                                                            <!-- READ MODE -->
      </th>

      <th rowspan='2'></th>

    </tr>
    <tr>
        <!--HEADER 2ND LINE  -->
          <!--H2 RISK FACTORS  -->
      <th v-for='(risk, index) in userTable'>
        
        <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
          <tr>
            <td colspan='2'>
              <button class='form-control btn btn-danger' @click='removeRisk(risk, index)'>x</button>
            </td>
          </tr>
          <tr>
            <td>
              <input v-model='risk.title' rows='2' @keyup='renameRisk(index, risk.title)' class='form-control'>
            </td>
            <td>
              <span class="input-group">                                 <!-- EDIT MODE -->
                  <select v-model='risk.rate' @change='reRate(index, risk.rate)' class="form-control"> <!-- need to change it to show rate when adding new risk factor   -->
                    <option disabled>{{ table.functions.pickOne[i18n] }}..</option>
                    <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                  </select>
              </span>
            </td>
          </tr>
        </table>
        <span v-else @click='sortByRisk(index)'><a>{{ risk.title }}</a><span class='badge pull-right alert-success'>{{ risk.rate }}</span></span> <!-- READ MODE -->

      </th> 
          <!--H2 Risk rate  -->
      <th>
          <textarea v-if='editMode' rows='3' v-model='table.header.risks.title.range[i18n]' class='form-control' :placeholder='table.header.risks.title.range[i18n]'></textarea>
          
          <span v-else> {{ table.header.risks.title.range[i18n] }}</span> 
      </th>
      <th v-for='imp in table.header.importance.subElements'>
        
        <div v-if='editMode'>                                 <!-- EDIT MODE -->
          <textarea v-model='imp.name[i18n]' rows='3' class='form-control' placeholder='Enter new value'></textarea> <!--  H2 IMPORTANCE / RANGE | SUM | LEVEL -->
        </div>
        
        <span v-else rows='3' @click='sortByDemand()'>                            <!-- READ MODE -->
          <a>{{ imp.name[i18n] }}</a>
        </span> 
      </th>

    </tr>
  </thead>

  <!--BODY-->
  <tbody>
    
    <tr v-if='!editMode'>
      <td></td>
      <td><input v-model="userInput" class="form-control col-xs-4" :placeholder="table.functions.search[i18n]"></td> <!-- TBODY / SEARCH-->
      <td :colspan='getRiskslength + 5'></td>
    </tr>
     <!--TBODY ROW -->
    <tr v-for='(el, index) in filteredElements'>
      <td>{{ index+1 }}.</td>                                                                <!-- TBODY / INDEX-->
      <td>
        <textarea v-if='editMode' v-model='el.title' rows='3' class='form-control text-center' placeholder="New Entry"></textarea>
        <div v-else><strong>{{ el.title }}</strong></div>                                     <!-- TBODY / ENTRY TITLE-->
      </td>
      
       <!--RISK FACTORS -->
      <td v-for='(item, indextwo) in el.risks' :class='getRiskStyle(item.level) || "alert-default"'>
        
        <select v-if='editMode' v-model='item.level' class='form-control col-xs=10' > <!-- EDIT MODE --> <!-- @change='createDescription(index, indextwo, item.level)' <---maybe use w/o this, but in json it is good information-->
          <option disabled>{{ table.functions.pickOne[i18n] }}...</option>
          <option  v-for='elem in table.options.risks' :value= 'elem.value'>{{ elem.name[i18n] }}</option> <!-- TBODY / RISK FACTORS-->
        </select>
        
        <div v-else>{{ getRiskName(item.level)[i18n] }}</div>                         <!-- READ MODE -->
      </td>
      
       <!--IMPORTANCE-->
      <td :value='getImpDescr(index)'> {{ getRangeMin(index) }} - {{ getRangeMax(index) }} </td>                                        <!-- TBODY / IMPORTANCE / RANGE-->
      <td> {{ getImpSum(index) }}</td>                                                        <!-- TBODY / IMPORTANCE / SUM-->
      <td :class='el.impValue.style'>{{ el.impValue.name[i18n] }}</td>                              <!-- TBODY / IMPORTANCE / VALUE-->

      <td v-if='editMode'>
        <button class='btn btn-danger' @click='removeRow(index)'>X</button>                   <!-- TBODY / REMOVE ENTRY BUTTON -->
      </td>
      
      <td v-else>
        <button class='btn btn-default' @click='removeRow(index)'>X</button>                   <!-- TBODY / REMOVE ENTRY BUTTON -->
      </td>
    </tr>
    
    
    <!--NEW ENTRY-->
    <tr>
      <td></td>
      <td><br>
        <div>{{ table.functions.addEntry[i18n] }}</div>
      </td>
      <td :colspan='getRiskslength + 5'></td>
    </tr>
    <tr>
      <th></th>
      <td>
        <input class='form-control' :placeholder='table.functions.newTitle[i18n]' v-model='newRow.title'>
      </td>
      <td v-for='(el, index) in userDataTable[0].risks'>
        <select class='form-control' v-model='newRow.risks[index]'>            <!-- EDIT MODE -->
          <option disabled>{{ table.functions.pickOne[i18n] }}...</option>
          <option  v-for='(elem, elemIndex) in table.options.risks' :value='elem.value || elem[0]'>
            <div class="row">{{ elem.name[i18n] }} &nbsp; {{ userTable[index].values[elemIndex].value }}</div>
          </option>  <!-- INSTEAD OF NUM NEED DESCRIPTION OF RISK VALUES  -->
        </select>
      </td>
      <th colspan = '4'>
        <button class='form-control' @click='addNewRow()'>{{ table.functions.addButton[i18n] }}</button>
      </th>
    </tr>
  </tbody>
  
  </table>

<!--<pre>{{ $data.userDataTable }}</pre>  -->
<!--FOR TESTING AND VIEWING OF JSON ONLY -->
</div>

</template>

<script>
const apiData = require('../assets/risk-table-data.json');
// const userDataTable = require('../assets/risk-user-data.json');
let userData = require('../assets/default-data.json');
import Modal from './modal-component.vue';

export default {
  data(){
    return {
      table: apiData.table,
      userTable: userData.risksTable.tableElements,
      // userTable: userDataTable.tableElements,
      userDataTable: userData.risksTable.elements,
      // userDataTable: userDataTable.elements,
      header: apiData.header,
      tableNav: apiData.tableNav,
      showModal: false,
      newRow: { title: '', risks: [] },
      newRisk: { title: '', rate: '', values: { low: '', middle: '', high:'' } },
      userInput: '',
      sorted: true
    };
  },
  components: {
    modal: Modal
  },
  computed: {
    filteredElements: function () {
        return this.userDataTable
          .filter(el => el.title.toLowerCase().indexOf(this.userInput.toLowerCase()) >-1
        );
    },
    getRiskslength: function(){
      return this.userTable.length;
    }
  },
  // // FOR AJAX  - NOT WORKING YET
  // created: function () {
  //     this.fetchData();
  // },
  props: ['i18n', 'editMode'],
  methods: {
    insertUserData: function(){
      userData = require('../assets/user-data-1.json');
      this.userTable = userData.demandTable.tableElements;
      this.userDataTable = userData.demandTable.elements;
    },
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
      this.userDataTable[idx].risks[idxtwo].description = this.table.header.risks.subElements[idxtwo].values[val-1].value;
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
    renameRisk: function(index, newVal){
      for (let a of this.userDataTable){
        a.risks[index].title = newVal;
      }
    },
    //LOCALIZATION i18n
    changeLocaleTo: function(el){
      let newLocale = el;
      return this.i18n=newLocale;
    },
    // ADD/REMOVE RISKS
    addnewRiskeria: function(title, rate, descriptions){ 
      if (window.confirm('Are you sure you add this Risk Factor?')) {
        this.userTable.push({ 
          "title": title, 
          "rate": rate || 1,
          "values": [{ 
            "value": descriptions[0]
          }, {
            "value": descriptions[1] 
          },{ 
            "value": descriptions[2] 
          }]
        });
        for (var a of this.userDataTable.entries()){
          a[1].risks.push({ 
            "title": title, 
            "rate": rate || 1, 
            "level": 1 
          });
        }
        this.newRisk.title = '',
        this.newRisk.rate = 1,
        this.newRisk.values.low = '',
        this.newRisk.values.middle = '',
        this.newRisk.values.high = '',
        this.showModal = false;
      }
    },
    removeRisk: function(el, idx){
      let elements = this.userTable;
      if (window.confirm('Are you sure you want to delete this Risk Factor?')) {
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
    sortByRisk: function(index){
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

/*#risksTable thead tr {*/
  /*background: #175;*/
  /*color: #fff;*/
/*}*/

</style>

