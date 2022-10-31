import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import VueI18n from 'vue-i18n';
Vue.use(ElementUI)

Vue.prototype.$axios = axios;
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

    const role = localStorage.getItem('ms_username');
	if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        next();
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

// Vue.use(router)
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
