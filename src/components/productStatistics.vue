<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/statisticalCenter' }">统计中心</el-breadcrumb-item>
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
        <el-button type="primary" style="width: 120px;margin-left:100px;" icon="el-icon-search" @click="IncomeBtn">查看收益</el-button>
        <el-tag style="width: 100px;margin-left:20px;margin-right: 30px;font-size: 16px;text-align: center;height: 40px;line-height: 40px" type="info">{{Income}}元</el-tag>
        <span @click="balanceBtn">查看余额</span>
        <el-tag style="width: 100px;margin-left:20px;margin-right: 10px;font-size: 16px;text-align: center;height: 40px;line-height: 40px" type="info">{{balance}}元</el-tag>
      </div>
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
          fixed
          prop="productName"
          label="产品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="statisticsDate"
          label="时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cpaPrice"
          label="CPA单价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cpaNumber"
          label="CPA数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cpsPrice"
          label="CPS单价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cpsNumber"
          label="CPS数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uvPrice"
          label="UV单价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uvNumber"
          label="UV数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uvIncome"
          label="UV收益"
          width="120">
        </el-table-column>
        <el-table-column
          prop="income"
          label="当天收益"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="60">
          <template slot-scope="scope">
            <el-button @click="chaoClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="200">
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

  export default {
    methods: {
      detailClick(row) {

        var id=row.id;
        this.id=id;
        this.$router.push({
          path: `/productStatistics/${id}`,
        });
      },
      searchContent(data){
        if(data==""){
          this.$message.error('搜索内容不可以为空');
        }else {
          console.log(data);
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getProductList(this.pageNum,val,this.value8,this.startTime,this.endTime);
        this.nowPageSizes=val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.nowPageSizes);
        this.getProductList(val,this.nowPageSizes,this.value8,this.startTime,this.endTime);
      },
      logTimeChange(){
        if(this.value7==''||this.value7==null){
          this.getProductList(this.pageNum,this.nowPageSizes,this.value8,null,null);
        }else {
          var startTime=this.value7[0];
          var endTime=this.value7[1];
          this.startTime=startTime;
          this.endTime=endTime;
          console.log("开始时间 : "+this.startTime+"结束时间 : "+this.endTime);
          this.getProductList(this.pageNum,this.nowPageSizes,this.value8,this.startTime,this.endTime);
        }
      },
      searchBtn(){
        this.getProductList(this.pageNum,this.nowPageSizes,this.value8,this.startTime,this.endTime);
      },
      daoBtn(){
        this.$axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/productinfo/export",
          headers:{
            "content-type":"application/x-download;charset=utf-8",
            "content-disposition":"attachment;filename=total.xls",
            'Authorization': localStorage.token
          },
          responseType: 'blob',
          params:{
            name: this.value8,
            startDate: this.startTime,
            endDate: this.endTime,
          }
        }).then((res)=>{
          this.download(res);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        })
      },
      getProductList(data1,data2,data3,data4,data5){
        this.$axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/productinfo/getProductInfoList",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            productId: this.id,
            startDate: data4,
            endDate: data5,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.pageInfo.list;
            this.proTotal=res.data.body.pageInfo.total;
            this.pageSize=res.data.body.pageInfo.pageSize;
            this.pageNum=res.data.body.pageInfo.pageNum;
            this.balance=res.data.body.balance;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      // 下载文件
      download (data) {
        if (!data) {
          return
        }
        let url = "http://"+this.baseUrl+"/flowPool/admin/productinfo/export?name="+this.value8+"&startDate="+this.startTime+"&endDate="+this.endTime;
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', 'excel.xls');

        document.body.appendChild(link)
        link.click()
      },
      IncomeBtn(){
        this.$axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/productinfo/getIncomeByProductId",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            productId: this.id,
            startDate: this.startTime,
            endDate: this.endTime,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.Income=res.data.body.totalIncome;
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })

      },
      balanceBtn(){

      },
      chaoClick(row){
        console.log(row.id);
        console.log(row.countType);
        var id=row.id;
        if(row.countType==null){
          var countType=1;
        }else {
          var countType=row.countType;
        }
        this.$router.push({
          path: `/operation/${id}/${countType}`,
        });
      }
    },
    mounted:function () {
      this.id=this.$route.params.id;
      console.log(this.id);
      this.getProductList(1,10);
    },
    data() {
      return {
        tableData: [],
        options: [],
        value4: '',
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
        value6: '',
        value7: '',
        value8:'',
        pageNum: null,
        proTotal:null,
        pageSize:null,
        pageSizes:[10,20,30],
        nowPageSizes:10,
        proName: '',
        accountName: '',
        Income:'',
        balance:'',
      }
    }
  }
</script>

<style scoped>
  .content .el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #ff1b2c;
    cursor: not-allowed;
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
