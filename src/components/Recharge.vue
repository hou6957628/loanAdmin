<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountCenter' }">账户中心</el-breadcrumb-item>
      <el-breadcrumb-item>充值中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <div class="block">
        <!--<el-input style="width: 200px"-->
                  <!--placeholder="请输入充值金额"-->
                  <!--v-model="value8"-->
                  <!--clearable>-->
        <!--</el-input>-->
        <!--<el-button type="primary" @click="addCash">充值</el-button>-->
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">充值</el-button>
        <el-dialog title="充值" :visible.sync="dialogFormVisible">
          <el-form >
            <el-form-item label="充值金额" :label-width="labelWidth">
              <el-input v-model="value8" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="labelWidth">
              <el-input v-model="remark" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCash">确 定</el-button>
          </div>
        </el-dialog>
        <el-date-picker style="margin-left: 25px"
          v-model="value7"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="logTimeChange()">
        </el-date-picker>
      </div>
    </div>
    <template>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
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
          prop="balance"
          label="余额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="充值金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="300">
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
        console.log(row);
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
        this.getProductList(this.pageNum,val,null,this.startTime,this.endTime);
        this.nowPageSizes=val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,null,this.startTime,this.endTime);
      },
      getProductList(data1,data2,data3,data4,data5){
        axios({
          method:"post",
          url:"http://"+this.baseUrl+"/super/admin/account/cashList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            accountId: this.id,
            startTime: data4,
            endTime: data5,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-SUPERMARKET-200'){
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
      addCash(){
        if(this.value8==''){
          this.$message.error('请输入充值金额');
        }else {
          axios({
            method:"post",
            url:"http://"+this.baseUrl+"/super/admin/account/cash",
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
              'Authorization': localStorage.token
            },
            params:{
              accountId	: this.id,
              amount: this.value8,
              remark: this.remark,
            }
          }).then((res)=>{
            if(res.data.msgCd=='ZYCASH-SUPERMARKET-200'){
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
        }
        console.log(this.accountName);
      },
      logTimeChange(){
        var startTime=this.value7[0];
        var endTime=this.value7[1];
        this.startTime=startTime;
        this.endTime=endTime;
        console.log(this.value7);
        this.getProductList(1,10,this.id,startTime,endTime);
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 6) {
          if (rowIndex % 1 === 0) {
            return {
              rowspan: 10,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    mounted:function () {
      this.id=this.$route.params.id;
      this.getProductList(1,10,this.id);
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
        value7:'',
        value8:'',
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
