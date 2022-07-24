import Vue from "vue";
import VueRouter from "vue-router";
import QueryPage from "../components/QueryPage.vue"
import AddPage from "../components/AddPage.vue"
import DeletePage from "../components/DeletePage.vue"
import UpdatePage from "../components/UpdatePage.vue"
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/QueryPage'},
        {path:'/QueryPage',component:QueryPage},
        {path:'/AddPage',component:AddPage},
        {path:'/DeletePage',component:DeletePage},
        {path:'/UpdatePage',component:UpdatePage},

    ]
})

export default router