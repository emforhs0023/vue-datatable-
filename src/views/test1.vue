<template>
	<div>
		<h1>TABLE PAGINATION</h1>

		<v-text-field v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
		<!-- .sync 양방향 통신 -->
		<v-data-table :headers="headers"
              :items="categories"
              :pagination.sync="pagination"
              :total-items="total"
              :rows-per-page-items="rowsPerPageItems"
              :loading="loading"
            >
            <template v-slot:items="props">
		    	<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.name }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.type }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.emergencyCode }}</td>
			</template>	
        </v-data-table>
	</div>
</template>

<script>
import axios from 'axios'

export default{
    data () {
    	return {
		    categories: [],
	        search: '',
	        total: 0,
	        loading: false,
	        pagination: {},
	        headers: [
	            {text: 'name', value: 'name'},
	            {text: 'type', value: 'type'},
	            {text: 'emergencyCode', value: 'emergencyCode'}
	        ],
	        rowsPerPageItems: [5, 10, 20, 50, 100],
	    }
  	},
  	watch: {
	  	pagination () {
			this.getCategoriesByPagination();
	    },
	    search() {
            this.getCategoriesByPagination();
        }
	},
  	// mounted(){
   //  	this.getCategoriesByPagination(data => {
   //  	})
   //  },
	methods:{
		getCategoriesByPagination(){
			this.loading = true;
			
			if(this.search){
				axios.get("http://127.0.0.1:9007/monitoring/search?search=" + this.search)
				.then(res => {
					let counstDate = res.data[1]
					let count = counstDate[0].count
					this.categories = res.data[0];
					this.total = count;
				})
			}
			if (this.pagination.sortBy && !this.search) {
				axios.get("http://127.0.0.1:9007/monitoring/getMtagInfo?beacon_id=" + "00000002")
				.then(res => {
					this.categories = res.data[0];
					this.total = res.data[1].total;
				})
				.catch(err => {
					console.log(err);
				});
			}
			if(!this.search && !this.pagination.sortBy) {
				console.log(this.pagination)
				axios.get("http://127.0.0.1:9007/monitoring/getMtagInfo?beacon_id=" + "00000002")
				.then(res => {
					this.categories = res.data[0];
					this.total = res.data[1].total;
				})
				.catch(err => {
					console.log(err);
				});
			}
			
		}
	},
	created(){
		
	}
}
</script>