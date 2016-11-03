<template>
  
  <div>
  
  <h4>{{ header.title[i18n]  }}
    <small v-if='editMode' class='btn-danger pull-right'>{{ header.mode.edit[i18n] }}</small>
    <small v-else class='btn-success pull-right'>{{ header.mode.regular[i18n] }}</small>
  </h4>
  

  <div class='form-inline text-right'>
    <button v-if='editMode' @click='editMode = false' class='form-control'>{{ header.changeModeTo.regular[i18n] }}</button>
  
    <button v-else @click='editMode = true' class='form-control'>{{ header.changeModeTo.edit[i18n] }}</button>
  </div><br/>
  
  <div class='form-inline text-right'>
    <button v-if='i18n == "en"' @click='changeLocaleTo("lt")' class='form-control'>Lt</button>
  
    <button v-else @click='changeLocaleTo("en")' class='form-control'>En</button>
  </div><br/>
  
    <ul class="my-tabs nav nav-tabs">
      <router-link to="/risk/risk-table" class="active"><li class='col-xs-2'>{{ tableNav.table[i18n] }}</li></router-link>
      <router-link to="/risk/risk-table-selections"><li class='col-xs-2'>{{ tableNav.legend[i18n] }}</li></router-link>
    </ul>
  
  <table id='risksTable' class='table table-hover table-striped table-bordered table-condensed text-center'> 

  <thead>  
    <tr>
        <!--HEADER 1ST LINE (H1) -->
      <td rowspan='2'></td>
      
            <!--H1 ACTIVITY TITLE-->
      <th rowspan='2' class='col-xs-2'> 
      
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <input v-model='table.title[i18n]' rows='6' class='form-control text-center' :placeholder="table.title[i18n]"> <!-- EDIT TITLES -->
        </div>
        
        <span v-else @click='sortByTitle()'>                                      <!-- READ MODE -->
          <a>{{ table.title[i18n] }}</a>
        </span> <!-- SORT TITLES -->
      </th>

            <!--H1 RISK FACTORS  -->
      <td :colspan='getRiskslength' class='text-center col-xs-7' > 
      
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <div class='col-xs-9'>
            <input v-model='table.header.risks.title.risks[i18n]' class='form-control text-center' :placeholder="table.header.risks.title.risks[i18n]">
          </div>
          <div class="col-xs-3">
            <input v-model='table.header.risks.title.rate[i18n]' class='form-control text-center' :placeholder="table.header.risks.title.rate[i18n]">
          </div>
          <span class="input-group-btn">
            <button class='form-control btn btn-success' id="show-modal" @click="showModal = true">+</button>
              <modal v-if="showModal" @close="showModal = false">
   <!--use custom content here to overwrite           -->
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
                            <option data-hidden='true' disabled>{{ table.modal.pickOne[i18n] }}</option>
                            <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                          </select>
                        </div>
                      </div>
                      <div class='form-group form-group-last'>
                        <label class="col-xs-2 control-label">{{  table.modal.riskValues[i18n] }}</label>
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
      </td>

            <!--H1 IMPORTANCE  -->
      <td  colspan='3' class='col-xs-2'> 
      
        <input v-if='editMode' v-model='table.header.importance.name[i18n]' class='form-control  text-center' placeholder='Importance'> <!-- EDIT MODE -->
        
        <span v-else>{{ table.header.importance.name[i18n] }}</span>                                                            <!-- READ MODE -->
      </td>

      <td rowspan='2'></td>

    </tr>
    <tr>
        <!--HEADER 2ND LINE  -->
          <!--H2 RISK FACTORS  -->
      <td v-for='(risk, index) in userTable'>
        
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
                    <option data-hidden='true'>Pick one...</option>
                    <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                  </select>
              </span>
            </td>
          </tr>
        </table>
        <span v-else @click='sortByRisk(index)'><a>{{ risk.title }}</a><span class='badge pull-right alert-success'>{{ risk.rate }}</span></span> <!-- READ MODE -->

      </td> 
          <!--H2 Risk rate  -->
      <td>
          <textarea v-if='editMode' rows='3' v-model='table.header.risks.title.range[i18n]' class='form-control' :placeholder='table.header.risks.title.range[i18n]'></textarea>
          
          <span v-else> {{ table.header.risks.title.range[i18n] }}</span> 
      </td>
      <td v-for='imp in table.header.importance.subElements'>
        
        <div v-if='editMode'>                                 <!-- EDIT MODE -->
          <textarea v-model='imp.name[i18n]' rows='3' class='form-control' placeholder='Enter new value'></textarea> <!--  H2 IMPORTANCE / RANGE | SUM | LEVEL -->
        </div>
        
        <span v-else rows='3' @click='sortByDemand()'>                            <!-- READ MODE -->
          <a>{{ imp.name[i18n] }}</a>
        </span> 
      </td>

    </tr>
  </thead>

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
          <option data-hidden='true' disabled>Pick one...</option>
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
    <tr>
      <td></td>
      <td><br>
        <div>{{ table.functions.addEntry[i18n] }}</div>
      </td>
      <td :colspan='getRiskslength + 5'></td>
    </tr>
    <tr>
      <th>
        <button class='form-control' @click='addNewRow()'>{{ table.functions.addButton[i18n] }}</button>
      </th>
      <td>
        <input class='form-control' :placeholder='table.functions.newEntry[i18n]' v-model='newRow.title'>
      </td>
      <td v-for='(el, index) in userData[0].risks'>
        <select class='form-control' v-model='newRow.risks[index]'>            <!-- EDIT MODE -->
          <option data-hidden='true' disabled>{{ table.functions.pickOne[i18n] }}...</option>
          <option  v-for='(elem, elemIndex) in table.options.risks' :value='elem.value || elem[0]'>
            <div class="row">{{ elem.name[i18n] }} &nbsp; {{ userTable[index].values[elemIndex].value }}</div>
            </option>  <!-- INSTEAD OF NOME NEED DESCRIPTION OF RISK VALUES  -->
        </select>
      </td>
      <td colspan='5'></td>
    </tr>
  </tbody>
  
  </table>

