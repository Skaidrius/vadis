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
  
    <div class='form-inline text-right'>
    <button v-if='currentLocale == "en"' @click='changeLocale("lt")' class='form-control'>Lt</button>
  
    <button v-else @click='changeLocale("en")' class='form-control'>En</button>
  </div><br/>
  
  <ul class="my-tabs nav nav-tabs">
    <router-link to="/demand/demand-table"><li class='col-xs-2'>Table</li></router-link>
    <router-link to="/demand/demand-table-legend"><li class='col-xs-2'>Legend</li></router-link>
  </ul>
  
  <table id="demandTableLegends"class='table table-hover table-striped table-bordered table-condensed text-centerr'>
    <thead>
      <tr>
        <th :rowspan='2' class='col-xs-1'></th>
        
        <th :rowspan='2' class='col-xs-2'>
        
          <table v-if='editMode' class='table text-center insertedTable '>   <!-- EDIT MODE --> <!-- TABLE INSTERTED TO SPLIT COLUMN TO TWO -->
            <tr>
              <th>
                <input v-model='table.header.criterias.titles.criterias[currentLocale]' class='form-control' :value='table.header.criterias.titles.criterias[currentLocale]'>
              </th>
              <th>
                <input v-model='table.header.criterias.titles.rate[currentLocale]' class='form-control' :value='table.header.criterias.titles.rate[currentLocale]'>
              </th>
            </tr>
          </table>
          <span v-else>{{ table.header.criterias.titles.criterias[currentLocale] }} <span class='badge pull-right alert-success'>{{ table.header.criterias.titles.rate[currentLocale] }}</span></span>
        </th>
        
        <td colspan='3' class='col-xs-9 text-center'>
          <input v-if='editMode' v-model='table.header.criterias.items.title[currentLocale]' class='form-control' :value='table.header.criterias.items.title[currentLocale]'>
          <span v-else>{{ table.header.criterias.items.title[currentLocale] }}</span>
        </td>
        
      </tr>
      
      <tr class='text-center'>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.low[currentLocale]' class='form-control' :value='table.header.criterias.items.values.low[currentLocale]'>
          <span v-else>{{ table.header.criterias.items.values.low[currentLocale] }}</span>
        </th>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.middle[currentLocale]' class='form-control' :value='table.header.criterias.items.values.middle[currentLocale]'>
          <span v-else>{{ table.header.criterias.items.values.middle[currentLocale] }}</span>
        </th>
        <th>
          <input v-if='editMode' v-model='table.header.criterias.items.values.high[currentLocale]' class='form-control' :value='table.header.criterias.items.values.high[currentLocale]'>
          <span v-else>{{ table.header.criterias.items.values.high[currentLocale] }}</span>
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
const apiData = require('../assets/demand-table-data.json');
const userData = require('../assets/demand-user-data.json');

export default {
  
  data(){
    return {
      currentLocale: 'lt',
      locales: {
        en: {

        }
      },
      editMode: false,
      table: apiData.table,
      userTable: userData.tableElements,
      tableData: userData.elements
    };
  },
  methods: {
    changeLocale: function(el){
      let newLocale = el;
      return this.currentLocale=newLocale;
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