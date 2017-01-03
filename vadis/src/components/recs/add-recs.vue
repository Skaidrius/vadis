<!--Add new recommendation-->
<template>
  <div>

    <div class='panel panel-default'>
    
      <div class="panel-body">
        <h3>{{ functions.titles.addNew[i18n] }}</h3>
      </div>

      <table class='table table-hover table-striped table-bordered table-condensed text-center'>
          <thead>
              <tr>
                <th class='col-xs-3'><input :placeholder="functions.report[i18n]" class='form-control'></th>
                <th class='col-xs-1'><input :placeholder="functions.recNo[i18n]" class='form-control'></th>
                <th class='col-xs-4'><input :placeholder="functions.content[i18n]" class='form-control'></th>
                <th class='col-xs-1'>
                  <select class='form-control'>
                    <option selected disabled>{{ functions.recRate.title[i18n] }}</option>
                    <option v-for='rate in functions.recRate.values'>{{ rate[i18n] }}</option>
                  </select>
                </th>
                <th class='col-xs-1'><input :placeholder="functions.measure[i18n]" class='form-control'></th>
                <th class='col-xs-1'><input :placeholder="functions.period[i18n]" class='form-control'></th>
                <th class='col-xs-1'><button class="form-control">{{ functions.addButton[i18n] }}</button></th>
              </tr>
            </thead>
        </table>
        
      <div class="panel-footer"></div>

    </div>

  </div>
</template>

<script>
  
// const apiData = require('../../assets/recommend-table-data.json');

module.exports =  {
  data(){
    return {
    };
  },
  methods: {
      //add recs to data.json
  },
  props: ["i18n", "editMode", "functions"]
};
  
</script>