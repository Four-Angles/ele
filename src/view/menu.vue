<template>
	 <el-menu theme="dark" :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
      	<el-menu-item index="person">首页</el-menu-item>
      	<el-submenu index="shop">
          	<template slot="title"> 我的购物</template>
         	<el-menu-item index="shop-order">购物订单</el-menu-item>
         	<el-menu-item index="2-2">收藏宝贝</el-menu-item>
      	</el-submenu>
      	<el-menu-item index="resign">注册</el-menu-item>
      	<el-menu-item index="4"><router-link to=""> 登录</router-link></el-menu-item>
    </el-menu>

</template>

<script>
	export default {
	    data() {
	      return {
	        activeIndex: 'person',
	        activeIndex2: '1'
	      };
	    },
	    methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      }
	    }
  	}
</script>

<style>


</style>