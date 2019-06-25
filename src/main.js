import App from './App.vue'
import '@/css/tailwind.css'
import Vue from 'vue'


Vue.config.productionTip = false;

new Vue({

	data: function(){
		return {
			head:{
				title : {
					inner: "HBC Equipment Returns"
				}

			},
		}
	},
	render: function (h) { return h(App) },
}).$mount('#app');
