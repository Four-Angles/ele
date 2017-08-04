<template>
	<div id="manager">
		
		<my_sidebar></my_sidebar>
		
		<router-view></router-view>
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