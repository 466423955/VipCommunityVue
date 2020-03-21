<template>
<div>
    <navi></navi>
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
            tags: ''
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
                    this.tags = response.data.question.tag;
                } else {
                    this.toastOfDanger('服务器返回异常', '糟糕，服务器好像开小差了'+response.message);
                }
            })
            .catch((error) => { 
                this.toastOfDanger('服务器连接异常', '糟糕，服务器好像开小差了'+error);
            });
    }
}
</script>