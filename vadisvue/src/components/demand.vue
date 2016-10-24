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