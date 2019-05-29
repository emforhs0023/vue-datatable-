<template>
	<div>
		<h1 style="margin-bottom: 10px">#Tag management</h1>
		<v-data-table
	    :headers="headers"
	    :items="tag"
	    hide-actions
	    class="elevation-2"
	    style='margin-bottom: 20px;'
	  >
		    <template v-slot:items="props">
		    	<td style='width: 25%;    text-align-last: center;'>{{ props.item.TYPE }}</td>
				<td class="text-xs-right" style='width: 25%;    text-align-last: center;'>{{ props.item.Register }}</td>
				<td class="text-xs-right" style='width: 25%;    text-align-last: center;'>{{ props.item.Active }}</td>
				<td class="text-xs-right" style='width: 25%;    text-align-last: center;'>{{ props.item.Emergency }}</td>
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
          	text: null,
            align: 'center',
            sortable: false,
            value: 'TYPE'
          },

			{ text: 'Register', value:'Register'},
			{ text: 'Active', value:'Active'},
			{ text: 'Emergency', value:'Emergency'},
			{ text: 'aa', value:'Register'},
        ],
      	tag: []
      }
    },
    created(){
        axios
  		.get("http://127.0.0.1:9007/main/getTagInfo")
		.then(res => {
			var data = res.data
			// console.log(data)
			data.forEach(itemInfo => {
				this.tag.push(itemInfo);
			});
			console.log(this.tag)
		})
		.catch(() => {
			alert("에러")
		})
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