// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import global_ from './components/Global'
import Vuex from 'vuex' //引入状态管理
import './custom.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BModal, VBModal } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.component('b-modal', BModal)
Vue.directive('b-modal', VBModal)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = global_

Vue.prototype.getIconSrc = function (icon){
  return require("@/assets/icons/"+icon);
}

Vue.prototype.getAvatarSrc = function (avatar){
  return require("@/assets/img/avatar/"+avatar);
}

Vue.prototype.getCarouselSrc = function (carousel){
  return require("@/assets/img/carousel/"+carousel);
}

Vue.prototype.getLogoSrc = function (logo){
  return require("@/assets/logo/"+logo);
}

var store = new Vuex.Store({
  state:{
    token:'',
    user:{},
    maxage:0,
    expires:''
  },
  mutations: {
    Login(state, user, maxage) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("user", JSON.stringify(user));
      state.token = user.token;
      state.user = user;
      state.maxage = maxage;
      state.expires = new Date(Date.now() + maxage*60*60*1000);
    },
    Logout(state) { // 退出登录
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      state.token = '';
      state.user = {};
      state.maxage = 0;
    },
  }
});

router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token');//获取本地存储的token
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限

    if (store.state.token != "" && store.state.token != null) {  // 通过vuex state获取当前的token是否存
     next();
    }
    else {
      console.log(to.fullPath);
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
