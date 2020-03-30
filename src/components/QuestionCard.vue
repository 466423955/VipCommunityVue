<template>
<div>
  <b-card>
      <b-card-title>
          <a v-on:click="openQuestion()" class="question-title">{{questionTitle}}</a>
      </b-card-title>
      <b-card-sub-title>
          <b-button pill variant="outline-primary" v-for="(item,index) in questionTags" :key=index class="question-tag">
                <b-icon-tag></b-icon-tag>{{item}}
          </b-button>
      </b-card-sub-title>
      <b-card-text class="question-content">{{questionContent}}
      </b-card-text>

    <a href="#" class="card-link">去回答</a>
  </b-card>
</div>
</template>

<script>
export default {
    props: {
        questionDTO: {
            type: Object,
            default: null
        }
    },
    data(){
        return {
            questionTitle: '',
            questionTags: [],
            questionContent:'',
            questionId:0
        }
    },
    mounted(){
        this.questionId = this.questionDTO.question.id;
        this.questionTitle = this.questionDTO.question.title;
        this.questionTags = this.questionDTO.question.tag.split(',');
        this.questionContent = this.questionDTO.question.description;
    },
    methods: {
        openQuestion:function(){
            this.$router.push({path:'/question/'+this.questionId});
        }
    }
}
</script>

<style scoped>
.question-tag {
    height: 1.2rem;
    font-size: 0.8rem;
    padding: 0 0.8rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}
.question-content {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.question-title {
  text-decoration: none;
  color: black;
  cursor:pointer;
}
.question-title:hover {
  text-decoration: none;
  color: black;
}
</style>