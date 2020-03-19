<template>
<div>
    <!--导航-->
    <navi></navi>

    <div class="container">
        <!--面包屑导航-->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/asklist">问答</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">提问</li>
            </ol>
        </nav>
        <div class="row">
            <!--提问内容-->
            <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <input id="question-id" name="question-id" type="hidden">
                <div class="form-group">
                    <label for="question-title">问题标题（简单扼要）：</label>
                    <input type="text" class="form-control" id="question-title" name="question-title"
                        placeholder="您需要用简明扼要的语言在这里将问题描述清楚，以便更好地获得答案。">
                </div>
                <div class="form-group">
                    <label for="question-description">问题补充（必填请参照右侧提示）：</label>
                    <textarea id="question-description" name="question-description" cols="30" rows="10" class="form-control"
                            placeholder="如果问题标题不足以描述清楚您的困惑，您可以在此处详细展开，并可以插入图片来帮助问题回答者更好地理解您的疑惑，更有针对性地帮助您。"></textarea>
                </div>
                <div class="form-group">
                    <label for="question-tag">添加话题：</label>
                    <div id="tag-div">
                        <input type="text" class="form-control" id="question-tag" name="question-tag"
                            placeholder="添加话题（0/5）" autocomplete="off">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 alert alert-danger"
                                    v-show="hasError">
                                    {{errMessage}}
                                </div>
                                <!--话题-->
                                <div id="selectTag" class="selectTag">
                                    <div>
                                    <b-card title="Card Title" no-body>
                                        <b-card-header header-tag="nav">
                                            <b-nav card-header pills>
                                                <b-nav-item v-for="(item,index) in tagList" :key="index" v-on:click="clickTagPill(index)" :active="index==selectedIndex">
                                                    {{item.categoryName}}
                                                </b-nav-item>
                                            </b-nav>
                                        </b-card-header>
                                        <b-card-body>
                                            <b-card-text>
                                                <a v-for="(item,index) in tagDetailList" :key="index">
                                                    <b-icon-tag></b-icon-tag>{{item}}
                                                </a>
                                            </b-card-text>
                                        </b-card-body>
                                    </b-card>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                <button type="submit" class="btn btn-primary btn-publish">发布</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--提问建议-->
            <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
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
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navigation from './Navigation'

export default {
    name: 'Ask',
    data() {
        return {
            hasError: false,
            errMessage: '',
            tagList: [],
            tagDetailList: [],
            selectedIndex: 0
        }
    },
    created(){
        this.getTags();
    },
    components: {
        'navi': Navigation
    },
    methods: {
        getTags: function() {
            this.$axios.get('/api/tag')
                .then((res) => {
                    var response = res.data;
                    if (response.code == 200) {
                        this.tagList = response.data.tagDTOs;
                        this.tagDetailList = this.tagList[0].tags;
                    } else {
                        alert('服务器好像开小差了！ ('+response.message+')');;
                    }
                })
                .catch((error) => { 
                    alert('服务器好像开小差了！ tag is null('+error+')');
                });
        },
        clickTagPill: function(index) {
            this.selectedIndex = index;
            var selectedTag = this.tagList[index];
            this.tagDetailList = selectedTag.tags;
        }
    }
}



//选择话题标签
function selectTag(value) {
    var orignValue = $("#question-tag").val();
    if(orignValue != null && orignValue != ""){
        var values = orignValue.split(",");
        if(values.indexOf(value) >= 0){
            while (values.indexOf(value) >= 0){
                values.splice(values.indexOf(value), 1);
            }
        } else {
            values.push(value);
        }
        $("#question-tag").val(values.join(","));
    } else {
        $("#question-tag").val(value);
    }
}

$("body").on("click", function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'tag-div') {
            $("#selectTag").show();
            return;
        }
        elem = elem.parentNode;
    }
    $("#selectTag").hide();
});
</script>

<style scoped>
.ask-advice {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.form-group .selectTag {
    display: none;
    margin-top: .5rem;
}

.form-group .selectTag .nav {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

.form-group .selectTag .nav .nav-link {
    height: 2rem;
    padding: 0.25rem 1rem;
    margin-right: 0.25rem;
}

.form-group .selectTag .tab-content .badge-info {
    font-size: 1rem;
    background-color: #b3d7ff;
}

.form-group .selectTag .tab-content .badge-img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
}

.btn-publish {
    width:72px;
    margin-top: 1rem;
}
</style>
