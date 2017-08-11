<template>
	<div id="users">
		<h1>用户列表</h1>
		<el-table :data="usersdata" style="width:99%;">
			<el-table-column prop="num"  label="#" >
			 </el-table-column>
			 <el-table-column prop="date" label="注册日期" >
			  </el-table-column>
			 <el-table-column prop="name" label="用户姓名">
			  </el-table-column>
			  <el-table-column prop="address" label="注册地址">
			   </el-table-column>
		 </el-table>
			<div class="block">
			  <span class="demonstration">共3479条</span>
			  <el-pagination layout="prev, pager, next" :total="1000" >
			  </el-pagination>
			</div>
	</div>
		
</template>
<script>
	import {api} from '../global/api';
	export default{

		name:'users',
		data() {
	 	       return {

	           	usersdata:[]
	         };
	      },
	     mounted(){
	    	this.getData();
	    },
		methods:{

			 getData(){
		    	this.$http.get(api.getUserList).then(response => {
			    		// var data = response.body;
			    	console.log(response);
					console.log(response.data.usersdata);
					this.usersdata = response.data.usersdata;            
				}, response => {
				    // error callback
				    alert("加载user-managers.json文件失败");
				});
		    },				           
		
		}
		
	}
</script>
<style>

 #users{
 	margin: 5px;
 	width: 79%;
 	float: right;
 }
 #users .el-table{
 	margin-top:10px;
 }
 .block{
 	margin-top:10px;
 }
 .block span{
	margin-left: 20px;
 	font-size: 13px;
 	line-height: 28px;
 	float: left;
 }
 .el-pagination{
	margin-left: 80px;
 }

   


</style>