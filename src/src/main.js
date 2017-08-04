// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false

//ycAudrey  2017-08-03 sessionStorage.getItem("username")
// router.beforeEach((to, from, next) => {
//   	if (sessionStorage.getItem("username")) {
//         next();
//     }
//     else {  
//         if (sessionStorage.getItem("username")) {
//             next('/error');
//         } else {
//             next('/login'); // 否则全部重定向到登录页
//         }        
//     }
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
