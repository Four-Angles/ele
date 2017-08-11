<template>
	<div id="addshops">
		<h1>添加商铺</h1>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
		  <el-form-item label="店铺名称" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item class="address" label="详细地址" prop="region" >
		    <el-autocomplete
		      v-model="ruleForm.region"
		      :fetch-suggestions="querySearchAsync"
		      placeholder="请输入内容"
		      @select="handleSelect"
		    >  	
		    </el-autocomplete><br>
		    <span>当前城市：广州</span>			
		  </el-form-item>
		  <el-form-item label="联系电话" prop="phone">
		    <el-input v-model="ruleForm.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="店铺简介" >
		    <el-input v-model="ruleForm.intro"></el-input>
		  </el-form-item>
		  <el-form-item label="店铺标语" >
		    <el-input v-model="ruleForm.banner"></el-input>
		  </el-form-item>
		  <el-form-item label="店铺分类">
		  	<el-cascader :options="options" v-model="selectedOptions2" change-on-select></el-cascader>
		  </el-form-item>

		  <el-form-item label="店铺特点" >		  	
		  	 	<span>品牌保证</span>
		  		<el-switch on-text="" off-text="" v-model="ruleForm.promise"></el-switch>		  	
		  
		  		<span>蜂鸟专送</span>
		  		<el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
			    
			    <span>开发票</span>
		    	<el-switch on-text="" off-text="" v-model="ruleForm.invoice"></el-switch>

		   		<span>准时达</span>
		    	<el-switch on-text="" off-text="" v-model="ruleForm.ontime"></el-switch>		    
		   </el-form-item>

		   <el-form-item label="配送费">  
				<el-input-number v-model="num1"  :min="0" ></el-input-number>
		   </el-form-item>
	       <el-form-item label="起送价">  
	   			<el-input-number v-model="num2"  :min="0" ></el-input-number>
	       </el-form-item>
	       <el-form-item label="营业时间"> 
	       		<el-time-select
	       		  v-model="value1"
	       		  :picker-options="{
	       		    start: '00:00',
	       		    step: '00:15',
	       		    end: '23:00'
	       		  }"
	       		  placeholder="起始时间">
	       		</el-time-select>
	       		<el-time-select
	       		  v-model="value2"
	       		  :picker-options="{
	       		    start: '00:00',
	       		    step: '00:15',
	       		    end: '23:00'
	       		  }"
	       		  placeholder="结束时间">
	       		</el-time-select>
	       </el-form-item>
	       <el-form-item label="上传店铺头像">
		       <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarScucess1" :before-upload="beforeAvatarUpload">
		         <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
		         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		       </el-upload>
	       </el-form-item>
          <el-form-item label="上传营业执照">
   	       <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarScucess2" :before-upload="beforeAvatarUpload">
   	         <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
   	         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
   	       </el-upload>
          </el-form-item>
         <el-form-item label="上传餐饮服务许可证">
  	       <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarScucess3" :before-upload="beforeAvatarUpload">
  	         <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
  	         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  	       </el-upload>
         </el-form-item>
         <el-form-item label="优惠活动">
         	<el-select v-model="value3" placeholder="请选择">
         	    <el-option
         	      v-for="item in options2"
         	      :key="item.value"
         	      :label="item.label"
         	      :value="item.value">
         	    </el-option>
         	  </el-select>
         </el-form-item>
         <el-dialog class="discountDialog" title="提示" :visible.sync="dialogFormVisible">
           <el-form :model="form">
           	<el-form-item label="请输入活动详情"></el-form-item>			
            <el-input v-model="input" placeholder="" :autofocus="true" ></el-input>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button @click="dialogFormVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogFormVisible = false;discountDetial()">确 定</el-button>
           </div>
         </el-dialog>
         <el-table :data="tableData"  style="width: 100%">
             <el-table-column label="活动标题" width="140">
               <template scope="scope">
                 <span style="margin-left: 10px">{{ scope.row.title }}</span>
               </template>
             </el-table-column>
            <el-table-column label="活动名称" width="140">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
             <el-table-column label="活动详情" width="210">
               <template scope="scope">              
                 <span style="margin-left: 10px">{{ scope.row.detial }}</span>
               </template>
             </el-table-column>
             <el-table-column label="操作">
               <template scope="scope">
                 
                 <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
               </template>
             </el-table-column>
           </el-table>

		 
		  <el-form-item class="text_mid">
		    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<style>
	

	h1{
		text-align:center; 
	}
	#addshops{
	 	margin: 5px;
		width: 79%;	
		overflow: hidden;
		float: right;

	}
	.el-form{
		padding-top: 10px;
		width: 56%!important;
		margin: 0 auto!important;
	}

	
	
	/*店铺详细地址输入框大小*/
	.address .el-autocomplete{
		width: 100%


	}
	/*选择店铺类型时隐藏滚动条*/
	
	.el-cascader-menus{
		width: 400px;
		overflow:hidden;
	}
	.el-cascader-menu{
		width: 220px;
	}

	/*上传照片的设置*/
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    overflow: hidden;
	   
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	  }
	  .el-input-number,.el-upload{
	  	margin-left: 0px!important;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 130px;
	    height: 130px;
	    line-height: 130px;
	    text-align: center;
	  }
	  .avatar {
	    width: 130px;
	    height: 130px;

	  }

	 /* 优惠详情对话框的样式*/
	 .discountDialog{
	 	margin:0 auto;
	 	width: 800px;
	 }
	 .discountDialog .el-form{

	 	width: 100%
	 }
	 .discountDialog .el-input{
	 	width: 100%;
	 }

	/* 优惠详情列表字体与相应列标题左对齐*/
	 .el-table__row .cell span{
	 	margin-left: 0px!important
	 }

	 /*创建和重置按钮居中*/
	 .text_mid{
	 	margin-top: 10px;
	 	text-align: center;
		
	 }
