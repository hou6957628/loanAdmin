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
            <!--<el-submenu index="1">-->
              <!--<template style="padding-left: 5px" slot="title">-->
                <!--<i class="el-icon-location"></i>-->
                <!--<span>产品中心</span>-->
              <!--</template>-->
              <!--<el-menu-item-group >-->
                <!--<el-menu-item index="/productList">产品列表</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/addProduct">添加首页弹窗</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/addBannerProduct">添加banner图</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/addIconProduct">添加icon按钮</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/addProductList">添加产品列表</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/editorProduct">编辑首页弹窗</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/editorBannerProduct">编辑banner图</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/editorIconProduct">编辑icon按钮</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/editorProductList">编辑产品列表</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/productStatistics">产品统计</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="/operation">统计操作</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <el-menu-item index="/productList">
              <i class="el-icon-tickets"></i>
              <span slot="title">产品中心</span>
            </el-menu-item>
            <el-menu-item index="/statisticalCenter">
              <i class="el-icon-menu"></i>
              <span slot="title">统计中心</span>
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
