<template>
	<div class="header">
		<el-row :gutter="20" >
			<el-col :span="6" style="vertical-align: middle;font-size: x-large;color: white;line-height: 60px;padding-left: 1.625rem;">
				<i class="el-icon-s-grid el-icon-menu" @click="collapseChage"></i>
				<label>电子商务后台管理系统</label>
			</el-col>
			<el-col :span="15">
				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				 background-color="#242f42" text-color="#fff" active-text-color="#ffd04b" >
					<el-menu-item index="1">处理中心</el-menu-item>
					<el-submenu index="2">
						<template slot="title">我的工作台</template>
						<el-menu-item index="2-1">办事面板</el-menu-item>
						<el-menu-item index="2-2">控制中心</el-menu-item>
						<el-menu-item index="2-3">风险评估</el-menu-item>
					</el-submenu>
					<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">系统配置</a></el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="3">
				<el-row :gutter="24">
					<el-col :span="4" class="tipIcon">
						<el-tooltip class="item" effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="top">
							<i :class="fullscreen?`el-icon-rank`:`el-icon-full-screen`" @click="handleFullScreen()"></i>
						</el-tooltip>
					</el-col>
					<el-col :span="4" class="iconMessage" style="padding-top: 1.225rem;">
						<el-tooltip class="item" effect="dark" content="查看消息" placement="top">
							<el-badge :value="12" class="item">
								<i class="el-icon-chat-dot-round"></i>
							</el-badge>
						</el-tooltip>
					</el-col>
					<el-col :span="6" style="padding-top: 0.825rem;">
						<div class="block">
							<el-avatar :size="35" src="static/img/logo.png">
							</el-avatar>
						</div>
					</el-col>

					<el-col :span="10" style="padding-top: 0.925rem;">
						<el-dropdown @command="handleCommand" class="userInfoStyle">
							<span class="el-dropdown-link">
								欢迎你,Admin<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="a">修改密码</el-dropdown-item>
								<el-dropdown-item command="b">注销</el-dropdown-item>
								<el-dropdown-item command="c">关于作者</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>

				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import bus from './bus';
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				collapse: false,
				fullscreen: false,
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},

			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleCommand(command) {
				this.$message('click on item ' + command);
			},
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse;
				bus.$emit('collapse', this.collapse);
			},
			// 全屏事件
			handleFullScreen() {
				debugger
				let element = document.documentElement;
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			}
		}
	}
</script>

<style scoped>
/* .header {
position: relative;
box-sizing: border-box;
width: 100%;
height: 70px;
font-size: 22px;
color: #fff;
background-color: #545c64
} */
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		/* height: 4.375rem; */
		font-size: 22px;
		color: #fff;
	}

	.tipIcon {
		vertical-align: middle;
		font-size: large;
		color: white;
		line-height: 65px;
		padding-left: 1.625rem;
	}

	.iconMessage {
		vertical-align: middle;
		font-size: large;
		color: white;
	}

	.userInfoStyle {
		vertical-align: middle;
		color: white;

	}

	.el-dropdown-link {
		cursor: pointer;
	}

	.el-icon-arrow-down {
		font-size: x-large;
	}
</style>
