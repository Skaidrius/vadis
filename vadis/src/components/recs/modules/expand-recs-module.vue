<template id="expand-recs">
  <div>
    
      <!--Expanded recs table - shows if edit mode or cell checked -->
      <table class='table'>
        <thead>
          <tr>
            <th class='no-padding'></th>
            <th class='no-padding'>{{ functions.person[i18n] }}</th>
            <th class='no-padding'>{{ functions.position[i18n] }}</th>
            <th class='no-padding'>{{ functions.email[i18n] }}</th>
            <th v-if='editMode' class='no-padding'></th>
          </tr>
        </thead>
        <tbody>
  <!--IF ANY RESPONSIBLE PERSON-->
          <tr v-if='data.responsibles' v-for='(responsibles, no) in data.responsibles' class='responsibles'>
            <!--RESPONSIBLE persons-->
            <th class='pull-right no-padding'>
              <span v-if='no == 0'>
                {{ functions.responsible[i18n] }}
              </span>
              <span v-else></span>
            </th>
            <td v-if='editMode' class='no-padding'><input v-model='data.responsibles[no].person' :placeholder='data.responsibles[no].person' class='form-control'></td>
            <td v-if='editMode' class='no-padding'><input v-model='data.responsibles[no].duties' :placeholder='data.responsibles[no].duties' class='form-control'/></td>
            <td v-if='editMode' class='no-padding'><input v-model='data.responsibles[no].email' :placeholder='data.responsibles[no].email' class='form-control'/></td>
            <td class='col-xs-1 no-padding btn-group' v-if='editMode'>
              <!--BUTTONSREMOVE RESPONSIBLE-->
              <button class='form-control' v-on:click='delResponsible(index, no)'>{{ functions.delButton[i18n] }}</button>
            </td>
            
            <td v-if='!editMode' v-for='( person, key ) in responsibles' class='no-padding'>
              <!--CHANGE POINTER AND SEND MAIL COMMAND ??? -->
              <a v-if='key == "email"' class='email'>{{ person }}</a>
              <span v-else>{{ person }}</span>
            </td>

          </tr>

          <tr >
            <!--ADD RESPONSIBLE STAFF -->
            <th class='pull-right no-padding'>
<!--THIS DONT SHOWS IF NO RESPONSIBLES-->
              <span v-if='no==0'>
                {{ functions.responsibles[i18n] }}
              </span>
              <span v-else></span>
            </th>
            <td v-if='editMode' class='no-padding'><input v-model='newResponsible.person' :placeholder='functions.person[i18n]' class='form-control'></td>
            <td v-if='editMode' class='no-padding'><input v-model='newResponsible.duties' :placeholder='functions.position[i18n]' class='form-control'/></td>
            <td v-if='editMode' class='no-padding'><input v-model='newResponsible.email' :placeholder='functions.email[i18n]' class='form-control'/></td>
            <td class='col-xs-1 no-padding' v-if='editMode'>
               <!--BUTTONS ADD RESPONSIBLE-->
              <button class='form-control' v-on:click='addNewResponsible(newResponsible.person, newResponsible.duties, newResponsible.email, index)'>{{ functions.addButton[i18n] }}</button>
            </td>
            
          </tr>


          <tr v-for='(curation, no) in data.curation' class='curation'>
            <!--CURATORS -->
            <th class='pull-right no-padding'>
              <span v-if='no==0'>
                {{ functions.curators[i18n] }}
              </span>
              <span v-else></span>
            </th>
            <td v-if='editMode' class='no-padding'><input v-model='data.curation[no].person' :placeholder='data.curation[no].person' class='form-control'></td>
            <td v-if='editMode' class='no-padding'><input v-model='data.curation[no].duties' :placeholder='data.curation[no].duties' class='form-control'/></td>
            <td v-if='editMode' class='no-padding'><input v-model='data.curation[no].email' :placeholder='data.curation[no].email' class='form-control'/></td>
            <td class='col-xs-1 no-padding' v-if='editMode'>
               <!--BUTTONS ADD AND REMOVE CURATOR-->

              <button class='form-control' v-on:click='delCurator(index, no)'>{{ functions.delButton[i18n] }}</button>

            </td>
            
            <td v-if='!editMode' v-for='curator in curation' class='no-padding'>
               <span>{{ curator }}</span>
            </td>
            
          </tr>

          <tr >
            <!--CURATORS -->
            <th class='pull-right no-padding'>
              
              <span v-if='!data.curation'>
                {{ functions.curators[i18n] }}
              </span>
              <span v-else></span>
            </th>
            <td v-if='editMode' class='no-padding'><input v-model='newCurators.person' :placeholder='functions.person[i18n]' class='form-control'></td>
            <td v-if='editMode' class='no-padding'><input v-model='newCurators.duties' :placeholder='functions.position[i18n]' class='form-control'/></td>
            <td v-if='editMode' class='no-padding'><input v-model='newCurators.email' :placeholder='functions.email[i18n]' class='form-control'/></td>
            <td class='col-xs-1 no-padding' v-if='editMode'>
              <button class='form-control' @click='addNewCurator(newCurators.person, newCurators.duties, newCurators.email, index)'>{{ functions.addButton[i18n] }}</button>
            </td>
            
          </tr>
          
        </tbody>
      </table>

  </div>
</template>

<script>

    import Vue from 'vue';

    // start app
    new Vue({
      data(){
        return {
          newResponsible: { person: '', position: '', email: ''},
          newCurators: { person: '', position: '', email: ''},
        };
      },
      props: ['i18n', 'editMode', 'functions'],
      methods: {
        addNewResponsible: function( person, duties, email, index){
          if (window.confirm('Are you sure to add this Responsible Person?')) {
            this.actualRecommendations[index].responsibles.push(
              {
                "person": person,
                "duties": duties,
                "email": email
              });
              this.newResponsible = { person: '', position: '', email: ''};
          }
        },
        delResponsible: function( index, no ){
          if (window.confirm('Are you sure to delete this Responsible Person?')) {
            this.actualRecommendations[index].responsibles.splice(no, 1);
          }
        },
        delCurator: function( index, no ){
          if (window.confirm('Are you sure to delete this Curator?')) {
            this.actualRecommendations[index].curation.splice(no, 1);
          }
        },
        addNewCurator: function( person, duties, email, index){
          if (window.confirm('Are you sure to add this Curator?')) {
            this.actualRecommendations[index].curation.push(
              {
                "person": person,
                "duties": duties,
                "email": email
              });
              this.newCurators = { person: '', position: '', email: ''};
            
          }
        }
      }
    });

    // register modal component
    Vue.component('ExpandRecsModule', {
      template: '#expand-recs'
    });

</script>