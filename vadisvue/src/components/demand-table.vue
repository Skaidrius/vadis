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
      <th rowspan='2' class='col-xs-3'> 
        <div v-if='editMode' class="input-group">   <!-- EDIT MODE -->
          <input v-model='table.titles' rows='6' class='form-control fixed' placeholder="Title"> <!-- EDIT TITLES -->
        </div>
        <span v-else @click='sortByTitle()'>        <!-- READ MODE -->
          <a>{{ table.titles }}</a>
        </span> <!-- SORT TITLES -->
      </th>

          <!--  H1 CRITERIAS  -->
      <td :colspan='getCriteriaslength' class='text-center col-xs-6' > 
        <div v-if='editMode' class="input-group">   <!-- EDIT MODE -->
          <input v-model='table.header.criterias.name' class='form-control' placeholder="Criterias">
          <span class="input-group-btn">
            <button class='form-control btn btn-success' @click='addNewCriteria()'>+</button>
          </span>
        </div>
        <span v-else> <!-- READ MODE -->
          {{ table.header.criterias.name }}
        </span>
      </td>

          <!--  H1 IMPORTANCE  -->
      <td  :colspan='table.header.importance.subElements.length' class='col-xs-2'> 
        <input v-if='editMode' v-model='table.header.importance.name' class='form-control' placeholder='Importance'> <!-- EDIT MODE -->
        <span v-else>{{ table.header.importance.name }}</span>  <!-- READ MODE -->
      </td>

          <!--  H1 DEMAND  --> 
      <td :colspan='table.header.demand.subElements.length' class='col-xs-1'> 
        <input v-if='editMode' v-model='table.header.demand.name' class='form-control' placeholder='Demand'> <!-- EDIT MODE -->
        <span v-else>{{ table.header.demand.name }}</span> <!-- READ MODE -->
      </td>

      <td v-if='editMode' rowspan='2'> <!-- EDIT MODE -->
        <div class="form-control">-</div>
      </td>

    </tr>
    <tr>
      <!--  HEADER 2ND LINE  -->
        <!--  H2 CRITERIAS  -->
      <td v-for='(crit, index) in table.header.criterias.subElements' class='form-inline'>
        <div v-if='editMode' class="input-group">             <!-- EDIT MODE -->
          <button class='form-control btn btn-danger' @click='removeCriteria(crit)'>x</button>
          <textarea v-model='crit.name' rows='2' class='form-control' placeholder='Enter new value'></textarea>
        </div>
        <span v-else rows='2' @click='sortByCrit(index)'><a>{{ crit.name }}</a></span> <!-- READ MODE -->
      </td> 
        <!--  H2 IMPORTANCE  -->
      <td v-for='imp in table.header.importance.subElements'>
        <div v-if='editMode' class="input-group">              <!-- EDIT MODE -->
          <textarea v-model='imp.name' rows='3' class='form-control' placeholder='Enter new value'></textarea>
        </div>
        <span v-else rows='3' @click='sortByDemand()'><!-- READ MODE -->
          <a>{{ imp.name }}</a>
        </span> 
      </td>
        <!--  H2 DEMAND  -->
      <td v-for='dem in table.header.demand.subElements'>
        <div v-if='editMode' class="input-group">             <!-- EDIT MODE -->
          <textarea v-model='dem.name' rows='3' class='form-control' placeholder='Enter new value'></textarea>
        </div>
        <span v-else rows='3' @click='sortByDemand()'> <!-- READ MODE -->
          <a>{{ dem.name }}</a>
        </span>
      </td>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td></td>
      <td><input v-if='!editMode' v-model="userInput" class="form-control col-xs-4" placeholder="Search"></td> <!-- SEARCH-->
      <td :colspan='getCriteriaslength+3'></td>
    </tr>
    <tr v-for='(el, index) in filteredElements'>
      <td>{{ index+1 }}.</td>
      <th>
        <textarea v-if='editMode' v-model='el.title' rows='3' class='form-control' placeholder="New Entry"></textarea>
        <div v-else class='text-center'>{{ el.title }}</div>
      </th>
      <td v-for='risk in el.risks'>
        <select v-model='risk.value' class='form-control' :value='getCalcs(index)'>            <!-- EDIT MODE -->
          <option  v-for='elem in table.options.risks' :value= 'elem.value'>{{ elem.name }}</option>
        </select>
        <!--<div v-else>{{ getRiskName(risk.value) }}</div> <!-- READ MODE -->
      </td>

      <td> {{ getImpSum(index) }}</td>
      <td :class='el.demand.style'>{{ el.demand.name }}</td>
      <td>{{ el.demand.days }}</td>
      
      <td v-if='editMode'>
        <button class='btn btn-danger' @click='removeRow(index)'>X</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><br>
        <div>Add new entry</div>
      </td>
      <td :colspan='getCriteriaslength+3'></td>
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
      <td colspan='3'></td>
    </tr>
  </tbody>
  
  <tfoot class='table table-stripped'>

    <tr>
      <th :colspan='getCriteriaslength +3' class='text-right'>
        <span v-if='editMode'><input class='form-control text-right' placeholder='Title' v-model='demandCalc.title'></span>
        <span v-else :colspan='getCriteriaslength +3' class='text-right'> {{ demandCalc.title }}</span> 
      </th>
      <td>{{ daysDemand }}</td>
      <td class='text-left'></td>
    </tr>
    <tr>
      <td :colspan='getCriteriaslength +3' class='text-right'>
        <span v-if='editMode'><input class='form-control text-right' placeholder='Method' v-model='demandCalc.method'></span>
        <span v-else :colspan='getCriteriaslength +3' class='text-right'>{{ demandCalc.method }}</span>
      </td>
      <td>{{ demandCalculated.toFixed(2) }}</td>
      <td class='text-left'></td>
    </tr>
    <tr>
      <th :colspan='getCriteriaslength +3' class='text-right'>
        <span v-if='editMode'><input class='form-control text-right' placeholder='Description' v-model='demandCalc.description'></span>
        <span v-else :colspan='getCriteriaslength +3' class='text-right'>{{ demandCalc.description }}</span>
      </th>
      <td class='text-center'> {{demandCalculated.toFixed(0) }} </td>
      <th class='text-center'>
        <span v-if='editMode'>
          <input class='form-control text-right' placeholder="IA's" v-model='demandCalc.iAuditors'>
        </span>{{ demandCalc.iAuditors }}</span>
      </td>
    </tr>
  </tfoot>


  </table>

