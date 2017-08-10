<template>
	<div id="managers">
		<h1>管理员列表</h1>
		<el-table :data="managersdata" stripe >
		    <el-table-column prop="id" label="ID" sortable>
		    </el-table-column>
		    <el-table-column prop="user_name" label="姓名" sortable>
		    </el-table-column>
		    <el-table-column prop="create_time" label="注册日期" sortable>
		    </el-table-column>
		    <el-table-column prop="city" label="地址">
		    </el-table-column>
		    <el-table-column prop="admin" label="权限" :filters="[{ text: '管理员', value: '管理员' }, { text: '超级管理员', value: '超级管理员' }]" :filter-method="filterTag" filter-placement="bottom-end">
		    	<template scope="scope">
					<el-tag :type="scope.row.admin === '管理员' ? 'primary' : 'success'" close-transition>{{scope.row.admin}}</el-tag>
	      		</template>
		    </el-table-column>
		</el-table>

		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 20, 30, 40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="453">
    </el-pagination>
	</div>
</template>
<script>
	import {api} from '../global/api';
	export default{
		name:'managers',
		data() {
	 	       return {
	 	       		managersdata:[],
		          
		      };
	    },
	    mounted(){
	    	this.getData();
	    },
		methods:{
			//读取数据
		    getData(){
		    
		    	this.$http.get(api.getManagersList).then(response => {
			    		var data = response.body;
			    		console.log(data.data);
			    		console.log(data.length);
	                    this.managersdata = data.data;	            
				}, response => {
				    // error callback
				    alert("加载data-managers.json文件失败");
				});
		    },

		    //权限-标签
			filterTag(value, row) {
	        	return row.admin === value;
	      	},

	      	//分页
	      	handleSizeChange(val) {
	        	console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		    }
		}
		
	}
</script>
<style>
	#managers{
		margin: 5px;
		width: 79%;
		float: right;
	}

	/*列表界面*/
	.el-table{
		width: 99%;
		margin: 10px auto; 
	}
</style>