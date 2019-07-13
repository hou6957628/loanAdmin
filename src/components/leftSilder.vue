<template>
    <div class="leftSilder">
      <div style="width: 165px;height: 70px"></div>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" router>
            <el-menu-item index="/productList">
              <i class="el-icon-tickets"></i>
              <span slot="title">产品中心</span>
            </el-menu-item>
            <el-menu-item index="/statisticalCenter">
              <i class="el-icon-menu"></i>
              <span slot="title">统计中心</span>
            </el-menu-item>
            <el-menu-item index="/channelLatitude">
              <i class="el-icon-tickets"></i>
              <span slot="title">渠道纬度</span>
            </el-menu-item>
            <el-menu-item index="/productLatitude">
              <i class="el-icon-tickets"></i>
              <span slot="title">产品纬度</span>
            </el-menu-item>
            <el-menu-item index="/IntoStatistical">
              <i class="el-icon-tickets"></i>
              <span slot="title">进量统计</span>
            </el-menu-item>
            <el-menu-item index="/pageStatisticalCenter">
              <i class="el-icon-menu"></i>
              <span slot="title">页面统计</span>
            </el-menu-item>
            <el-menu-item index="/accountCenter">
              <i class="el-icon-setting"></i>
              <span slot="title">账户中心</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .leftSilder {
    position: fixed;
    width: 165px;
    height: 100%;
    top: 0;
    z-index: 100;
    box-shadow: 1px 0 5px rgba(0,0,0,.05);
    background-color: rgb(84, 92, 100);
    font-size: 18px;
  }
  .el-menu {
    border-right: 0;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;

  }
  .leftSilder .el-submenu__title , .leftSilder .el-menu-item{
    color: rgb(255, 255, 255);
    background-color: rgb(84, 92, 100);
    font-size: 16px;
  }
  .leftSilder .el-menu-item-group__title{
    display: none;
  }
</style>
