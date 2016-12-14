<!--Demand  main-->
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
        <router-link to="/demand/demand-table" class="active"><li class='col-xs-2'>{{ tableNav.table[i18n] }}</li></router-link>
        <router-link to="/demand/demand-table-selections"><li class='col-xs-2'>{{ tableNav.legend[i18n] }}</li></router-link>
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
          userTable: userData.demandTable.tableElements,
          userDataTable: userData.demandTable.elements,
          tableNav: apiData.tableNav,
          pageTitle:{
            jumboHead : {
                en: "Demand",
                lt: "Vidaus audito" 
            },
            jumboSmall : {
                en: "Of Internal Audit Staff",
                lt: "Poreikis"
            }
          },
          header: apiData.header,
        };
      },
      methods: {
        insertUserData: function(){
          userData = require('../../assets/user-data-1.json');
          this.userTable = userData.demandTable.tableElements;
          this.userDataTable = userData.demandTable.elements;
        }
      },
      props: ['i18n', 'editMode'],
    };

</script>


<style>

    .my-tabs {
        margin: 0;
        padding: 0;
    }
    .my-tabs li{
        display: inline-block;
        background: white;
        border: 1px white solid;
        border-bottom: none;
        width: 32em;
        padding: 20px;
        text-align: center;
    }
  .my-tabs li:hover,
  .my-tabs li:active,
  .my-tabs li:focus
 {
    background: #ddd;
    border: 1px #ccc solid;
    border-radius: 5px 5px 0 0;
    border-bottom: none;
  } 
    
</style>

 <!--   To do - 
 
   add/remove criterias         // done
   add/remove entries           // done
   search entries               //done
   sort data by table header    //done
   view mode / edit mode        //done
   removeRow drops error trying remove last element //done
   modal creating criterias with description
   
   AJAX get/write               PENDING...

 -->