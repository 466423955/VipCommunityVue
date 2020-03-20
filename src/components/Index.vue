<template>
<div>
    <navi></navi>
    <b-container class="bv-example-row">
        <b-row>
            <!--左侧内容区-->
            <b-col cols="8" sm="8" md="8" lg="8" xl="8">
                <!--上方图片轮播-->
                <div class="carousel">
                    <b-carousel
                        id="carousel-fade"
                        style="text-shadow: 0px 0px 2px #000"
                        fade
                        indicators
                        img-width="1024"
                        img-height="480"
                        >
                        <b-carousel-slide
                            caption="First slide"
                            img-src="https://picsum.photos/1024/480/?image=10"
                        ></b-carousel-slide>
                        <b-carousel-slide
                            caption="Second Slide"
                            img-src="https://picsum.photos/1024/480/?image=12"
                        ></b-carousel-slide>
                        <b-carousel-slide
                            caption="Third Slide"
                            img-src="https://picsum.photos/1024/480/?image=22"
                        ></b-carousel-slide>
                    </b-carousel>
                </div>
                <!--二级导航栏-->
                <b-card title="Card Title" no-body>
                    <b-card-header header-tag="nav">
                    <b-nav card-header tabs>
                        <b-nav-item active>推荐</b-nav-item>
                        <b-nav-item>热榜</b-nav-item>
                    </b-nav>
                    </b-card-header>
                        <h1>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                            aaaaaaaaa
                            <hr>
                        </h1>
                    <b-card-body class="text-center">
                        <b-card-text>
                            With supporting text below as a natural lead-in to additional content.
                        </b-card-text>
                    </b-card-body>
                </b-card>

                
            </b-col>
            <!--右侧个人信息-->
            <b-col cols="4" sm="4" md="4" lg="4" xl="4">
                <!--交流分享-->
                <b-col class="communit-share-table">
                    <header class="header">交流分享</header>
                    <hr>
                    <b-container fluid class="topstoryHeader-right-nav">
                        <b-row class="align-content-center">
                            <b-col cols="4">
                                <router-link to="/ask" class="index-quick-entry">
                                    <img :src="getIconSrc('question.svg')" class="icon">
                                    <p class="icon_words">提问题</p>
                                </router-link>
                            </b-col>
                            <b-col cols="4">
                                <router-link to href="/answer" class="index-quick-entry">
                                    <img :src="getIconSrc('envelope.svg')" class="icon">
                                    <p class="icon_words">去回答</p>
                                </router-link>
                            </b-col>
                            <b-col cols="4">
                                <router-link to href="/publish" class="index-quick-entry">
                                    <img :src="getIconSrc('pencil.svg')" class="icon">
                                    <p class="icon_words">写文章</p>
                                </router-link>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Navigation from './Navigation'

export default {
  name: 'Index',
  components: {
    'navi': Navigation
  },
  data(){
      return {
        pic_1st: 'lunbo.jpg',
        pic_2nd: 'lunbo.jpg',
        pic_3rd: 'lunbo.jpg'
      }
  },
  methods: {

  }
}
</script>

<style scoped>
.topstoryHeader-right-nav {
    cursor: pointer;
    text-align: center;
}
.communit-share-table {
    border: 1px solid #CCCCCC;
    margin: 10px;
}
.communit-share-table .icon {
    width: 32px;
    height: 32px;
    color: #CCCCCC;
}
.communit-share-table .header {
    margin: 10px;
}
.index-quick-entry {
    color: inherit;
    text-decoration: none;
}
.carousel {
    margin: 10px 0px;
}
</style>
