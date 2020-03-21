<template>
    <div style="height=500px">
        <!-- <div id="toolbar" slot="toolbar">
            <button class="ql-bold" title="加粗">Bold</button>
            <select class="ql-header" title="段落格式">
                <option selected>正文</option>
                <option value="2">标题1</option>
                <option value="3">标题2</option>
                <option value="4">标题3</option>
            </select>
            <button class="ql-list" value="ordered" title="有序列表"></button>
            <button class="ql-list" value="bullet" title="无序列表"></button>
            <select class="ql-color" value="color" title="字体颜色"></select>
            <b-icon-image-fill class="icon-pic" title="图片" @click="insertImgClick('insert_image')"></b-icon-image-fill>
            <b-icon-camera-video-fill class="icon-video" title="视频" @click="insertImgClick('insert_video')"></b-icon-camera-video-fill>
        </div>
        <input style="display: none;" type="file" class="select_image" id="insert_image" @change="fileInsert($event)" accept="image/jpeg,image/gif,image/png,image/jpg">  
        <input style="display: none;" type="file" id="insert_video" @change="fileInsert($event)" accept="audio/mp4">  -->

        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
        </quill-editor>
    </div>  
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { addQuillTitle } from './../assets/js/QuillTitile.js'
// import Video from './../assets/js/Video.js'; // 插入h5 video视频
// import { Quill } from 'vue-quill-editor'

// Quill.register(Video, true);  // 注册video

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ['clean'], // 清除文本格式-----['clean']
  ['image'],['video'] // 链接、图片、视频-----['link', 'image', 'video']
]

export default {
    name: 'QuillEditor',
    props: {
      value: {
        type: String,
        default: ''
      },
      toolbarMode: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      height: {
        type: String,
        default: '170px'
      },
      imagePath: {
        type: String,
        default: ''
      }
    },
    components: {
        quillEditor
    },
    data() {
        return {
            content: null,
            editorOption: {
                placeholder: this.placeholder,
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: toolbarOptions
                    }
                }
            }
        }
    },
    mounted(){
        // 设置编辑器高度
        this.editor.container.style.height = `${this.height}`;
        this.editorOption.placeholder = `${this.placeholder}`;
        addQuillTitle();
    },
    methods: {
        onEditorReady(editor) { },// 准备编辑器
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        insertImgClick (inputId) {
          document.getElementById(inputId).click();
        },
        // 富文本编辑器 点击插入图片或者视频上传并预览
        fileInsert (e) {
            var oFile = e.target.files[0];
            if (typeof (oFile) === 'undefined') {
                return;
            }
            let sExtensionName = oFile.name.substring(oFile.name.lastIndexOf('.') + 1).toLowerCase();   // 文件扩展名
            let sfileType = ''; // 上传文件类型
            if (e.target.id == 'insert_image') {
                sfileType = 'image'
                if (sExtensionName !== 'png' && sExtensionName !== 'jpg' && sExtensionName !== 'jpeg' && sExtensionName !== 'gif') {
                    this.toastOfDanger('上传失败', '不支持该类型图片');
                    return;
                }
            }
            if (e.target.id == 'insert_video') {
                sfileType = 'video';
                if (sExtensionName !== 'mp4' && sExtensionName !== 'avi' && sExtensionName !== 'mov') {
                    this.toastOfDanger('上传失败', '不支持该类型视频');
                    return;
                }
                let maxSize = 100*1024*1024;    // 100MB
                if (oFile.size > maxSize) {
                    this.toastOfDanger('上传失败', '上传视频大小不能超过100MB');
                    return;
                }
            }
            var reader = new FileReader();
            reader.readAsDataURL(oFile);
            reader.onloadend = () => {
                let formData = new FormData(); // 通过formdata上传
                formData.append('file', oFile);
                let sUrl = '';
                if (sfileType == 'image') {
                    sUrl = 'Pic';
                }
                if (sfileType == 'video') {
                    sUrl = 'Vie';
                }
                var url = this.api_config + '/dealerIndex/upload' + sUrl + '.htm';
                this.axios.post(url, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                    this.editor.insertEmbed(this.editor.selection.savedRange.index, sfileType, res.data.data);  // 这个方法用来手动插入dom到编辑器里
                    let isAndroid = this.$is_android(); // 判断是ios还是android
                    if (isAndroid) {
                        $('video').removeAttr('controls');
                        $('video').attr('x5-video-player-type', 'h5');
                    }
                    this.editor.setSelection(this.editor.selection.savedRange.index + 1);  // 这个方法可以获取光标位置
                }).catch((response) => {
                    console.log('失败', response);
                })
            }
        },
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    }
}
</script>

<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>