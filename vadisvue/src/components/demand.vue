<template>
  <div class="parent">
    
      <h3>Demand of Internal Audit Staff</h3>
      
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

    .my-tabs {
        margin: 0;
        padding: 0;
    }
    .my-tabs button {
        display: inline-block;
        background: white;
        border: 1px white solid;
        border-bottom: none;
        width: 32em;
        padding: 20px;
        text-align: center;
    }
  .my-tabs button:hover,
  .my-tabs button:active,
  .my-tabs button:focus
 {
    background: #ddd;
    border: 1px #ccc solid;
    border-radius: 5px 5px 0 0;
    border-bottom: none;
  } 
    
</style>