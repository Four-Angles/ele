<template>
	<div id="addfoods">
		<h1>添加商品</h1>

		<div id="select-food1">
		选择食品种类
		</div>  <!-- select-food  -->
		<div id="select-food2">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		 <el-form-item label="食品种类">
				    <el-select v-model="ruleForm.region2" placeholder="请选择" class="el-select1">
				      <el-option label="甜品" value="shanghai"></el-option>
				      <el-option label="饮品" value="beijing"></el-option>
				      <el-option label="特色小炒" value="shenzhen"></el-option>
				      <el-option label="精品靓汤" value="guangzhou"></el-option>
				    </el-select>
				  </el-form-item>				  		
		</el-form>
		</div>  <!-- select-food2 -->
		<div class="select-food3">
		 <el-collapse  @change="handleChange">
  			<el-collapse-item name="1" class="hide">
  			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
				<el-form-item  label="食品种类">
			   		 <el-input v-model="ruleForm.kind"></el-input>
			     </el-form-item>
					<el-form-item label="种类描述">
			   		 <el-input v-model="ruleForm.descripe"></el-input>
			     </el-form-item>
			     <el-button type="primary" class="sumit">提交</el-button>
			</el-form>
  			 </el-collapse-item>
  			    <el-collapse-item  name="1" class="hide2" title="添加食品种类"></el-collapse-item>		  							  
			</el-collapse>

		</div>  <!-- select-food3 -->
		
		<div id="add-food1">
		添加食品
		</div>  <!-- select-food  -->
			<div id="add-food2">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
				  <el-form-item  label="食品名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
					
				 <el-form-item  label="食品活动">
			   		 <el-input v-model="ruleForm.active"></el-input>
			     </el-form-item>
					<el-form-item label="食品详情">
			   		 <el-input v-model="ruleForm.details"></el-input>
			     </el-form-item>
				
                  <el-form-item label="上传食品图片">
			   		 <el-upload action="https://jsonplaceholder.typicode.com/posts/"
  						list-type="picture-card" :on-preview="handlePictureCardPreview"
  						:on-remove="handleRemove">
 						 <i class="el-icon-plus"></i>
							</el-upload>
						<el-dialog v-model="dialogVisible" size="tiny">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
			     </el-form-item>


				 <el-form-item label="食品特点">
				    <el-select v-model="ruleForm.region2" placeholder="请选择" class="el-select2">
				      <el-option label="新品" value="shanghai"></el-option>
				      <el-option label="招聘" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>

					<template>
					<el-form-item label="食品规格">
					  <el-radio class="radio" v-model="radio" label="1">单规格</el-radio>
					  <el-radio class="radio more-st" v-model="radio" label="2" >多规格</el-radio>
					   </el-form-item>
					</template>
						<div v-if="radio==='2'">
							<div id="more-standards">
							<el-button type="primary">添加规格</el-button>
						<template>
						    <el-table :data="tableData" style="width: 100%">
							      <el-table-column prop="standard" label="规格" width="180">
							      </el-table-column>
							      <el-table-column prop="charge" label="包装费" width="180">
							      </el-table-column>
							      <el-table-column prop="price" label="价格">
							      </el-table-column>
							      <el-table-column prop="operation" label="操作">
						      <template scope="scope">      
							       <el-button size="small" type="danger"  @click.native.prevent="deleteRow(scope.$index, tableData)">
							        删除
							        </el-button>
							      </template>
						      </el-table-column>
						    </el-table>
						 </template>						
							</div> <!--  more-standards -->
						</div> <!--  v-if -->
					 <div v-if="radio==='1'">
					<el-form-item label="包装费" >
			   		 <template>
  						<el-input-number v-model="num1" @change="handleChange" :min="0" :max="10"></el-input-number>
					</template>
			     </el-form-item>
			     <el-form-item label="价格" >
			   		 <template>
  						<el-input-number v-model="num2" @change="handleChange" :min="1" :max="100"></el-input-number>
					</template>
			     </el-form-item>
			     </div>
			      <div v-if="!ruleForm.name">
			      <el-button type="primary" class="confirm"  @click="show1()" >确认添加食品</el-button></div>
			       <div v-else="!this.dialogImageUrl">
			       	 <el-button type="primary" class="confirm"  @click="show()" >确认添加食品</el-button>
			       </div>
										
				</el-form>


	      </div> <!-- add-food2 -->




	</div> <!-- addfoods -->
