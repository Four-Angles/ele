<template>
	<div id="sidebar"  >
		<el-col  >
	    <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark"  router  :default-active="$route.path">
	      <el-menu-item index="/manager"><i class="el-icon-menu"></i>首页</el-menu-item>
	      <el-submenu index="1" >
	        <template slot="title" ><i class="el-icon-document"></i>数据管理</template>
	          <el-menu-item index="/manager/users" >用户列表</el-menu-item>
	          <el-menu-item index="/manager/sellers">商家列表</el-menu-item>
	          <el-menu-item index="/manager/foodlist">食品列表</el-menu-item>
	           <el-menu-item index="/manager/orders">订单列表</el-menu-item>
	          <el-menu-item index="/manager/managers">管理员列表</el-menu-item>
	      </el-submenu>
	      <el-submenu index="2">
	        <template slot="title" ><i class="el-icon-plus"></i>添加数据</template>
	          <el-menu-item index="/manager/addshops" >添加商铺</el-menu-item>
	          <el-menu-item index="/manager/addfoods">添加商品</el-menu-item>    
	      </el-submenu>
	      <el-menu-item index="/manager/personalInfo"><i class="el-icon-information"></i>个人信息</el-menu-item>
	    </el-menu>
	  </el-col>
  </div>
</template>
<script>
	export default {
  name: 'sidebar',
  //注册组件
  components:{ }, //从外部通过import导入Menu组件，注册为menu1
  data() {
        return {
          
        };
      },
  methods: {
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style>	
 #sidebar .el-col{
 		
 		position: fixed;
		height: 100%;
		top: 0;
		left: 0;
		/*z-index: 2000;*/
 		background:#324157;
 		width: 20%;
 		/*max-width: 200px;*/
 		overflow: hidden;
 	}

</style>
