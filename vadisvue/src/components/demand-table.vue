<template>
  <div>
    
  <h3>Demand of Internal Audit Staff 
  <small v-if='editMode' class='btn-danger pull-right'>edit mode</small>
  <small v-else class='btn-success pull-right'>normal mode</small>
  </h3>
  
  <br />
  <div class='form-inline'>
    <button v-if='editMode' @click='editMode = false' class='form-control'>Back to read mode</button>
    <button v-else @click='editMode = true' class='form-control'>Click to enter Edit mode</button>
  </div><br/>
  
  <table id='risksTable' class='table table-hover table-striped table-bordered table-condensed text-center'> 

  <thead>  
    <tr>
      <!--  HEADER 1ST LINE (H1) -->
      <td rowspan='2'></td>
      
          <!--  H1 ACTIVITY TITLE-->
      <th rowspan='2' class='col-xs-2'> 
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <input v-model='table.titles' rows='6' class='form-control  text-center' placeholder="Title"> <!-- EDIT TITLES -->
        </div>
        <span v-else @click='sortByTitle()'>                                      <!-- READ MODE -->
          <a>{{ table.titles }}</a>
        </span> <!-- SORT TITLES -->
      </th>

          <!--  H1 CRITERIAS  -->
      <td :colspan='getCriteriaslength' class='text-center col-xs-6' > 
        <div v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
          <input v-model='table.header.criterias.name' class='form-control text-center' placeholder="Criterias">
          <span class="input-group-btn">
            <button class='form-control btn btn-success' @click='addNewCriteria()'>+</button>
          </span>
        </div>
        <span v-else>                                                             <!-- READ MODE -->
          {{ table.header.criterias.name }}
        </span>
      </td>

          <!--  H1 IMPORTANCE  -->
      <td  :colspan='table.header.importance.subElements.length' class='col-xs-3'> 
        <input v-if='editMode' v-model='table.header.importance.name' class='form-control  text-center' placeholder='Importance'> <!-- EDIT MODE -->
        <span v-else>{{ table.header.importance.name }}</span>  <!-- READ MODE -->
      </td>

          <!--  H1 DEMAND  --> 
      <td :colspan='table.header.demand.subElements.length' class='col-xs-1'> 
        <input v-if='editMode' v-model='table.header.demand.name' class='form-control  text-center' placeholder='Demand'> <!-- EDIT MODE -->
        <span v-else>{{ table.header.demand.name }}</span> <!-- READ MODE -->
      </td>

      <td v-if='editMode' rowspan='2'>                                            <!-- EDIT MODE -->
        <div class="form-control">-</div>
      </td>

    </tr>
    <tr>
      <!--  HEADER 2ND LINE  -->
        <!--  H2 CRITERIAS  -->
      <td v-for='(crit, index) in table.header.criterias.subElements'>
        
        <table class='table text-center insertedTable '>   <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
          <tr>
            <td class='col-xs-7'>
              <span v-if='editMode' class="input-group">                                 <!-- EDIT MODE --> 
                <button class='form-control btn btn-danger' @click='removeCriteria(crit)'>x</button>
                <textarea v-model='crit.name' rows='2' @keyup='renameCriteria(index, crit.name)' class='form-control' placeholder='Enter new value'></textarea>
              </span>
              <span v-else @click='sortByCrit(index)'><a>{{ crit.name }}</a></span> <!-- READ MODE -->
            </td>
            
            <td class='col-xs-5'>
              <span v-if='editMode' class="input-group">                                 <!-- EDIT MODE -->
                <div class='col-sm-7'>
                  <input v-model='table.options.riskRates.title' length='6' class='form-control text-center col-xs-6' placeholder='Rate'>
                </div>
                <span class="col-xs-5">
                  <select v-model='crit.rate' @change='reRate(index, crit.rate)'class="form-control">
                    <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                  </select>
                </span>
              </span>
              <span v-else>{{table.options.riskRates.title}}: {{ crit.rate }}</span> <!-- READ MODE -->
            </td>
          </tr>
        </table>

      </td> 
        <!--  H2 IMPORTANCE  -->
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
      <td colspan = '6'></td>
    </tr>
    <!-- TBODY ROW -->
    <tr v-for='(el, index) in filteredElements'>
      <td>{{ index+1 }}.</td>                                                                <!-- TBODY / INDEX-->
      <td>
        <textarea v-if='editMode' v-model='el.title' rows='3' class='form-control text-center' placeholder="New Entry"></textarea>
        <div v-else><strong>{{ el.title }}</strong></div>                                     <!-- TBODY / ENTRY TITLE-->
      </td>
      <!-- CRITERIAS -->
      <td v-for='risk in el.risks'>
        <select v-model='risk.value' class='form-control col-xs=10' :value='getImpDescript(index)'> <!-- EDIT MODE -->
          <option  v-for='elem in table.options.risks' :value= 'elem.value'>{{ elem.name }}</option> <!-- TBODY / CRITERIAS-->
        </select>
        <!--<div v-else>{{ getRiskName(risk.value) }}</div>                         <!-- READ MODE -->
      </td>
      <!-- IMPORTANCE-->
      <td> {{ getRangeMin(index) }} - {{ getRangeMax(index) }} </td>                                        <!-- TBODY / IMPORTANCE / RANGE-->
      <td> {{ getImpSum(index) }}</td>                                                        <!-- TBODY / IMPORTANCE / SUM-->
      <td :class='el.impValue.style'>{{ el.impValue.name }}</td>                              <!-- TBODY / IMPORTANCE / VALUE-->
      <!-- DEMAND-->
      <td>{{ el.impValue.days }}</td>                                                         <!-- TBODY / DEMAND DAYS-->
      
      <td v-if='editMode'>
        <button class='btn btn-danger' @click='removeRow(index)'>X</button>                   <!-- TBODY / REMOVE ENTRY BUTTON -->
      </td>
    </tr>
    <tr>
      <td></td>
      <td><br>
        <div>Add new entry</div>
      </td>
      <td v-if='editMode':colspan='getCriteriaslength + 5'></td>
      <td v-else :colspan='getCriteriaslength + 4'></td>
    </tr>
    <tr>
      <th>
        <button class='form-control' @click='addNewRow()'>Add</button> <!-- @click="addNewRow()" -->
      </th>
      <td>
        <input class='form-control' placeholder='New entry' v-model='newRow.title'>
      </td>
      <td v-for='(el, index) in tableData[0].risks'>
        <select class='form-control' v-model='newRow.risks[index]'>            <!-- EDIT MODE -->
          <option  v-for='elem in table.options.risks' :value='elem.value || elem[0]'><p>{{ elem.name }}</p></option>
        </select>
      </td>
      <td v-if='editMode' colspan='5'></td>
      <td v-else colspan='4'></td>
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
      <td v-if='editMode' colspan = '3'></td>
      <td v-else colspan = '2'></td>
      
    </tr>
    <tr>
      <td :colspan='getCriteriaslength + 3' class='text-right'>
        <span v-if='editMode'><input class='form-control text-right' placeholder='Method' v-model='demandCalc.method'></span>
        <span v-else :colspan='getCriteriaslength +3' class='text-right'>{{ demandCalc.method }}</span>
      </td>
      <td>{{ demandCalculated.toFixed(2) }}</td>
      <td v-if='editMode' colspan = '3'></td>
      <td v-else colspan = '2'></td>
    </tr>
    <tr>
      <th :colspan='getCriteriaslength + 3' class='text-right'>
        <span v-if='editMode'><input class='form-control text-right' placeholder='Description' v-model='demandCalc.description'></span>
        <span v-else :colspan='getCriteriaslength +3' class='text-right'>{{ demandCalc.description }}</span>
      </th>
      <td class='text-center'> {{demandCalculated.toFixed(0) }} </td>
      <th v-if='editMode' class='text-left' colspan='3'>
        <span>
          <input class='form-control text-left' placeholder="IA's" v-model='demandCalc.iAuditors'>
        </span>
      </th>
      <th v-else colspan='2'>
        <span> {{ demandCalc.iAuditors }}  </span>
      </th>
    </tr>
  </tfoot>


  </table>

