import { createRouter , createWebHistory} from "vue-router";
const routes = [
    {
        path:'/',
        component:()=>import('../layout/Layout.vue'),
        children:[
            {
                path:'home',
                component:()=>import('../views/Home.vue'),
            }
        ]

    },
    {
        path:'/login',
        component:()=>import('../views/Login.vue')
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes:routes//也可以缩写为  routes
})
export default router