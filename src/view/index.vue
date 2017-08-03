<template>
	<div id="index">
		<h1>数据统计</h1>
		<div class="row">
			<div class="col">当日数据：</div>
			<div class="col">{{API}}API请求量</div>
			<div class="col">{{user}}新增用户</div>
			<div class="col">{{order}}新增订单</div>
			<div class="col">{{manager}}新增管理员</div>
		</div>
		<div class="row">
			<div class="col">总数据：</div>
			<div class="col">{{APIs}}万API请求量</div>
			<div class="col">{{users}}注册用户</div>
			<div class="col">{{orders}}订单</div>
			<div class="col">{{managers}}管理员</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				API:0,
				user:0,
				order:0,
				manager:0,
				APIs:0,
				users:0,
				orders:0,
				managers:0
			}
		},
		methods:{
			getAPI:function(){
				this.$http.get('http://cangdu.org:8001/statis/api/:date/count').then(function(res){

				},function(){

				});
			}
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
	
</style>