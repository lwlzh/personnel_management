<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
    <div class="queryBlock">
      <span style="text-aligin:center">旅客查询</span>
      <el-form :inline="true" :model="formData" class="demo-form-inline"  size="mini">
        <el-form-item label="出生年份:">
          <el-col :span="10">
              <el-input v-model="formData.minBirthTime" placeholder="最小年份"></el-input>
          </el-col>
          <el-col  :span="2">---</el-col>
            <el-col  :span="10">
              <el-input v-model="formData.maxBirthTime" placeholder="最大年份"></el-input>
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
            <el-table-column prop="userId" label="人员 ID" width="180">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="180">
            </el-table-column>
            <el-table-column prop="birth" label="出生年份">
            </el-table-column>
            <el-table-column prop="mileage" label="总旅行里程">
            </el-table-column>
            <el-table-column prop="flightTime" label="总旅行时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="clickDialog(scope.row)" size="small">修改</el-button>
                <el-popconfirm
                    title="确定删除吗？"
                    @confirm="deleteData(scope.row)"
                  >
                    <el-button type="danger" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>  
            </el-table-column>
        </el-table>
        <el-dialog
          title="修改"
          :visible.sync="dialogVisible"
          append-to-body
          width="30%"
          @open="openDialog()"       
          >
          <UpdatePage 
            ref="UpdatePage"
            :parentCloseDialog="closeDialog"
            :parentUpdate="queryData"
            destory-on-close="true"
            >
          </UpdatePage>
      </el-dialog>
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
import UpdatePage from "./UpdatePage.vue";
export default {
    data() {
        return {
            dialogVisible: false,
            total: 1,
            // 页码总数
            pageSize: 1,
            tableData: [],
            tableBorder: true,
            nowPage: 1,
            // 页大小
            pageNum: 20,
            rowData:'',
            formData: {
                minBirthTime: "",
                maxBirthTime: "",
                minMileage: "",
                maxMileage: "",
                minFlightTime: "",
                maxFlightTime: "",
            }
        };
    },
    methods: {
        queryData() {
            var qData = {
                minBirthTime: this.formData.minBirthTime,
                maxBirthTime: this.formData.maxBirthTime,
                minMileage: this.formData.minMileage,
                maxMileage: this.formData.maxMileage,
                minFlightTime: this.formData.minFlightTime,
                maxFlightTime: this.formData.maxFlightTime,
                nowPage: this.nowPage,
                // pageSize被el组件占用了
                pageSize: this.pageNum
            };
            for (var i in qData) {
                qData[i] = (qData[i] == "") ? -1 : qData[i];
            }
            Net.queryData(qData)
                .then((res) => {
                console.log(res);
                if (res.code != 200) {
                    alert(res.data);
                    return;
                }
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.pageSize = res.data.pageSize;
            });
        },
        clear() {
            this.total = 0;
            this.tableData = [];
            this.formData.minBirthTime = "";
            this.formData.maxBirthTime = "";
            this.formData.minMileage = "";
            this.formData.maxMileage = "";
            this.formData.minFlightTime = "";
            this.formData.maxFlightTime = "";
            this.pageSize = 1;
        },
        currentChange(e) {
            this.nowPage = e;
            this.queryData();
        },
        deleteData(row) {
            // console.log(row);
            Net.deleteData({
                userId: row.userId
            })
                .then((res) => {
                this.queryData();
                alert("删除成功");
                console.log(res);
            });
        },
        closeDialog(){
          this.dialogVisible = false;
        },
        openDialog(){
          console.log(this.rowData);
          this.$nextTick(() => {
              this.$refs.UpdatePage.formData.userId=this.rowData.userId;
              this.$refs.UpdatePage.formData.sex=this.rowData.sex;
              this.$refs.UpdatePage.formData.birth=this.rowData.birth;
              this.$refs.UpdatePage.formData.mileage=this.rowData.mileage;
              this.$refs.UpdatePage.formData.flightTime=this.rowData.flightTime;
          })
          
        },
        clickDialog(row){
            this.rowData=row;
            this.dialogVisible=true;
        }
    },
    components: { UpdatePage }
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