<template>
	<div id="index">
		<h1>数据统计</h1>
		<div class="row">
			<div class="col"><p style="background-color:#FF9800;">当日数据：</p></div>
			<div class="col"><p>{{API}}<small>API请求量</small></p></div>
			<div class="col"><p>{{user}}<small>新增用户</small></p></div>
			<div class="col"><p>{{order}}<small>新增订单</small></p></div>
			<div class="col"><p>{{manager}}<small>新增管理员</small></p></div>
		</div>
		<div class="row">
			<div class="col"><p style="background-color:#20A0FF;">总数据：</p></div>
			<div class="col"><p>{{APIs}}<span>万</span><small>API请求量</small></p></div>
			<div class="col"><p>{{users}}<small>注册用户</small></p></div>
			<div class="col"><p>{{orders}}<small>订单</small></p></div>
			<div class="col"><p>{{managers}}<small>管理员</small></p></div>
		</div>
		<br/>
        <!-- 图表 -->
        <ve-line :data="chartData" :settings="chartSettings" width="870px" height="450px"></ve-line>
	</div>
</template>
<script>
	
	var today = new Date();
	var today2 = today;
	var year = today.getFullYear();
	var month = today.getMonth()>9?today.getMonth()+1:'0'+(today.getMonth()+1);
	var day = today.getDate()>9?today.getDate():'0'+today.getDate();
	var date = year+"-"+month+"-"+day;
	export default {
		data(){
			return {
				//当天数据
				API:0,
				user:0,
				order:0,
				manager:0,
				//总数据
				APIs:0,
				users:0,
				orders:0,
				managers:0,
				//过去六天的数据
				sixDates:[],
				sixAPIs:[],
				sixUsers:[],
				sixOrders:[],
				sixManagers:[],
				//过去六天数据的索引
				sixAPI:0,
				sixUser:0,
				sixOrder:0,
				sixManager:0,
				//v-chart相关属性
				chartSettings:{},
				chartData:{}
			}
		},
		methods:{
			//获取过去六天的日期
			getPassDate:function(){
				today2.setDate(today.getDate() - 6);
				var dateTemp;
				var flag = 1;
				for (var i = 0; i < 6; i++) {
				    dateTemp = today2.getFullYear()+"-"+(today2.getMonth()>9?today2.getMonth()+1:'0'+(today2.getMonth()+1))+"-"+(today2.getDate()>9?today2.getDate():'0'+today2.getDate());
				    this.sixDates.push(dateTemp);
				    today2.setDate(today2.getDate() + flag);
				    console.log(this.sixDates[i]);
				}
				this.createCanvas();
				return true;
			},
			//获取过去六天的API请求量
			getPassAPIs:function(){
				this.$http.get('http://cangdu.org:8001/statis/api/'+this.sixDates[this.sixAPI]+'/count').then(function(res){
					this.sixAPIs[this.sixAPI] = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
					console.log(this.sixAPI+"PassAPIs:"+this.sixAPIs[this.sixAPI]);
					this.sixAPI++;
					if (this.sixAPI<6) {
						this.getPassAPIs();
					};
				},function(res){
					console.log("get PassAPIs error");
				});
			},
			//获取过去六天的新注册用户
			getPassUsers:function(){
				this.$http.get('http://cangdu.org:8001/statis/user/'+this.sixDates[this.sixUser]+'/count').then(function(res){
					this.sixUsers[this.sixUser] = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
					console.log(this.sixUser+"PassUsers:"+this.sixUsers[this.sixUser]);
					this.sixUser++;
					if (this.sixUser<6) {
						this.getPassUsers();
					};
				},function(res){
					console.log("get PassUsers error");
				});
				
			},
			//获取过去六天的新增订单
			getPassOrders:function(){
					this.$http.get('http://cangdu.org:8001/statis/order/'+this.sixDates[this.sixOrder]+'/count').then(function(res){
						this.sixOrders[this.sixOrder] = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
						this.createCanvas();
						console.log(this.sixOrder+"PassOrders:"+this.sixOrders[this.sixOrder]);
						this.sixOrder++;
						if (this.sixOrder<6) {
							this.getPassOrders();
						};
					},function(res){
						console.log("get PassOrders error");
					});
				
			},
			//获取过去六天的新增管理员
			getPassManagers:function(){
				this.$http.get('http://cangdu.org:8001/statis/admin/'+this.sixDates[this.sixManager]+'/count').then(function(res){
					this.sixManagers[this.sixManager] = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
					console.log(this.sixManager+"PassManagers:"+this.sixManagers[this.sixManager]);
					this.sixManager++;
					if (this.sixManager<6) {
						this.getPassManagers();
					};
				},function(res){
					console.log("get PassManagers error");
				});
				
			},
			//获取当天API访问量、总API访问量
			getAPIandAPIs:function(){				
				this.$http.get('http://cangdu.org:8001/statis/api/'+date+'/count').then(function(res){
					this.API = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get API error");
				});
				this.$http.get('http://cangdu.org:8001/statis/api/count').then(function(res){
					this.APIs = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get APIs error");
				});
			},
			//获取当天注册用户量、总注册用户量
			getUserandUsers:function(){
				this.$http.get('http://cangdu.org:8001/statis/user/'+date+'/count').then(function(res){
					this.user = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get user error");
				});
				this.$http.get('http://cangdu.org:8001/v1/users/count').then(function(res){
					this.users = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get users error");
				});
			},
			//获取当天订单量、总订单量
			getOrderandOrders:function(){
				this.$http.get('http://cangdu.org:8001/statis/order/'+date+'/count').then(function(res){
					this.order = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get order error");
				});
				this.$http.get('http://cangdu.org:8001/bos/orders/count').then(function(res){
					this.orders = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get orders error");
				});
			},
			//获取当天新增管理员数量、总新增管理员数量
			getManagerandManagers:function(){
				this.$http.get('http://cangdu.org:8001/statis/admin/'+date+'/count').then(function(res){
					this.manager = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get manager error");
				});
				this.$http.get('http://cangdu.org:8001/admin/count').then(function(res){
					this.managers = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					this.createCanvas();
				},function(res){
					console.log("get managers error");
				});
			},
			//创建图表
			createCanvas:function(){
				this.chartData = {
			      columns: ['日期', 'API请求量', '新注册用户', '新增订单', '新增管理员'],
			      rows: [
			        
			        { '日期': this.sixDates[0], 'API请求量': this.sixAPIs[0],'新注册用户': this.sixUsers[0], '新增订单': this.sixOrders[0],'新增管理员': this.sixManagers[0] },
			        { '日期': this.sixDates[1], 'API请求量': this.sixAPIs[1], '新注册用户': this.sixUsers[1], '新增订单': this.sixOrders[1],'新增管理员': this.sixManagers[1] },
			        { '日期': this.sixDates[2], 'API请求量': this.sixAPIs[2], '新注册用户': this.sixUsers[2], '新增订单': this.sixOrders[2], '新增管理员': this.sixManagers[2] },
			        { '日期': this.sixDates[3], 'API请求量': this.sixAPIs[3], '新注册用户': this.sixUsers[3], '新增订单':this.sixOrders[3], '新增管理员': this.sixManagers[3] },
			        { '日期': this.sixDates[4], 'API请求量': this.sixAPIs[4], '新注册用户': this.sixUsers[4], '新增订单': this.sixOrders[4], '新增管理员': this.sixManagers[4] },
			        { '日期': this.sixDates[5], 'API请求量': this.sixAPIs[5], '新注册用户': this.sixUsers[5], '新增订单': this.sixOrders[5], '新增管理员': this.sixManagers[5] },
			        { '日期': date, 'API请求量': this.API, '新注册用户': this.user, '新增订单': this.order, '新增管理员': this.manager }
			      ]
			    }
			    this.chartSettings = {
			      dimension: ['日期'],
			      metrics: [ 'API请求量','新注册用户', '新增订单','新增管理员'],
			      axisSite: { right: ['新注册用户', '新增订单','新增管理员'] },
			      yAxisType: ['normal'],
			      yAxisName: ['API请求量', '新注册用户', '新增订单','新增管理员'],
			      area: false,
			      stack: {
			        '数据': ['新注册用户','新增订单','新增管理员']
			      },
			      min:[0],
			      max:[200000,400]
			      // nullAddZero:true
			    }
			}
		},
		created: function () {
			this.createCanvas();
		},
		mounted:function(){
			if(this.getPassDate()){
				this.getPassAPIs();
				this.getPassUsers();
				this.getPassOrders();
				this.getPassManagers();
				this.getAPIandAPIs();
				this.getUserandUsers();
				this.getOrderandOrders();
				this.getManagerandManagers();
			}
		}
	}
</script>
<style>
	#index{
		margin: 5px;
		width: 79%;
		float: right;
		margin-top: 53px;
	}
	#index h1{
		text-align: center;
		margin-bottom: 15px;
	}
	#index .row{
		overflow: hidden;
		margin-top:5px;
	}
	#index .col{
		float: left;
		width: 17%;
		padding: 5px 9px;
		text-align: center;
	}
	#index p{
		text-align: center;
		background-color: #E5E9F2;
		border-radius: 5px;
		font-size: 25px;
	}
	#index p>small{
		font-size: 13px;
		color: #666;
	}
	#index p>span{
		font-size: 15px;
	}
	#index .row>.col:first-child{
		color: #fff;
	}
</style>