<template>
  
  <div>
  
  <h4>IAS demand table legends
    <small v-if='editMode' class='btn-danger pull-right'>edit mode</small>
    <small v-else class='btn-success pull-right'>normal mode</small>
  </h4>
  

  <div class='form-inline text-right'>
    <button v-if='editMode' @click='editMode = false' class='form-control'>Back to read mode</button>
  
    <button v-else @click='editMode = true' class='form-control'>Click to enter Edit mode</button>
  </div><br/>
  
    <ul class="my-tabs nav nav-tabs">
      <router-link to="/demand/demand-table" class="active"><li class='col-xs-2'>Table</li></router-link>
      <router-link to="/demand/demand-table-legend"><li class='col-xs-2'>Legend</li></router-link>
    </ul>
  
  <table id='risksTable' class='table table-hover table-striped table-bordered table-condensed text-center'> 

  <thead>  
    <tr>
      <!--  HEADER 1ST LINE (H1) -->
      <td rowspan='2'></td>
      
          <!--  H1 ACTIVITY TITLE-->
      <th rowspan='2' class='col-xs-2'> 
      
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <input v-model='table.titles' rows='6' class='form-control text-center' placeholder="Title"> <!-- EDIT TITLES -->
        </div>
        
        <span v-else @click='sortByTitle()'>                                      <!-- READ MODE -->
          <a>{{ table.titles }}</a>
        </span> <!-- SORT TITLES -->
      </th>

          <!--  H1 CRITERIAS  -->
      <td :colspan='getCriteriaslength' class='text-center col-xs-7' > 
      
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <div class='col-xs-9'>
            <input v-model='table.header.criterias.titles.criterias' class='form-control text-center' placeholder="Criterias">
          </div>
          <div class="col-xs-3">
            <input v-model='table.header.criterias.titles.rate' class='form-control text-center' placeholder="Rate">
          </div>
          <span class="input-group-btn">
            <button class='form-control btn btn-success' id="show-modal" @click="showModal = true">+</button>
              <modal v-if="showModal" @close="showModal = false">
  <!-- use custom content here to overwrite           -->
                  <h3 slot="header">
                    New criteria
                  </h3>
                  <h4 slot='body'>
                    <div class="form-horizontal">
                      <div class='form-group'>
                        <label class="col-xs-2 control-label">Name:</label>
                        <div class="col-xs-10">
                          <input v-model='newCritTitle' class='form-control text-center' placeholder="Input name">
                        </div>
                      </div>
                      <div class='form-group'>
                        <label class="col-xs-2 control-label">Rate:</label>
                        <div class="col-xs-10">
                          <select v-model='newCritRate' class="form-control"> <!-- need to change it to show rate when adding new criteria   -->
                            <option data-hidden='true' disabled>Pick one...</option>
                            <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                          </select>
                        </div>
                      </div>
                      <div class='form-group form-group-last'>
                        <label class="col-xs-2 control-label"><br> Risk <br> values:</label>
                        <div class="col-xs-10">
                          <input v-model='newCritLow' class='form-control text-center' placeholder="Low risk value">
                          <input v-model='newCritMiddle' class='form-control text-center' placeholder="Middle risk value">
                          <input v-model='newCritHigh' class='form-control text-center' placeholder="High risk value">
                        </div>
                      </div>
                    </div>
                  </h4>
                  <h4 slot='footer'>
                    <button type="button" class="btn btn-primary" @click='addNewCriteria(newCritTitle, newCritRate, [newCritLow, newCritMiddle, newCritHigh]); $emit("close")'>Save changes</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close" @click="$emit('close')">Cancel</button>
                  </h4>
            </modal>
            
          </span>
        </div>
        
        <span v-else>                                                             <!-- READ MODE -->
          {{ table.header.criterias.titles.criterias }} <span class='badge pull-right alert-success'>{{table.header.criterias.titles.rate}}</span>
        </span>
      </td>

          <!--  H1 IMPORTANCE  -->
      <td  colspan='3' class='col-xs-2'> 
      
        <input v-if='editMode' v-model='table.header.importance.name' class='form-control  text-center' placeholder='Importance'> <!-- EDIT MODE -->
        
        <span v-else>{{ table.header.importance.name }}</span>                                                            <!-- READ MODE -->
      </td>

          <!--  H1 DEMAND  --> 
      <td :colspan='table.header.demand.subElements.length' class='col-xs-1'> 
      
        <input v-if='editMode' v-model='table.header.demand.name' class='form-control  text-center' placeholder='Demand'>  <!-- EDIT MODE -->
        
        <span v-else>{{ table.header.demand.name }}</span>                                                                 <!-- READ MODE -->
      </td>
      <td rowspan='2'></td>

    </tr>
    <tr>
      <!--  HEADER 2ND LINE  -->
        <!--  H2 CRITERIAS  -->
      <td v-for='(crit, index) in table.header.criterias.subElements'>
        
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
                    <option data-hidden='true'>Pick one...</option>
                    <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                  </select>
              </span>
            </td>
          </tr>
        </table>
        <span v-else @click='sortByCrit(index)'><a>{{ crit.title }}</a><span class='badge pull-right alert-success'>{{ crit.rate }}</span></span> <!-- READ MODE -->

      </td> 
        <!--  H2 IMPORTANCE  -->
      <td>
        
          <span v-if='editMode'><input class='form-control' placeholder='Range' v-model='range'></span>
          
          <span v-else> {{ range }}</span> 
      </td>
      <td v-for='imp in table.header.importance.subElements'>
        
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <textarea v-model='imp.name' rows='3' class='form-control' placeholder='Enter new value'></textarea> <!--  H2 IMPORTANCE / RANGE | SUM | LEVEL -->
        </div>
        
        <span v-else rows='3' @click='sortByDemand()'>                            <!-- READ MODE -->
          <a>{{ imp.name }}</a>
        </span> 
      </td>
        <!--  H2 DEMAND  -->
      <td v-for='dem in table.header.demand.subElements'>
        
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <textarea v-model='dem.name' rows='3' class='form-control' placeholder='Enter new value'></textarea>
        </div>
        
        <span v-else rows='3' @click='sortByDemand()'>                            <!-- READ MODE -->
          <a>{{ dem.name }}</a>
        </span>
      </td>
    </tr>
  </thead>

  <tbody>
    
    <tr v-if='!editMode'>
      <td></td>
      <td><input v-model="userInput" class="form-control col-xs-4" placeholder="Search"></td> <!-- TBODY / SEARCH-->
      <td :colspan='getCriteriaslength + 5'></td>
    </tr>
    <!-- TBODY ROW -->
    <tr v-for='(el, index) in filteredElements'>
      <td>{{ index+1 }}.</td>                                                                <!-- TBODY / INDEX-->
      <td>
        <textarea v-if='editMode' v-model='el.title' rows='3' class='form-control text-center' placeholder="New Entry"></textarea>
        <div v-else><strong>{{ el.title }}</strong></div>                                     <!-- TBODY / ENTRY TITLE-->
      </td>
      
      <!-- CRITERIAS -->
      <td v-for='(item, indextwo) in el.risks' :class='getRiskStyle(item.risk.value) || "alert-default"'>
        
        <select v-if='editMode' v-model='item.risk.value' class='form-control col-xs=10' @change='changeDescription(index, indextwo, item.risk.value)'> <!-- EDIT MODE -->
          <option data-hidden='true' disabled>Pick one...</option>
          <option  v-for='elem in table.options.risks' :value= 'elem.value'>{{ elem.name }}</option> <!-- TBODY / CRITERIAS-->
        </select>
        
        <div v-else>{{ getRiskName(item.risk.value) }}</div>                         <!-- READ MODE -->
      </td>
      
      <!-- IMPORTANCE-->
      <td :value='getImpDescr(index)'> {{ getRangeMin(index) }} - {{ getRangeMax(index) }} </td>                                        <!-- TBODY / IMPORTANCE / RANGE-->
      <td> {{ getImpSum(index) }}</td>                                                        <!-- TBODY / IMPORTANCE / SUM-->
      <td :class='el.impValue.style'>{{ el.impValue.name }}</td>                              <!-- TBODY / IMPORTANCE / VALUE-->
      <!-- DEMAND-->
      <td>{{ el.impValue.days }}</td>                                                         <!-- TBODY / DEMAND DAYS-->
      
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
        <div>Add new entry</div>
      </td>
      <td :colspan='getCriteriaslength + 5'></td>
    </tr>
    <tr>
      <th>
        <button class='form-control' @click='addNewRow()'>Add</button>
      </th>
      <td>
        <input class='form-control' placeholder='New entry' v-model='newRow.title'>
      </td>
      <td v-for='(el, index) in userData[0].risks'>
        <select class='form-control' v-model='newRow.risks[index]'>            <!-- EDIT MODE -->
          <option data-hidden='true' disabled>Pick one...</option>
          <option  v-for='(elem, elemIndex) in table.options.risks' :value='elem.value || elem[0]'>
            <div class="row">{{ elem.name }} &nbsp; {{ table.header.criterias.subElements[index].values[elemIndex-1] || 0 }}</div>
            </option>  <!-- INSTEAD OF NOME NEED DESCRIPTION OF RISK VALUES  -->
        </select>
      </td>
      <td colspan='5'></td>
    </tr>
  </tbody>
  
            <!-- TFOOT MODE -->
  <tfoot class='table table-stripped'>
    <tr>
      <th :colspan='getCriteriaslength + 3' class='text-right'>
        
        <span v-if='editMode'><input class='form-control text-right' placeholder='Title' v-model='demandCalc.title'></span>
        
        <span v-else :colspan='getCriteriaslength +3' class='text-right'> {{ demandCalc.title }}</span> 
      </th>
      <td>{{ daysDemand }}</td>
      <td colspan = '3'></td>

    </tr>
    <tr>
      <td :colspan='getCriteriaslength + 3' class='text-right'>
        
        <span v-if='editMode'><input class='form-control text-right' placeholder='Method' v-model='demandCalc.method'></span>
        
        <span v-else :colspan='getCriteriaslength +3' class='text-right'>{{ demandCalc.method }}</span>
      </td>
      <td>{{ demandCalculated.toFixed(2) }}</td>
      <td colspan = '3'></td>
    </tr>
    <tr>
      <th :colspan='getCriteriaslength + 3' class='text-right'>
        
        <span v-if='editMode'><input class='form-control text-right' placeholder='Description' v-model='demandCalc.description'></span>
        
        <span v-else :colspan='getCriteriaslength +3' class='text-right'>{{ demandCalc.description }}</span>
      </th>
      <td class='text-center'> {{demandCalculated.toFixed(0) }} </td>
      <th class='text-left' colspan='3'>
        
        <span v-if='editMode' >
          <input class='form-control text-left' placeholder="IA's" v-model='demandCalc.iAuditors'>
        </span>
        
        <span v-else> {{ demandCalc.iAuditors }}  </span>
      </th>
    </tr>
  </tfoot>

  </table>

