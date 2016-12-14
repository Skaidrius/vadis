<template>
  <div>

  <!--DEMAND LEGENDS TABLE-->
  <table id="demandTableLegends"class='table table-hover table-striped table-bordered table-condensed text-centerr'>
    <thead class="row">
      <tr class='text-center row'>
        <th :rowspan='2' class='text-center'>
          <table v-if='editMode' class='table insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
            <tr>
              <th><input v-model='table.header.criterias.titles.criterias[i18n]' class='form-control' :value='table.header.criterias.titles.criterias[i18n]'></th>
              <th><input v-model='table.header.criterias.titles.rate[i18n]' class='form-control' :value='table.header.criterias.titles.rate[i18n]'></th>
            </tr>
          </table>
          <span v-else>{{ table.header.criterias.titles.criterias[i18n] }} <span class='badge pull-right alert-success'>{{ table.header.criterias.titles.rate[i18n] }}</span></span>
        </th>
        
        <th colspan='3' class='col-xs-9 text-center'>
          <input v-if='editMode' v-model='table.header.criterias.items.title[i18n]' class='form-control' :value='table.header.criterias.items.title[i18n]'>
          <span v-else>{{ table.header.criterias.items.title[i18n] }}</span>
        </th>
        
      </tr>

      <tr class='text-center row'>
        <th v-for="val in table.header.criterias.items.values" class="col-xs-3 text-center">
          <input v-if='editMode' v-model='val[i18n]' class='form-control' :value='val[i18n]'>
          <span v-else>{{ val[i18n] }}</span>
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
              <input v-if='editMode' v-model='crit.title' class='form-control' :value='crit.title' :placeholder='table.functions.newEntry[i18n]'>
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
          <input v-if='editMode' v-model='risk.value' class='form-control' :value='risk.value' :placeholder='table.functions.addNewDescription[i18n]'>
          <span v-else>{{ risk.value }}</span>
        </td>

      </tr>
    </tbody>
  </table>

  </div>
  
</template>

<script>
const apiData = require('../../assets/demand-table-data.json');

export default {
  
  data(){
    return {
      table: apiData.table,
      header: apiData.header,
      tableNav: apiData.tableNav,
    };
  },
  props: ['i18n', 'editMode', 'userData', 'userDataTable', 'userTable' ],
  methods: {
    reRate: function(idx, newVal){
      for (let a of this.userDataTable){
        a.risks[idx].rate = newVal;
      }
    }
  }
};

</script>

<style>

/*#demandTableLegends thead tr {*/
/*  background: #2aa;*/
/*  color: #fff;*/
/*}*/

</style>