<!--<pre>{{ $data.userData }}</pre>  -->
<!--FOR TESTING AND VIEWING OF JSON ONLY -->
</div>

</template>

<script>
const apiData = require('../assets/risk-table-data.json');
const userData = require('../assets/risk-user-data.json');
import Modal from './demand-crit-modal-component.vue';

export default {
  data(){
    return {
      table: apiData.table,
      userTable: userData.tableElements,
      userData: userData.elements,
      header: apiData.header,
      tableNav: apiData.tableNav,
      editMode: false,
      showModal: false,
      i18n: 'en',
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
        return this.userData
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
      this.userData[idx].risks[idxtwo].description = this.table.header.risks.subElements[idxtwo].values[val-1].value;
    },
    getImpSum: function(idx) { // sums up all importance values
      return this.userData[idx].risks.reduce(function(a, item){
        return a + (item.rate*item.level);
      }, 0);
    },
    getRangeMin: function(idx){
      return this.userData[idx].risks.reduce(function(a, b){
        return a + b.rate;
      }, 0);
    },
    getRangeMax: function(idx){
      let length = this.table.options.riskRates.values.length;
      return this.userData[idx].risks.reduce(function(a, b){
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
      this.userData[idx].impValue = temp;
    },
    reRate: function(index, newVal){
      for (let a of this.userData){
        a.risks[index].rate = newVal;
      }
    },
    renameRisk: function(index, newVal){
      for (let a of this.userData){
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
        for (var a of this.userData.entries()){
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
        for (var a of this.userData){
          a.risks.splice(idx, 1);
        }
      }
    },
    // ADD/REMOVE ROWS
    removeRow: function(index){                        
      if (window.confirm('Are you sure you want to delete this entry?')) {
        this.userData.splice(index, 1);
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
        this.userData.push({ 
          title: newTitle, 
          risks: getRisks()
        });
        this.newRow.title = '';
        this.newRow.risks = [];
      }
    },
    sortByTitle: function(){
      this.sorted *=-1;
      return this.userData.sort((a, b) => a.title > b.title ? this.sorted : this.sorted*-1 );
    },
    sortByRisk: function(index){
      this.sorted *=-1;
      return this.userData.sort((a, b) => a.risks[index].level > b.risks[index].level ? this.sorted : this.sorted*-1 );
    },
    sortByDemand: function(){
      this.sorted *=-1;
      return this.userData.sort((a, b) => a.impValue.days > b.impValue.days ? this.sorted : this.sorted*-1 );
    }
  }
};

</script>

<style>

#risksTable thead tr {
  background: #175;
  color: #fff;
}

</style>

