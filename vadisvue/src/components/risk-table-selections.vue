<template>
  <div>

  <h4>Selected risks
    <small v-if='editMode' class='btn-danger pull-right'>edit mode</small>
    <small v-else class='btn-success pull-right'>normal mode</small>
  </h4>

  <div class='form-inline text-right'>

    <button v-if='editMode' @click='editMode = false' class='form-control'>Back to read mode</button>
    <button v-else @click='editMode = true' class='form-control'>Click to enter Edit mode</button>
  </div><br/>
  
    <ul class="my-tabs nav nav-tabs">
      <router-link to="/risk/risk-table" class="active"><li class='col-xs-2'>Risk Table</li></router-link>
      <router-link to="/risk/risk-table-selections"><li class='col-xs-2'>Risk factors</li></router-link>
    </ul>
  
  <table id="riskTableSelections" class='table table-hover table-striped table-bordered table-condensed text-centerr'>
    <thead>
      <tr>
        <th :rowspan='2' class='col-xs-1'></th>
        
        <th :rowspan='2' class='col-xs-2'>
        
          <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
            <tr>
              <th>
                <input v-model='table.header.criterias.titles.criterias' class='form-control' :value='table.header.criterias.titles.criterias'>
              </th>
              <th>
                <input v-model='table.header.criterias.titles.rate' class='form-control' :value='table.header.criterias.titles.rate'>
              </th>
            </tr>
          </table>
          <span v-else>{{ table.header.criterias.titles.criterias }} <span class='badge pull-right alert-success'>{{ table.header.criterias.titles.rate }}</span></span>
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
      <tr v-for='(crit, index) in userTable'>
        <td>{{ index+1 }}.</td>
        
        <th  class='text-center'>

          <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
          <tr>
            <td>
              <input v-if='editMode' v-model='crit.title' class='form-control' :value='crit.title'>
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

          <span v-else class='text-center'>{{ crit.title }}<span class='badge pull-right alert-success'>{{crit.rate}}</span></span>
        </th>

        <td v-for='(risk, riskIndex) in crit.values' :class='table.options.risks[riskIndex].style || alert-info'>
          <input v-if='editMode' v-model='risk.value' class='form-control' :value='risk.value' placeholder='Enter a new description'>
          <span v-else>{{ risk.value }}</span>
        </td>

      </tr>
    </tbody>
  </table>

  </div>
  
</template>

<script>
const apiData = require('../assets/risk-table-data.json');
const userData = require('../assets/risk-user-data.json');

export default {
  
  data(){
    return {
      currentLocale: 'en',
      locales : {
        en: {
          
        }
      },
      editMode: false,
      table: apiData.table,
      userTable: userData.tableElements,
      tableData: userData.elements,
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

<style>
  
#riskTableSelections thead tr {
  background: #1a5;
  color: #fff;
}
  
</style>