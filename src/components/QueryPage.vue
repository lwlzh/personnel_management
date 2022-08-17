<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="main">
    <div class="queryBlock">
      <span class="queryTitle">查询依据:</span>
      
      <el-form :inline="true" :model="formData" class="demo-dynamic"  size="mini">
        <el-form-item
        v-for="(domain,index) in formData.domains"
        :label="'分类'+index+':'"
        :key="domain.key"
        >
          <el-form-item label="分类名:">
            <el-col :span="10">
                <el-input v-model="domain.categoryName" placeholder="分类名称" maxlength="8"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="出生年份:">
            <el-col :span="10">
                <el-input v-model="domain.minBirthTime" placeholder="最小年份" maxlength="4" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
            </el-col>
            <el-col  :span="2">---</el-col>
              <el-col  :span="10">
                <el-input  v-model="domain.maxBirthTime" placeholder="最大年份" maxlength="4" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-col>
          </el-form-item>
          <el-form-item label="旅行里程:">
            <el-col>
              <el-col :span="10">
                <el-input  v-model="domain.minMileage"  placeholder="最短里程" maxlength="8" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-col>
              <el-col  :span="2">---</el-col>
              <el-col  :span="10">
                <el-input   v-model="domain.maxMileage"  placeholder="最长历程" maxlength="8" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-col>
            </el-col>
          </el-form-item>
          <el-form-item label="旅行时间:">
            <el-col>
              <el-col :span="10">
                <el-input  v-model="domain.minFlightTime"    placeholder="最短时间" maxlength="8" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-col>
              <el-col :span="2">---</el-col>
              <el-col :span="10">
                <el-input   v-model="domain.maxFlightTime"  placeholder="最长时间" maxlength="8" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-col>
            </el-col>
          </el-form-item>
          <el-button  @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item style="display:block">
                     <!-- 控制按钮 -->
          <el-button type="primary" @click="queryData">查询</el-button>
          <el-button type="primary" @click="addDomain">添加查询分类</el-button>
          <el-button type="primary" @click="clickAddDialog">添加数据</el-button>
          <el-button type="primary" @click="clear">清空查询结果</el-button>
        </el-form-item>
      
      </el-form>

    </div>
    <!-- 添加框 -->
    <el-dialog
    title="添加人员数据"
    :visible.sync="addDialogVisible"
    append-to-body
    width="30%"    
    >
      <AddPage
      :parentCloseDialog="closeAddDialog"
        :parentUpdate="queryData"
        destory-on-close="true"
      >
      </AddPage>
    </el-dialog>
    <!-- 修改框 -->
    <el-dialog
      title="修改"
      :visible.sync="updateDialogVisible"
      append-to-body
      width="30%"
      @open="openUpdageDialog"       
      >
      <UpdatePage 
        ref="UpdatePage"
        :parentCloseDialog="closeUpdageDialog"
        :parentUpdate="queryData"
        destory-on-close="true"
        >
      </UpdatePage>
    </el-dialog>
    <!-- 表格 -->
    
    <div class="table">
        <!-- tabs选项 -->
        <el-tabs type="card" :closable="false">
          <el-tab-pane
            v-for="(item,index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          <!-- 分页表格 -->
              <el-table 
              :data="item.tableData" 
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
                      <el-button type="primary" @click="clickUpdateDialog(scope.row)" size="small">修改</el-button>
                      <el-popconfirm
                          title="确定删除吗？"
                          @confirm="deleteData(scope.row,index)"
                        >
                          <el-button type="danger" size="small" slot="reference">删除</el-button>
                      </el-popconfirm>
                    </template>  
                  </el-table-column>
              </el-table>
              <!-- 页码 -->
              <div class="pageNum">
                <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange($event,index)"
                :total="item.total"
                :page-size="item.pageSize"
                >
                </el-pagination>
              </div>
        
        </el-tab-pane>
      </el-tabs>
        
    </div>
     
    
  </div>
</template>

