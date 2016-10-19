<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Vadis
        </a>
        <ul class="nav navbar-nav">
          <!--/<li><router-link to="/ias-demand">IAS demand</router-link></li>-->
          <li><router-link to="/risk-selection">Risk selection</router-link></li>
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