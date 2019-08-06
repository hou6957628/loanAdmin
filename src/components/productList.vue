<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/productList' }">产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>产品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <el-button class="upLoadBtn" @click="toAddProduct()" type="primary">添加产品&nbsp;<i class="el-icon-upload el-icon-circle-plus"></i></el-button>
      <el-select class="select" v-model="electValue" placeholder="请选择" @change="selectChange($event,electData)">
        <el-option
          v-for="item in electData"
          :key="item.key"
          :label="item.Id"
          :value="item.key">
        </el-option>
      </el-select>
      <el-input @click="searchProduct" class="searchContent"
        placeholder="请输入内容"
        v-model="input10"
        clearable>
        <el-button id="searchBtn" @click="searchContent(input10)" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="accountName"
          label="账户名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="pname"
          label="产品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="150">
        </el-table-column>
        <el-table-column
          prop="typeText"
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="position"
          label="排序"
          width="120">
        </el-table-column>
        <el-table-column
          prop="shelfDate"
          label="上架时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="obtainedDate"
          label="下架时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.enabled == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.enabled == true ? '启用' : '停用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.type==1" @click="bian1(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==2" @click="bian2(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==3" @click="bian3(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==4" @click="bian4(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==5" @click="bian5(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==6" @click="bian6(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==7" @click="bian7(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==8" @click="bian8(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==9" @click="bian9(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==10" @click="bian10(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==11" @click="bian11(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==12" @click="bian12(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==13" @click="bian13(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.type==14" @click="bian14(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">下架</el-button>
            <el-button v-if="!scope.row.enabled" @click="obtainedProduct(scope.row)" type="text" size="small">上架</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">统计</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination class="paginationBox"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :unique-opened="true"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="proTotal">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import qs from 'qs';
  import {getProductList ,obtainedProduct} from "@/request/api"
  export default {
    methods: {
      handleClick(row) {
        console.log(row.id);
        var id=row.id;
        this.$router.push({
          path: `/productStatistics/${id}`,
        });
      },
      searchContent(data){
        if(data==""){
          this.$message.error('搜索内容不可以为空');
          this.getProductList(1,10,null,this.electValue);
        }else {
          this.getProductList(1,10,data,this.electValue);
          console.log(data);
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val,this.input10,this.electValue);
        this.nowPageSizes=val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,this.input10,this.electValue);
      },
      bian4(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorProductList/${id}`,
        });
      },
      bian3(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorBannerProduct/${id}`,
        });
      },
      bian9(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorIcon1List/${id}`,
        });
      },
      bian10(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorIcon2List/${id}`,
        });
      },
      bian11(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorIcon3List/${id}`,
        });
      },
      bian12(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorIcon4List/${id}`,
        });
      },
      bian13(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorLookList/${id}`,
        });
      },
      bian14(row){
        localStorage.electValue=this.electValue;
        localStorage.inputText1=this.input10;
        var id=row.id;
        this.$router.push({
          path: `/editorIcon5List/${id}`,
        });
      },
      toAddProduct(){
        this.$router.push({
          path: `/addProductList`,
        });
      },
      getProductList(data1, data2, data3, data4,) {
        getProductList({
          pageNum: data1,
          pageSize: data2,
          name: data3,
          typeId: data4,
        }).then(res => {
          if (res.msgCd == 'ZYCASH-200') {
            this.tableData = res.body.productList.list;
            this.proTotal = res.body.productList.total;
            this.pageSize = res.body.productList.pageSize;
            this.pageNum = res.body.productList.pageNum;
          } else {
            this.$message.error(res.msgInfo);
          }
        });
      },
      selectChange(vId,list){
        let obj = {};
        obj = list.find((item)=>{
          return item.key === vId;
        });
        localStorage.electName=obj.Id;
        this.getProductList(1,10,null,this.electValue);
      },
      searchProduct(){
        console.log(this.electValue);
        this.getProductList(1,10,this.input10,this.electValue);
      },
      obtainedProduct(data) {
        obtainedProduct({
          id: data.id,
          enabled: !data.enabled
        }).then(res => {
          if (res.msgCd == 'ZYCASH-200') {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getProductList(1, 10, this.input10, this.electValue);
          } else {
            this.$message.error(res.data.msgInfo);
          }
        });
      },
    },
    mounted:function () {
      console.log(localStorage.inputText1);
      console.log(localStorage.electValue);
      if(localStorage.inputText1=="undefined"){
        this.input10=''
      }
      else if(this.$route.params.name){
        this.input10=this.$route.params.name
      }else {
        this.input10=localStorage.inputText1;
      }
      // this.electValue=localStorage.electValue||'';
      this.getProductList(1,10,this.input10,this.electValue);
    },
    data() {
      return {
        tableData: [],
        input10: null,
        options: [],
        typeText: '211313',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[10,20,30],
        nowPageSizes:10,
        electData:[
          {key:'',Id:'全部'},
          {key:3,Id:'首页banner'},
          {key:4,Id:'产品列表'},
          {key:9,Id:'添加大额分期列表'},
          {key:10,Id:'添加小额速贷列表'},
          {key:11,Id:'添加新品推荐列表'},
          {key:12,Id:'添加秒批到账列表'},
          {key:13,Id:'添加再看看列表'},
          {key:14,Id:'添加热门推荐列表'},
        ],
        electValue:''
      }
    }
  }
</script>

<style scoped>
  .select{
    margin-left: 20px;
  }
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .operationContent{
    text-align: left;
    margin: 25px 30px 15px 0;
  }
  .operationContent .upLoadBtn{

  }
  .operationContent .searchContent{
    margin-left: 20px;
    width: 300px;
    margin-right: 30px;
  }
  .paginationBox{
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 40px;
  }
</style>
