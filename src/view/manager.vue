<template>
	<div id="manager">
		
		<my_sidebar></my_sidebar>		

		<!-- ycAudrey 2017-8-6 start -->
		<keep-alive>
			<router-view v-if="$route.meta.keep_alive"></router-view>
		</keep-alive>
			<router-view v-if="!$route.meta.keep_alive"></router-view>
		<!-- ycAudrey 2017-8-6 end -->

		<my_nav></my_nav>
		
 	</div>
 </template>
<script>
	import sidebar from './sidebar'
	import breadNav from './breadNav'
	export default {
	  name: 'manager',
	  //注册组件
	  components:{ my_sidebar:sidebar,my_nav:breadNav}, //从外部通过import导入sidebar组件，注册为my_sidebar
	  data() {
	        return {
	         
	        };
	      },
	  methods: {

	    /*handleSelect(key, keyPath) {
	      console.log(key, keyPath);
	    }*/
	  }
	}
</script>
<style>
	*{
		padding: 0px;
		margin: 0px;
	}
</style>