<pre>{{ $data.userData }}</pre>     <!--FOR TESTING AND VIEWING JSON ONLY -->
</div>

</template>

<script>
const apiData = require('../assets/demand-table-data.json');
const userData = require('../assets/demand-user-data.json');
import Modal from './demand-crit-modal-component.vue';

export default {
  data(){
    return {
      newRow: { title: '', risks: [] },
      editMode: false,
      showModal: false,
      userInput: '',
      range: 'Range',
      sorted: true,
      table: apiData.table,
      userData: userData.elements,
      demandCalc: {
        title: 'Total number of days',
        method: 'Divide by 3 (years) and 175 (work days)',
        description: 'IAS demand - CAE and',
        iAuditors: 'internal auditor (-s)'
      },
      newCritTitle: '',
      newCritRate: '',
      newCritLow: '',
      newCritMiddle: '',
      newCritHigh:''
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
    getCriteriaslength: function(){
      return this.table.header.criterias.subElements.length;
    },
    demandCalculated: function(){ 
      return this.daysDemand / 175 / 3;
    },
    daysDemand: function(){ 
      return this.userData.reduce(function(a, b){
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
    changeDescription: function(idx, idxtwo, val){
      this.userData[idx].risks[idxtwo].risk.description = this.table.header.criterias.subElements[idxtwo].values[val-1].value;
    },
    getImpSum: function(idx) { // sums up all importance values
      return this.userData[idx].risks.reduce(function(a, item){
        return a + (item.rate*item.risk.value);
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
    renameCriteria: function(index, newVal){
      for (let a of this.userData){
        a.risks[index].title = newVal;
      }
    },
    // ADD/REMOVE CRITERIAS
    addNewCriteria: function(title, rate, descriptions){ 
      if (window.confirm('Are you sure you add this Criteria?')) {
        this.table.header.criterias.subElements.push({ 
          name: title, 
          rate: rate || 1,
          values: [{ 
            value: descriptions[0]
          }, {
            value: descriptions[1] 
          },{ 
            value: descriptions[2] 
          }]
        });
        for (var a of this.userData){
          a.risks.push({ 
            title: title, 
            rate: rate || 1, 
            risk: { 
              value: 1, 
              description: descriptions[0] } 
          });
        }
        this.newCritTitle = '',
        this.newCritRate = 1,
        this.newCritLow = '',
        this.newCritMiddle = '',
        this.newCritHigh = '',
        this.showModal = false;
      }
    },
    removeCriteria: function(el, idx){
      let elements = this.table.header.criterias.subElements;
      if (window.confirm('Are you sure you want to delete this criteria?')) {
        elements.splice(idx, 1);
        // elements.splice(elements.indexOf(el), 1);
        for (var a of this.userData){
          a.risks.splice(idx, 1);
          // a.risks.splice(a.risks(el), 1);
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
        let newTitle = this.newRow.title;
        let newRisks = this.newRow.risks;
        let elements = this.table.header.criterias.subElements;
        let getRisks = function(){
          let arr = [];
          for (let [index, value] of newRisks.entries()){
            arr.push({
              title: elements[index].title, 
              rate: elements[index].rate, 
              risk: { 
                value: value,
                description: elements[index].values[value-1].value
              }
            });
          }
        return arr;
        };
        // let newDemand = this.table.options.importanceValues[0]; //sets value to 0
        // console.log(newRisks);
        // console.log({ title: newTitle, risks: getRisks(), demand: newDemand});
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
    sortByCrit: function(index){
      this.sorted *=-1;
      return this.userData.sort((a, b) => a.risks[index].value > b.risks[index].value ? this.sorted : this.sorted*-1 );
    },
    sortByDemand: function(){
      this.sorted *=-1;
      return this.userData.sort((a, b) => a.impValue.days > b.impValue.days ? this.sorted : this.sorted*-1 );
    }
  }
};

</script>

<style>

.table-condensed>thead>tr>th,
.table-condensed>thead>tr>td {
  padding: .7em;
}

.table > tbody > tr > td,
.table > thead > tr > th {
     vertical-align: middle;
     text-align:center
}

/* table header */

.table thead {
  padding: 10px;
} 

thead tr {
  background: #47a;
  color: #fff;
}

thead tr a {
  color: #eed;
  cursor: pointer;
}

thead tr a:hover {
  color: #0c0;
  text-decoration: none;
}

/* table footer */

tfoot tr {
  background: #7bd;
  color: #333;
}

.table select {
  text-align-last: center;
}

.input-group {
  width: 100%;
}

.table select, 
.table input {
  padding: 0;
  text-align: center;
}

.table select > option {
  text-align: center;
}

.insertedTable {
  padding: 0;
  margin: 0;
}

.insertedTable .col-xs-9,
.insertedTable .col-xs-3,
.insertedTable .col-xs-4{
  padding: 2px;
}

textarea {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  resize: none;
}

</style>

