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
	</div>
</template>
<script>
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()>9?today.getMonth()+1:'0'+(today.getMonth()+1);
	var day = today.getDate()>9?today.getDate():'0'+today.getDate();
	var date = year+"-"+month+"-"+day;
	export default {
		data(){
			return {
				API:'',
				user:'',
				order:'',
				manager:'',
				APIs:'',
				users:'',
				orders:'',
				managers:''
			}
		},
		methods:{
			getAPIandAPIs:function(){				
				this.$http.get('http://cangdu.org:8001/statis/api/'+date+'/count').then(function(res){
					this.API = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
					console.log("right");
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
					console.log("right");
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
					console.log("right");
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
					console.log("right");
				},function(res){
					console.log("get Manager error");
				});
				this.$http.get('http://cangdu.org:8001/admin/count').then(function(res){
					this.managers = res.body.count>100000?(res.body.count/10000).toFixed(2):res.body.count;
				},function(res){
					console.log("get Managers error");
				});
			}
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