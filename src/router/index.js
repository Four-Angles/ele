import Vue from 'vue'
import Router from 'vue-router'
/*import Hello from '@/components/Hello'*/

/*import Menu from '@/view/menu'*/
import download from '@/view/download'
import manager from '@/view/manager'
import Person from '@/view/personalInfo'
import resign from '@/view/resign'
import Orders from '@/view/orders'
import Sellers from '@/view/Sellers'
import Login from '@/view/download'
import Foodlist from '@/view/foodlist'
import Users from '@/view/users'
import Managers from '@/view/managers'
import Addfoods from '@/view/addfoods'
import Addshops from '@/view/addshops'
// ycAudrey 2017-8-3
import Index from '@/view/index' 
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',redirect:'/login' },
    {
      path: '/login',name: '',component:Login
    },
    {
      path: '/manager',name: 'manager',component:manager,
      children:[
          { path: 'users',component:Users},
          { path: 'managers',component:Managers},
          { path: 'sellers',component:Sellers,meta:{keep_alive: true}},
          { path: 'foodlist',component:Foodlist},
          { path: 'orders',component:Orders},
          { path: 'addshops',component:Addshops},
          { path: 'addfoods',component:Addfoods},
          // ycAudrey 2017-8-3 
          { path: 'index',component:Index,meta:{keep_alive: true}},

          //添加个人信息菜单 
          { path: 'personalInfo', component:Person }   
          
      ]
    },

  ]
})
