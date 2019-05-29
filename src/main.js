import '@babel/polyfill'
import Vue from 'vue'
import axios from 'axios'
import lodash from 'lodash'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMomentJS from "vue-momentjs"
import moment from "moment"
import VueKonva from 'vue-konva'
import * as $ from 'jquery';
import VModal from 'vue-js-modal'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'


Vue.config.productionTip = false

Vue.use(VueKonva)
Vue.use(VueMomentJS, moment)
Vue.use(VModal, { dynamic: true })

Vue.prototype.$http = axios;
Vue.prototype._ = lodash

export const eventBus = new Vue({
	methods:{
		layerData(layer){
			this.$emit("layerData", layer)
		}
  }
})

new Vue({
  router,
  store,
  beforeCreate(){
  	this.$store.dispatch("getMemberInfo")
  },
  render: h => h(App)
}).$mount('#app')
