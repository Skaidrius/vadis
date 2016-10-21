<template>
  <div>

  <h4>IAS demand table 
    <small v-if='editMode' class='btn-danger pull-right'>edit mode</small>
    <small v-else class='btn-success pull-right'>normal mode</small>
  </h4>

  <div class='form-inline text-right'>

    <button v-if='editMode' @click='editMode = false' class='form-control'>Back to read mode</button>
    <button v-else @click='editMode = true' class='form-control'>Click to enter Edit mode</button>
  </div><br/>
  
  <div class="my-tabs">
    <router-link to="/demand/demand-table"><button>Table</button></router-link>
    <router-link to="/demand/demand-table-legend"><button>Legend</button></router-link>
  </div>
  
  <table class='table table-hover table-striped table-bordered table-condensed text-centerr'>
    <thead>
      <tr>
        <th :rowspan='2' class='col-xs-1'></th>
        <th :rowspan='2' class='col-xs-2'>
          <input v-if='editMode' v-model='table.header.criterias.name' class='form-control' :value='table.header.criterias.name'>
          <span v-else>{{ table.header.criterias.name }}</span>
        </th>
        <td colspan='3' class='col-xs-9 text-center'>
          <input v-if='editMode' v-model='table.header.criterias.items.title' class='form-control' :value='table.header.criterias.items.title'>
          <span v-else>{{ table.header.criterias.items.title }}</span>
        </td>
      </tr>
      <tr class='text-center'>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.low' class='form-control' :value='table.header.criterias.items.values.low'>
          <span v-else>{{ table.header.criterias.items.values.low }}</span>
        </th>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.middle' class='form-control' :value='table.header.criterias.items.values.middle'>
          <span v-else>{{ table.header.criterias.items.values.middle }}</span>
        </th>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.high' class='form-control' :value='table.header.criterias.items.values.high'>
          <span v-else>{{ table.header.criterias.items.values.high }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(crit, index) in table.header.criterias.subElements'>
        <td>{{ index+1 }}.</td>
        
        <th  class='text-center'>
          
          
          <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
          <tr>
            <td>
              <input v-if='editMode' v-model='crit.name' class='form-control' :value='crit.name'>
            </td>
            <td>
              <span class="input-group">                                 <!-- EDIT MODE -->
                  <select v-model='crit.rate' @change='reRate(index, crit.rate)' class="form-control"> <!-- need to change it to show rate when adding new criteria   -->
                    <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                  </select>
              </span>
            </td>
          </tr>
          </table>

          <span v-else class='text-center'>{{ crit.name }}<span class='badge pull-right alert-primary'>{{crit.rate}}</span></span>
        </th>

        <td class='alert-success'>
          <input v-if='editMode' v-model='crit.values.low' class='form-control' :value='crit.values.low'>
          <span v-else>{{ crit.values.low }}</span>
        </td>
        
        <td class='alert-warning'>
          <input v-if='editMode' v-model='crit.values.middle' class='form-control' :value='crit.values.middle'>
          <span v-else>{{ crit.values.middle }}</span>
        </td>
        <td class='alert-danger'>
          <input v-if='editMode' v-model='crit.values.high' class='form-control' :value='crit.values.high'>
          <span v-else>{{ crit.values.high }}</span>
        </td>
      
      </tr>
    </tbody>
  </table>

  </div>
  
</template>

<script>
const apiData = require('../assets/data.json');
const userData = require('../assets/userdata.json');

export default {
  
  data(){
    return {
      values: "Values",
      editMode: false,
      table: apiData.table,
      tableData: userData.tableData
    };
  },
  methods: {
    reRate: function(index, newVal){
      for (let a of this.tableData){
        a.risks[index].rate = newVal;
      }
    }
  }
  
};

</script>

