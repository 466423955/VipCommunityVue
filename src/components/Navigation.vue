<template>
        <b-navbar toggleable="lg" type="dark" variant="info" sticky class="navigation-panel">
            <b-navbar-brand href="/"><strong><h1>{{communityName}}</h1></strong></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">首页</b-nav-item>
                <b-nav-item to="/asklist">问答</b-nav-item>
                <b-nav-item to="/knowledge">知识</b-nav-item>
                <b-nav-item to="/course">课程</b-nav-item>
                <b-nav-item to="/discover">发现</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown right no-caret v-if="loginStatus">
                    <template v-slot:button-content>
                        <b-icon-chat class="navigation-avartar"></b-icon-chat>
                    </template>
                    <b-dropdown-item>notice</b-dropdown-item>
                    <b-dropdown-item>notice</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right no-caret v-if="loginStatus">
                    <template v-slot:button-content>
                        <img :src="getUserAvatar()" class="navigation-avartar">
                    </template>
                    <b-dropdown-item href="#"><b-icon icon="person-fill"></b-icon> 个人中心</b-dropdown-item>
                    <b-dropdown-item v-on:click="logout()"><b-icon icon="power"></b-icon> 退出登录</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item v-if="loginStatus==false" to="/login">登录</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
      return {
        communityName: this.GLOBAL.COMMUNITY_NAME,
        bell_svg: this.GLOBAL.ICON_BELL,
        loginStatus: false
      }
  },
  created() {
    this.loginStatus = sessionStorage.getItem("user") != null;
  },
  methods: {
      getUserAvatar(){
        var userStr = sessionStorage.getItem("user");
        if(userStr == null) {
            return '';
        }
        var user = JSON.parse(userStr);
        return this.getAvatarSrc(user.avartarurl);
      },
      logout(){
          this.$store.commit('Logout');
          this.loginStatus = false;
      }
  }
}
</script>

<style scoped>
.navigation-profile {
    float: right;
}
.navigation-avartar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}
.navigation-panel {
    margin-bottom: 10px;
}
</style>
