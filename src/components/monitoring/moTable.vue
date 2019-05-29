<template>
	<div>
		<v-text-field v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
        ></v-text-field>

		<v-data-table :headers="headers"
          :items="categories"
          :pagination.sync="pagination"
          :total-items="total"
          :rows-per-page-items="rowsPerPageItems"
          :loading="loading"
        >
		    <template v-slot:items="props">
		    	<td style='width: 25%;    text-align-last: center;'>{{ props.item.tag_id }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.name }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.type }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.location }}</td>
				<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.emergencyCode }}</td>
			</template>
  		</v-data-table>
	</div>
</template>

<script>
	import {eventBus} from '@/main'
	import axios from "axios"
	import $ from 'jquery'
	import { mapActions, mapState } from "vuex"
	import busMoTable from './modul/busMoTable'

	export default{
		components: {
			busMoTable
		},
		data(){
			return {
				dataArray: [],
				layer:"",
				categories: [],
		        search: '',
		        total: 0,
		        loading: false,
		        pagination: {},
		        headers: [
		          {
		          	text: 'ID',
		            align: 'center',
		            sortable: false,
		            value: 'tag_id'
		          },
		          { text: 'name', value:'name'},
		          { text: 'type', value:'type'},
		          { text: 'location', value:'location'},
		          { text: 'emergencyCode', value:'emergencyCode'},
		        ],
		        rowsPerPageItems: [5, 10, 20, 50, 100],
			}
		},
		created(){
			
		},
		watch: {
		  	pagination () {
				this.getCategoriesByPagination();
		    },
		    search() {
	            this.getCategoriesByPagination();
	        }
		},
		methods :{
			getCategoriesByPagination(){
				this.loading = true;

				let one = 1
				this.layer = one;
				if(this.search){
					axios.get("http://127.0.0.1:9007/monitoring/getMonitoringInfo/" + this.layer)
					.then(res => {
						// console.log(res)
						this.categories = res.data[0];
						
						// this.total = res.data[1].total;
					})
					.catch(err => {
						// console.log(err);
					});
				}
				if (this.pagination.sortBy && !this.search) {
					axios.get("http://127.0.0.1:9007/monitoring/getMonitoringInfo/" + this.layer)
					.then(res => {
						let counstDate = res.data[1]
						let count = counstDate[0].total
						this.categories = res.data[0];
						// this.total = count;
					})
					.catch(err => {
						// console.log(err);
					});
				}
				if(!this.search && !this.pagination.sortBy) {
					axios.get("http://127.0.0.1:9007/monitoring/getMonitoringInfo/" + this.layer)
					.then(res => {
						// console.log(res)
						this.categories = res.data[0];
						
						// this.total = res.data[1].total;
					})
					.catch(err => {
						// console.log(err);
					});
				}
				

				eventBus.$on("layerData", layer => {
					this.categories = [];
					this.layer = layer;
					axios.get("http://127.0.0.1:9007/monitoring/getMonitoringInfo/" + layer)
					.then(res => {
						this.categories = res.data[0];
						this.total = res.data[1].total;
					})
					.catch(err => {
						// console.log(err);
					});
				})
			}
		}
	}
</script>