<template>
	<div id="breadNav">
	
		<el-breadcrumb separator="/">
		 
		  <el-breadcrumb-item v-for="(item,index) in navList" :key="item.name">
		  	<router-link v-if='item.redirect==="noredirect"||index==navList.length-1' to="item" class="no-redirect">{{item.name}}</router-link>
			<router-link v-else :to="item.path">{{item.name}}</router-link>
		  </el-breadcrumb-item>
		 
		</el-breadcrumb>
		 <el-button type="warning" @click="out">退出系统</el-button>
 	</div>
</template>
<script>
	export default{
		name:'breadNav',
		created() {
		        this.getBreadcrumb()
		      },
		data() {
	 	     return {
	           	navList:null
	         };
	      },
		methods:{
			getBreadcrumb() {				
			    console.log('----', this.$route.matched)
			    let matched = this.$route.matched.filter(item => item.name);
			    const first = matched[0];			    
			    if (first && (first.name !== '首页' || first.path !== '')) {			   
			  		var head=null;
			  		var listDataManage =["用户列表","管理员列表","商家列表","食品列表","订单列表"];
			  		var listAddData =["添加商铺","添加商品"];			  	
			  		if(listAddData.indexOf(first.name)>=0){			  			
			  			head={path:first.path,name:'添加数据'};
			  			matched = [head].concat(matched);
			  		}
			  		else if(listDataManage.indexOf(first.name)>=0){
			  			head={path:first.path,name:'数据管理'};
			  			matched = [head].concat(matched);
			  		}				  					  
			 	}			   
			    this.navList = matched;
			},
			out(){
				sessionStorage.setItem("username","");
				this.$router.push("/");
			}
		},
			
		watch: {
		  $route() {
		    this.getBreadcrumb();
		  }
		}
	
		
	}


</script>
<style>
#breadNav{
	position: fixed;
	right: 0px;
	top: 0px;
	margin: 5px;
	width: 79%;
	height: 50px;
	padding-left: 15px;
	padding-top: 15px;
	box-sizing: border-box;
    background-color:#eff2f7;
}
#breadNav .el-button{
	position: fixed;
	top: 10px;
	right: 10px;
}
</style>