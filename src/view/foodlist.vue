<template>
	<div id="foodlist">
		<h1 style="text-align:center;">食品列表</h1>
		<!--食品列表界面-->
		<el-table :data="foodlistdata" >
    		<el-table-column type="expand">
      			<template scope="props">
        			<el-form label-position="left" inline class="el-form--label-left demo-table-expand">
          				<el-form-item label="食品名称">
            				<span>{{ props.row.foodname }}</span>
          				</el-form-item>
          				<el-form-item label="餐馆名称">
            				<span>{{ props.row.shopname }}</span>
         				 </el-form-item>
			          	<el-form-item label="食品 ID">
			           		<span>{{ props.row.food_Id }}</span>
			          	</el-form-item>
			          	<el-form-item label="餐馆 ID">
			            	<span>{{ props.row.shop_Id }}</span>
			          	</el-form-item>
			         	<el-form-item label="食品分类">
			            	<span>{{ props.row.category }}</span>
			          	</el-form-item>
			          	<el-form-item label="餐馆地址">
			           		<span>{{ props.row.address }}</span>
			          	</el-form-item>
			          	<el-form-item label="食品介绍">
			            	<span>{{ props.row.desc }}</span>
			          	</el-form-item>
			          	<el-form-item label="食品评分">
			           		<span>{{ props.row.score }}</span>
			          	</el-form-item>
			          	<el-form-item label="月销量">
			            	<span>{{ props.row.month_sales }}</span>
			          	</el-form-item>
        			</el-form>
      			</template>
    		</el-table-column>
    		<el-table-column label="食品 ID" prop="food_Id"></el-table-column>
    		<el-table-column label="食品名称" prop="foodname">
    		</el-table-column>
    		<el-table-column label="评分" prop="score"></el-table-column>
    		<el-table-column label="操作" class="action">
    			<template scope="scope" >
			        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      	</template>
    		</el-table-column>
  		</el-table>
		
		<!--分页-->
  		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage" :page-size="10" layout="total, prev, pager, next" :total="369"></el-pagination>


		<!--编辑界面--> 

		 <!--编辑表单-->
		<el-dialog title="修改食品信息" :visible.sync="dialogTableVisible_edit">
		  <el-form :model="foodform">
		    <el-form-item label="食品名称" prop="foodname" :label-width="formLabelWidth">
		      <el-input v-model="foodform.foodname" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="食品介绍" prop="desc" :label-width="formLabelWidth">
		     <el-input v-model="foodform.desc" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="食品分类" prop="category" :label-width="formLabelWidth">
		        <el-select v-model="foodform.category" placeholder="请选择食品分类">
		          <el-option v-for="(option,index) in option_category" key="index" v-bind:label="option.text" v-bind:value="option.value"></el-option>
		        </el-select>
		    </el-form-item>
	       <el-form-item label="食品图片" :label-width="formLabelWidth">
	          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
	        	<img v-if="imageUrl" :src="imageUrl" class="avatar" v-model="foodform.imageUrl">
	        	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	      	</el-upload>
	       </el-form-item>    
		  </el-form>
			
			<!--规格表格-->
		   <el-table :data="specdata" stripe style="width: 100%;margin-bottom:10px;text-align:center;">
			   <el-table-column prop="spec_name" label="规格" width="120"></el-table-column>
			   <el-table-column prop="spec_costs" label="包装费" width="120"></el-table-column>
			   <el-table-column prop="spec_price" label="价格"></el-table-column>
			   <el-table-column label="操作">
			  		<template scope="scope">
			  			<el-button size="small" type="danger" @click="handleDeleteSpec(scope.$index, scope.row)">删除</el-button>
			     	</template>
		   		</el-table-column>
		  	</el-table>	
		  	<el-button type="primary" @click="handleadd()" style="margin-left:43%">添加规格</el-button>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogTableVisible_edit = false">取 消</el-button>
		    <el-button type="primary" @click="edit_sure()">确 定</el-button>
		  </div>
		</el-dialog>

		<!--添加规格弹出框-->
		<el-dialog title="添加规格" :visible.sync="dialogTableVisible_addSpec">
		  <el-form :model="add_spec"  :rules="rules" ref="add_spec">
		    <el-form-item label="规格" :label-width="formLabelWidth" prop="spec_name">
		      <el-input v-model.trim="add_spec.spec_name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="包装费" :label-width="formLabelWidth">
		      <el-input-number v-model="add_spec.spec_costs"  @change="" :min="0" :max="100"></el-input-number>
		    </el-form-item>
		    <el-form-item label="价格" :label-width="formLabelWidth">
		      <el-input-number v-model="add_spec.spec_price"  @change="" :min="0" :max="10000"></el-input-number>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogTableVisible_addSpec = false">取 消</el-button>
		    <el-button type="primary" @click="spec_sure('add_spec')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>	
	import {api} from '../global/api';
	export default{
		name:'foodlist',
		data() {
	      return {
	      	dialogEditVisible:false,
	      	formLabelWidth: '120px',
	      	foodlistdata:[],
	      	foodform:{
	      		foodname:'',
	      		desc:'',
	      		category:'',
	      		image_path:''
	      	},
	      	specdata:[],
	      	add_spec:{
	      		"spec_name":'',
	      		"spec_costs":'',
	      		"spec_price":''
	      	},
	      	imageUrl: '',
	      	indexOfselect:null,
	      	
	        dialogTableVisible_edit:false,
	        dialogTableVisible_addSpec:false,

	        option_category:[
	        	{text:"快餐便当",value:"快餐便当"},
	        	{text:"特色菜系",value:"特色菜系"},
	        	{text:"异国料理",value:"异国料理"},
	        	{text:"小吃零食",value:"小吃零食"},
	        	{text:"甜品饮品",value:"甜品饮品"},
	        	{text:"果蔬生鲜",value:"果蔬生鲜"},
	        	{text:"面包蛋糕",value:"面包蛋糕"}
	        ],
            
            total:null,
   			listQuery: {
	            currPage: 1,
	            pageSize: 10,

	            // importance: undefined,
	            title: '',
	            type: null,//类型               
        	},
	        rules:{	     
	          spec_name: [
	            { required: true, message: '请输入规格', trigger: 'blur'}
	          ]
      	  	}
	      };
	      
    	},  

    	mounted(){
    		var vm = this;

    		this.getData();
    		/*init_addspec = function(){

    				alert(1);
    		}*/
	    	
	    },

    	methods:{
    		//图片上传
    		handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		      },
		    beforeAvatarUpload(file) {
		        /*const isJPG = file.type === 'image/jpeg';*/
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        /*if (!isJPG) {
		          this.$message.error('上传食品图片只能是 JPG 格式!');
		        }*/
		        if (!isLt2M) {
		          this.$message.error('上传食品图片大小不能超过 2MB!');
		        }
		        return /*isJPG &&*/ isLt2M;
		    },

		    //读取数据
		    getData(){
		    	this.$http.get(api.getFoodlist).then(response => {

		    		var data = response.data.data;
		    		console.log(data);

		    		this.foodlistdata = data;

				
				}, response => {
				    // error callback
				    alert("加载data-foodlist.json文件失败");
				});
		    },

		    //分页
		    handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        this.listQuery.pageSize = val;
		      },
		    handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		        this.listQuery.currPage = val;
		    },

		    //编辑
		    handleEdit(index,row){
		    	this.dialogTableVisible_edit = true;		  

		    	//编辑弹框绑定内容
		    	console.log("row",row);
		    	//this.foodform =  row;
		    	//this.foodform =  JSON.parse(JSON.stringify(row));//深度拷贝
		    	this.foodform = Object.assign({},row);

		    	this.indexOfselect = index;		

		    	//添加规格表格引用数据
		    	this.specdata = row.spec;

		    },

		    //食品列表删除
		    handleDelete(index,row){
	      		console.log(index,row);
	      		this.foodlistdata.splice(index,1);
	      		this.$message({
			          message: '删除食品信息成功',
			          type: 'success'
			     });
	      	},

	      	//按钮－添加规格
	      	handleadd(){
	      		this.add_spec = {
	    				"spec_name":'',
			      		"spec_costs":'',
			      		"spec_price":''
	    		}
	      		this.dialogTableVisible_addSpec = true;
	      	},

	      	//规格删除
	      	handleDeleteSpec(index,row){
	      		console.log(index,row);
	      		this.specdata.splice(index,1);
	      		this.$message({
			          message: '删除规格信息成功',
			          type: 'success'
			     });
	      	},

	      	//规格添加-确定
	      	spec_sure(formName){
	      		this.$refs[formName].validate((valid) => {
		          if (valid) {
		            console.log("formName");
		      		this.specdata.push(this.add_spec);
		      		this.dialogTableVisible_addSpec = false;	 
		      		this.$message({
			          message: '添加规格成功',
			          type: 'success'
			        });
		          } else {
		            this.$message.error('添加失败,请检查信息填写是否错误。');
		            return false;
		          }
		        });
      			     		
	      	},
			 
			//按钮-编辑确定
	      	edit_sure(){
	      		let vm = this;

	      		this.$confirm('确定修改信息?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		 
		    	  vm.foodlistdata[vm.indexOfselect] = vm.foodform;
		    	  vm.foodlistdata.splice(vm.indexOfselect,1,vm.foodform)
		    	  vm.dialogTableVisible_edit = false;

		          this.$message({
		            type: 'success',
		            message: '更新食品信息成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消修改'
		          });          
		        });
		    	
	      	}
    	}
	}
</script>
<style>
	#foodlist{
		margin: 5px;
		width: 79%;
		float: right;
	}

	/*列表界面*/
	.el-table{
		width: 99%;
		margin: 10px auto; 
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

	/*编辑界面-图片上传*/
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 150px;
	    height: 150px;
	    line-height: 150px;
	    text-align: center;
	}
	.avatar {
	    width: 150px;
	    height: 150px;
	    display: block;
	}

	/*编辑界面-添加规格按钮*/
	.el-button{
		/* text-align: center; */
	}

</style>