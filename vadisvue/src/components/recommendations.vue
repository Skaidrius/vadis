<template>
  <div>
    <div class="jumbotron">
      <h2>Recommendations<br><small>Implementation</small></h2>
  
    </div>
    <div>
    
      <h4>today is {{today}} </h4>
    
    <table class='table table-hover table-striped table-bordered text-center'>
      <thead>
        <tr>
          <th class='col-xs-1'>#</th>
          <th class='col-xs-1'>Audit</th>
          <th class='col-xs-1'>Rec. #</th>
          <th class='col-xs-2'>Rec. Rate</th>
          <th class='col-xs-2'>Recommendation</th>
          <th class='col-xs-1'>Rec Rate</th>
          <th class='col-xs-1'>Period</th>
          <th class='col-xs-2'>Implementation</th>
          <th class='col-xs-1'>Actual</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(rec, index) in recList'>
          <td>{{ index+1 }}. </td>
          <td>{{ rec.audit }} </td>
          <td>{{ rec.recNo }}. </td>
          <td>{{ rec.rec }} </td>
          <td>{{ rec.means }} </td>
          <td>{{ rec.recRate }} </td>
          <td>{{ rec.period }} </td>
          <td>{{ rec.implementInfo }} </td>
          <td> {{ rec.active }}</td>
      </tr>
      </tbody>
    </table>
    
    <div>
      <h4>Add New Recommendation</h4>
          <table class='table table-hover table-striped table-bordered table-condensed text-center'>
      <thead>
        <tr>
          <th class='col-xs-3'><input placeholder="Audit" class='form-control'></th>
          <th class='col-xs-1'><input placeholder="Rec. #" class='form-control'></th>
          <th class='col-xs-1'>
            <select placeholder="Rec. Rate" class='form-control'>
              <option selected disabled>Select Rec. Rate</option>
              <option>Low</option>
              <option>Middle</option>
              <option>High</option>
            </select>
          </th>
          <th class='col-xs-4'><input placeholder="Recommendation" class='form-control'></th>
          <th class='col-xs-1'><input placeholder="Rec Rate" class='form-control'></th>
          <th class='col-xs-1'><input placeholder="Period" class='form-control'></th>
          <th class='col-xs-1'><button class="form-control">Add</button></th>
        </tr>
      </thead>
    </table>
    </div>
        
    </div>
  </div>
</template>

<script>

export default{
    data(){
      return {
      recList : [{
          audit: "a", recNo: 3, rec:"Do something", means: "Do Something", recRate: "High", period:"2016-12-15", implementInfo: "alksjd alksdj laks kjds", active:false 
        },{
          audit: "a", recNo: 2, rec:"Do something more", means: "Do Something", recRate: "Low", period:"2016-12-17", implementInfo: "alksjd alksdj laks kjds", active:true
        },{
          audit: "c", recNo: 1, rec:"Do something more 1", means: "Do Something 1", recRate: "Middle", period:"2016-12-21", implementInfo: "alksjd alksdj laks kjds", active:false
        },{
          audit: "c", recNo: 3, rec:"Do something more 2", means: "Do Something 2", recRate: "Low", period:"2016-12-09", implementInfo: "alksjd alksdj laks kjds", active:true
        },{
          audit: "c", recNo: 5, rec:"Do something more 3", means: "Do Something 3", recRate: "High", period:"2016-12-01", implementInfo: "alksjd alksdj laks kjds", active:false
        },{
          audit: "f", recNo: 3, rec:"Do something more 1", means: "Do Something 1", recRate: "Middle", period:"2016-12-23", implementInfo: "alksjd alksdj laks kjds", active:true
        },{
          audit: "g", recNo: 3, rec:"Do something more 1", means: "Do Something 1", recRate: "High", period:"2016-12-25", implementInfo: "alksjd alksdj laks kjds", active:false
        }]
      };
    },
    computed: {
      today: function(){
        let td = new Date;
        let thisYear = td.getFullYear();
        
        let thisMonth = td.getMonth()+1;
        // const months = ["sausio", "Vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"];
        let thisDay = td.getDate();
        let today = thisYear + ' - ' + thisMonth + '  - '+ thisDay; 
        // ("YY-mm-dd");
        // console.log(td);
        // let year = td.splice(0, 4);
        return today;
      }
    }
};

</script>