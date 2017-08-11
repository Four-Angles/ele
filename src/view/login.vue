<template>
	<div id="login"  @keyup.enter="submitForm('ruleForm2')">
		<h1>elm后台管理系统</h1>
		<div class="DivForm">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		    <el-form-item  prop="checkUser">
		    <el-input autofocus type="text" v-model="ruleForm2.checkUser" placeholder="用户名" auto-complete="off"></el-input>
		    </el-form-item>
            <el-form-item  prop="checkPass">
		    <el-input type="password" prop="checkPass" v-model="ruleForm2.checkPass" placeholder="密码" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')" >登录</el-button>

		    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->

		    <div style="margin-top:15px;">
			    <p>温馨提示：<br/>用户名：test<br/>登录密码：123</p>   
			</div>
		</el-form>
		</div>
		<!-- <router-link to="/manager"></router-link>  -->
		<!-- 校验登录密码和用户名然后去到 -->
	</div>
</template>
<script>
export default {
    data() {
    	//校验用户名
    	var validateUser = (rule, value, callback) => {
    		if (value === '') {
    			callback(new Error('请输入用户名'));
    		}else if(value != 'test'){
    			callback(new Error('输入用户名错误'));
    		}else {
    			if (this.ruleForm2.checkPass === 'test') {
    				this.$refs.ruleForm2.validateField('checkPass');
    			}
    			callback();
    		}
    	};
      	//校验密码
      	var validatePass = (rule, value, callback) => {
      		if (value === '') {
      			callback(new Error('请输入密码'));
      		} else if (value !== '123') {
      			callback(new Error('输入密码错误'));
      		} else {
      			callback();
      		}
      	};
      	return {
      		loading: false,
      		ruleForm2: {
      			checkUser: '',
      			checkPass: ''
      		},
      		rules2: {
      			checkUser: [
      			{ validator: validateUser, trigger: 'blur' }
      			],
      			checkPass: [
      			{ validator: validatePass, trigger: 'blur' }
      			]
      		}
      	};
    },
    methods: {
    	//登录时校验登录信息
	    submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		this.loading = true;
	          		sessionStorage.setItem("username",this.ruleForm2.checkUser);
		            this.$router.push('/manager/index');
		        } else {
		            console.log('error submit!!');
		            return false;
		        }
		    });
	    }
    }
  }
</script>
<style>
	#login{
		position: absolute;
		background-color: #324057;
		width: 100%;
		height: 100%;
	}
	#login h1{
		color: #FFFFFF;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 15px;
	}
	#login .DivForm{
		width: 370px;
		height: 264px;
		background-color: #fff;
		margin: 0 auto;
		border-radius: 4px;
		text-align: center;
		padding-top: 30px
	}
	#login .el-form-item__content{
		width: 320px;
		/*margin-top:20px;*/
		margin-left: 25px !important;
	}
	#login .DivForm .el-button{
		margin-top: 15px;
	}
	#login .DivForm button>span{
		display: block;
		width: 288px;
	}
	#login p{
		font-size: 12px;
		color: red;
	}
  #login .el-form{
		width: 100%!important;
	}
</style>
