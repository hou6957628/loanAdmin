<template>
  <div class="topbar">
    <h1 class="logo">
      <a href="javascript:;" title="贷超管理系统">
        <span>小锦鲤管理系统</span>
      </a>
    </h1>
    <el-button @click="goOut()" class="goOut" type="info">退出登录</el-button>
  </div>
</template>

<script>
  export default {
    name: "leftSilder",
    methods:{
      goOut(){
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        localStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .topbar {
    width: 100%;
    height: 58px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .03);
    z-index: 101;
    position: fixed;
  }
  .logo{
    position: relative;
    width: 165px;
    height: 58px;
    line-height: 58px;
    float: left;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 2px;
    background: #28c3b1;
    box-shadow: 0 0 black;
    text-align: center;
  }
  .logo span{
    display: inline-block;
    text-align: center;
    color: #fff;
    background-color: #28c3b1;
    font-family: "Microsoft YaHei", arial, sans-serif;
  }
  .goOut{
    float: right;
    margin-right:40px;
    margin-top:10px ;
  }
</style>
