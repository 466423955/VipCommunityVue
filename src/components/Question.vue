<template>
<div>
    <navi></navi>
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                <b-card class="mb-2">
                    <b-card-title>{{title}}</b-card-title>
                    <b-card-sub-title class="mb-2">
                        <b-button pill variant="outline-primary" v-for="(item,index) in tags" :key=index class="question-tag">
                            <b-icon-tag></b-icon-tag>{{item}}
                        </b-button>
                    </b-card-sub-title>
                    <b-card-text v-html="content"></b-card-text>
                    <b-button href="#" variant="primary"><b-icon-pencil></b-icon-pencil> 写回答</b-button>

                    <template v-slot:footer>
                        <a v-on:click="followQuestion()">
                            <b-icon :icon="isFollowQuestion?'star-fill':'star'" alt="isFollowQuestion?'取消关注':'关注问题'"></b-icon> {{isFollowQuestion?'已关注':'关注'}}
                        </a>
                    </template>
                </b-card>
            </b-col>
            
        </b-row>
    </b-container>

    <textarea v-model="title" name="title" id="title" cols="30" rows="10"></textarea>
    <textarea v-model="content" name="content" id="content" cols="30" rows="10"></textarea>
    <textarea v-model="tags" name="tags" id="tags" cols="30" rows="10"></textarea>
</div>
</template>

<script>
import Navigation from './Navigation'

export default {
    name: 'Question', 
    data() {
        return {
            questionId: 0,
            title: '',
            content: '',
            tags: [],
            isFollowQuestion: false
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
                    this.title = response.data.question.title;
                    this.content = response.data.question.description;
                    this.tags = response.data.question.tag.split(',');
                    this.isFollowQuestion = response.data.followed;
                } else {
                    this.toastOfDanger('服务端返回异常', '糟糕，服务器好像开小差了'+response.message);
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
}
</style>