<template>
  
  <div class="parent">
    
    <div class="jumbotron">
      <h2>{{ pageTitle.jumboHead[i18n] }}<br><small>{{ pageTitle.jumboSmall[i18n] }}</small></h2>
    </div>

      <router-view class="child" :i18n='i18n' :editMode='editMode'></router-view>

  </div>

</template>

<script>

const apiData = require('../../assets/demand-table-data.json');

    export default {
      data(){
        return {
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
      props: ['i18n', 'editMode'],
    };

</script>


<style>



</style>
