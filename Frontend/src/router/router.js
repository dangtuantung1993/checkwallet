import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import VueRouter from 'vue-router'
import BlogPost from '@/components/BlogPost'
import Ether from "../components/Ether"

import test from "../components/test"
import NewBlogpost from "../components/NewBlogpost"

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/', component: Home},
    {path: '/blogpost', component: BlogPost},
    {path: '/ether', component: Ether},
    {path:'/test',component:test},
    {path:'/newblogpost',component:NewBlogpost}

]
export default new VueRouter({routes})
