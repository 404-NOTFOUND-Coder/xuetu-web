<template>
  <div class="edit_container">
    <quill-editor
      style="margin-left: 120px"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'editItem',
  components: {
    quillEditor
  },
  data () {
    return {
      inputValue: '',
      content: '',
      str: '',
      // 选择编辑范围
      editorOption: {}
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    const content = '' // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content)
  },
  methods: {
    // 失去焦点事件
    onEditorBlur () {
    },
    // 获得焦点事件
    onEditorFocus () {
    },
    // 内容改变事件
    onEditorChange () {
      this.$emit('message', this.content)
    },
    // 转码
    escapeStringHTML (str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    }
  }
}
</script>
<style>
  .ql-editor{
    height: 150px;
  }
.ql-toolbar.ql-snow span {
  float: left;
  height: 32px;
}
.ql-toolbar.ql-snow .ql-picker-label {
  margin-top: -16px;
}
.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
  margin-top: 7px;
}
.ql-snow .ql-picker-options .ql-picker-item {
margin-left: 5px;
}
.ql-formats .ql-expanded .ql-picker-options{
  height: 163px;
}
.ql-snow .ql-picker.ql-font {
  margin-left: -23px;
}
.ql-snow .ql-color-picker, .ql-snow .ql-icon-picker {
  margin-left: -9px;
}
.ql-snow .ql-formats:nth-child(13){
  margin-left: -7px;
}
.ql-snow .ql-formats:nth-child(2){
  margin-left: -11px;
}
.ql-snow .ql-formats:nth-child(2) .ql-code-block{
  margin-right: 12px;
}
.ql-snow .ql-formats:nth-child(10) .ql-background .ql-picker-label{
  margin-left: 8px;
}
.ql-snow .ql-tooltip {
  z-index: 100;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
  border-color: rgba(204,236,227,0);
}
.ql-snow .ql-picker.ql-size {
  margin-left: -26px;
}
.ql-formats .ql-header{
  margin-left: -31px;
}
.ql-formats .ql-header .ql-picker-options{
  height: 245px;
}
.ql-header .ql-picker-options .ql-picker-item{
  margin-left: 29px;
}

</style>
