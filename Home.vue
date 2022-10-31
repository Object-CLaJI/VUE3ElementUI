<template>
	<div class="wrapper">
		<g-Header></g-header>
		<g-aside></g-aside>
		<div class="content-box" :class="{'content-collapse':collapse}">
			<v-tags></v-tags>
			<div class="content">
				<transition name="move" mode="out-in">
					<keep-alive :include="tagsList">
						<router-view></router-view>
					</keep-alive>
				</transition>
				<el-backtop target=".content"></el-backtop>
			</div>
		</div>
		<!--<el-container>
	 		<div class="main">
				<el-tabs v-model="editableTabsValue" type="border-card" class="content" editable @edit="handleTabsEdit">
					<el-tab-pane :key="item.name" v-for="(item) in editableTabs" :label="item.title" :name="item.name">
						<span slot="label"><i class="el-icon-refresh"></i> {{item.title}}</span>
						{{item.content}} 
						
						<router-view></router-view>
					</el-tab-pane>
				</el-tabs>
			</div> 
		</el-container>-->
	</div>
</template>

<script>
	import bus from './bus';
	import gHeader from "./Header.vue"
	import gAside from "./Aside.vue"
	import gMain from "./Main.vue"
	import vTags from './Tags.vue';
	export default {
		data() {
			return {
				collapse: false,
				tagsList: [],
				editableTabsValue: '2',
				editableTabs: [{
					title: 'Tab 1',
					name: '1',
					content: 'Tab 1 content'
				}, {
					title: 'Tab 2',
					name: '2',
					content: 'Tab 2 content'
				}],
				tabIndex: 2
			};
		},
		components: {
			gHeader,	
			gAside,
			gMain,
			vTags
		},
		created() {
			this.$root.$on('collapse', msg => {
				bus.collapse = msg;
			})

			// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
			bus.$on('tags', msg => {
				let arr = [];
				for (let i = 0, len = msg.length; i < len; i++) {
					msg[i].name && arr.push(msg[i].name);
				}
				this.tagsList = arr;
			})
		},
		methods: {

			handleTabsEdit(targetName, action) {
				if (action === 'add') {
					let newTabName = ++this.tabIndex + '';
					this.editableTabs.push({
						title: 'New Tab',
						name: newTabName,
						content: 'New Tab content'
					});
					this.editableTabsValue = newTabName;
				}
				if (action === 'remove') {
					let tabs = this.editableTabs;
					let activeName = this.editableTabsValue;
					if (activeName === targetName) {
						tabs.forEach((tab, index) => {
							if (tab.name === targetName) {
								let nextTab = tabs[index + 1] || tabs[index - 1];
								if (nextTab) {
									activeName = nextTab.name;
								}
							}
						});
					}

					this.editableTabsValue = activeName;
					this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				}
			}
		}
	}
</script>

<style>
	.main {
		/* margin-left: 15.625rem; */
		/* padding:0 0rem 0 0.625rem; */
		width: 100%;
		height: 100%;
	}

	.content {
		width: auto;
		height: 100%;
	}

	.test {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: row;
		flex-direction: row;
		-ms-flex: 1;
		flex: 1;
		-ms-flex-preferred-size: auto;
		flex-basis: auto;
		box-sizing: border-box;
		min-width: 0;
		height: 100%;
		overflow-y: auto;
	}
</style>
