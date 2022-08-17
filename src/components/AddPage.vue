<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
    <el-form :model="formData" >
        <el-form-item label="出生年份" >
          <el-col :span="3">
            <el-input v-model="formData.birth" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="旅行里程">
          <el-col :span="3">
            <el-input v-model="formData.mileage" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="旅行时间">
          <el-col :span="3">
            <el-input v-model="formData.flightTime" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立刻添加</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
  </el-form>
  </div>
</template>

<script>
import Net from "../js/request.js"
export default {
    data(){
      return{
        formData:{
          birth:'',
          sex:'',
          mileage:'',
          flightTime:''
        }
      }
    },
    methods:{
      onSubmit(){
        for(var i in this.formData){
            if(typeof(this.formData[i])==typeof('')&&this.formData[i]==''){
              alert('请填写完整在提交！')
              return;
            }
        }
        Net.addData({
          sex:this.formData.sex,
          birth:this.formData.birth,
          mileage:this.formData.mileage,
          flightTime:this.formData.flightTime
        })
        .then((res)=>{
          console.log(res);
        })
        alert('已提交');
        this.clear();
      },
      clear(){
        this.formData.birth='';
        this.formData.gender='';
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
    margin: 0 auto;
}
</style>