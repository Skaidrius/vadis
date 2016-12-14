<!--Risk selections main-->
<template>
  
  <div class="parent">
    
    <div class="jumbotron">
      <h2>{{ pageTitle.jumboHead[i18n] }}<br><small>{{ pageTitle.jumboSmall[i18n] }}</small></h2>
    </div>

    <div class='form-inline text-right'>
      <small>
        <span v-if='editMode' class='btn-danger '>{{ header.mode.edit[i18n] }}</span>
        <span v-else class='btn-success '>{{ header.mode.regular[i18n] }}</span>
      </small>
    </div>

    <div class='form-inline text-right'>
        <!--insertData-->
      <button class='form-control' @click='insertUserData()' >InsertData</span></button>
      <!--/insertData-->
    </div>
  
  <nav>
    <ul class="my-tabs nav nav-tabs">
      <router-link to="/risk/risk-table" class="active"><li class='col-xs-2'>{{ tableNav.table[i18n] }}</li></router-link>
      <router-link to="/risk/risk-table-selections"><li class='col-xs-2'>{{ tableNav.legend[i18n] }}</li></router-link>
    </ul>
  </nav>


  <router-view class="child" :i18n='i18n' :editMode='editMode' :userData='userData' :userTable='userTable' :userDataTable='userDataTable'></router-view>

  </div>

</template>

<script>

const apiData = require('../../assets/demand-table-data.json');
let userData = require('../../assets/default-data.json');

    export default {
      data(){
        return {
          userData: userData,
          userTable: userData.risksTable.tableElements,
          userDataTable: userData.risksTable.elements,
          tableNav: apiData.tableNav,
          pageTitle:{
            jumboHead : {
              en: "Risk Management",
              lt: "Rizikos Valdymas" 
            },
            jumboSmall : {
              en: "And Selection",
              lt: "Ir Atranka"
            }
          },
          header: apiData.header,
        };
      },
      methods: {
        insertUserData: function(){
          userData = require('../../assets/user-data-1.json');
          this.userTable = userData.risksTable.tableElements;
          this.userDataTable = userData.risksTable.elements;
        }
      },
      props: ['i18n', 'editMode'],
    };

</script>


<style>



</style>
