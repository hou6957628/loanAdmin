<template>
  <div class="content">
    <el-breadcrumb class="fs-16" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/productList' }">产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>添加icon导航</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="产品分类" prop="electValue">
        <el-select v-model="electValue" placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in electData"
            :key="item.key"
            :label="item.Id"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="icon图标" prop="filename">
        <a class="upload-file" href="javascript:;" v-model="ruleForm.filename">{{ruleForm.image}}<input type="file" accept="image/png,image/gif,image/jpeg" value="上传弹窗图片"  @change="tirggerFile($event)"></a>
        <input class="fileBox" type="hidden" v-model="ruleForm.filename">
        <el-alert :closable="false" style="padding: 3px 16px;" title="icon推荐尺寸（80*80）" type="success"></el-alert>
      </el-form-item>
      <el-form-item label="icon名字" prop="nameIcon">
        <el-input v-model="ruleForm.nameIcon" placeholder="请输入icon名称"></el-input>
      </el-form-item>
      <el-form-item label="位置输入" prop="position">
        <el-input v-model="ruleForm.position" placeholder="请输入位置   如输入1则在列表顶端展示"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="url">
        <el-input v-model="ruleForm.url" placeholder="请输入文案内容huadiandian"></el-input>
      </el-form-item>
      <el-form-item label="链接地址">
        <a class="target" :href="ruleForm.url" target="_blank">查看链接地址</a>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="账户选择" prop="electValue1">
        <el-select v-model="ruleForm.electValue1" placeholder="请选择">
          <el-option
            v-for="item in electData1"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        electData:[
          {key:1,Id:'首页弹窗'},
          {key:2,Id:'首页iconA'},
          {key:3,Id:'首页banner'},
          {key:4,Id:'产品列表'},
          {key:5,Id:'首页iconB'},
          {key:6,Id:'首页iconC'},
          {key:7,Id:'首页iconD'},
          {key:8,Id:'首页产品列表'},
          {key:9,Id:'添加大额分期列表'},
          {key:10,Id:'添加小额速贷列表'},
          {key:11,Id:'添加新品推荐列表'},
          {key:12,Id:'添加秒批到账列表'},
          {key:13,Id:'添加再看看列表'},
        ],
        electValue:'首页iconC',
        electData1:[],
        electValue1:'',
        ruleForm: {
          image:'上传iconC图片',
          name: '',
          url: '',
          filename: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          electValue1:'',
          nameIcon:''
        },
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          filename: [
            {  required: true, message: '请上传图片', trigger: 'change' }
          ],
          url: [
            { required: true, message: '请输入链接地址', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请填写位置', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写备注信息', trigger: 'blur' }
          ],
          electValue1:[
            { required: true, message: '请选择账户', trigger: 'change' }
          ],
          nameIcon:[
            { required: true, message: '请填写icon名字', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param = new FormData();  // 创建form对象
            param.append('file1', this.ruleForm.filename)
            param.append('pname', this.ruleForm.name) // 添加form表单中其他数据
            param.append('nameIcon', this.ruleForm.nameIcon) // 添加form表单中其他数据
            param.append('type', 6) // 添加form表单中其他数据
            param.append('h5Url', this.ruleForm.url) // 添加form表单中其他数据
            param.append('remark', this.ruleForm.desc) // 添加form表单中其他数据
            param.append('accountId', this.ruleForm.electValue1) // 添加form表单中其他数据
            param.append('position', this.ruleForm.position) // 添加form表单中其他数据
            axios({
              method:"POST",
              url:"http://"+this.baseUrl+"/flowPool/admin/product/addProduct",
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
      selectChange(){
        localStorage.name=this.ruleForm.name;
        console.log(this.electValue);
        if(this.electValue=="1"){
          this.$router.push('/addProduct');
        }else if(this.electValue=="2"){
          this.$router.push('/addIconProduct');
        }else if(this.electValue=="3"){
          this.$router.push('/addBannerProduct');
        }else if(this.electValue=="4"){
          this.$router.push('/addProductList');
        }else if(this.electValue=="5"){
          this.$router.push('/addIconProduct2');
        }else if(this.electValue=="6"){
          this.$router.push('/addIconProduct3');
        }else if(this.electValue=="7"){
          this.$router.push('/addIconProduct4');
        }else if(this.electValue=="8"){
          this.$router.push('/addHomeProductList');
        }else if(this.electValue=="9"){
          this.$router.push('/addIcon1List');
        }else if(this.electValue=="10"){
          this.$router.push('/addIcon2List');
        }else if(this.electValue=="11"){
          this.$router.push('/addIcon3List');
        }else if(this.electValue=="12"){
          this.$router.push('/addIcon4List');
        }else if(this.electValue=="13"){
          this.$router.push('/addLookList');
        }
      },
      getProductList(){
        axios({
          method:"get",
          url:"http://"+this.baseUrl+"/flowPool/admin/product/toAddProduct",
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': localStorage.token
          },
        }).then((res)=>{
          if(res.data.msgCd=='ZYCASH-200'){
            this.electData1= res.data.body.accountList;
            console.log(this.electData1);
          }else {
            this.$message.error(res.data.msgInfo);
          }
        })
      }
    },
    mounted:function () {
      this.ruleForm.name=localStorage.name;
      this.getProductList();
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
