<template>
    <div class="content">
      <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/productList' }">产品列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑产品</el-breadcrumb-item>
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
        <el-form-item label="弹窗图" prop="filename">
          <a class="upload-file" href="javascript:;" v-model="ruleForm.filename">{{ruleForm.image}}<input type="file" accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerFile($event)"></a>
          <input class="fileBox" type="hidden" v-model="ruleForm.filename">
          <!--<img src="http://47.95.118.227:8080/lm/api/file/down?file="+>-->
          <el-alert :closable="false" style="padding: 3px 16px;" title="弹窗图推荐尺寸（300*300）" type="success"></el-alert>
          <p></p>
        </el-form-item>
        <el-form-item label="链接地址" prop="h5Url">
          <el-input v-model="ruleForm.h5Url" placeholder="例: 请输入产品链接"></el-input>
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
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        electData:[
          {key:1,Id:'首页弹窗'},
          {key:2,Id:'首页icon'},
          {key:3,Id:'首页banner'},
          {key:4,Id:'产品列表'},
        ],
        accountName:"",
        electValue:'首页弹窗',
        electData1:[],
        electValue1:'',
        ruleForm: {
          pname: '',
          url: '',
          image: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          accountId:'',
          electValue1:''
        },
        rules: {
          pname: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          h5Url: [
            { required: true, message: '请输入链接地址', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请输入位置', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'change' }
          ],
          file1: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写备注信息', trigger: 'blur' }
          ],
          company:[
            { required: false, message: '请选择账户', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(this.ruleForm.filename);

        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            if(this.ruleForm.filename==null){
            }else {
              param.append('file1', this.ruleForm.filename)  // 通过append向form对象添加数据
            }
            param.append('pname', this.ruleForm.pname) // 添加form表单中其他数据
            param.append('type', 1) // 添加form表单中其他数据
            param.append('h5Url', this.ruleForm.h5Url) // 添加form表单中其他数据
            param.append('remark', this.ruleForm.remark) // 添加form表单中其他数据
            param.append('accountId', this.ruleForm.accountId) // 添加form表单中其他数据
            param.append('position', this.ruleForm.position) // 添加form表单中其他数据
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
        this.$set(this.ruleForm,"image",name);
        console.log(this.ruleForm.image);
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
            this.ruleForm.pname= res.data.body.product.pname;
            this.ruleForm.electValue1= res.data.body.product.accountName;
            this.ruleForm.accountId= res.data.body.product.accountId;
            console.log(this.ruleForm.electValue1);
            console.log(this.ruleForm.accountId);
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
</style>
