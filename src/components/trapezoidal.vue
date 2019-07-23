<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/trapezoidal' }">梯形图</el-breadcrumb-item>
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
        <el-input style="width: 200px;margin-left:20px;margin-right: 10px" placeholder="主渠道名称" v-model="parentChannelName" clearable>
        </el-input>
        <el-input style="width: 200px;margin-left:20px;"
                  placeholder="子渠道名称"
                  v-model="subChannelName"
                  clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
      </div>
    </div>
    <template>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="statisticsDate"
          label="日期"
          align="center"
          :formatter="statisticsDateFormatter"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          prop="parentChannelName"
          label="采量主渠道名称"
          align="center"
          width="130">
        </el-table-column>
        <el-table-column
          fixed
          prop="subChannelName"
          label="采量子渠道名称"
          align="center"
          width="130">
        </el-table-column>
        <el-table-column
          prop="pvNum"
          label="浏览(pv)"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="uvNum"
          label="访问(uV)"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="cpaNum"
          label="注册(cpa)"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="loginNum"
          label="APP成功登陆数"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="countType"
          label="结算方式"
          align="center"
          :formatter="jisuan"
          width="100">
        </el-table-column>
        <el-table-column
          prop="unitPrice"
          align="center"
          label="单价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="consumptionAmount"
          align="center"
          label="消耗金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="superUvCost"
          label="贷超UV成本"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="channelAccountBalance"
          label="渠道账户余额"
          align="center"
          width="110">
        </el-table-column>
        <el-table-column
          prop="superUvProfit"
          label="贷超总UV收益"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="averageUvProfit"
          label="平均UV收益"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="produceUvNum"
          label="产出UV数(申请数)"
          align="center"
          width="140">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="incomeAmount"-->
        <!--label="人均uv(人均申请)"-->
        <!--width="120">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="produceInvestment"
          label="投入及产出比"
          align="center"
          width="140">
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
  export default {
    methods: {
      //每页显示多少条
      handleSizeChange(val) {
        this.getProductList(this.pageNum,val,this.startTime,this.endTime,this.parentChannelName,this.subChannelName);
        this.nowPageSizes=val;
      },
      //翻页
      handleCurrentChange(val) {
        this.getProductList(val,this.nowPageSizes,this.startTime,this.endTime,this.parentChannelName,this.subChannelName);
      },
      //时间查询
      logTimeChange(){
        if(this.value7==''||this.value7==null){
          this.getProductList(this.pageNum,this.nowPageSizes,null,null,this.parentChannelName,this.subChannelName);
        }else {
          var startTime=this.value7[0];
          var endTime=this.value7[1];
          this.startTime=startTime;
          this.endTime=endTime;
          this.getProductList(this.pageNum,this.nowPageSizes,this.startTime,this.endTime,this.parentChannelName,this.subChannelName);
        }
      },
      //列表
      getProductList(data1,data2,data3,data4,data5,data6){
        this.loading=true;
        this.$axios({
          method:"post",
          url:"http://"+this.baseUrl+"/flowPool/admin/channelData/list",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            pageNum: data1,
            pageSize: data2,
            startDate: data3,
            endDate: data4,
            parentChannelName: data5,
            subChannelName: data6,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.tableData=res.data.body.channelData.list;
            this.proTotal=res.data.body.channelData.total;
            this.pageSize=res.data.body.channelData.pageSize;
            this.pageNum=res.data.body.channelData.pageNum;
            this.loading=false;
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
        this.$axios({
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
        this.$axios({
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
            this.getProductList(this.pageNum,this.nowPageSizes,null,null);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      //搜素按钮
      searchBtn(){
        this.getProductList(this.pageNum,this.nowPageSizes,this.startTime,this.endTime,this.parentChannelName,this.subChannelName);
      },
      //结算方式1- cpa计算 3-uv计算
      jisuan(row){
        let countType = row.countType;
        if(countType==1){
          return "cpa计算"
        }else {
          return "uv计算"
        }
      },
      //查看
      look(row){
        let id=row.id;
        this.$router.push({
          path: `/trapezoidal/${id}`,
        });
      },
    },
    mounted:function () {
      this.parentChannelName=this.$route.params.name1;
      this.subChannelName=this.$route.params.name2;
      this.startTime=this.dateFormatCustom(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-2, 0, 0, 0));
      this.endTime=this.dateFormatCustom(new Date());
      this.getProductList(1,10,this.startTime,this.endTime,this.parentChannelName,this.subChannelName);
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
        subChannelName:'',
        parentChannelName:'',
        ruleForm: {
          id: '',
          remark: '',
        },
        dialogFormVisible1:false,
        loading:false,
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
