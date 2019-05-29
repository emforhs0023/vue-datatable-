<template>
	<div>
		<h1 style="margin-bottom: 10px">#Beacon MangeMent</h1>
		<v-data-table
	    :headers="headers"
	    :items="baecon"
	    hide-actions
	    class="elevation-1"
	    id="user-table"
	  >
		    <template v-slot:items="props">
		    	<td style='width: 25%;    text-align-last: center;'>{{ props.item.deck }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.Installed }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.Register }}</td>
				<!-- <td class="text-xs-right" style='width: 25%; text-align-last: center;'><button @click="aa(props.item)"> aa</button></td> -->
			</template>
  		</v-data-table>
	</div>
</template>
<script>
import axios from "axios"

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
	          { text: 'Installed', value:'Installed'},
	          { text: 'Register', value:'Register'},
	          { text: 'aa', value:'Register'},
	        ],
	      	baecon: []
	      }
	    },
	    created(){
	        axios
	  		.get("http://127.0.0.1:9007/main/getBeaconInfo")
			.then(res => {
				var data = res.data
				console.log(data)
				data.forEach(itemInfo => {
					this.baecon.push(itemInfo);
				});
			})
			.catch(() => {
				alert("에러")
			})
			// $("#user-table tbody").on("click", "tr", function() {
			// 	// var data = table.row(this).data();
			// 	alert("aa")
			// })
	    }, 
	    methods:{
			// aa(item){
			// 	console.log(item)
			// }
	    }
	}
</script>

<style>
	th{
		text-align-last: center;
	}
</style>