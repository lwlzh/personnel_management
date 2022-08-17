<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
    <el-form :model="formData" label-width="80px">
         <el-form-item label="旅客id" disabled="true">
          <el-col :span="12">
            <el-input v-model="formData.userId" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出生年份">
          <el-col :span="12">
            <el-input v-model="formData.birth" maxlength="4" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="旅行里程">
          <el-col :span="12">
            <el-input v-model="formData.mileage" size="mini" maxlength="8"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="旅行时间">
          <el-col :span="12">
            <el-input v-model="formData.flightTime" size="mini" maxlength="8"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import Net from "../js/request.js"
export default {
  props:{
    parentCloseDialog:{
      type: Function,
      default:()=>{
        
      }
    },
    parentUpdate:{
      type: Function,
      default:()=>{
        
      }
    },
  },
  data(){
      return{
        formData:{
          userId:'',
          birth:'',
          sex:'',
          mileage:'',
          flightTime:''
        }
      }
    },
    methods:{
      successNotif(mes) {
          this.$notify({
            title: '成功',
            message: mes,
            type: 'success'
          });
        },
        errorNotif(mes) {
          this.$notify.error({
            title: '失败',
            message: mes
          });
        },
      onSubmit(){
        var uData={
          userId:this.formData.userId,
          sex:this.formData.sex,
          birth:this.formData.birth,
          mileage:this.formData.mileage,
          flightTime:this.formData.flightTime
        }
        for(var i in uData){
            if(typeof(uData[i])==typeof('')&&uData[i]==''){
              alert('请完整输入再提交！');
              return;
            }
        }
        Net.updateData(uData)
        .then((res)=>{
          // 判断服务器出错
          if(res.code =='error'){
            this.errorNotif('修改时网络连接出错');
            return;
          }
          // 判断修改过程出错
          res= res.data;
          if(res.code != "200"){
            this.errorNotif(res.data);
            return;
          }
          this.successNotif('修改成功');
          this.clear();
          this.parentCloseDialog();
          this.parentUpdate();
        })
        .catch((res)=>{
          this.errorNotif('修改失败');
          console.log(res);
        })
        
      },
      clear(){
        this.formData.birth='';
        this.formData.sex='';
        this.formData.mileage='';
        this.formData.flightTime='';
      }
    }
}
</script>

<style>
.main{
    width: 100%;
    height: 100%;
}
</style>