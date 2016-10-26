<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-zoom-in"></i>
          Vadis
        </a>
        <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link">Admin</a>&nbsp;</p>
        <ul class="nav navbar-nav">
          <!--/<li><router-link to="/ias-demand">IAS demand</router-link></li>-->
          <li><router-link to="/front">Front page</router-link></li>
          <li><router-link to="/risk">Risk selection</router-link></li>
          <li><router-link to="/demand">Demand</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="col-sm-1">
   
      </div>
      <div class="col-sm-11">
        <router-view class='view'></router-view>
      </div>
    </div>
  </div>
</template>


 <!--   To do - 
 
  Risk selection
   add/remove criterias         // done
   add/remove entries           // done
   search entries               //done
   sort data by table header    //done
   view mode / edit mode        //done
   removeRow drops error trying remove last element //done
   modal creating criterias with description
   
   AJAX get/write               PENDING...

 Demand
   add/remove criterias         // done
   add/remove entries           // done
   search entries               //done
   sort data by table header    //done
   view mode / edit mode        //done
   removeRow drops error trying remove last element //done
   modal creating criterias with description
   
   AJAX get/write               PENDING...

 -->
 
 <style>

.table-condensed>thead>tr>th,
.table-condensed>thead>tr>td {
  padding: .7em;
}

.table > tbody > tr > td,
.table > thead > tr > th {
     vertical-align: middle;
     text-align:center
}

/* table header */

.table thead {
  padding: 10px;
} 

thead tr a {
  color: #eed;
  cursor: pointer;
}

thead tr a:hover {
  color: #0c0;
  text-decoration: none;
}

/* table footer */

tfoot tr {
  background: #7bd;
  color: #333;
}

.table select {
  text-align-last: center;
}

.input-group {
  width: 100%;
}

.table select, 
.table input {
  padding: 0;
  text-align: center;
}

.table select > option {
  text-align: center;
}

.insertedTable {
  padding: 0;
  margin: 0;
}

.insertedTable .col-xs-9,
.insertedTable .col-xs-3,
.insertedTable .col-xs-4{
  padding: 2px;
}

textarea {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  resize: none;
}

</style>