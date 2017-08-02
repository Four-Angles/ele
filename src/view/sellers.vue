<template>
	<div id="sellers">
		<h1>商家列表</h1>
<<<<<<< HEAD
		
	</div>
=======
  <el-table
    :data="list"
    style="width: 100%;">
    <el-table-column type="expand">
      <template scope="props">
        <el-form  label-position="left"  inline  class="demo-table-expand">
          <el-form-item 
          label="店铺名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item  
          label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item 
           label="店铺介绍">
            <span>{{ props.row.description }}</span>s
          </el-form-item>
          <el-form-item  
          label="店铺 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item  label="联系电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item  label="评分">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item  label="销售量">
            <span>{{ props.row.recent_order_num }}</span>
          </el-form-item>
          <el-form-item  label="分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="店铺名称"  prop="name"></el-table-column>
    <el-table-column label="店铺地址" prop="address"></el-table-column>
    <el-table-column label="店铺介绍" prop="description"></el-table-column>
    <el-table-column label="操作" prop="desc">
		<template scope="scope">
	        <el-button size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
	        <el-button size="mini" @click="handleAdd(scope.$index)">添加食品</el-button>
	        <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
	</el-table-column>
  	</el-table>

	<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
	  <el-form >
	    <el-form-item label="活动名称" :label-width="formLabelWidth">
	      <el-input  auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="活动区域" :label-width="formLabelWidth">
	      <el-select placeholder="请选择活动区域">
	        <el-option label="区域一" value="shanghai"></el-option>
	        <el-option label="区域二" value="beijing"></el-option>
	      </el-select>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	  </div>
	</el-dialog>

  </div>
>>>>>>> f9e8aa2dfe7261f867de5bc6b70939b4847add5c
</template>
<style>
	#sellers{
		margin: 5px;
		width: 79%;
		float: right;
	}
	h1{
		text-align: center;
		margin-bottom: 15px;
	}
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

<script>
	export default{
		name:'sellers',
		data() {
	 	       return {
	 	       	dialogFormVisible:false,
	           	list:[]
	         };
	      },
		methods:{
			getData:function(){
				this.$http.get('../../static/data/sellers.json').then(function(res){
					this.list = res.body;
				},function(res){

				});
			},
			handleEdit:function(index){
				this.dialogFormVisible = true;
			},
			handleAdd:function(index){
				this.$router.push('addfoods');
			},
			handleDelete:function(index){
				 this.list.splice(index,1);
			}
		},
		mounted:function(){
	    	this.getData();

	    }
		
	}
</script>
