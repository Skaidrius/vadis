<template>
  <div class="jumbotron">
    <h2>{{ pageTitle.jumboHead[i18n] }}<br><small>{{ pageTitle.jumboSmall[i18n] }}</small></h2>
    <p>
      <strong>
        {{ pageTitle.jumboStrong[i18n] }}
      </strong>
    </p>  
  </div>
</template>

<script>

    export default {
      data(){
        return {
          pageTitle: {
            jumboHead : {
                en: "VADIS",
                lt: "VADIS" 
            },
            jumboSmall : {
                en: "(description)",
                lt: "(aprašymas)"
            },
            jumboStrong : {
              en: "Let's Begin",
              lt: "Pradėkime"
            }
          }
        };
      },
      props: ['i18n', 'editMode'],
    };

</script>