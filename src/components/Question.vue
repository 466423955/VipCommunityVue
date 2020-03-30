<template>
<div>
    <navi></navi>
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                <b-card class="mb-2">
                    <b-card-title class="question-title">
                        <b-row>
                            <b-col cols='10' sm='10' md='10' lg='10' xl='10'>
                                {{questionTitle}}
                            </b-col>
                            <b-col cols='1' sm='1' md='1' lg='1' xl='1' class="question-count">
                                <span class="question-count-title">关注者</span>
                                <span class="question-count-text">{{questionFollowCount}}</span>
                            </b-col>
                            <b-col cols='1' sm='1' md='1' lg='1' xl='1' class="question-count">
                                <span class="question-count-title">被浏览</span>
                                <span class="question-count-text">{{questionViewCount}}</span>
                            </b-col>
                        </b-row>
                    </b-card-title>
                    <b-card-sub-title class="mb-2">
                        <b-button pill variant="outline-primary" v-for="(item,index) in tags" :key=index class="question-tag">
                            <b-icon-tag></b-icon-tag>{{item}}
                        </b-button>
                    </b-card-sub-title>


                    <b-card-text v-html="questionContent"></b-card-text>
                    <b-button href="#" variant="primary"><b-icon-pencil></b-icon-pencil> 写回答</b-button>

                    <template v-slot:footer>
                        <a v-on:click="followQuestion()">
                            <b-icon :icon="isFollowQuestion?'star-fill':'star'" alt="isFollowQuestion?'取消关注':'关注问题'"></b-icon> {{isFollowQuestion?'已关注':'关注'}}
                        </a>
                        <div class="question-footer">
                            <a href="/">{{questionAuthor}}</a> 提问于 {{questionModifiedTime}}
                        </div>
                    </template>
                </b-card>
            </b-col>
            
        </b-row>
    </b-container>
</div>
</template>

<script>
import Navigation from './Navigation'

export default {
    name: 'Question', 
    data() {
        return {
            questionId: 0,
            questionTitle: '',
            questionContent: '',
            tags: [],
            isFollowQuestion: false,
            questionAuthor: '',
            questionModifiedTime: '',
            questionFollowCount: 0,
            questionViewCount:0
        }
    },
    components: {
        'navi': Navigation
    },
    mounted(){
        this.questionId = this.$route.params.Id;
        this.$axios.get('/api/question/'+this.questionId)
            .then((res) => {
                var response = res.data;
                if (response.code == 200) {
                    this.questionTitle = response.data.question.title;
                    this.questionContent = response.data.question.description;
                    this.tags = response.data.question.tag.split(',');
                    this.isFollowQuestion = response.data.followed;
                    this.questionAuthor = response.data.user.name;
                    this.questionModifiedTime = moment(response.data.question.gmtModify).format('YYYY-MM-DD HH:mm:ss');
                    this.questionFollowCount = response.data.question.followCount;
                    this.questionViewCount = response.data.question.viewCount;
                } else { 
                    this.toastOfDanger('服务端返回异常', response.message);
                }
            })
            .catch((error) => { 
                this.toastOfDanger('服务端连接异常', '糟糕，服务器好像开小差了'+error);
            });
    },
    methods: {
        followQuestion: function(){
            this.isFollowQuestion = !this.isFollowQuestion;
            this.follow(this.isFollowQuestion, 'Question', this.questionId);
        }
    }
}
</script>

<style scoped>
.question-tag {
    height: 1.2rem;
    font-size: 0.8rem;
    padding: 0 0.8rem;
    margin-bottom: 1rem;
}
.question-footer {
    float: right;
    font-size: 0.8rem;
    font-style: italic;
    text-decoration:none;
}
.question-title {
    font-size: 2.2rem;
}
.question-count {
    text-align: center;
}
.question-count-title {
    display: block;
    font-size: 1rem;
    color: #8590a6;
}
.question-count-text {
    font-size: 1rem;
    color: #1a1a1a;
}
</style>