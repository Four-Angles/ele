<template>
  <div id="app">
      
    <router-view></router-view>

  </div>
</template>

<script>

//vue组件实例
export default {
  name: 'app',
  //注册组件
  components:{ }, //从外部通过import导入Menu组件，注册为menu1
  data() {
        return {
          
        };
      },
  methods: {
    /*handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }*/
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /* margin-top: 10px;  */
}
.logo{
  width: 100px;
  height: 100px;
}
</style>
