<template>
	<div id="sidebar"  >
		<el-col :span="4" >
	    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark"  router >
	      <el-menu-item index="0">首页</el-menu-item>
	      <el-submenu index="1" >
	        <template slot="title">数据管理</template>
	          <el-menu-item index="/manager/users" >用户列表</el-menu-item>
	          <el-menu-item index="/manager/sellers">商家列表</el-menu-item>
	          <el-menu-item index="/manager/foodlist">食品列表</el-menu-item>
	          <el-menu-item index="/manager/managers">管理员列表</el-menu-item>
	       
	      </el-submenu>

	      <el-submenu index="2">
	        <template slot="title">添加数据</template>
	          <el-menu-item index="/manager/addshops" >添加商铺</el-menu-item>
	          <el-menu-item index="/manager/addfoods">添加商品</el-menu-item>

	       
	      </el-submenu>
	      <el-menu-item index="3">导航三</el-menu-item>
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
 	.el-col{
 		height: 700px;
 		background:#324157;
 	}
	.el-menu{
		
		/*min-height:700px;*/
	}
</style>