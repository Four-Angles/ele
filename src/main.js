// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

//ycAudrey 2017-8-4  ---start
import VCharts from 'v-charts'
Vue.use(VCharts)
//ycAudrey 2017-8-4  ---end

//ycAudrey 2017-8-10  ---start
router.beforeEach((to, from, next) => {
  if(to.path!='/login'){
  	if (sessionStorage.getItem("username")) {
  		next();
  	}else{
  		next("/login");
  	}
  }else{
  	next();
  }
})
//ycAudrey 2017-8-10  ---end

Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  //ycAudrey 2017-8-4  ---start
  render: h => h(App)
  //ycAudrey 2017-8-4  ---end
})
