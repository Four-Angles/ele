<template>
	<div id="ord">
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="用户名">
		            <span>{{ props.row.userName }}</span>
		          </el-form-item>
		          <el-form-item label="店铺名称">
		            <span>{{ props.row.shopName }}</span>
		          </el-form-item>
		          <el-form-item label="收货地址">
		            <span>{{ props.row.takeAddress }}</span>
		          </el-form-item>
		          <el-form-item label="店铺 ID">
		            <span>{{ props.row.shopId }}</span>
		          </el-form-item>		        
		          <el-form-item label="店铺地址">
		            <span>{{ props.row.shopAddress }}</span>
		          </el-form-item>
		          
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="订单 ID"
		      prop="orderId">
		    </el-table-column>
		    <el-table-column
		      label="总价格"
		      prop="price">
		    </el-table-column>
		    <el-table-column
		      label="订单状态"
		      prop="state">
		      <template scope="scope">		         
		         <el-tag :type="scope.row.state=='支付成功'?'success':'danger'">{{scope.row.state}}</el-tag>
		      </template>
		    </el-table-column>
		  </el-table>
		  <div class="block">		   
		     <el-pagination
		       
		       :current-page.sync="currentPage"
		       :page-size="100"
		       layout="total, prev, pager, next"
		       :total="1000">
		     </el-pagination>
		   </div>
		<!-- <el-table :data="tableData" border style="width:800PX;max-wight:800px;margin:0 auto">
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
	  	</el-table>  -->
	</div>
</template>

<script>
	import {api} from '../global/api';
	export default {
	    data() {
	      return {
	        tableData: [],
	        currentPage: 1,
	      }
	    },
	    created(){
	    	this.$http.get(api.getOrderData,{params:{currentPage:1}}).then(response => {
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
	      	
	      
	      	},
	      	
	    
  }
</script>
<style>
 #ord{
 	margin: 5px;
 	margin-top: 50px;
	width: 79%;
	float: right;
} 
/*列表位置宽度*/
.el-table{
	width: 99%!important;
	margin: 10px auto; 
}

/*列表内容样式设置*/
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>