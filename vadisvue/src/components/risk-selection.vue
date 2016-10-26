<template>
  <div class="parent">
    
      <h3>Risk selection</h3>
      
      <br />

  
      <router-view class="child"></router-view>

  </div>
 

</template>

<script>

    export default {
      data(){
        return {
          editMode: false,
        };
      },
    };

</script>


<style>



</style>
