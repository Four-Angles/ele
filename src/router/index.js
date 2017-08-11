import Vue from 'vue'
import Router from 'vue-router'
/*import Hello from '@/components/Hello'*/

/*import Menu from '@/view/menu'*/
import manager from '@/view/manager'
import Person from '@/view/personalInfo'
import resign from '@/view/resign'
import Orders from '@/view/orders'
import Sellers from '@/view/Sellers'
import Login from '@/view/login'
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
      path: '/manager/index',name: '饿了么后台管理系统',component:manager,
      children:[
          { path: '',name:'首页',component:Index,meta:{keep_alive: true}},
          { path: '',name: '数据管理',component:manager,
            children:[
            { path: 'users',name: '用户列表',component:Users},
            { path: 'managers',name: '管理员列表',component:Managers},
            { path: 'sellers',name:'商家列表',component:Sellers,meta:{keep_alive: true}},
            { path: 'foodlist',name:'食品列表',component:Foodlist},
            { path: 'orders',name:'订单列表',component:Orders},]
          },
          { path: '',name: '添加数据',component:manager,
            children:[
            { path: 'addshops',name:'增加商铺',component:Addshops},
            { path: 'addfoods',name:'增加商品',component:Addfoods},]
          },
          
          //添加个人信息菜单 
          { path: 'personalInfo',name:'个人信息', component:Person }   
          
      ]
    },

  ]
})
