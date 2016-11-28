<template>
  <div>

  <!--control buttons-->
  <div class='form-inline text-right'>
    <small>
      <span v-if='editMode' class='btn-danger '>{{ header.mode.edit[i18n] }}</span>
      <span v-else class='btn-success '>{{ header.mode.regular[i18n] }}</span>
    </small><br>
    
    <button class='form-control'>
      <span v-if='editMode' @click='editMode = false' >{{ header.changeModeTo.regular[i18n] }}</span>
      <span v-else @click='editMode = true'>{{ header.changeModeTo.edit[i18n] }}</span>
    </button>
    
    <button class='form-control'>
      <span v-if='i18n == "en"' @click='changeLocaleTo("lt")' >Lt</span>
      <span v-else @click='changeLocaleTo("en")'>En</span>
    </button>
  </div><br/>
  
  <nav>
    <ul class="my-tabs nav nav-tabs">
      <router-link to="/risk/risk-table" class="active"><li class='col-xs-2'>{{ tableNav.table[i18n] }}</li></router-link>
      <router-link to="/risk/risk-table-selections"><li class='col-xs-2'>{{ tableNav.legend[i18n] }}</li></router-link>
    </ul>
  </nav>
  <!--.--- control buttons-->

  <!--risk selections table-->
  <table id="riskTableSelections" class='table table-hover table-striped table-bordered table-condensed text-centerr'>

    <!--HEADER-->
    <thead class="row">
      <tr class='text-center row'>
        <!--risk and rate-->
        <th :rowspan='2' class='text-center'>
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
        <td colspan='3' class='col-xs-7 text-center'>
          <input v-if='editMode' v-model='table.header.risks.items.title[i18n]' class='form-control' :value='table.header.risks.items.title[i18n]'>
          <span v-else>{{ table.header.risks.items.title[i18n] }}</span>
        </td>
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
  
</template>

<script>
const apiData = require('../assets/risk-table-data.json');
const userData = require('../assets/risk-user-data.json');

export default {
  
  data(){
    return {
      i18n: 'en',
      editMode: false,
      table: apiData.table,
      userTable: userData.tableElements,
      tableData: userData.elements,
      header: apiData.header,
      tableNav: apiData.tableNav,
    };
  },
  methods: {
    reRate: function(idx, newVal){ 
      for (let a of this.tableData){
        a.risks[idx].rate = newVal; 
      }
    },
        //LOCALIZATION i18n
    changeLocaleTo: function(el){
      let newLocale = el;
      return this.i18n=newLocale;
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