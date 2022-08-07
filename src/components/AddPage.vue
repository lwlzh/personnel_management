<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
    <el-form :model="formData" label-width="80px">
        <el-form-item label="年龄">
          <el-col :span="1">
            <el-input v-model="formData.age" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="旅行里程">
          <el-col :span="1">
            <el-input v-model="formData.mileage" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="旅行时间">
          <el-col :span="1">
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
export default {
    data(){
      return{
        formData:{
          age:'',
          gender:'',
          mileage:'',
          flightTime:''
        }
      }
    },
    methods:{
      onSubmit(){
        alert('已提交');
        this.clear();
      },
      clear(){
        this.formData.age='';
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
}
</style>