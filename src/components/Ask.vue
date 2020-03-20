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
                <input id="question-id" name="question-id" type="hidden">
                <b-form-group>
                    <label for="question-title">问题标题（简单扼要）：</label>
                    <input type="text" class="form-control" id="question-title" name="question-title"
                        placeholder="您需要用简明扼要的语言在这里将问题描述清楚，以便更好地获得答案。">
                </b-form-group>
                <b-form-group>
                    <label for="question-description">问题补充（必填请参照右侧提示）：</label>
                    <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @focus="onEditorFocus($event)"
                        @blur="onEditorBlur($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                    <!-- <textarea id="question-description" name="question-description" cols="30" rows="10" class="form-control"
                            placeholder="如果问题标题不足以描述清楚您的困惑，您可以在此处详细展开，并可以插入图片来帮助问题回答者更好地理解您的疑惑，更有针对性地帮助您。"></textarea> -->
                </b-form-group>
                <b-form-group>
                    <ChooseTag ref='tags'></ChooseTag>
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
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill'; // 富文本基于quill

export default {
    name: 'Ask',
    data() {
        return {
            hasError: false,
            errMessage: '',
            tagList: [],
            tagDetailList: [],
            selectedIndex: 0,
            tagContent: [],
            editor: null,   // 富文本编辑器对象
            content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
            editorOption: { //  富文本编辑器配置
                modules: {
                    
                },
                theme: 'snow',
                placeholder: '请输入正文'
            }
        }
    },
    mounted() {
        this.editor = this.$refs.myQuillEditor.quill;
    },
    components: {
        'navi': Navigation,
        'ChooseTag': ChooseTag,
        quillEditor
    },
    methods: {
        doPublish: function(){
            //发布
        },
        // 准备富文本编辑器
        onEditorReady (editor) {},
        // 富文本编辑器 失去焦点事件
        onEditorBlur (editor) {},
        // 富文本编辑器 获得焦点事件
        onEditorFocus (editor) {},
        // 富文本编辑器 内容改变事件
        onEditorChange (editor) {}
    },
    beforeDestroy() {
        this.editor = null;
        delete this.editor;
    }
}
</script>

<style scoped>
.ask-advice {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>
