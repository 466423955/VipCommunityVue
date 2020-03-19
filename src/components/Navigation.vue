<template>
<div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top navigation-panel">
        <a class="navbar-brand h1" href="/">{{communityName}}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">首页 </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">问答 </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">知识 </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">课程 </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">发现 </router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                    <img  v-bind:src="getIconSrc('bell.svg')" alt="" width="32" height="32" title="bell">
                </a>
            </div>

            <div class="navbar-nav mr-right">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown" v-if="getLoginStatus()">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img :src="getUserAvatar()" class="navigation-avartar">
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/profile" class="dropdown-item">个人中心</router-link>
                            <router-link to="/changePwd" class="dropdown-item">修改密码</router-link>
                            <div class="dropdown-divider"></div>
                            <router-link to="/logout" class="dropdown-item">退出登录</router-link>
                        </div>
                    </li>
                    <li v-else>
                        <router-link to="/login"><a class="nav-link">登录</a></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
      return {
        communityName: this.GLOBAL.COMMUNITY_NAME,
        bell_svg: this.GLOBAL.ICON_BELL,
      }
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
      getLoginStatus(){
        return sessionStorage.getItem("user") != null;
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
    padding-left: 2.5rem;
    padding-right: 3rem;
}
</style>
