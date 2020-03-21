<template>
<div>
    <!--导航-->
    <navi></navi>
    <b-container>
        <!--面包屑导航-->
        <b-breadcrumb>
            <b-breadcrumb-item to="/asklist">问答</b-breadcrumb-item>
            <b-breadcrumb-item active>提问</b-breadcrumb-item>
        </b-breadcrumb>
        <b-row>
            <!--提问内容-->
            <b-col cols="12" sm="8" md="8" lg="8" xl="8">
                <b-form-group>
                    <label for="question-title">问题标题（简单扼要）：</label>
                    <input v-model="questionTitle" type="text" class="form-control" id="question-title" name="question-title"
                        placeholder="您需要用简明扼要的语言在这里将问题描述清楚，以便更好地获得答案。">
                </b-form-group>
                <b-form-group>
                    <label for="question-description">问题补充（必填请参照右侧提示）：</label>
                    <QuillEditor ref="contentEditor" placeholder="如果问题标题不足以描述清楚您的困惑，您可以在此处详细展开，并可以插入图片来帮助问题回答者更好地理解您的疑惑，更有针对性地帮助您。" height='200px'>
                    </QuillEditor>
                </b-form-group>
                <b-form-group>
                    <ChooseTag ref='tagEditor'></ChooseTag>
                    <b-alert v-model="errorShow" variant="danger" dismissible>{{errorMessage}}</b-alert>
                    <b-button block variant="primary" v-on:click='doPublish'>发布</b-button>
                </b-form-group>
            </b-col>
            <!--提问建议-->
            <b-col cols="12" sm="4" md="4" lg="4" xl="4">
                <ul style="padding-left: 10px">
                    <li>
                        <h6 class="ask-advice"><strong>善用搜索功能</strong></h6>
                        <h6>当您的提问已经在社区中被人提出过了，那么重复的问题将较少得到回答者的关注，建议您查看近似问题并获取排序靠前的高质量回答。</h6>
                    </li>
                    <li>
                        <h6 class="ask-advice"><strong>提问题应简要明确</strong></h6>
                        <h6>长篇大论且没有重点的问题，无法让回答者快速、深入的理解您想要表达的意思，有指向性的问题才能够帮助您获得更有用的回答。</h6>
                    </li>
                    <li>
                        <h6 class="ask-advice"><strong>问题不宜太过广泛</strong></h6>
                        <h6>太广泛的问题往往让回答者无从下手。提问时应尽量提供问题相关的详细背景信息，用他人能够理解、具体的词句，回答者更容易对你的问题作出较为全面的解答。</h6>
                    </li>
                    <li>
                        <h6 class="ask-advice"><strong>给问题添加一个准确的话题</strong></h6>
                        <h6>当您的问题匹配到对应的话题时，关注该话题的人才能看到您的问题，进而作出回答。
                            提问题的过程，是您对于问题进行的再次思考和挖掘，能够锻炼一个人的思维能力，学会更好的提问，可以帮助我们成为更好的人。
                        </h6>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Navigation from './Navigation'
import ChooseTag from './ChooseTag'
import QuillEditor from './QuillEditor'

export default {
    name: 'Ask',
    data() {
        return {
            questionTitle: '',
            errorMessage: '',
            errorShow: false
        }
    },
    components: {
        'navi': Navigation,
        'ChooseTag': ChooseTag,
        'QuillEditor': QuillEditor
    },
    methods: {
        doPublish: function(){
            var questionContent = this.$refs.contentEditor.content;
            var tagContent = this.$refs.tagEditor.value;

            if(this.questionTitle === "" || this.questionTitle === null){
                this.errorShow = true;
                this.errorMessage = '问题标题不能为空！';
                return ;
            }
            if(this.questionContent === "" || this.questionContent === null){
                this.errorShow = true;
                this.errorMessage = '问题内容不能为空！';
                return ;
            }
            if(this.tagContent === "" || this.tagContent === null){
                this.errorShow = true;
                this.errorMessage = '请选择问题标签！';
                return ;
            }

            this.$axios.post('/api/ask', JSON.stringify({
                    'title': this.questionTitle,
                    'content': this.questionContent,
                    'tags': this.tagContent
                }), {
                    headers: {
                        'userToken': this.$store.userToken,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
            .then((res) => {
                var response = res.data;
                if (response.code == 200) {
                    ;
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => { 
                alert('糟糕，服务器好像开小差了！'+error);
            });

        }
    }
}
</script>

<style scoped>
.ask-advice {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
input::-webkit-input-placeholder {
    font-style: italic;
	font-size:0.8rem;
}
</style>
