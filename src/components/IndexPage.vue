<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="mainPage">
    <el-container>

        <el-header><span><img src="" alt=""></span>天鸽旅客管理系统 </el-header>

        <el-container class="bd">
            <el-aside width="200px">
              <Aside></Aside>
            </el-aside>
            <el-main>
             <router-view></router-view>
            </el-main>
        </el-container>

        <el-footer>
          © 2015 - 2022 北京交通大学
        </el-footer>

    </el-container>
  </div>
</template>

<script>

import Aside from './Aside.vue'
import QueryPage from './QueryPage.vue'
import AddPage from './AddPage.vue'
import UpdatePage from './UpdatePage.vue'
import DeletePage from './DeletePage.vue'

export default {
    components:{
      Aside,
      // eslint-disable-next-line vue/no-unused-components
      QueryPage,
      // eslint-disable-next-line vue/no-unused-components
      AddPage,
      // eslint-disable-next-line vue/no-unused-components
      UpdatePage,
      // eslint-disable-next-line vue/no-unused-components
      DeletePage,
      // eslint-disable-next-line vue/no-unused-components
    }
  
}
</script>

<style scoped>
.mainPage{
   width: 100%;
   height: 100%;
}
.el-header {
  background-color: #7accff;
  text-align: left;
  line-height: 60px;
  font-size: 20px;
}
.bd {
  height:600px;
  width: 100%;
}
.el-footer {
  background-color: #eef2f6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
   background-color: rgba(224,229,223,0.3);
}

.el-main {
 
  color: #333;
}

</style>