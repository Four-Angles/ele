<template>
	<div id="personalInfo">
		<h1>个人信息</h1>
    <el-row :gutter="5" style="margin:20px 0px;"> 
      <el-col :span="8">  
        <div class="user_img" > 
            <img :src="imageUrl"  alt="用户头像">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"> 
                <p> 
                  <el-button type="primary"><i class="el-icon-upload"></i>上传头像</el-button>
                    </button>
                </p> 
            </el-upload>
        </div>   
      </el-col>

      <el-col :span="16">
          <div class="user_info">
              <h2>个人信息 
                <el-button size="small" v-if="!editable" @click="editable = true" style="float:right;" icon="edit">编辑</el-button> 
              </h2>
              <div class="user_info_form" v-if="editable">             
                 <el-form label-position="right" label-width="100px" :model="personalInfo">  <el-form-item label="ID">
                     <el-input v-model="personalInfo.id" disabled></el-input>
                   </el-form-item>
                   <el-form-item label="姓名">
                     <el-input v-model="personalInfo.name"></el-input>
                   </el-form-item>
                   <el-form-item label="性别">
                     <el-radio-group v-model="personalInfo.sex">
                           <el-radio label="man">男</el-radio>
                           <el-radio label="woman">女</el-radio>
                     </el-radio-group>
                   </el-form-item>
                   <el-form-item label="管理员权限">
                     <el-input v-model="personalInfo.admin"></el-input>
                   </el-form-item>
                   <el-form-item label="注册时间">
                     <el-input v-model="personalInfo.resigndate" disabled></el-input>
                   </el-form-item>
                   <el-form-item label="邮件地址" >
                     <el-input v-model="personalInfo.email"></el-input>
                   </el-form-item>
                   <el-form-item label="个人简介">
                     <el-input type="textarea" v-model="personalInfo.introduction"></el-input>
                   </el-form-item>
             
                   <el-form-item>
                      <el-button type="primary" @click="submitForm()">提交</el-button>
                      <el-button @click="resetForm()">取消</el-button>
                    </el-form-item>   
                 </el-form>    
             </div>
    
              <div class="user_info_text" v-else>
                 <el-form label-position="right" label-width="100px" :model="personalInfo">
                    <el-form-item label="ID：">
                      {{ personalInfo.id }}
                    </el-form-item>
                    <el-form-item label="姓名：">
                      {{ personalInfo.name }}
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span v-if="personalInfo.sex == 'man'">男</span>
                      <span v-else>女</span>          
                    </el-form-item>
                    <el-form-item label="管理员权限：">
                      {{ personalInfo.admin }}
                    </el-form-item>
                    <el-form-item label="注册时间：">
                      {{ personalInfo.resigndate }}        
                    </el-form-item>
                    <el-form-item label="邮件地址：">
                      {{ personalInfo.email }}        
                    </el-form-item>
                    <el-form-item label="个人简介：">
                      {{ personalInfo.introduction }}            
                    </el-form-item>    
                </el-form> 
              </div>

          </div>
      </el-col>
    </el-row>
     
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
        imageUrl:require("../img/xwz.jpg"),
	      editable:false,
        personalInfo:{
          id:"5499",
          name:"LLLL",
          sex:"woman",
          admin:"超级管理员",
          resigndate:"2017-8-1",
          email:"123456789@qq.com",
          introduction:"我的外号叫小丸子，呵呵。我的爱好是：吃饭睡觉打豆豆。"
        }
	    };
	  },
    methods:{
      //提交表单
      submitForm() {
          var vm = this;
          vm.editable = false;
          var par = {
              "id":  vm.personalInfo.id,
              "name": vm.personalInfo.name,
              "sex": vm.personalInfo.sex,
              "admin": vm.personalInfo.admin,
              "resigndate": vm.personalInfo.resigndate,
              "email": vm.personalInfo.email,
              "introduction": vm.personalInfo.introduction,
          };

          this.$message({
                message: '提交信息成功',
                type: 'success'
           });

          console.log('修改信息入参为：',par)
      },
      //重置表单
      resetForm() {
          var vm = this;
          vm.editable = false;
         // vm.personalInfo = JSON.parse( JSON.stringify(vm.personalInfo_init) ) ;
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return/* isJPG &&*/ isLt2M;
      }
    }
	}
</script>
<style>
  #personalInfo{
  	  margin: 5px;
      width: 79%;
      float: right;
  } 

  /*头像部分*/
 .user_img{
        width: 80%;
        padding: 20px;
        text-align: center;
        border: 1px solid #dee1e2; 
  }

  .user_img img{
        max-width: 150px;
        max-height: 150px;
        border-radius: 50%;
        margin: 20px 0;
  }
  
  #personalInfo .el-upload{
    float: none;
  }

  /*个人信息部分*/
  .user_info{
      padding-bottom: 20px;
      border: 1px solid #dee1e2;
  }

  .user_info h2{
          margin: 0;
          font-weight: normal;
          padding: 10px 20px;
          border-bottom: 1px solid #dee1e2;
  }

  .user_info .i_edit{
              float: right;
              font-size: 16px;
              color: #7ab8ed;
          }
  .user_info_form,.user_info_text{
      padding: 20px;
  } 
</style>
