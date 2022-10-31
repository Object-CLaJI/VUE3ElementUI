<template>
	<!-- <el-aside style="width: 15rem;background-color: #545c64;"> -->
		<div class="sidebar">
			<el-menu default-active="2" class="sidebar-el-menu" @open="handleOpen" :collapse="collapse" @close="handleClose"
			  background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"  unique-opened router>
				<template v-for="item in items">
					<template v-if="item.subs">
						<el-submenu :index="item.index" :key="item.index">
							<template slot="title">
								<i :class="item.icon"></i>
								<span slot="title">{{ item.title }}</span>
							</template>
							<template v-for="subItem in item.subs">
								<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
									<template slot="title">{{ subItem.title }}</template>
									<el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
								</el-submenu>
								<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
							</template>
						</el-submenu>
					</template>
					<template v-else>
						<el-menu-item :index="item.index" :key="item.index">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</el-menu-item>
					</template>
				</template>
				
				</el-menu>
		</div>
	<!-- </el-aside> -->
</template>
<script>
	import bus from './bus';
	export default {
		data() {
			return {
				
					collapse: false,
					items: [{
							icon: 'el-icon-lx-home',
							index: 'dashboard',
							title: '系统首页',
							
						},
						{
						    icon: 'el-icon-lx-cascades',
						    index: 'xinwenguangli',
						    title: '新闻管理'
						},
						{
						    icon: 'el-icon-lx-copy',
						    index: 'shoop',
						    title: '商品管理'
						},
						     {
						         icon: 'el-icon-lx-calendar',
						         index: 'paypay',
						         title: '收付款管理',
						         subs: [
						             {
						                 index: 'tables',
						                 title: '账单明细'
						             },
						             {
						                 index: '3-2',
						                 title: '代理点中心',
						                 subs: [
						                     {
						                         index: 'tops',
						                         title: '城乡县一级代理点'
						                     },
						                     {
						                         index: 'topsto',
						                         title: '网格服务站二级代理点'
						                     },
						                 ]
						             },
						             {
						                 index: 'upload',
						                 title: 'KAO（考勤）上传'
						             }
						         ]
						     },
						{
						    icon: 'el-icon-lx-emoji',
						    index: 'icon',
						    title: '微信商品配置中心'
						},
						{
						    icon: 'el-icon-lx-favor',
						    index: 'KOAJiXiao',
						    title: '企业微信业绩考核系统'
						},
						{
						    icon: 'el-icon-rank',
						    index: 'PingDuoDuoORC',
						    title: '拼多多ORC营销系统'
						},
						{
						    icon: 'el-icon-lx-warn',
						    index: 'shezhiguanli',
						    title: '设置管理',
						    subs: [
						        {
						            index: 'xitongshezhi',
						            title: '系统设置'
						        },
						        {
						            index: 'quanxianshezhi',
						            title: '权限设置'
						        }
						    ]
						},
					]
			};
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			}
		},
		created() {
			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
			bus.$on('collapse', msg => {
				this.collapse = msg;
				bus.$emit('collapse-content', msg);
			});
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		}
	}
</script>

<style>
	/* .sidebar {
		float: left;
		display: block;
		position: absolute;
		left: 0;
		top: 60px;
		bottom: 0;
		overflow-y: scroll;
		padding-right: 0.925rem;background-color: #545c64;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}
.el-menu {
    border-right: solid 1px #545c64;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #FFF;
}
	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 15.625rem;
	}

	.sidebar>ul {
		height: 100%;
	} */
</style> 
<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 3.775rem;
		bottom: 0;
		overflow-y: scroll;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.sidebar>ul {
		height: 100%;
	}
</style>
