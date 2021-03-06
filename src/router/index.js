import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login.vue"
import Home from "@/components/Home.vue"
import Welcome from "@/components/Welcome.vue"
import Users from "@/components/users/Users.vue"
import Rights from "@/components/power/Rights.vue"
import Roles from "@/components/power/Roles.vue"
import Cate from "@/components/goods/Cate.vue"
Vue.use(VueRouter)

const routes = [

]

const router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/home',
			component: Home,
			redirect:'/welcome',
			children:
			[{
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/users',
				component: Users
			},
			{
				path: '/rights',
				component: Rights
			},
			{
				path: '/roles',
				component: Roles
			},
			{
				path: '/categories',
				component: Cate
			}
			]
		}
	]
})
router.beforeEach((to, from, next) => {
	//to  代表将要访问的路径
	//from 代表从哪个路径跳转过来
	//next  放行   next('/login')  表示强制跳转
	if (to.path === '/login') return next()
	//获取token
	const tokenStr = window.sessionStorage.getItem('token')
	if (!tokenStr) return next('/login') //如果token不存在，表示未登录，强制跳转到登录页面去
	next()
})
export default router
