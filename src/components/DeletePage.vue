<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="旅客id">
          <el-col :span="1">
            <el-input v-model="formData.uerId" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">删除</el-button>
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
          uerId:'',
        }
      }
    },
    methods:{
      onSubmit(){
        if(this.formData.id==''){
          alert('请输入旅客id！')
          return;
        }
        Net.deleteData({
          userId:this.formData.uerId
        })
        .then((res)=>{
          console.log(res);
        })
        alert('已提交');
        this.clear();
      },
      clear(){
        this.formData.uerId='';
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