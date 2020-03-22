// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import global_ from './components/Global'
import Vuex from 'vuex' //引入状态管理
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BModal, VBModal } from 'bootstrap-vue'
import './custom.scss'

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

Vue.prototype.toastOfDanger = function (subject, description){
    this.$bvToast.toast(description, {
        title: subject,
        toaster: 'b-toaster-top-center',
        variant: 'danger',
        solid: true,
        appendToast: true
    });
}

Vue.prototype.toastOfSuccess = function (subject, description){
  this.$bvToast.toast(description, {
      title: subject,
      toaster: 'b-toaster-top-center',
      variant: 'success',
      solid: true,
      appendToast: true,
      autohidedelay: 2000
  });
}

Vue.prototype.follow = function (isFollowing, type, followId){
    this.$axios.post(isFollowing ? '/api/follow' : '/api/unfollow', JSON.stringify({
        'objectType': type,
        'objectId': followId
    }), {
        headers: {
            'userToken': this.$store.state.token,
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => {
    var response = res.data;
    if (response.code == 200) {
        this.toastOfSuccess(isFollowing?'关注':'取消关注', isFollowing?'关注成功':'取消关注成功');
    } else {
        this.toastOfDanger('服务端返回异常', '糟糕，服务器返回了一个错误(code:'+response.code+', message:'+response.message+')');
    }
    })
    .catch((error) => { 
        this.toastOfDanger('服务端连接异常', '糟糕，服务器返回了一个异常信息('+error+')');
    });            
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
