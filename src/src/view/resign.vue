<template>
	<div id="res">
		<el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  			<el-form-item  label="用户名称" prop="name">
    			<el-input v-model="ruleForm.name" ></el-input>
  			</el-form-item>
  			<el-form-item prop="password" label="密码">
  				<el-input type="password" v-model="ruleForm.password"></el-input>
  			</el-form-item>
  			<el-form-item  label="性别" prop="sex">
  				<el-radio class="radio" v-model="ruleForm.sex" label="male">男</el-radio>
  				<el-radio class="radio " v-model="ruleForm.sex" label="female">女</el-radio>
  			</el-form-item>
  			<el-form-item prop="phone" label="手机号码">
  				<el-input v-model="ruleForm.phone"></el-input>
  			</el-form-item>
  			<el-form-item prop="email" label="邮箱">
  				<el-input v-model="ruleForm.email"></el-input>
  			</el-form-item> 			
		  	<el-form-item label="出生日期">
		      <el-form-item prop="date">
		        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
		      </el-form-item>
  			</el-form-item>
			<el-form-item label="兴趣爱好" prop="hobby">
			    <el-checkbox-group v-model="ruleForm.hobby">
			      <el-checkbox label="唱歌" name="hobby"></el-checkbox>
			      <el-checkbox label="跳舞" name="hobby"></el-checkbox>
			      <el-checkbox label="读书" name="hobby"></el-checkbox>
			      <el-checkbox label="看电影" name="hobby"></el-checkbox>
			    </el-checkbox-group>
			</el-form-item>
			 <el-form-item label="个人简介" prop="intro">
			    <el-input type="textarea" v-model="ruleForm.intro"></el-input>
			 </el-form-item>
			<el-form-item label-width="100px">
			    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
</el-form>
	</div>
</template>

<script>
export default {
    data() {
      return {
      	labelPosition: 'left',
        ruleForm: {
          name: '',
          password:'',
          sex:'',
          phone:'',
          email:'',
          date: '',
          hobby:[],
          intro: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符或数字', trigger: 'blur' }
          ],
          sex:[
          	{ required:true, message: '请选择性别', trigger: 'blur' }
          ],
          phone:[
     		{ required: true, message: '请输入手机号码', trigger: 'blur' },
      		{ min:11,max:11, message: '请输入11位数字的号码', trigger: 'blur,change' }
    	  ],
          email:[
     		{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
      		{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    	  ]   
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
.el-radio,.el-checkbox-group{
	float: left;
}
#res{
	padding: 50px;
}
.el-form{
	margin: 0 auto;
	max-width: 600px;
}
</style>