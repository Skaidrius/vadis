<template>
  
  <div class="parent">
    
      <h3>Risk selection</h3>
      
      <br />
      
      <div class='form-inline text-right'>
        <small>
          <span v-if='editMode' class='btn-danger '>{{ header.mode.edit[i18n] }}</span>
          <span v-else class='btn-success '>{{ header.mode.regular[i18n] }}</span>
        </small><br>

    </div><br/>

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
