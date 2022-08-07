<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="旅客id">
          <el-col :span="1">
            <el-input v-model="formData.id" size="mini"></el-input>
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
export default {
  data(){
      return{
        formData:{
          id:'',
        }
      }
    },
    methods:{
      onSubmit(){
        if(this.formData.id==''){
          alert('请输入旅客id！')
          return;
        }
        alert('已提交');
        this.clear();
      },
      clear(){
        this.formData.id='';
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