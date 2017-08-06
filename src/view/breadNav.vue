<template>
	<div id="breadNav">
	
		<el-breadcrumb separator="/">
		 
		  <el-breadcrumb-item v-for="(item,index) in navList" :key="item">
		  	<router-link v-if='item.redirect==="noredirect"||index==navList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
			<router-link v-else :to="item.path">{{item.name}}</router-link>
		  </el-breadcrumb-item>
		  
		</el-breadcrumb>
 	</div>
</template>
<script>
	export default{
		name:'#breadNav',
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
			    matched = [{ name: '首页', path: '/' }].concat(matched)
			  }
			  console.log('面包屑:',matched);
			  this.navList = matched;
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
    line-height: 50px

}
</style>