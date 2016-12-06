<template>
  
  <div class="parent">
    
    <div class="jumbotron">
      <h2>Risk Selection<br><small>And Management</small></h2>
  
    </div>

      <router-view class="child" :i18n='i18n' :editMode='editMode'></router-view>

  </div>

</template>

<script>

const apiData = require('../assets/demand-table-data.json');

    export default {
      data(){
        return {
          header: apiData.header,
        };
      },
      props: ['i18n', 'editMode'],
    };

</script>


<style>



</style>
