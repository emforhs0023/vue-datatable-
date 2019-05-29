<template>
	<div>
		<div style="clear: both; padding: 20px 0 20px 0;">
			<v-stage ref="stage" :config="configKonva">
			    <v-layer ref="layer">
		   			<v-circle
		   			 	v-if="0 < number"
		   			 	v-for="item in list"
						:config="{x : item.x, y: item.y, radius: 15, fill: 'red', name: item.name, text: 'aa'}" @click="stageClick">
					</v-circle>
					<v-text
						v-for="texts in text"
						:config="{x : texts.x-5, y: texts.y-8, text: texts.text, fill: 'white',fontSize: 20}">
					>
					</v-text>
				</v-layer>
			</v-stage>
		</div>

		<div>
			<v-dialog
				v-model="dialog"
				max-width="500"
	    	>
	    		<v-card>
			        <v-card-title
			          class="headline grey lighten-2"
			          primary-title
			        >
			          해당 위치 M-tag 정보
			        </v-card-title>
										
					<v-card-text>
						<v-data-table
						    :headers="headers"
						    :items="pointTableInfo"
						    hide-actions
						    class="elevation-1"
						    id="user-table"
						>
							    <template v-slot:items="props">
							    	<td style='width: 25%;    text-align-last: center;'>{{ props.item.tag_id }}</td>
									<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.name }}</td>
									<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.type }}</td>
									<td class="text-xs-right" style='width: 25%; text-align-last: center;'>{{ props.item.taemergencyCodeg_id }}</td>
								</template>
					  		</v-data-table>
					  		<v-btn
					            color="primary"
					            flat
					            @click="cancel" 
				          >
				            I accept
				          </v-btn>
					</v-card-text>
				</v-card>
		    </v-dialog>
		</div>
	</div>
</template>

<script>
	import {eventBus} from '@/main'
	import axios from "axios"
	import 'expose-loader?$!expose-loader?jQuery!jquery'
	import { mapActions, mapState } from "vuex"
	import VueKonva from 'vue-konva'
	import VuejsDialog from 'vuejs-dialog';
	import 'vuejs-dialog/dist/vuejs-dialog.min.css';
	// import VuejsDialogMixin from 'vuejs-dialog/vuejs-dialog-mixin.min.js'

	const canvasx = 1100;
	const canvasy = 500;
	
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
					{ text: 'emergencyCode', value:'emergencyCode'},
				],
				layer:"",
				viewModal: [],
				list:[],
				text:[],
				count: [],
				number:"",
				test:[],
				test1:[],
				testImg: new Image(100,100),
				beacon_id:"",
				pointTableInfo:[],
				dialog: false,
				configKonva: {
		            width: canvasx,
		            height: canvasy
				},
				configCircle: {
					x: 100,
					y: 100,
					radius: 70,
					fill: 'red',
					stroke: 'black',
					strokeWidth: 4
				}
			}
		},
		
		created(){
			this.$http.get("http://127.0.0.1:9007/monitoring/firstMapInfo").then( res => {
				let firstMap = res.data[0].path
				$("canvas").css({"background-image":"url("+ firstMap +")","background-size":"100% 100%"})	
				let one = 1
				// user_id 이벤트 버스에서 처리 해보자
				this.layer = one;
				
				this.$http.get("http://127.0.0.1:9007/monitoring/getMtagPosition/" + this.layer).then(res => {
			  		let data = res.data
			  		this.count = [];
		  			this.list = [];
		  			this.text = [];
			  		data.forEach(user => {
			  			
			  			let beacon_id = user.beacon_id;
		                let loc_x = user.x;
		                let loc_y = user.y;
		                let count = user.count;
		                
		                let xValue = loc_x * (canvasx / 10);
		                let yValue = canvasy - loc_y * (canvasy / 10);
						
						let listLocation = {"x":xValue, "y": yValue, "name": beacon_id}
						let countText = {"x":xValue, "y": yValue, "text":count}
						

						this.count.push(count)
						this.number = this.count.length
						this.list.push(listLocation)
						this.text.push(countText)
					})
				})		        
			}),
			eventBus.$on("layerData", layer => {

				this.layer = layer;
				this.$http.get("http://127.0.0.1:9007/monitoring/layerInfo/" + layer).then(res => {
					let map = res.data[0].path
					$("canvas").css({"background-image":"url("+ map +")","background-size":"100% 100%"})
				})	
				this.$http.get("http://127.0.0.1:9007/monitoring/getMtagPosition/" + layer).then(res => {
			  		let data = res.data
			  		this.count = [];
			  		this.list = [];
		  			this.text = [];
		  			data.forEach(user => {
		  				let eventbeaconId = user.beacon_id;
		  				let eventlocX = user.x;
		  				let eventlocY = user.y;
		  				var eventCount = user.count;
		  				
		  				let eventXvalue = eventlocX * (canvasx / 10);
		                let eventYvalue = canvasy - eventlocY * (canvasy / 10);

		                let eventListLocation = {"x":eventXvalue, "y": eventYvalue, "name": eventbeaconId}
						let eventCountText = {"x":eventXvalue, "y": eventYvalue, "text":eventCount}

						this.count.push(eventCount)
						this.number = this.count.length
						this.list.push(eventListLocation)
						this.text.push(eventCountText)
					})
		  		})			        
			})
		},
		computed: {
			configImg: function() {
				return {
					x: 20,
					y: 20,
					image: this.testImg,
					width: 1100,
					height: 500,
				}
			}
		},
		mounted() {
		    this.testImg.src = "map/platform_deck.jpg"
		},
		watch: {
	        dialog (val) {
	            !val && this.test.push("1")
	        }
	    },
		methods :{
			stageClick(evt){
				const beacon_id = evt.target.name();
				this.pointTableInfo = [];
				this.test1 = [];
				this.$http.get("http://127.0.0.1:9007/monitoring/getMtagInfo?beacon_id=" + beacon_id).then(res => {
					let data = res.data
					const stage = evt.target.getStage();
					const layer = evt.target.getLayer();

					
					if(this.test.length != ""){
						stage.add(layer)
						this.test = []; 
					}
					this.dialog = true;
					data.forEach(itemInfo => {
						let tag_id = itemInfo.tag_id
						let name = itemInfo.name
						let type = itemInfo.type
						let emergencyCode = itemInfo.emergencyCode
						this.pointTableInfo.push({"tag_id":tag_id, "name":name, "type":type, "taemergencyCodeg_id":emergencyCode});
						this.test1.push({"tag_id":tag_id, "name":name, "type":type, "taemergencyCodeg_id":emergencyCode}) 
					});
					console.log(this.pointTableInfo)
				})
			},
			cancel(){
				this.dialog = false;
			}
		}
	}
</script>





