<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/statisticalCenter' }">账户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <div class="block">
        <span>搜索账户&nbsp;:&nbsp;</span>
        <el-input style="width: 300px"
                  placeholder="产品名称或账户名称"
                  v-model="proName"
                  clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchProduct">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增账户</el-button>
        <el-dialog title="新增账户" :visible.sync="dialogFormVisible">
          <el-form >
            <el-form-item label="账户名称" :label-width="labelWidth">
              <el-input v-model="accountName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="labelWidth">
              <el-input v-model="remark" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addProduct">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="账户名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="income"
          label="总收益"
          width="150">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          width="150">
        </el-table-column>
        <el-table-column
          label="充值"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">充值</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="查看包含产品"
          width="150">
          <template slot-scope="scope">
            <el-button @click="chaClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="350">
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
  import axios from 'axios'
  export default {
    methods: {
      handleClick(row) {
        console.log(row.id);
        var id=row.id;
        this.$router.push({
          path: `/Recharge/${id}`,
        });
      },
      chaClick(row) {
        console.log(row.name);
        var name=row.name;
        this.$router.push({
          path: `/productList/${name}`,
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
        this.getProductList(this.pageNum,val,null,this.electValue);
        this.nowPageSizes=val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,null,this.electValue);
      },
      toAddProduct(val){
        this.$router.push('/addProduct');
      },
      getProductList(data1,data2,data3){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/flowPool/admin/account/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            accountName: data3,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.list;
            this.proTotal=res.data.body.total;
            this.pageSize=res.data.body.pageSize;
            this.pageNum=res.data.body.pageNum;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      selectChange(){
        console.log(this.electValue);
        this.getProductList(1,10,null,this.electValue);
      },
      searchProduct(){
        console.log(this.proName);
        this.getProductList(1,10,this.proName);
      },
      addProduct(){
        console.log(this.accountName);
        console.log(this.remark);
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/flowPool/admin/account/addAccount",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            accountName: this.accountName,
            remark: this.remark,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.getProductList(1,10);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      logTimeChange(){
        var startTime=this.value7[0];
        var endTime=this.value7[1];
      },
      open3() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
    mounted:function () {
      this.getProductList(1,10);
    },
    data() {
      return {
        tableData: [],
        value4: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[10,30,50],
        nowPageSizes:10,
        proName: '',
        accountName: '',
        remark: '',
        dialogFormVisible:false,
        labelWidth:"100"
      }
    }
  }
</script>

<style scoped>
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
  .dsp{
    display: inline-block;
    margin-left: 40px;
  }
  .block span{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    letter-spacing: 1px;
  }
</style>
