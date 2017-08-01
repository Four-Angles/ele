<template>
	<div id="ord">
		<el-table :data="tableData" border style="width:800PX;max-wight:800px;margin:0 auto">
	    	<el-table-column prop="date" label="日期" sortable width="120"> </el-table-column>
	    	<el-table-column prop="number" label="订单号" sortable width="120"></el-table-column>
	    	<el-table-column prop="goods" label="商品名称" width="120"></el-table-column>
	    	<el-table-column prop="price" label="价格" sortable width="100"></el-table-column>
	    	<el-table-column prop="tag" label="交易状况" width="120" :filters="[{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }]" :filter-method="filterTag" filter-placement="bottom-end">
	      		<template scope="scope">
					<el-tag :type="scope.row.tag === '失败' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
	      		</template>
	    	</el-table-column>
	    	<el-table-column label="操作">
     		 	<template scope="scope">
        			<el-button size="small" @click="pingjia()">评价</el-button>
        			<el-button size="small" type="danger" @click="deleted(scope.$index,scope.row)" >删除</el-button>
        		</template>
    		</el-table-column>
	  	</el-table> 
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        tableData: []			
	      }
	    },
	    created(){
	    	this.$http.get('../../static/data/orderdata.json').then(response => {
				// get body data
					console.log(response);
					console.log(response.data.tableData);
					this.tableData = response.data.tableData;
				}, response => {
				    // error callback
				    alert("加入json文件失败");
				});
	    },
	    methods: {
	      	/*formatter(row, column) {
	        	return row.address;
	      	},*/
	      	filterTag(value, row) {
	        	return row.tag === value;
	      	},
	      	pingjia(){
	      		this.$prompt('请填写评价', '评价',{
	      			confirmButtonText:'确定',
	      			cancelButtonText:'取消',
	      			inputValue:""
	      		}).then(({value}) => {
	      			this.$message({
	      				type:'success',
	      				message:'评价成功!'
	      			});
	      		})/*.catch(() =>{
	      			this.$message({
	      				type:'info',
	      				message:'取消评价'
	      			})
	      		})*/
	      	},
	      	deleted(index,row){
	      		console.log(index,row);
	      		this.tableData.splice(index,1);
	      	}
	    }
  }
</script>
<style>
 #ord{
	padding:50px 10px; 
} 
</style>