<script>
import Net from "../js/request.js"
import UpdatePage from "./UpdatePage.vue";
import AddPage from "./AddPage.vue";
export default {
    data() {
        return {
            addDialogVisible:false,
            updateDialogVisible: false,
            tableBorder: true,
            rowData:'',
            formData: {
                domains:[{
                  categoryName:"",
                  minBirthTime: "",
                  maxBirthTime: "",
                  minMileage: "",
                  maxMileage: "",
                  minFlightTime: "",
                  maxFlightTime: "",
                }]
                
            },
            editableTabsValue: "1",
            editableTabs: [{
                title:'分类0',
                name:"0",
                total: 1,
                // 页码总数
                pageSize: 1,
                tableData: [],
                nowPage: 1,
                // 页大小
                pageNum: 20,
            }],
            tabIndex: 2
        };
    },
    methods: {
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
        queryItem(index){
          var title = this.formData.domains[index].categoryName=="" ? ("分类"+index) : this.formData.domains[index].categoryName;
          var qData = {
                  minBirthTime:  this.formData.domains[index].minBirthTime,
                  maxBirthTime:  this.formData.domains[index].maxBirthTime,
                  minMileage:  this.formData.domains[index].minMileage,
                  maxMileage:  this.formData.domains[index].maxMileage,
                  minFlightTime:  this.formData.domains[index].minFlightTime,
                  maxFlightTime:  this.formData.domains[index].maxFlightTime,
                  nowPage: this.editableTabs[index].nowPage,
                  // pageSize被el组件占用了
                  pageSize: this.editableTabs[index].pageNum
          }
          for (var qDataItem in qData) {
                qData[qDataItem] = (qData[qDataItem] == "") ? -1 : qData[qDataItem];
          }

          Net.queryData(qData)
            .then((res) => {
              if (res.code == "error") {
                  this.errorNotif('查询['+title+']时网络连接错误');
                  return;
              }
              res=res.data;
              if(res.code != "200"){
                  this.errorNotif('查询['+title+']时'+res.data);
                  return;
              }
              this.editableTabs[index].tableData = res.data.list;
              this.editableTabs[index].total = res.data.total;
              this.editableTabs[index].pageSize = res.data.pageSize;
              this.successNotif('查询['+title+']时查询成功');
            })
            .catch((e)=>{
              console.log(e);
              this.errorNotif('查询['+title+']时网络连接错误');
            })
        },
        queryData() {
            for(var i=0;i< this.formData.domains.length;i++){
              if(this.formData.domains[i].minBirthTime!="" &&this.formData.domains[i].maxBirthTime!="" && this.formData.domains[i].minBirthTime>this.formData.domains[i].maxBirthTime){
                alert('分类'+i+'的[出生年份]最小值能大于最大值！');

                return;
              }
              if(this.formData.domains[i].minMileage!="" &&this.formData.domains[i].maxMileage!="" && this.formData.domains[i].minMileage>this.formData.domains[i].maxMileage){
                alert('分类'+i+'的[旅行里程]最小值不能大于最大值！');

                return;
              }
              if(this.formData.domains[i].minFlightTime!="" &&this.formData.domains[i].maxFlightTime!="" && this.formData.domains[i].minFlightTime>this.formData.domains[i].maxFlightTime){
                alert('分类'+i+'的[旅行时长]最小值不能大于最大值！');

                return;
              }
              
            }
            
            this.editableTabs=[];
            
            for(i=0;i< this.formData.domains.length;i++){
               this.editableTabs.push({
                    title: this.formData.domains[i].categoryName=="" ? ("分类"+i) : this.formData.domains[i].categoryName,
                    name:i+"",
                    total: 1,
                    // 页码总数
                    pageSize: 1,
                    tableData: [],
                    nowPage: 1,
                    // 页大小
                    pageNum: 20,
                })
               this.queryItem(i);
            }
            
            
        },
        clear() {
            this.editableTabs=[];
            this.editableTabs.push({
                title:'分类0',
                name:"0",
                total: 1,
                // 页码总数
                pageSize: 1,
                tableData: [],
                nowPage: 1,
                // 页大小
                pageNum: 20,
            })
        },
        currentChange(e,index) {
            this.editableTabs[index].nowPage = e;
            this.queryItem(index);
        },
        deleteData(row) {
            Net.deleteData({
                userId: row.userId
            })
            .then((res) => {
            //查询网络错误
            if(res.code=="error"){
              this.errorNotif(res.data);
              return;
            }
            res=res.data;
            //查询服务器结果错误
            if(res.code != "200"){
              this.errorNotif(res.data);
              return;
            }
            this.successNotif('删除成功')
            this.queryData();
            })
            .catch((res)=>{
              console.log(res);
              this.errorNotif('删除失败');
            })
      },
        closeUpdageDialog(){
          this.updateDialogVisible = false;
        },
        closeAddDialog(){
          this.addDialogVisible = false;
        },
        openUpdageDialog(){
          console.log(this.rowData);
          this.$nextTick(() => {
              this.$refs.UpdatePage.formData.userId=this.rowData.userId;
              this.$refs.UpdatePage.formData.sex=this.rowData.sex;
              this.$refs.UpdatePage.formData.birth=this.rowData.birth;
              this.$refs.UpdatePage.formData.mileage=this.rowData.mileage;
              this.$refs.UpdatePage.formData.flightTime=this.rowData.flightTime;
          })
          
        },
        clickUpdateDialog(row){
            this.rowData=row;
            this.updateDialogVisible=true;
        },
        clickAddDialog(){
          this.addDialogVisible = true;
        },
        removeDomain(item){
            var index = this.formData.domains.indexOf(item)
            console.log(index);
            if(index>0){
              this.formData.domains.splice(index,1)
            }
        },
        addDomain() {
          this.formData.domains.push({
              categoryName:"",
              minBirthTime: "",
              maxBirthTime: "",
              minMileage: "",
              maxMileage: "",
              minFlightTime: "",
              maxFlightTime: "",
              key: Date.now()
          })
          console.log(this.formData.domains)
        }
    },
    components: { UpdatePage, AddPage }
}
</script>

<style scoped>
.main{
    width: 100%;
    height: 100%;
}
.queryTitle{
   text-align: center;
   margin-top: 10px;
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