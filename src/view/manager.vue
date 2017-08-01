<template>
	<div id="manager">
		
		<my_sidebar></my_sidebar>

		<router-view></router-view>
 	</div>
 </template>
<script>
	import sidebar from './sidebar'

	export default {
	  name: 'manager',
	  //注册组件
	  components:{ my_sidebar:sidebar}, //从外部通过import导入sidebar组件，注册为my_sidebar
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