</style>
<script>
	// export default{
	// 	name:'addshops',
	// 	data() {
	//  	       return {
	           	
	//          };
	//       },
	// 	methods:{
			
	// 	}
		
	// }
	export default {
	    data() {
	      return {
	      	num1:0, //配送费
	      	num2:0,	//起送价
	      	value1:'', //起始时间input框内容
	      	value2:'', //结束时间input框内容
	      	value3:'减', //优惠活动select框内容，默认选择第一个
	      	imageUrl1: '',
	      	imageUrl2: '',
	      	imageUrl3: '',
	      	input: '', //优惠详情内容
	      	options:[{  //店铺类型选项的选项
	      	          value: 'xiaochi',
	      	          label: '小吃宵夜',
	      	          children: [
	      	          	{value: 'xiaolongxia',label: '小龙虾'}, 
	      	          	{value: 'difangxiaochi',label: '地方小吃'},
	      	         	{value: 'shaokao',label: '烧烤'},
	      	         	{value:'zhajikaochuan',label:'炸鸡烤串'},
	      	         	{value:'yaboluwei',label:'鸭脖卤味'},
	      	         	{value:'lingshi',label:'零食'},

	      	         	]
	      	         },
	      	         {
	      	          value: 'liaoli',
	      	          label: '异国料理',
	      	          children: [
	      	          	{value: 'rihan', label: '日韩料理'}, 
	      	          	{value: 'xican',label: '西餐'}, 
	      	            {value: 'pisayimian',label: '披萨意面'}, 
	      	            {value: 'dongnanya',label: '东南亚菜'}, 
	      	          ]
	      	        }, 
	      	        {
	      	          value: 'tianpin',
	      	          label: '甜品饮品',
	      	          children: [
	      	          	{value: 'naicha', label: '奶茶'},
	      	          	{value: 'juice',label: '果汁'},
	      	            {value: 'cake',label: '蛋糕'}
	      	          ]
	      	        },
	      	        {
	      	          value: 'kuaicanbiandang',
	      	          label: '快餐便当',
	      	          children: [
	      	          	{value: 'jiancan', label: '简餐'},
	      	          	{value: 'gaijiaofan',label: '盖浇饭'},
	      	            {value: 'mifenmianguan',label: '米粉面馆'},
	      	            {value: 'baozizhoudian',label: '包子粥店'},
	      	            {value: 'malatang',label: '麻辣烫'},
	      	            {value: 'jiaoziyuntun',label: '饺子云吞'}
	      	          ]
	      	        }
	      	        ],
        	selectedOptions2: ['xiaochi', 'shaokao'],
	      	restaurants: [],
	      	state4: '',
	      	timeout:  null,
	        ruleForm: {
	          name: '',
	          phone:'',
	          intro:'',
	          banner:'',
	          region: '',
	          promise:true,
	          delivery: true,
	          invoice:true,
	          ontime:true,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	         
	        rules: {
	          name: [
	            { required: true, message: '请输入店铺名称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          phone:{required: true, message: '请输入联系电话', trigger: 'blur'},
	          region: [
	            { required: true, message: '请输入详细地址', trigger: 'blur' }
	          ],
	          
	          type: [
	            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
	          ],
	          resource: [
	            { required: true, message: '请选择活动资源', trigger: 'change' }
	          ],
	          desc: [
	            { required: true, message: '请填写活动形式', trigger: 'blur' }
	          ]
	        },
	        options2:[{
	                  value: '减',
	                  label: '满减优惠'
	                }, {
	                  value: '特',
	                  label: '优惠大酬宾'
	                }, {
	                  value: '新',
	                  label: '新用户立减'
	                }, {
	                  value: '领',
	                  label: '进店领券'
	                }],
	        dialogFormVisible: false, //优惠弹出表框状态的可视情况
	        form: {
	                  name: '',
	                  region: '',
	                  date1: '',
	                  date2: '',
	                  delivery: false,
	                  type: [],
	                  resource: '',
	                  desc: ''
	                },
	        tableData: [{				//优惠活动列表
	                  title: '减',
	                  name: '满减优惠',
	                  detial: '满30减5，满60减8'
	                }]

	        
	      }
	      //满减优惠的选项
	     
	    },
	    methods: {
	    	discountDetial(){
	    		var str='';
	    		if(this.input!=''){
	    			for(let i=0;i<this.options2.length;i++){
	    				if(this.options2[i].value===this.value3){
	    					str=this.options2[i].label;
	    				}
	    			}
	    			this.tableData.push({title:this.value3,name:str,detial:this.input
	    			});
	    			this.input='';
	    		}
	    		

	    	},
	    	handleAvatarScucess1(res, file) {
	    	       this.imageUrl1 = URL.createObjectURL(file.raw);
	    	},
	    	handleAvatarScucess2(res, file) {
	    	       this.imageUrl2 = URL.createObjectURL(file.raw);
	    	},
	    	handleAvatarScucess3(res, file) {
	    	       this.imageUrl3 = URL.createObjectURL(file.raw);
	    	},
    	    beforeAvatarUpload(file) {
    	       const isJPG = file.type === 'image/jpeg';  
    	       const isLt2M = file.size / 1024 / 1024 < 2;

    	       if (!isJPG) {
    	         this.$message.error('上传头像图片只能是 JPG 格式!');//只上传jpg格式
    	       }
    	       if (!isLt2M) {
    	         this.$message.error('上传头像图片大小不能超过 2MB!');
    	       }
    	       return isJPG && isLt2M;
    	     }, 
    	     //点击创建按钮	    	 
	        submitForm(formName) {
	          this.$refs[formName].validate((valid) => {
	            if (valid) {
	              alert('submit!');
	              console.log("添加商铺信息：",this.ruleForm);
	            } else {
	            	alert('error submit!');
	              console.log('error submit!!');
	              return false;
	            }
	          });
	        },
	        loadAll() {
	                return [
	                  { "value": "长宁区新渔路144号" },
	                  { "value": "上海市长宁区淞虹路661号" },
	                  { "value": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
	                  { "value": "天山西路438号" },
	                  { "value": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
	                  { "value": "上海市长宁区金钟路633号" },
	                  { "value": "上海市嘉定区曹安公路曹安路1685号" },
	                  { "value": "上海市普陀区同普路1435号" },
	                  { "value": "上海市北翟路1444弄81号B幢-107" },
	                  { "value": "上海市嘉定区新郁路817号" },
	                  { "value": "嘉定区曹安路1611号" },
	                  { "value": "嘉定区曹安公路2383弄55号" },
	                  { "value": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
	                  { "value": "上海长宁区金钟路968号9号楼地下一层" },
	                  { "value": "上海市长宁区天山西路119号" },
	                  { "value": "上海市长宁区仙霞西路" },
	                  { "value": "上海市长宁区天山西路567号1层R117号店铺" },
	                  { "value": "上海市普陀区光复西路丹巴路28弄6号楼819" },
	                  { "value": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
	                  { "value": "上海市普陀区棕榈路" },
	                  { "value": "元丰天山花园(东门) 双流路267号" },
	                  { "value": "上海市长宁区天山西路" },
	                  { "value": "上海市长宁区通协路" },
	                  { "value": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
	                  { "value": "长宁区仙霞西路88号1305室" },
	                  { "value": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
	                  { "value": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
	                  { "value": "上海市长宁区威宁路天山路341号" },
	                  { "value": "上海市嘉定区丰庄路240号" },
	                  { "value": "长宁区新渔路144号" },
	                  { "value": "长宁区淞虹路148号" },
	                  { "value": "上海市普陀区老真北路160号" },
	                  { "value": "上海市长宁区金钟路968号15楼15-105室" },
	                  { "value": "剑河路443-1" },
	                  { "value": "长宁区北新泾街道天山西路490-1号" },
	                  { "value": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
	                  { "value": "上海市金钟路633号地下一层甲部" },
	                  { "value": "长宁区仙霞西路299弄3号101B" },
	                  { "value": "天山西路430号" },
	                  { "value": "上海市长宁区天山西路" },
	                  { "value": "上海市长宁区金钟路968号15楼15-105室" },
	                  { "value": "天山西路428号" },
	                  { "value": "上海市长宁区协和路福泉路255弄57-73号" },
	                  { "value": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
	                  { "value": "上海市长宁区天山西路492号" },
	                  { "value": "长宁区仙霞西路88号百联2楼" },
	                  { "value": "天山西路389号" },
	                  { "value": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
	                ];
	              },
	        resetForm(formName) {
	          this.$refs[formName].resetFields();
	        },
	        querySearchAsync(queryString, cb) {
	               var restaurants = this.restaurants;
	               var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

	               clearTimeout(this.timeout);
	               this.timeout = setTimeout(() => {
	                 cb(results);
	               }, 3000 * Math.random());
	         },
	         createStateFilter(queryString) {
	           return (state) => {
	             return (state.value.indexOf(queryString.toLowerCase()) === 0);
	           };
	         },
	         handleSelect(item) {
	           console.log(item);
	         },
	         //优惠活动删除操作
           handleDelete(index, row) {
             this.tableData.splice(index,1);
           }

	      },
	      mounted() {
	        this.restaurants = this.loadAll();
	        var vue=this;
	        var youhui=document.getElementsByClassName("el-select-dropdown__item");
	        for(var i =0 ;i<youhui.length;i++){
	        	youhui[i].onclick=function (){
	        		vue.dialogFormVisible=true;
	        		
	        	}
	        }
	        // $(youhui).click(function  () {
	        // 	console.log("sfjsaklfj")
	        // })
	        
	      }
	     
	  }


	 
</script>
