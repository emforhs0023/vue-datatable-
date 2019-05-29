<template>
	<div>
		<div style="width: 100%">
			<h1>Onboard monitoring</h1>
			<div style="margin: 0 auto; width: 50%; float: left;">
				<div>
					<v-dialog
				      v-model="dialog"
				      width="500"
					>
						<template v-slot:activator="{ on }">
							<v-btn
							v-if="count > 0"
							id="emergency_button"
							class="on"
							v-on="on"
							@click="emrTable"
							>
								<i class="far fa-bell" style='font-size: 47px;'></i>
							</v-btn>
						
							<v-btn 
							v-else="count === 0"
							id="emergency_button"
							class="off" 
							disabled>
								<i class="far fa-bell" style='font-size: 47px;'></i>
							</v-btn>
						</template>
						<v-card>
					        <v-card-title
					          class="headline grey lighten-2"
					          primary-title
					        >
					          Emergency
					        </v-card-title>
							
							<v-card-text>
								<v-data-table
								    :headers="headers"
								    :items="emrTableInfo"
								    hide-actions
								    class="elevation-1"
								    id="user-table"
								  >
									    <template v-slot:items="props">
									    	<td style='width: 25%;    text-align-last: center;'>{{ props.item.tag_id }}</td>
											<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.name }}</td>
											<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.type }}</td>
											<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.location }}</td>
										</template>
							  		</v-data-table>
							</v-card-text>
					        <v-divider></v-divider>
							<v-card-actions>
					          <v-spacer></v-spacer>
					          <v-btn
					            color="primary"
					            flat
					            @click="cancel" 
					          >
					            I accept
					          </v-btn>
					        </v-card-actions>
					    </v-card>
					</v-dialog>
				</div>
			</div>
			<div style="margin: 0 auto; width: 50%; float: left;">
				<v-card min-width="220" min-height="23" align-center style="float: right; background-color: #2196f3; color: white; border-radius: 20px;" >
			        	<v-card-title primary-title
						align-center>
						<div>
							<div style='float: left;font-size: 18px;margin-left: 54px;'>{{ dayInfo }}</div>
							</br>
							<div style='float: left;font-size: 18px;margin-left: 60px;'>{{ timeInfo }}</div>	
						</div>
						</v-card-title>
					</v-card>
				<div style='clear: both; float: right; margin-top: 17px;'>
					<div>
						<v-btn v-for="(layer, index) in layers"
						:key="index"
						:class="{ active: layer === activeProjectId }"
						@click="changeLayer(index, layer)"
						>
						{{layer}}
						</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import $ from 'jquery'
	import {eventBus} from '@/main'
	import router from '@/router'
	
	// { active: isActive }
	export default{
		data() {
			return {
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
				],
				dialog: false,
				isActive: false,
				count: "",
				day: "",
				layers:[],
			    activeProjectId: 1,
			    emrTableInfo:[],
			}
		},
		created(){
			this.$http.get("http://127.0.0.1:9007/monitoring/getEmergencyCount").then( res => {
		  		this.count = res.data.length
			}),
			this.$http.get("http://127.0.0.1:9007/monitoring/layerInfo").then( res => {
				let data = res.data
				
				data.forEach(user => {
					this.layers = user.layer
				})
			})
		},
		computed: { // 변수
		  	dayInfo() {
		      let day = this.$moment(new Date()).format('YYYYMMDD');
		      return day;
		    },
		    timeInfo() {
		      let time = this.$moment(new Date()).format('HH:mm:ss');
		      return time;
		    },
		},
		methods:{
			changeLayer(index, layer){
				this.activeProjectId = layer
				eventBus.layerData(layer)
			},
			emrTable(){
				this.emrTableInfo = []

				this.$http.get("http://127.0.0.1:9007/monitoring/getEmergencyInfo/").then(res => {
					let data = res.data
					data.forEach(itemInfo => {
						this.emrTableInfo.push(itemInfo);
					});
				})
			},
			cancel(){
 				this.dialog = false
 			}
		}
	}
</script>

<style>
	#emergency_button{ width: 250px; height: 80px; color: black; font-size: 25px; padding: 14px; border-radius: 12px; float: left; }
	#emergency_button.off{ background-color: white; }
	#emergency_button.on{ color: red; animation-name: button_blink; animation-duration: 0.5s; animation-direction: alternate-reverse; animation-iteration-count: infinite; }
	@keyframes button_blink{ from {color:red; background-color: white;} to {color:white; background-color: tomato;}}
	.active{ background-color: #2196f3 !important; color:white !important; }
</style>