<pre>{{ $data.tableData }}</pre>
</div>

  
</template>


<script>
const apiData = require('../assets/data.json');
const userData = require('../assets/userdata.json');

export default {
  data(){
    return {
      newRow: { title: '', risks: [], importance: {}, demand: {} },
      editMode: false,
      userInput: '',
      sorted: true,
      table: apiData.table,
      tableData: userData.tableData,
      demandCalc: {
        title: 'Total number of days',
        method: 'Divide by 3 (years) and 175 (work days)',
        description: 'IAS demand - CAE and',
        iAuditors: 'internal auditor (-s)'
      }
    };
  },
  computed: {
    filteredElements: function () {
        return this.tableData
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
      return this.tableData.reduce(function(a, b){
        return a + b.impValue.days;
      }, 0);
    },
  },
  // // FOR AJAX
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
    getImpSum: function(idx) { // sums up all importance values
      return this.tableData[idx].risks.reduce(function(a, risk){
        return a + (risk.value*risk.rate);
      }, 0);
    },
    getRangeMin: function(idx){
      return this.tableData[idx].risks.reduce(function(a, b){
        return a + b.rate;
      }, 0);
    },
    getRangeMax: function(idx){
      let length = this.table.options.riskRates.values.length;
      return this.tableData[idx].risks.reduce(function(a, b){
        return a + b.rate * length;
      }, 0);
    },
    getRiskName: function(el){
      return this.table.options.risks[el].name;
    },
    getImpDescript: function(idx){ //calculates importance description
      const thisValue = this.getImpSum(idx); 
      const minRange = this.getRangeMin(idx);
      const maxRange = this.getRangeMax(idx);
      const range = maxRange - minRange;

      let temp = 0;
      const values = this.table.options.importanceValues;  
      if (thisValue >= range * .6667 + minRange) {      //if >= 2/3 of difference + minRange => high 
        temp = values[3];
      } else if (thisValue >= range * .3337 + minRange) {//if >= 1/3 of difference + minRange => middle
        temp = values[2];
      } else if (thisValue > 0) {                         // low
        temp = values[1];
      } else temp = values[0];                            // 0 - just for calculation
      this.tableData[idx].impValue = temp;
    },
    reRate: function(index, newVal){
      for (let a of this.tableData){
        a.risks[index].rate = newVal;
      }
    },
    renameCriteria: function(index, newVal){
      for (let a of this.tableData){
        // console.log('index:' + index + '; title:' + newVal);
        a.risks[index].title = newVal;
      }
    },
    // ADD/REMOVE CRITERIAS
    addNewCriteria: function(){ 
      this.table.header.criterias.subElements.push({ name: 'some New' });
      for (var a of this.tableData){
        a.risks.push({ title: 'some New', rate: 1, value: 0 });
      }
    },
    removeCriteria: function(el){
      let elements = this.table.header.criterias.subElements;
      if (window.confirm('Are you sure you want to delete this criteria?')) {
        elements.splice(elements.indexOf(el), 1);
        for (var a of this.tableData){
          a.risks.splice(a.risks[el], 1);
        }
      }
    },
    // ADD/REMOVE ROWS
    removeRow: function(index){
      if (window.confirm('Are you sure you want to delete this entry?')) {
        this.tableData.splice(index,1);
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
            arr.push( {title: elements[index].name, rate: elements[index].rate, value: value } );
          }
        return arr;
        };
        // let newDemand = this.table.options.importanceValues[0]; //sets value to 0
        // console.log(newRisks);
        // console.log({ title: newTitle, risks: getRisks(), demand: newDemand});
        this.tableData.push({ title: newTitle, risks: getRisks()});
        this.newRow.title = '';
        this.newRow.risks = [];
      }
    },
    sortByTitle: function(){
      this.sorted *=-1;
      return this.tableData.sort((a, b) => a.title > b.title ? this.sorted : this.sorted*-1 );
    },
    sortByCrit: function(index){
      this.sorted *=-1;
      return this.tableData.sort((a, b) => a.risks[index].value > b.risks[index].value ? this.sorted : this.sorted*-1 );
    },
    sortByDemand: function(){
      this.sorted *=-1;
      return this.tableData.sort((a, b) => a.demand.days > b.demand.days ? this.sorted : this.sorted*-1 );
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

.insertedTable .col-sm-7,
.insertedTable .col-sm-5,
.insertedTable .col-xs-7,
.insertedTable .col-xs-5,
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

 <!--   To do - 
 
   add/remove criterias // done
   add/remove entries // done
   search field https://codepen.io/pespantelis/pen/ojwgPB //done
   sort data by table header  //done
   view mode / edit mode

 -->