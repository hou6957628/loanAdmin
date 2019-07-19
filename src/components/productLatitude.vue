<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/pageStatisticalCenter' }">页面统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operationContent">
      <div class="block">
        <span class="demonstration">选择时间查询区间&nbsp;</span>
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
        <el-input style="width: 300px;margin-left:10%;margin-right: 10px"
                  placeholder="采量子渠道名称"
                  v-model="value8"
                  clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
      </div>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="statisticsDate"
          label="日期"
          :formatter="statisticsDateFormatter"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="uvNum"
          label="位置"
          width="120">
        </el-table-column>
        <el-table-column
          prop="buttonNumber"
          label="列表中产品UV"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uvNumber"
          label="详情里面UV"
          width="120">
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
    <!--编辑结构-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible1" width="40%" center>
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="备注：" prop="account">
          <el-input v-model="ruleForm.remark" autocomplete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editAccount('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.value8,this.startTime,this.endTime);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.value8,this.startTime,this.endTime);
      },
      //时间查询
      logTimeChange(){
        if(this.value7==''||this.value7==null){
          this.getProductList(this.pageNum,this.nowPageSizes,this.value8,null,null);
        }else {
          var startTime=this.value7[0];
          var endTime=this.value7[1];
          this.startTime=startTime;
          this.endTime=endTime;
          this.getProductList(this.pageNum,this.nowPageSizes,this.value8,this.startTime,this.endTime);
        }
      },
      //导出
      daoBtn(){
        axios({
          method:"GET",
          url:"http://"+this.baseUrl+"/flowPool/admin/productPage/export",
          headers:{
            "content-type":"application/octet-stream;charset=utf-8",
            "content-disposition":"attachment;filename=total.xls",
            'Authorization': localStorage.token
          },
          responseType: 'blob',
          data:JSON.stringify(data),
        }).then((res)=>{
          this.download1(res.data);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        })
      },
      // 下载文件
      download1(data) {
        if (!data) {
          return
        }
        let url = "http://"+this.baseUrl+"/flowPool/admin/productPage/export?startDate="+this.startTime+"&endDate="+this.endTime;
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', '页面统计表.xls');
        document.body.appendChild(link);
        link.click()
      },
      //列表
      getProductList(data1,data2,data3,data4,data5){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/productinfo/getProductInfoListByName",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            name: data3,
            startDate: data4,
            endDate: data5,
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
      //过滤统计时间字段
      statisticsDateFormatter(row){
        let statisticsDate = row.statisticsDate;
        return statisticsDate.substr(0,10);
      },
      //编辑
      handleClick(row){
        this.dialogFormVisible1=true;
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/productPage/id",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: row.id,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.ruleForm=res.data.body;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //编辑提交
      editAccount(){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/productPage/edit",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: this.ruleForm.id,
            remark: this.ruleForm.remark,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.dialogFormVisible1=false;
            this.getProductList(this.pageNum,this.nowPageSizes,this.value8,null,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //搜素按钮
      searchBtn(){
        this.getProductList(this.pageNum,this.nowPageSizes,this.value8,this.startTime,this.endTime);
      },
    },
    mounted:function () {
      this.startTime=this.dateFormatCustom(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-2, 0, 0, 0));
      this.endTime=this.dateFormatCustom(new Date());
      this.getProductList(1,10,this.value8,this.startTime,this.endTime);
      this.value7=[this.startTime,this.endTime];
    },
    data() {
      return {
        tableData: [],
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
        value7: '',
        pageNum: null,
        proTotal:null,
        pageSize:10,
        pageSizes:[10,20,30],
        nowPageSizes:10,
        startTime:'',
        endTime:'',
        ruleForm: {
          id: '',
          remark: '',
        },
        dialogFormVisible1:false,
        value8:'',
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
</style>
