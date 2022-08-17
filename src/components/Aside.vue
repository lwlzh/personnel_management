<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="aside">
        <el-row class="tac">
            
            <el-col :span="24">
                <h5 class="welcome">欢迎您，{{username}} !</h5>
                 <!-- 旅客管理 -->
                <el-menu
                router
                :default-active="this.$router.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>旅客管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/QueryPage">查询旅客信息</el-menu-item>
                            <el-menu-item index="/AddPage">添加旅客信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import router from '@/router';
export default {
    methods: {
         handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
     data(){
            return {
                username:'张三',
                router:router
            }
    }
}
</script>

<style scoped>
.welcome{
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
}
</style>