<!--<pre>{{ $data.tableData }}</pre>-->
</div>

  
</template>


<script>
const apiData = require('../assets/data.json');

export default {
  data(){
    return {
      newRow: { title: '', risks: [], demand: {} },
      editMode: false,
      userInput: '',
      sorted: true,
      table: apiData.table,
      tableData: apiData.tableData,
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
        return a + b.demand.days;
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
        return a + risk.value;
      }, 0);
    },
    getRiskName: function(el){
      return this.table.options.risks[el].name;
    },
    getRealLength: function(idx){
      return this.tableData[idx].risks.filter(function(x){return typeof x.value == 'number' && x.value != 0 ;}).length;
    },
    getCalcs: function(idx){ //gets importance title 
    
    // let getRealLength = this.tableData[idx].risks.filter(function(x){return x>0;}).length;
    let aveImportance = this.getImpSum(idx) / this.getRealLength(idx);
      // let aveImportance = this.getImpSum(idx) / this.tableData[idx].risks.length;
      let temp = 0;
      const values = this.table.options.importanceValues;
      if (aveImportance > 2.33334) {
        temp = values[3];
      } else if (aveImportance > 1.66667) {
        temp = values[2];
      } else if (aveImportance > 0) {
        temp = values[1];
      } else temp = values[0];
      this.tableData[idx].demand = temp;
    },
    // ADD/REMOVE CRITERIAS
    addNewCriteria: function(){ 
      this.table.header.criterias.subElements.push({ name: 'some New' });
      for (var a of this.tableData){
        a.risks.push({ title: 'some New', value: 0 });
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
            arr.push( {title: elements[index].name, value: value } );
          }
        return arr;
        };
        // let newDemand = this.table.options.importanceValues[0]; //sets value to 0
        // console.log(newRisks);
        // console.log({ title: newTitle, risks: getRisks(), demand: newDemand});
        this.tableData.push({ title: newTitle, risks: getRisks() });
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

.table select > option > p {
  padding: 5px !important;
  color: red;
}

.input-group {
  width: 100%;
}

.table select {
  padding: 0;
  text-align: center;
}

.table select > option {
  text-align: center;
}

textarea {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  resize: none;
}

textarea {
  display: flex;
}

</style>

 <!--   To do - 
 
   add/remove criterias // done
   add/remove entries // done
   search field https://codepen.io/pespantelis/pen/ojwgPB //done
   sort data by table header  //done
   view mode / edit mode

 -->