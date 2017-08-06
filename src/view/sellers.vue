<template>
	<div id="sellers">
		<h1>商家列表</h1>		
  <el-table v-loading.body="loading"
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
    <!-- 分页功能-->
    <br/>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

	<el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
	  <el-form :model="list[indexOfSelected]">
	      <el-form-item label="店铺名称" :label-width="100">
	      <el-input v-model="list[indexOfSelected].name" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="详细地址" :label-width="100">
	      <el-input v-model="list[indexOfSelected].address" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="店铺介绍" :label-width="100">
	      <el-input v-model="list[indexOfSelected].description" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="联系电话" :label-width="100">
	      <el-input v-model="list[indexOfSelected].phone" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="店铺分类" :label-width="100">
	      <el-cascader :options="options" v-model="myCategory" change-on-select></el-cascader>
	    </el-form-item>
	     <el-form-item label="商铺图片" :label-width="100">
	       <el-upload
	         class="avatar-uploader"
	         action="https://jsonplaceholder.typicode.com/posts/"
	         :show-file-list="false"
	         :on-success="handleAvatarSuccess">
	         <img v-if="list[indexOfSelected]['image_path']" :src="'http://images.cangdu.org/'+list[indexOfSelected]['image_path']" class="avatar">
	         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	       </el-upload>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="confirm()">确 定</el-button>
	  </div>
	</el-dialog>

  </div>
</template>
<style>
	#sellers{
		margin: 5px;
		width: 79%;
		float: right;
	}
	#sellers h1{
		text-align: center;
		margin-bottom: 15px;
	}
	#sellers .el-form-item__label{
		width: 100px;
	}
	#sellers .el-form-item__content{
		margin-left: 100px;
	}
  #sellers .demo-table-expand {
    font-size: 0;
  }
  #sellers .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  #sellers .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  #sellers .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
   #sellers  .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
    }
   #sellers  .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
   #sellers  .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
</style>

<script>
	export default{
		name:'sellers',
		data() {
	 	       return {
	 	       	total:0,
	 	       	currentPage1: 1,
	 	       	list:[],
	 	       	loading:false,
	 	       	indexOfSelected:0,
	 	       	myCategory:[],
	 	       	longitude:139.6917064,//默认经度
	 	       	latitude:23.12908,//默认维度
	 	       	offset:0 ,//默认跳过多少条数据
	 	       	limit:20, //请求数据的数量，默认20
	 	       	dialogFormVisible:false,
	 	       	options:[
	 	       		{
	 	       			value:'A',
	 	       			label:'小吃夜宵',
	 	       			children:[
	 	       				{value:'A001',label:'小龙虾'},
	 	       				{value:'A003',label:'烧烤'},
	 	       				{value:'A005',label:'鸭脖卤味'},
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'B',
	 	       			label:'异国料理',
	 	       			children:[
	 	       				{value:'B001',label:'西餐'},
	 	       				{value:'B002',label:'披萨意面'},
	 	       				{value:'B003',label:'东南亚菜'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'C',
	 	       			label:'甜品饮品',
	 	       			children:[
	 	       				{value:'C001',label:'奶茶果汁'},
	 	       				{value:'C002',label:'甜品'},
	 	       				{value:'C003',label:'咖啡'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'D',
	 	       			label:'商店超市',
	 	       			children:[
	 	       				{value:'D001',label:'超市'},
	 	       				{value:'D002',label:'便利店'},
	 	       				{value:'D003',label:'名酒坊'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'E',
	 	       			label:'特色菜系',
	 	       			children:[
	 	       				{value:'E001',label:'川湘菜'},
	 	       				{value:'E002',label:'粤菜'},
	 	       				{value:'E003',label:'江浙菜'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'F',
	 	       			label:'快餐便当',
	 	       			children:[
	 	       				{value:'F001',label:'盖浇饭'},
	 	       				{value:'F002',label:'米粉面馆'},
	 	       				{value:'F003',label:'包子粥店'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'G',
	 	       			label:'鲜花蛋糕',
	 	       			children:[
	 	       				{value:'G001',label:'鲜花'},
	 	       				{value:'G002',label:'蛋糕'},
	 	       				{value:'G003',label:'面包'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'H',
	 	       			label:'果蔬生鲜',
	 	       			children:[
	 	       				{value:'H001',label:'水果'},
	 	       				{value:'H002',label:'蔬菜'},
	 	       				{value:'H003',label:'生鲜'}
	 	       			]
	 	       		}
	 	       	]
	           	
	         };
	      },
		methods:{
			//获取所有商铺的数量
			getTotal:function(){
				this.$http.get('http://cangdu.org:8001/shopping/restaurants/count').then(function(res){
					this.total = res.body.count;
				},function(res){
				});
			},
			//获取所有商铺列表
			getData:function(){
				this.$http.get('http://cangdu.org:8001/shopping/restaurants',{params:{latitude:this.latitude,longitude:this.longitude,offset:this.offset,limit:this.limit}}).then(function(res){
					this.list = res.body;
					this.loading = false;
				},function(res){
				});
			},
			//成功获取位置后执行的方法
			setPosition:function(position){
				this.longitude = position.coords.longitude;
				this.latitude = position.coords.latitude;
				console.log(this.longitude,this.latitude);
				this.getData();
			},
			//获得用户当前地理位置
			getPosition:function(){
				this.loading = true;
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(this.setPosition,this.getData);
				}
			},
			handleEdit:function(index){
				this.indexOfSelected = index;
				this.ListCategoryToCategory(index);
				this.dialogFormVisible = true;
				
			},
			handleAdd:function(index){
				this.$router.push({path:'addfoods'});
			},
			handleDelete:function(index){
				this.$message('删除 "'+this.list[index].name+'" 成功!');
				console.log('删除 id='+this.list[index].id+" 成功！");
				this.list.splice(index,1);
			},
			handleAvatarSuccess:function(res, file) {
			        this.list[this.indexOfSelected]['image_path'] = URL.createObjectURL(file.raw);
			},
			categoryToListCategory:function(index){
				for(var i=0;i<this.options.length;i++){
					if(this.options[i]['value']==this.myCategory[0]){
						for(var j=0;j<this.options[i].children.length;j++){
							if (this.options[i].children[j]['value']==this.myCategory[1]) {
								this.list[index].category=this.options[i]['label']+"/"+this.options[i].children[j]['label'];
									console.log("确定",this.list[index].category);
							};
						}
					};
				}
			},
			ListCategoryToCategory:function(index){
				this.myCategory = [];
				var cate = this.list[index].category.split("/");
				for(var i=0;i<this.options.length;i++){
					if(this.options[i]['label']==cate[0]){
						for(var j=0;j<this.options[i].children.length;j++){
							if (this.options[i].children[j]['label']==cate[1]) {
								this.myCategory[0] = this.options[i]['value'];
								this.myCategory[1] = this.options[i].children[j]['value'];
									console.log("编辑",this.myCategory);
							};
						}
					}
				}
			},
			confirm:function(){
				this.categoryToListCategory(this.indexOfSelected);
				this.dialogFormVisible = false;
				// this.category = [];
			},
			//分页功能
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },
		    //分页功能--当前页变动时触发
		    handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		        this.offset = (val-1)*20;
		        this.getData();
		    }

		},
		mounted:function(){
			this.getTotal();
			this.getPosition();
	    	// this.getData();

	    }
		
	}
</script>
