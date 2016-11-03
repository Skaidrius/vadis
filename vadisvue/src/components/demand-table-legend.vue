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
      <router-link to="/demand/demand-table" class="active"><li class='col-xs-2'>{{ tableNav.table[i18n] }}</li></router-link>
      <router-link to="/demand/demand-table-legend"><li class='col-xs-2'>{{ tableNav.legend[i18n] }}</li></router-link>
    </ul>
  
  <table id="demandTableLegends"class='table table-hover table-striped table-bordered table-condensed text-centerr'>
    <thead>
      <tr>
        <th :rowspan='2' class='col-xs-1'></th>
        
        <th :rowspan='2' class='col-xs-2'>
        
          <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
            <tr>
              <th>
                <input v-model='table.header.criterias.titles.criterias[i18n]' class='form-control' :value='table.header.criterias.titles.criterias[i18n]'>
              </th>
              <th>
                <input v-model='table.header.criterias.titles.rate[i18n]' class='form-control' :value='table.header.criterias.titles.rate[i18n]'>
              </th>
            </tr>
          </table>
          <span v-else>{{ table.header.criterias.titles.criterias[i18n] }} <span class='badge pull-right alert-success'>{{ table.header.criterias.titles.rate[i18n] }}</span></span>
        </th>
        
        <td colspan='3' class='col-xs-9 text-center'>
          <input v-if='editMode' v-model='table.header.criterias.items.title[i18n]' class='form-control' :value='table.header.criterias.items.title[i18n]'>
          <span v-else>{{ table.header.criterias.items.title[i18n] }}</span>
        </td>
        
      </tr>
      
      <tr class='text-center'>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.low[i18n]' class='form-control' :value='table.header.criterias.items.values.low[i18n]'>
          <span v-else>{{ table.header.criterias.items.values.low[i18n] }}</span>
        </th>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.middle[i18n]' class='form-control' :value='table.header.criterias.items.values.middle[i18n]'>
          <span v-else>{{ table.header.criterias.items.values.middle[i18n] }}</span>
        </th>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.high[i18n]' class='form-control' :value='table.header.criterias.items.values.high[i18n]'>
          <span v-else>{{ table.header.criterias.items.values.high[i18n] }}</span>
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
const apiData = require('../assets/demand-table-data.json');
const userData = require('../assets/demand-user-data.json');

export default {
  
  data(){
    return {
      i18n: 'en',
      locales: {
        en: {

        }
      },
      editMode: false,
      table: apiData.table,
      userTable: userData.tableElements,
      tableData: userData.elements,
      header: apiData.header,
      tableNav: apiData.tableNav,
    };
  },
  methods: {
    changeLocaleTo: function(el){
      let newLocale = el;
      return this.i18n=newLocale;
    },
    reRate: function(index, newVal){
      for (let a of this.tableData){
        a.risks[index].rate = newVal;
      }
    }
  }
  
};

</script>

<style>

#demandTableLegends thead tr {
  background: #2aa;
  color: #fff;
}

</style>