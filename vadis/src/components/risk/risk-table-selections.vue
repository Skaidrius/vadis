<!--Risk selections Selected risks-->
<template>
  <div>

    <div class='panel panel-default'>
    
      <div class="panel-body">
        <h3>{{ header.risklegendstitle[i18n] }}</h3>
      </div>

      <!--risk selections table-->
      <table id="riskTableSelections" class='table table-hover table-striped table-bordered table-condensed text-centerr'>
    
        <!--HEADER-->
        <thead>
          <tr class='text-center row'>
            <!--risk and rate-->
            <th :rowspan='2' class='col-xs-3'>
              <!--table for splitting row to risks and rate EDIT MODE-->
              <table v-if='editMode' class='table insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
                <tr>
                  <th><input v-model='table.header.risks.title.risks[i18n]' class='form-control' :value='table.header.risks.title.risks[i18n]'></th>
                  <th><input v-model='table.header.risks.title.rate[i18n]' class='form-control' :value='table.header.risks.title.rate[i18n]'></th>
                </tr>
              </table>
              <!--table for splitting row to risks and rate REGULAR MODE-->
              <span v-else>{{ table.header.risks.title.risks[i18n] }} <span class='badge pull-right alert-success'>{{ table.header.risks.title.rate[i18n] }}</span></span>
            </th>
            
            <!--values title-->
            <th colspan='3' class='col-xs-9'>
              <input v-if='editMode' v-model='table.header.risks.items.title[i18n]' class='form-control' :value='table.header.risks.items.title[i18n]'>
              <span v-else>{{ table.header.risks.items.title[i18n] }}</span>
            </th>
          </tr>
          
          <!-- H2 values: low, middle, high-->
          <tr class='text-center row'>
            <th v-for='val in table.header.risks.items.values' class="col-xs-3 text-center">
              <input v-if='editMode' v-model='val[i18n]' class='form-control' :value='val[i18n]'>
              <span v-else>{{ val[i18n] }}</span>
            </th>
          </tr>
          
        </thead>
        
        <!--body-->
        <tbody>
          <tr v-for='(risk, index) in userTable'>
            <td>{{ index+1 }}.</td>
            
            <th  class='text-center'>
    
              <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
              <tr>
                <td>
                  <input v-if='editMode' v-model='risk.title' class='form-control' :value='risk.title'>
                </td>
                <td>
                  <span class="input-group">                                 <!-- EDIT MODE -->
                    <select v-model='risk.rate' @change='reRate(index, risk.rate)' class="form-control"> <!-- need to change it to show rate when adding new riskeria --> 
                      <option v-for='val in table.options.riskRates.values' :value="val">{{val}}</option>
                    </select>
                  </span>
                </td>
              </tr>
              </table>
    
              <span v-else class='text-center'>{{ risk.title }}<span class='badge pull-right alert-success'>{{risk.rate}}</span></span>
            </th>
    
            <td v-for='(risk, riskIndex) in risk.values' :class='table.options.risks[riskIndex].style || alert-info'>
              <input v-if='editMode' v-model='risk.value' class='form-control' :value='risk.value' placeholder='Enter a new description'>
              <span v-else>{{ risk.value }}</span>
            </td>
    
          </tr>
        </tbody>
      </table>
      
    </div>

  </div>
</template>

<script>
const apiData = require('../../assets/risk-table-data.json');

export default {
  
  data(){
    return {
      table: apiData.table,
      header: apiData.header,
      tableNav: apiData.tableNav,
    };
  },
  props: ['i18n', 'editMode', 'userData', 'userTable', 'userDataTable'],
  methods: {
    reRate: function(idx, newVal){ 
      for (let a of this.userTableData){
        a.risks[idx].rate = newVal; 
      }
    }
  }
  
};

</script>

<style>
  
/*#riskTableSelections thead tr {*/
/*  background: #1a5;*/
/*  color: #fff;*/
/*}*/
  
</style>