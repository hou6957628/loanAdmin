<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/productList' }">产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>编辑秒批到账列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品名称" prop="pname">
        <el-input v-model="ruleForm.pname" placeholder="请填写产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品分类" prop="region">
        <el-select v-model="electValue" placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item label="位置输入" prop="position">
        <el-input v-model="ruleForm.position" placeholder="请输入位置   如输入1则在列表顶端展示"></el-input>
      </el-form-item>
      <el-form-item label="列表logo" prop="filename">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.filename">{{ruleForm.image}}<input type="file" accept="image/png,image/gif,image/jpeg" value="上传logo" @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.filename">
        <el-alert :closable="false" style="padding: 3px 16px;" title="列表logo推荐尺寸（48*48）为png或jpg格式" type="success"></el-alert>
      </el-form-item>
      <el-form-item label="文案一" prop="description1">
        <el-input v-model="ruleForm.description1" placeholder="例: 请输入文案内容"></el-input>
      </el-form-item>
      <el-form-item label="文案二" prop="description2">
        <el-input v-model="ruleForm.description2" placeholder="例: 请输入文案内容"></el-input>
      </el-form-item>
      <el-form-item label="文案三" prop="description3">
        <el-input v-model="ruleForm.description3" placeholder="例: 请输入文案内容"></el-input>
      </el-form-item>
      <el-form-item label="文案四" prop="description5">
        <el-input v-model="ruleForm.description5" placeholder="例: 请输入文案内容"></el-input>
      </el-form-item>
      <el-form-item label="产品链接" prop="h5Url">
        <el-input v-model="ruleForm.h5Url" placeholder="例: 请输入产品链接"></el-input>
      </el-form-item>
      <el-form-item label="年龄分类" prop="classifyAge">
        <el-select v-model="ruleForm.classifyAge">
          <el-option
            v-for="item in electData4"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="借款金额" prop="classifyCapital">
        <el-select v-model="ruleForm.classifyCapital">
          <el-option
            v-for="item in electData5"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业分类" prop="classifyOccupation">
        <el-select v-model="ruleForm.classifyOccupation">
          <el-option
            v-for="item in electData6"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信用分类" prop="classifyCredit">
        <el-select v-model="ruleForm.classifyCredit">
          <el-option
            v-for="item in electData7"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="ruleForm.remark" placeholder="为对此产品的备注信息"></el-input>
      </el-form-item>
      <el-form-item label="账户选择" prop="company">
        <el-input disabled="disabled" v-model="ruleForm.electValue1" placeholder="请填写产品名称"></el-input>
        <el-input type="hidden" v-model="ruleForm.accountId" placeholder="为对此产品的备注信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        electValue1:'',
        electValue:'编辑秒批到账列表',
        electData4:[
          {id:0,name:'22-35'},
          {id:1,name:'36-45'},
          {id:2,name:'45-55'},
          {id:3,name:'55岁以上'},
        ],
        electData5:[
          {id:0,name:'2000-3000'},
          {id:1,name:'3000-5000'},
          {id:2,name:'5000-8000'},
          {id:3,name:'8000-1万'},
          {id:4,name:'1万-5万'},
          {id:5,name:'5万-10万'},
        ],
        electData6:[
          {id:0,name:'工薪族'},
          {id:1,name:'无固定职业'},
          {id:2,name:'个体户'},
          {id:3,name:'企业主'},
        ],
        electData7:[
          {id:0,name:'借过多次，被拒多次'},
          {id:1,name:'借过网贷，信用良好'},
          {id:2,name:'未借过网贷'},
        ],
        ruleForm: {
          image: '点击上传logo',
          name: '',
          region: '',
          listLogo: '',
          detailLogo: '',
          date2: '',
          delivery: false,
          resource: '',
          desc: '',
          address: '',
          href: '',
          company: '',
          description1:'',
          description2:'',
          description3:'',
          description5:'',
          position:'',
          detail:'',
          electValue:'',
          electValue1:'',
          classifyAge:0,
          classifyCapital:0,
          classifyOccupation:0,
          classifyCredit:0,
        },
        rules: {
          pname: [
            {required: true, message: '请输入产品名称', trigger: 'blur'},

          ],
          electValue: [
            {required: true, message: '请选择产品分类', trigger: 'change'}
          ],
          position: [
            {required: true, message: '请输入位置信息', trigger: 'blur'}
          ],
          href: [
            {required: true, message: '请输入banner图连接地址', trigger: 'change'}
          ],
          description1: [
            {required: true, message: '请输入文案', trigger: 'change'}
          ],
          description2: [
            {required: true, message: '请输入文案', trigger: 'change'}
          ],
          description3: [
            {required: true, message: '请输入文案', trigger: 'change'}
          ],
          description5: [
            {required: true, message: '请输入文案', trigger: 'change'}
          ],
          detailLogo: [
            {required: true, message: '请上传图片', trigger: 'change'}
          ],
          listLogo: [
            {required: true, message: '请上传图片', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写对此产品的备注信息', trigger: 'blur'}
          ],
          detail:[
            {required: true, message: '请填写对此产品的借款详情', trigger: 'blur'}
          ],
          h5Url:[
            {required: true, message: '请填写对此产品的链接地址', trigger: 'blur'}
          ],
          remark:[
            {required: true, message: '请填写对此产品的备注信息', trigger: 'blur'}
          ],
          classifyAge: [
            {required: true, message: '请选择年龄分类', trigger: 'change'}
          ],
          classifyCapital: [
            {required: true, message: '请选择借款金额', trigger: 'change'}
          ],
          classifyOccupation: [
            {required: true, message: '请选择职业分类', trigger: 'change'}
          ],
          classifyCredit: [
            {required: true, message: '请选择信用分类', trigger: 'change'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            if(this.ruleForm.filename==null){
            }else {
              param.append('file1', this.ruleForm.filename)  // 通过append向form对象添加数据
            }
            if(this.ruleForm.filename1==null){
            }else {
              param.append('file2', this.ruleForm.filename1)  // 通过append向form对象添加数据
            }
            param.append('pname', this.ruleForm.pname) // 添加form表单中其他数据
            param.append('type', 12) // 添加form表单中其他数据
            param.append('h5Url', this.ruleForm.h5Url) // 添加form表单中其他数据
            param.append('remark', this.ruleForm.remark) // 添加form表单中其他数据
            param.append('accountId', this.ruleForm.accountId) // 添加form表单中其他数据
            param.append('position', this.ruleForm.position) // 添加form表单中其他数据
            param.append('description1', this.ruleForm.description1) // 添加form表单中其他数据
            param.append('description2', this.ruleForm.description2) // 添加form表单中其他数据
            param.append('description3', this.ruleForm.description3) // 添加form表单中其他数据
            param.append('description5', this.ruleForm.description5) // 添加form表单中其他数据
            param.append('classifyAge', this.ruleForm.classifyAge);
            param.append('classifyCapital', this.ruleForm.classifyCapital);
            param.append('classifyOccupation', this.ruleForm.classifyOccupation);
            param.append('classifyCredit', this.ruleForm.classifyCredit);
            param.append('id', this.id) // 添加form表单中其他数据
            this.$axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/product/updateProductById",
              headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': localStorage.token
              },
              data:param,
            }).then((res)=>{
              if(res.data.msgCd=='ZYCASH-200'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('/productList');
              }else if(res.data.msgCd=='ZYCASH-1009'){
                this.$message.error(res.data.msgInfo);
              }
              else {
                this.$message.error(res);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      tirggerFile($event){
        var file = $event.target.files[0];
        var name = $event.target.files[0].name;
        this.ruleForm.filename = file;
        this.ruleForm.image = name;
      },
      tirggerFile1($event){
        var file = $event.target.files[0];
        var name = $event.target.files[0].name;
        this.ruleForm.filename1 = file;
        this.ruleForm.image1 = name;
      },
      selectChange(){
        console.log(this.electValue);
        if(this.electValue=="1"){
          this.$router.push('/addProduct');
        }else if(this.electValue=="2"){
          this.$router.push('/addIconProduct');
        }else if(this.electValue=="3"){
          this.$router.push('/addBannerProduct');
        }else {
          this.$router.push('/addProductList');
        }
      },
      getProductList(data){
        this.$axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/product/queryProductById",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
          params:{
            id:this.id
          }
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.ruleForm= res.data.body.product;
            this.ruleForm.image= "如需修改请点击上传";
            this.ruleForm.image1= "如需修改请点击上传";
            this.ruleForm.pname= res.data.body.product.pname;
            this.ruleForm.electValue1= res.data.body.product.accountName;
            this.ruleForm.accountId= res.data.body.product.accountId;
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      }
    },
    mounted:function () {
      this.id=this.$route.params.id;
      this.getProductList(this.id);
    }
  }
</script>

<style scoped>
  .content {
    padding-left: 200px;
    padding-top: 80px;
  }

  .demo-ruleForm {
    width: 600px;
    text-align: left;
  }

  .fs-16 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .upload-file {
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
  .content .el-form-item__label{
    width: 150px;
  }
</style>