</template>
<script>
	export default{
		name:'addfoods',
		data() {
	 	       return {
	 	       	num1: 0,
	 	       	num2: 20,
	 	       	radio: '1',
	 	       	dialogImageUrl: '',
        		dialogVisible: false,
	           	  ruleForm: {
         				 name: '',
          				 active: '',
          				 details: '',
          				 kind: '',
          				 descripe: '',
          				 region1: '',
          				 region2: ''
       				 },
			        rules: {
			          name: [
			            { required: true, message: '请输入食品名称', trigger: 'blur' },			 
			          ]                                   
			                
			        },
			         tableData: [{
			            standard: '默认',
			            charge: '0',
			            price: '20',
			       
			          }]
	         };
	      },
		methods:{

			handleRemove(file, fileList) {

        		console.log(file, fileList);
      		},
		 
	      	handlePictureCardPreview(file) {
	        	this.dialogImageUrl = file.url;
	        	this.dialogVisible = true;
        	},

       		handleChange(value) {
   				console.log(value);
      		},

	      	deleteRow(index, rows) {
	        	 rows.splice(index, 1);
	       	},
      		show:function(){
      				this.$message({
      					showClose: true,
      					message: '必须上传食品图片',
      					 type: 'error'
      					  });
      				console.log("添加食品信息：",this.ruleForm);
      				return false;
    			     					
			},
			show1:function(){
		 		 this.$notify.error({
          		 title: '错误',
          		 message: '请检查输入是否正确'
        		});
			 }
		 				 
      	}

		
	}
</script>
<style>
	#addfoods{
		margin: 5px;
		width: 79%;
		float: right;
		text-align: center;
	}
	#select-food1{
		margin: 20px auto 0 auto;
		height: 21px;
		width: 464px;
		margin-bottom: 10px;
		font-size: 16px;

	}
#select-food2{
	height: 80px;
	width: 60%;
	border-top-left-radius: 6px;
	border-top-right-radius-radius: 6px;
	border: 1px solid #eaeefb;
	margin: auto;
	border-bottom: none;
}
.select-food3{
	width: 60.2%;
	margin: auto;
}
.el-select1{
	width: 100%;
}
.sumit{float: left;margin-left: 100px;}
.hide .el-collapse-item__header{display: none;}
.hide2 .el-collapse-item__content{display: none;}
.hide2 .el-collapse-item__header:hover{background: #f9fafc;}

#add-food1{
		margin: 20px auto 0 auto;
		height: 21px;
		width: 464px;		
		margin-bottom: 10px;
		font-size: 16px;

	}
	#add-food2{
		width: 60%;
		height: 666px;
		border-radius: 4px;
		border: 1px solid #eaeefb;
		margin: auto;
	}
#addfoods .el-form{
		margin-left: 14px;
		margin-top: 12px;
		width: 96% !important;

	}
	.el-upload{		
	float: left;
	}

	.el-select2,.el-input-number{
		float: left;
	}
	.el-radio{
		float: left;
	}
	#more-standards{
		height: 147px;
		width: 100%;
	}
	.el-table{
		margin-top: 10px;
	}
	#add-button{
		margin-left:-300px;
		margin-top: 20px;
	}
	.confirm{margin-left: 100px;float: left;}
	.upload-picture{
		color: #8c939d;
		height: 40px;
		width: 200px;
		margin-left: 350px;
		margin-top: 38px;
		line-height: 40px;
		border: 1px solid #eaeefb;
		font-size: 16px;
	}
	.upload-picture i{
		height: 100%;
		width: 40px;		
		font-size: 12px;
		color:white;
		background-color: red;
		float: left;
		text-align: center;	
		line-height: 40px;
	}
</style>
