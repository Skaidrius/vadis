<template>
  <div class="jumbotron">
    <h1>{{ pageTitle.jumboHead[i18n] }}<br><small>{{ pageTitle.jumboSmall[i18n] }}</small></h1>
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
                en: "Title",
                lt: "Pavadinimas" 
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