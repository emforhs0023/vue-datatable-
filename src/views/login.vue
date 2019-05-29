<template>
	<v-container fill-height style="max-width: 450px;">	
		<v-layout align-center row warp>
			<v-flex xs12>
				 <v-alert
				 	class="mb-3"
					:value="isLoginError"
					type="error"
					>
					아이디와 비밀번호를 확인해주세요
				</v-alert>
				 <v-alert
				 	class="mb-3"
					:value="isLogin"
					type="success"
					>
					로그인이 완료되었습니다.
				</v-alert>
				<v-card>
					<v-toolbar flat height="70">
						<v-toolbar-title>로그인</v-toolbar-title>
					</v-toolbar>
				
					  	<div class="pa-3">
							<v-text-field
							v-model="email"
				            label="아이디를 입력 하세요"
				          	>
				          	
				          	</v-text-field>
							<v-text-field
							v-model="password"
							type="password"
							label="비밀번호를 입력하세요"
								>
							</v-text-field>	
							<v-btn
								color="primary"
								large
								block
								depressed
								@click="login({ email,password })"
							>로그인
							</v-btn>
						
						</div>
						
				</v-card>
			</v-flex>	
		</v-layout>
	</v-container>
</template>

<script>
	import { mapState, mapActions } from "vuex"
	import axios from "axios"
	
	export default{
		created(){
			// this.$http.post("http://127.0.0.1:9007/loginInfo").then( ret => {
		 //  		this.allUsers = ret.data
		 //  		let saveUsers = this.allUsers
		 //  		this.$store.state.saveUsers
		 //  	})
		},
		data(){
			return {
				email:null,
				password:null,
				idInfos:"",
			}
		},
		computed: {
			...mapState(["isLogin", "isLoginError"]),
			// if(isLoginError){
			// 	alert("aa")
			// }
		},
		methods:{
			...mapActions(["login"]), //store의 액션스를 실행 한다
			test(){
				axios.post("http://127.0.0.1:9007/loginInfo")
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
				.then(() =>{
					console.log("test")
					// 성공이든 실패든 다옴 
				})
			},
		
			// login(){
				// let selectdUser = null
				// this.allUsers.forEach(user => {
				// 	if(user.email === this.email){
				// 		selectdUser = user
				// 	}
				// })
				// selectdUser === null 
				// 	? (this.isError = true)
				// 	: selectdUser.password !== this.password
				// 		? (this.isError = true)
				// 		: (this.loginSuccess = true)
				
				// let idInfo = this.id
				// let pwdInfo = this.password

				// this.$http.post("http://127.0.0.1:9007/loginInfo/" + idInfo + "/" + pwdInfo).then( ret => {
				// 	let count = this.idInfos
			 //  		count = ret.data
				// 	count[0].count == 1 ? (this.loginSuccess = true) : (this.isError = true)
			  		
			 //  	})
			// }
		}
	}
</script>