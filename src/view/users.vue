<template>
	<div id="users">
		<h1>用户列表</h1>
        <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column 
              type="index"
              width="100px">
            </el-table-column>
            <el-table-column 
              property="registe_time"
              label="注册日期"
              width="220px">
            </el-table-column>
            <el-table-column 
              property="username"
              label="用户姓名"
              width="220px">
            </el-table-column>
            <el-table-column 
              property="city"
              label="注册地址">
            </el-table-column>
        </el-table>

	</div>
</template>
<script>
	export default{
		name:'users',
		data() {
	 	       return {
	           	tableData:[],
	           	currentRow: null
	         };
	      },
		methods: {
		      setCurrent(row) {
		        this.$refs.singleTable.setCurrentRow(row);
		      },
		      handleCurrentChange(val) {
		        this.currentRow = val;
		      },
		      getData(){
		      	this.$http.get('../../static/data/users.json').then(function(res){
		      		this.tableData = res.body;
		      		console.log(this.tableData);
		      	},function(res){

		      	});
		      }
		},
		mounted:function(){
			this.getData();
		}
		
	}
</script>
<style>
    #users{
		margin: 5px;
		width: 79%;
		float: right;
	}
	h1{
		text-align: center;
		margin-bottom: 15px;
	}

</style>