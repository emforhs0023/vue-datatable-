<template>
	<div>
		<h1 style="margin-bottom: 10px" 
		@click="monitoring()"
		>#Onboard monitoring</h1>
		<v-data-table
	    :headers="headers"
	    :items="desserts"
	    hide-actions
	    class="elevation-1"
	    style='margin-bottom: 20px;'
	  >
		    <template v-slot:items="props">
		    	<td style='width: 25%;    text-align-last: center;'>{{ props.item.deck }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.Boarder }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.Passenger }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.Cargo }}</td>
			</template>
  		</v-data-table>
	</div>
</template>
<script>
import axios from "axios"
import router from '@/router'

  export default {
    data () {
      return {
      	headers: [
          {
          	text: 'Deck',
            align: 'center',
            sortable: false,
            value: 'deck'
          },
          { text: 'Boarder', value:'Boarder'},
          { text: 'Passenger', value:'Passenger'},
          { text: 'Cargo', value:'Cargo'},
        ],
      	desserts: []
      }
    },
    created(){
        axios
  		.get("http://127.0.0.1:9007/main/getOnBoardInfo")
		.then(res => {
			var data = res.data
			// console.log(data)
			data.forEach(itemInfo => {
				this.desserts.push(itemInfo);
			});
		})
		.catch(() => {
			alert("에러")
		})
    },
    methods:{
    	monitoring(){
    		router.push({name : "monitoring"})
    	}
    }
  }
</script>

<style>
	th{
		text-align-last: center;
	}
</style>