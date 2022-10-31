import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 定义一个路由
export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/dashboard'
		},
		{
			path: '/',
			component: () => import('../components/BgCommon/Home.vue'),
			meta: {
				title: '自述文件'
			},
			children: [{
				path: '/icon',
				component: resolve => require(['../components/Icon.vue'], resolve),
				meta: {
					title: '自定义图标'
				}
			}],
		}
		// {
		// 	path: '/login',
		// 	component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
		// 	meta: {
		// 		title: '登录'
		// 	}
		// },
		// {
		// 	path: '*',
		// 	redirect: '/404'
		// }
	]
});
