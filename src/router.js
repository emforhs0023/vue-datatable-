import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const rejectAuthUser = (to, from, naxt) =>{
  if(store.state.isLogin === true) {
    // 이미 로그인 된 유저는 막는다
    alert("이미 로그인 하였습니다.")
    naxt("/")
  } else {
    naxt()    
  }
}

const onlyAuthUser = (to, from, naxt) =>{
  if(store.state.isLogin === false) {
    // 이미 로그인 된 유저는 막는다
    // alert("아직 로그인을 하지 않았습니다.")
    naxt("/login")
  } else {
    naxt()    
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: onlyAuthUser,
      component: () => import('./views/Home')
    },
     {
      path: '/login',
      name: 'login',
      beforeEnter: rejectAuthUser,  // 라우터에 들어 오기 전에 함수를 실행 시켜 보고 아무것도 없으면 component로 가게 한다
      component: () => import('./views/login')
    },
    {
      path: '/mypage',
      name: 'mypage',
      beforeEnter: onlyAuthUser,
      component: () => import('./views/mypage')
    },
    {
      path: '/monitoring',
      name: 'monitoring',
      beforeEnter: onlyAuthUser,
      component: () => import('./views/monitoring')
    },
    {
      path: '/test',
      name: 'test',
      beforeEnter: onlyAuthUser,
      component: () => import('./views/test')
    },
    {
      path: '/test1',
      name: 'test1',
      beforeEnter: onlyAuthUser,
      component: () => import('./views/test1')
    }
  ]
})
