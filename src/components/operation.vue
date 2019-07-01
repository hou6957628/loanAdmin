<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/productList' }">产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>产品统计</el-breadcrumb-item>
      <el-breadcrumb-item>统计修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="计价方式:" prop="electValue1">
        <el-select v-model="ruleForm.electValue1" placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in electData"
            :key="item.key"
            :label="item.Id"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
        <div class="jiegou" v-if="this.type==1" label="cpa计价">
          <p style="margin-bottom: 10px;text-align: center;font-size: 18px">CPA计价</p>
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="ruleForm.productName" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="对应日期" prop="time">
            <el-input v-model="ruleForm.statisticsDate" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="CPA单价" prop="name">
            <el-input v-model="ruleForm.cpaPrice"></el-input>
          </el-form-item>
          <el-form-item label="CPA数量" prop="name" >
            <el-input v-model="ruleForm.cpaNumber"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="CPAForm(1)">立即创建</el-button>
          </el-form-item>
        </div>
        <div class="jiegou" v-if="this.type==2" label="cps计价">
          <p style="margin-bottom: 10px;text-align: center;font-size: 18px">CPS计价</p>
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="ruleForm.productName" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="对应日期" prop="time">
            <el-input v-model="ruleForm.statisticsDate" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="CPS单价" prop="name">
            <el-input v-model="ruleForm.cpsPrice"></el-input>
          </el-form-item>
          <el-form-item label="CPS数量" prop="name">
            <el-input v-model="ruleForm.cpsNumber"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="CPSForm(2)">立即创建</el-button>
          </el-form-item>
        </div>
        <div class="jiegou" v-if="this.type==3" label="uv计价">
          <p style="margin-bottom: 10px;text-align: center;font-size: 18px">UV计价</p>
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="ruleForm.productName" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="对应日期" prop="time">
            <el-input v-model="ruleForm.statisticsDate" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="UV单价" prop="name">
            <el-input v-model="ruleForm.uvPrice"></el-input>
          </el-form-item>
          <el-form-item label="UV数量" prop="name">
            <el-input v-model="ruleForm.uvNumber" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="UVForm(3)">立即创建</el-button>
          </el-form-item>
        </div>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        electData:[
          {key:1,Id:'按照cpa计价'},
          {key:2,Id:'按照cps计价'},
          {key:3,Id:'按照uv计价'},
        ],
        ruleForm: {
          productName:"",
          cpaPrice:'',
          cpaCount:'',
          cpsPrice:'',
          cpsCount:'',
          uvPrice:'',
          uvCount:'',
          electValue1:'',
        },
        rules: {
          cpaPrice: [
            { required: true, message: 'CPA单价', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
          cpaCount: [
            { required: true, message: 'CPA数量', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
          cpsPrice: [
            { required: true, message: 'CPA单价', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
          cpsCount: [
            { required: true, message: 'CPA数量', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
          uvPrice: [
            { required: true, message: 'CPA单价', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
          uvCount: [
            { required: true, message: 'CPA数量', trigger: 'blur' },
            { min: 1, max: 5, message: '', trigger: 'blur' }
          ],
        },
        cpaPrice:'',
        cpsPrice:'',
        uvPrice:'',
        countType:"1",
        type:''
      };
    },
    methods: {
      submitForm(formName,id) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getProductList(data1){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/productinfo/queryProductInfoById",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id: this.id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.ruleForm.productName=res.data.body.productName;
            this.ruleForm.productId=res.data.body.productId;
            this.ruleForm.statisticsDate=res.data.body.statisticsDate;
            this.countType=res.data.body.countType;
            this.ruleForm.cpaPrice=res.data.body.cpaPrice;
            this.ruleForm.cpaNumber=res.data.body.cpaNumber;
            this.ruleForm.cpsPrice=res.data.body.cpsPrice;
            this.ruleForm.cpsNumber=res.data.body.cpsNumber;
            this.ruleForm.uvPrice=res.data.body.uvPrice;
            this.ruleForm.uvNumber=res.data.body.uvNumber;
            this.ruleForm.remark=res.data.body.remark;
            console.log(this.countType);
            if(res.data.body.countType==null||""){
              // this.ruleForm.countType="1";
            }else {
            }
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      CPAForm(){
        this.submitFrom(1)
      },
      CPSForm(){
        this.submitFrom(2)
      },
      UVForm(){
        this.submitFrom(3)
      },
      submitFrom(data){
        axios({
          method:"POST",
          url:"http://"+this.baseUrl+"/flowPool/admin/productinfo/updateProductInfoById",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            productId:this.ruleForm.productId,
            productName:this.ruleForm.productName,
            id: this.id,
            statisticsDate:this.ruleForm.statisticsDate,
            countType:data,
            cpaPrice:this.ruleForm.cpaPrice,
            cpaNumber:this.ruleForm.cpaNumber,
            cpsPrice:this.ruleForm.cpsPrice,
            cpsNumber:this.ruleForm.cpsNumber,
            uvPrice:this.ruleForm.uvPrice,
            uvNumber:this.ruleForm.uvNumber,
            remark:this.ruleForm.remark,
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push('/statisticalCenter');
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      },
      selectChange(){
        console.log(this.ruleForm.electValue1);
        this.type=this.ruleForm.electValue1;
        console.log(this.type);
      },
    },
    mounted:function () {
      this.id=this.$route.params.id;
      if(this.$route.params.countType==null||this.$route.params.countType==""){
        this.type=0;
      }else {
        this.type=this.$route.params.countType;
        if(this.type==1){
          this.ruleForm.electValue1='按照cpa计价'
        }else if(this.type==2){
          this.ruleForm.electValue1='按照cps计价'
        }else {
          this.ruleForm.electValue1='按照uv计价'
        }
      }
      this.getProductList(1,10);
    },
  }
</script>

<style scoped>
  .content{
    padding-left: 200px;
    padding-top: 80px;
  }
  .demo-ruleForm{
    width: 600px;
    text-align: left;
  }
  .fs-16{
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .upload-file{
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 30px;
    height: 30px;
  }
  .upload-file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .upload-file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  .jiegou{
    background-color: #fff;
    padding-right: 40px;
    padding-bottom: 20px;
    padding-top: 20px;
  }
</style>
