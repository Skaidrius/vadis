<template id="expand-recs">
  <div>
    
      <!--Expanded recs table - shows if edit mode or cell checked -->
      <table class='table'>
        <thead>
          <tr>
            <th></th>
            <th>{{ functions.person[ i18n ] }}</th>
            <th>{{ functions.position[ i18n ] }}</th>
            <th>{{ functions.email[ i18n ] }}</th>
            <th></th>
          </tr>
        </thead>
        
        <tbody class='responsibles'>
  
          <tr>
            <th :rowspan='data.responsibles.length+1'>
                {{ functions.responsible[ i18n ] }}
            </th>
          </tr>

          <tr v-if='editMode' v-for='( responsibles, no ) in data.responsibles' >
            <!--RESPONSIBLE persons-->
            <td><input v-model='data.responsibles[ no ].person' :placeholder='data.responsibles[ no ].person' class='form-control'></td>
            <td><input v-model='data.responsibles[ no ].duties' :placeholder='data.responsibles[ no ].duties' class='form-control'/></td>
            <td><input v-model='data.responsibles[ no ].email' :placeholder='data.responsibles[ no ].email' class='form-control'/></td>
            <td class='col-xs-1 btn-group'>
              <!--BUTTONS to REMOVE RESPONSIBLE-->
              <button class='form-control' v-on:click='delResponsible( no )'>{{ functions.delButton[ i18n ] }}</button>
            </td>
            
          </tr>

          <tr v-if='!editMode' v-for='responsibles in data.responsibles'>
            <td v-for='( person, key ) in responsibles'>
            <!--CHANGE POINTER AND SEND MAIL COMMAND ??? -->
              <a v-if='key == "email"' class='email'>{{ person }}</a>
              <span v-else>{{ person }}</span>
            </td>
            <td></td>
          </tr>


          <tr v-if='editMode'>
            <!--ADD RESPONSIBLE STAFF -->
            <td></td>
            <td><input v-model='newResponsible.person' :placeholder='functions.person[ i18n ]' class='form-control'></td>
            <td><input v-model='newResponsible.duties' :placeholder='functions.position[ i18n ]' class='form-control'/></td>
            <td><input v-model='newResponsible.email' :placeholder='functions.email[ i18n ]' class='form-control'/></td>
            <td class='col-xs-1'>
               <!--BUTTONS ADD RESPONSIBLE-->
              <button class='form-control' v-on:click='addNewResponsible( newResponsible.person, newResponsible.duties, newResponsible.email )'>{{ functions.addButton[ i18n ] }}</button>
            </td>
            
          </tr>
        </tbody>
        
        <!--CURATION-->
        <tbody class='curation'>
          <tr>
            <th :rowspan='data.curation.length+1'>
                {{ functions.curators[ i18n ] }}
            </th>
          </tr>
          
          <tr v-if='editMode' v-for='( curation, no ) in data.curation' >
            <!--CURATORS -->
            <td><input v-model='data.curation[ no ].person' :placeholder='data.curation[ no ].person' class='form-control'></td>
            <td><input v-model='data.curation[ no ].duties' :placeholder='data.curation[ no ].duties' class='form-control'/></td>
            <td><input v-model='data.curation[ no ].email' :placeholder='data.curation[ no ].email' class='form-control'/></td>
            <td class='col-xs-1 '>
               <!--BUTTONS ADD AND REMOVE CURATOR-->
              <button class='form-control' v-on:click='delCurator( no )'>{{ functions.delButton[ i18n ] }}</button>
            </td>
          </tr>
          
          <tr v-if='!editMode' v-for='curation in data.curation' >
            <td v-for='curator in curation'>{{ curator }}</td>
            <td></td>
          </tr>
            
          <tr v-if='editMode'>
            <!--ADD CURATORS -->
            <td></td>
            <td><input v-model='newCurators.person' :placeholder='functions.person[ i18n ]' class='form-control'></td>
            <td><input v-model='newCurators.duties' :placeholder='functions.position[ i18n ]' class='form-control'/></td>
            <td><input v-model='newCurators.email' :placeholder='functions.email[ i18n ]' class='form-control'/></td>
            <td class='col-xs-1'>
              <button class='form-control' @click='addNewCurator( newCurators.person, newCurators.duties, newCurators.email )'>{{ functions.addButton[ i18n ] }}</button>
            </td>
            
          </tr>
          
        </tbody>
      </table>

  </div>
</template>

<script>

const apiData = require('../../../assets/recommend-table-data.json');

    import Vue from 'vue';
    
        // register modal component
    Vue.component('ExpandRecsModule', {
      template: '#expand-recs'
    });

    // start app
    module.exports = {
      data() {
        return {
          apiData: apiData,
          functions: apiData.table.functions,
          newResponsible: { person: '', position: '', email: ''},
          newCurators: { person: '', position: '', email: ''},
        };
      },
      props: ['i18n', 'editMode', 'data'],
      methods: {
        addNewResponsible: function( person, duties, email ){
          if (window.confirm('Are you sure to add this Responsible Person?')) {
            this.data.responsibles.push(
              {
                "person": person,
                "duties": duties,
                "email": email
              });
              this.newResponsible = { person: '', position: '', email: ''};
          }
        },
        delResponsible: function( no ){
          if (window.confirm('Are you sure to delete this Responsible Person?')) {
            this.data.responsibles.splice(no, 1);
          }
        },
        delCurator: function( no ){
          if (window.confirm('Are you sure to delete this Curator?')) {
            this.data.curation.splice(no, 1);
          }
        },
        addNewCurator: function( person, duties, email ){
          if (window.confirm('Are you sure to add this Curator?')) {
            this.data.curation.push(
              {
                "person": person,
                "duties": duties,
                "email": email
              });
              this.newCurators = { person: '', position: '', email: ''};
            
          }
        }
      }
    };

</script>

