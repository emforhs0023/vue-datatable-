import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from "axios"

// import VueLocalStorage from 'vue-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	userInfo: null,
	isLogin: false,
	isLoginError: false,
  },
  mutations: { // 스테이스 값을 변환 하는 로직
	// 로그인이 성공했을 때	  	
	loginSuccess(state, payload){
		state.isLogin = true,
		state.isLoginError= false,
		state.userInfo = payload
	},
	// 로그인이 실패했을 때	
	loginError(state){
		state.isLogin= false,
		state.isLoginError= true
	},
	logout(state){
		state.isLogin= false,
		state.isLoginError= false,
		state.userInfo = null
	}
  },
  actions: {
  	// 로그인 시도
  	login({dispatch}, loginObj){
		//로그인 -> 토큰 반환
  		// 새로고침 -> 토큰만 가지고 멤버정보를 요청 
  		axios
  		.post("http://127.0.0.1:9007/loginInfo", loginObj)
		.then(res => {
			// console.log(res.data[0].tag_id)
			let token = res.data[0].tag_id
			// 토큰을 로컬스토리지에 저장
			// console.log(token)
			localStorage.setItem("access_token", token)
			dispatch("getMemberInfo")
		})
		.catch(() => {
			alert("에러")
		})	
	},
	logout({commit}) {
		localStorage.removeItem("access_token")
	
		commit("logout")
		alert("로그아웃 되었습니다.")
		router.push({name : "login"})
	},
	getMemberInfo({commit}){
		//로컬 스토리지에 저장되어 있는 토큰을 불러온다.
		let token = localStorage.getItem("access_token")

		let config = {
			headers:{
				"access-token": token
			}
		}
		// 토큰을 가지고 -> 멤버 정보를 반환 
		axios.get("http://127.0.0.1:9007/logincheck", config)
		.then(response => {
			console.log(response)
			let userInfo = {
				tag_id: response.data[0].tag_id
			}
			commit('loginSuccess', userInfo)
			router.push({name : "home"})
		})
		.catch(err => {
			// alert("이메일과 비밀번호를 확인 해주세요")
		})	
	},

  }
})
