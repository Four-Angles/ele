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
        <!-- 图表 -->
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>

	</div>
</template>
<script>

	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()>9?today.getMonth()+1:'0'+(today.getMonth()+1);
	var day = today.getDate()>9?today.getDate():'0'+today.getDate();
	var date = year+"-"+month+"-"+day;
	var argum = '';
	export default {
		created: function () {
		    this.chartData = {
		      columns: ['日期', 'API请求量', '新注册用户', '新增订单', '新增管理员'],
		      rows: [
		        { '日期': '1月1日', 'API请求量': 1523, '新注册用户': 1523, '新增订单': 12, '新增管理员': 100 },
		        { '日期': '1月2日', 'API请求量': 1223, '新注册用户': 1523, '新增订单': 345, '新增管理员': 100 },
		        { '日期': '1月3日', 'API请求量': 2123, '新注册用户': 1523, '新增订单': 7, '新增管理员': 100 },
		        { '日期': '1月4日', 'API请求量': 4123, '新注册用户': 1523, '新增订单': 31, '新增管理员': 100 },
		        { '日期': '1月5日', 'API请求量': 3123, '新注册用户': 1523, '新增订单':12, '新增管理员': 100 },
		        { '日期': '1月6日', 'API请求量': 7123, '新注册用户': 1523, '新增订单': 65, '新增管理员': 100 }
		      ]
		    }
		    this.chartSettings = {
		      dimension: ['日期'],
		      metrics: [ 'API请求量','新注册用户', '新增订单','新增管理员'],
		      axisSite: {
		        right: ['用户','订单']
		      },
		      yAxisType: ['KMB'],
		      yAxisName: ['API请求量', '用户','订单'],
		      area: false,
		      stack: {
		        'API请求量': ['API请求量', '新注册用户','新增订单','新增管理员']
		      }
		    }
		},
		data(){
			return {
				API:'',
				user:'',
				order:'',
				manager:'',
				APIs:'',
				users:'',
				orders:'',
				managers:'',
				sixDates:[],
				sixAPIs:[],
				sixUsers:[],
				sixOrders:[],
				sixManagers:[]
			}
		},
		methods:{
			
			getAPIandAPIs:function(){				
				this.$http.get('http://cangdu.org:8001/statis/api/'+date+'/count').then(function(res){
					this.API = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					console.log("1 right");
				},function(res){
					console.log("get API error");
				});
				this.$http.get('http://cangdu.org:8001/statis/api/count').then(function(res){
					this.APIs = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
				},function(res){
					console.log("get APIs error");
				});
			},
			getUserandUsers:function(){
				this.$http.get('http://cangdu.org:8001/statis/user/'+date+'/count').then(function(res){
					this.user = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					console.log("2 right");
				},function(res){
					console.log("get user error");
				});
				this.$http.get('http://cangdu.org:8001/v1/users/count').then(function(res){
					this.users = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
				},function(res){
					console.log("get users error");
				});
			},
			getOrderandOrders:function(){
				this.$http.get('http://cangdu.org:8001/statis/order/'+date+'/count').then(function(res){
					this.order = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					console.log("3 right");
				},function(res){
					console.log("get order error");
				});
				this.$http.get('http://cangdu.org:8001/bos/orders/count').then(function(res){
					this.orders = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
				},function(res){
					console.log("get orders error");
				});
			},
			getManagerandManagers:function(){
				this.$http.get('http://cangdu.org:8001/statis/admin/'+date+'/count').then(function(res){
					this.manager = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					console.log("4 right");
				},function(res){
					console.log("get manager error");
				});
				this.$http.get('http://cangdu.org:8001/admin/count').then(function(res){
					this.managers = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
				},function(res){
					console.log("get managers error");
				});
			},

		},
		mounted:function(){
			this.getAPIandAPIs();
			this.getUserandUsers();
			this.getOrderandOrders();
			this.getManagerandManagers();
		}

	}
</script>
<style>
	#index{
		margin: 5px;
		width: 79%;
		float: right;
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