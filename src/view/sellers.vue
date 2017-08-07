<template>
	<div id="sellers">
		<h1>商家列表</h1>		
  <el-table
    :data="list"
    style="width: 100%;">
    <el-table-column type="expand" v-loading.body="loading">
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
	  <el-form :model="myForm">
	      <el-form-item label="店铺名称" :label-width="100">
	      <el-input v-model="myForm.name" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="详细地址" :label-width="100">
	      <el-input v-model="myForm.address" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="店铺介绍" :label-width="100">
	      <el-input v-model="myForm.description" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="联系电话" :label-width="100">
	      <el-input v-model="myForm.phone" auto-complete="off"></el-input>
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
	         <img v-if="myForm['image_path']" :src="'http://images.cangdu.org/'+myForm['image_path']" class="avatar">
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
		margin-top: 53px;
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
	 	       	myForm:{},
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
	 	       				{value:'A002',label:'地方小吃'},
	 	       				{value:'A003',label:'烧烤'},
	 	       				{value:'A004',label:'炸记炸串'},
	 	       				{value:'A005',label:'鸭脖卤味'},
	 	       				{value:'A006',label:'零食'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'B',
	 	       			label:'异国料理',
	 	       			children:[
	 	       				{value:'B001',label:'日韩料理'},
	 	       				{value:'B002',label:'西餐'},
	 	       				{value:'B003',label:'披萨意面'},
	 	       				{value:'B004',label:'东南亚菜'}
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
	 	       				{value:'D003',label:'名酒坊'},
	 	       				{value:'D004',label:'零食饮料'},
	 	       				{value:'D005',label:'水站'},
	 	       				{value:'D006',label:'茶'},
	 	       				{value:'D007',label:'奶站'},
	 	       				{value:'D008',label:'粮油'},
	 	       				{value:'D009',label:'美妆母婴'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'E',
	 	       			label:'特色菜系',
	 	       			children:[
	 	       				{value:'E001',label:'川湘菜'},
	 	       				{value:'E002',label:'其他菜系'},
	 	       				{value:'E003',label:'江浙菜'},
	 	       				{value:'E004',label:'粤菜'},
	 	       				{value:'E005',label:'海鲜'},
	 	       				{value:'E006',label:'火锅烤鱼'},
	 	       				{value:'E007',label:'东北菜'},
	 	       				{value:'E008',label:'西北菜'},
	 	       				{value:'E009',label:'云南菜'},
	 	       				{value:'E010',label:'新疆菜'},
	 	       				{value:'E011',label:'鲁菜'}
	 	       			]
	 	       		},
	 	       		{
	 	       			value:'F',
	 	       			label:'快餐便当',
	 	       			children:[
	 	       				{value:'F001',label:'简餐'},
	 	       				{value:'F002',label:'盖浇饭'},
	 	       				{value:'F003',label:'米粉面馆'},
	 	       				{value:'F004',label:'包子粥店'},
	 	       				{value:'F005',label:'香锅砂锅'},
	 	       				{value:'F006',label:'麻辣烫'},
	 	       				{value:'F007',label:'饺子馄饨'},
	 	       				{value:'F008',label:'汉堡'},
	 	       				{value:'F009',label:'生煎锅贴'},
	 	       				{value:'F010',label:'黄焖鸡米饭'},
	 	       				{value:'F011',label:'烧腊饭'},
	 	       				{value:'F012',label:'煲仔饭'},
	 	       				{value:'F013',label:'咖喱饭'}
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
	 	       				{value:'H003',label:'生鲜'},
	 	       				{value:'H002',label:'海鲜水产'}
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
			//修改按钮
			handleEdit:function(index){
				this.indexOfSelected = index;
				this.ListCategoryToCategory(index);
				this.dialogFormVisible = true;
				this.myForm = JSON.parse(JSON.stringify(this.list[index]));
			},
			//添加食品按钮
			handleAdd:function(index){
				this.$router.push({path:'addfoods'});
			},
			//删除按钮
			handleDelete:function(index){
				this.$message('删除 "'+this.list[index].name+'" 成功!');
				console.log('删除 id='+this.list[index].id+" 成功！");
				this.list.splice(index,1);
			},
			//图片上传成功
			handleAvatarSuccess:function(res, file) {
			        this.list[this.indexOfSelected]['image_path'] = URL.createObjectURL(file.raw);
			},
			//编辑确定时将新的options转化为数组的options
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
			//点击编辑时数组的options转化为myForm的options
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
			//myForm表单确定按钮
			confirm:function(){
				this.list[this.indexOfSelected] = JSON.parse(JSON.stringify(this.myForm));
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
