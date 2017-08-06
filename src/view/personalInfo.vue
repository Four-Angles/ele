<template>
	<div id="personalInfo">
		<h1>个人信息</h1>
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
	      currentDate: new Date()
	    };
	  }
	}
</script>
<style>
  #personalInfo{
  	  margin: 5px;
      width: 79%;
      float: right;
  } 
	.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
