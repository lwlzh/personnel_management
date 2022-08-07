<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
    <div class="queryBlock">
      <span style="text-aligin:center">旅客查询</span>
      <el-form :inline="true" :model="formData" class="demo-form-inline"  size="mini">
        <el-form-item label="出生年份:">
          <el-col :span="12">
              <el-input v-model="formData.birthTime" placeholder="出生年份"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="旅行里程:">
          <el-col>
            <el-col :span="10">
              <el-input v-model="formData.minMileage" placeholder="最短里程"></el-input>
            </el-col>
            <el-col  :span="2">---</el-col>
            <el-col  :span="10">
              <el-input v-model="formData.maxMileage" placeholder="最短历程"></el-input>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="旅行时间:">
          <el-col>
            <el-col :span="10">
              <el-input v-model="formData.minFlightTime" placeholder="最短时间"></el-input>
            </el-col>
            <el-col :span="2">---</el-col>
            <el-col :span="10">
              <el-input v-model="formData.maxFlightTime" placeholder="最长时间"></el-input>
            </el-col>
          </el-col>
        </el-form-item>
        
        <el-form-item style="display:block">
          <el-button type="primary" @click="queryData">查询</el-button>
          <el-button type="primary" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table">
        <el-table 
        :data="tableData" 
        style="width: 100%" 
        :border="tableBorder" 
        :header-cell-style="{textAlign:'center',background:'#eef1f6',color:'#606266',borderColor:'rgba(0,0,0,0.5)'}" 
        :cell-style="{textAlign:'center',background:'rgba(246,246,246,0.5)',borderColor:'rgba(0,0,0,0.5)'}"
        >
            <!-- 表头 -->
            <el-table-column prop="id" label="人员 ID" width="180">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="180">
            </el-table-column>
            <el-table-column prop="birthTime" label="出生年份">
            </el-table-column>
            <el-table-column prop="flightMileage" label="总旅行里程">
            </el-table-column>
            <el-table-column prop="flightTime" label="总旅行时间">
            </el-table-column>
        </el-table>
    </div>
      <!-- 页码 -->
      <div class="pageNum">
        <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total"
        :page-size="pageSize"
        >
        </el-pagination>
      </div>
    
  </div>
</template>

<script>
import Net from "../js/request.js"
export default {
    data(){
      return{
        total:1,
        pageSize:1,
        tableData:[],
        tableBorder:true,
        nowPage:1,
        formData:{
          birthTime:'',
          minMileage:'',
          maxMileage:'',
          minFlightTime:'',
          maxFlightTime:''
        }
      }
    },
    methods:{
      queryData(){
          for(let i=1;i<=30;i++){
            this.tableData.push({
              id:'123',
              gender:'男',
              birthTime:'1919',
              flightTime:'1145',
              flightMileage:'810'
            })
          }
          Net.queryData({
              birthTime:this.birthTime,
              minMileage:this.minMileage,
              maxMileage:this.maxMileage,
              minFlightTime:this.minFlightTime,
              maxFlightTime:this.maxFlightTime,
              nowPage:this.nowPage
          })
          .then((res)=>{
              console.log(res);
          })
          
      },
      clear(){
        this.total = 0;
        this.tableData = [];
        this.formData.birthTime='';
        this.formData.minMileage='';
        this.formData.maxMileage='';
        this.formData.minFlightTime='';
        this.formData.maxFlightTime='';

      },
      currentChange(e){
          this.nowPage = e;
          Net.queryData({
              birthTime:this.birthTime,
              minMileage:this.minMileage,
              maxMileage:this.maxMileage,
              minFlightTime:this.minFlightTime,
              maxFlightTime:this.maxFlightTime,
              pageNum:this.nowPage
          })
          .then((res)=>{
              console.log(res);
          })
      }
    }
}
</script>

<style scoped>
.main{
    width: 100%;
    height: 100%;
}
.table {
    margin-top: 20px;
}
.table .el-table {
    border: solid 1px black;
}
.queryBlock {
  background-color: #eef1f6;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  padding-top: 10px;
}
.queryBlock .el-input {
  width: 100px;
}
.queryBlock .tiemBlock{
  margin-left: 40px;
  display: inline-block;
}
.queryBlock .tiemBlock .bitrhLabel{
  margin-right: 20px;
}
.queryBlock .flightMileage{
  display: inline-block;
  margin-left: 40px;
}

.queryBlock .flightTime{
  display: inline-block;
  margin-left: 40px;
}
.pageNum {
  width: 100%;
}
.el-pagination{
  text-align: center;
  margin-top: 20px;
}

</style>