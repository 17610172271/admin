<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
    <input v-if="useCustomImageHandler" @change="emitImageInfo($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
  </div>
</template>

<script>
  require('quill/dist/quill.snow.css')
  require('quill/dist/quill.bubble.css')
  require('quill/dist/quill.core.css')
  if (!window.Quill) {
    window.Quill = require('quill/dist/quill.js')
  }
  import Quill from 'quill/dist/quill.js'
  export default {
    name: 'quill-editor',
    data: function () {
      return {
        _content: '',
        defaultModules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
          // toolbar: [
          // ['bold', 'italic', 'underline', { 'color': [] }],
          // [{'list': 'ordered'}, {'list': 'bullet'}, { 'align': [] }],
          // [{ 'size': ['small', false, 'large', 'huge'] }],
          // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          // ['image', 'video']
          // ]
        }
      }
    },
    props: {
      content: String,
      value: String,
      disabled: Boolean,
      options: {
        type: Object,
        required: false,
        default: function () {
          return {}
        }
      },
      useCustomImageHandler: {
        type: Boolean,
        default: false
      }
    },
    mounted: function () {
      this.initialize()
    },
    beforeDestroy: function () {
      this.quill = null
    },
    methods: {
      initialize: function () {
        if (this.$el) {
          // options and instance
          var self = this
          self.options.theme = self.options.theme || 'snow'
          self.options.boundary = self.options.boundary || document.body
          self.options.modules = self.options.modules || self.defaultModules
          self.options.modules.toolbar = self.options.modules.toolbar !== undefined ? self.options.modules.toolbar : self.defaultModules.toolbar
          self.options.placeholder = self.options.placeholder || ''
          self.options.readOnly = self.options.readOnly !== undefined ? self.options.readOnly : false
          self.quill = new Quill(self.$refs.editor, self.options)

          // set editor content
          if (self.value || self.content) {
            self.quill.pasteHTML(self.value || self.content)
          }

          // mark model as touched if editor lost focus
          self.quill.on('selection-change', (range) => {
            if (!range) {
              self.$emit('blur', self.quill)
            } else {
              self.$emit('focus', self.quill)
            }
          })

          // update model if text changes
          self.quill.on('text-change', (delta, oldDelta, source) => {
            var html = self.$refs.editor.children[0].innerHTML
            var text = self.quill.getText()
            if (html === '<p><br></p>') html = ''
            self._content = html
            self.$emit('input', self._content)
            self.$emit('change', {
              editor: self.quill,
              html: html,
              text: text
            })
          })

          // disabled
          if (this.disabled) {
            this.quill.enable(false)
          }

          // check custom image handler
          this.checkForCustomImageHandler()

          // emit ready
          self.$emit('ready', self.quill)
        }
      },

      checkForCustomImageHandler () {
        this.useCustomImageHandler === true ? this.setupCustomImageHandler() : ''
      },

      setupCustomImageHandler () {
        let toolbar = this.quill.getModule('toolbar')
        toolbar.addHandler('image', this.customImageHandler)
      },

      customImageHandler (image, callback) {
        this.$refs.fileInput.click()
      },

      emitImageInfo ($event) {
        let file = $event.target.files[0]
        let Editor = this.quill
        let range = Editor.getSelection()
        let cursorLocation = range.index
        this.$emit('imageAdded', file, Editor, cursorLocation)
      }
    },
    watch: {
      content: function (newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      value: function (newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      disabled: function (newVal, oldVal) {
        if (this.quill) {
          this.quill.enable(!newVal)
        }
      }
    }
  }
</script>
<style>
.quill-editor img {
    max-width: 100%;
  }
  .preview {
    margin:  10px auot;
    padding: 10px 10px;
    overflow-y: auto;
    border: 1px solid #eee;
    background: #fff;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "\6BB5\843D";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="h1"]::before, 
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="h1"]::before{
    font-size: 2.5em;
    content: "h1"
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="h2"]::before, 
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="h2"]::before{
    font-size: 2em;
    content: "h2"
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="h3"]::before, 
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="h3"]::before{
    font-size: 1.5em;
    content: "h3"
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="h4"]::before, 
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="h4"]::before{
    font-size: 1em;
    content: "h4"
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="h5"]::before, 
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="h5"]::before{
    font-size: .8em;
    content: "h5"
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="h6"]::before, 
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="h6"]::before{
    font-size: .6em;
    content: "h6"
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10"]::before, 
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10"]::before {
    font-size: 10px;
    content: "10"
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="xl"]::before, 
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="xl"]::before {
    font-size: 20px;
    content: "xl"
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label::before, 
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    font-size:  1em;
    content: "\4E2D";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before, 
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    font-size: .8em;
    content: "\5C0F";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before, 
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    font-size: 1.5em;
    content: "\5927";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before, 
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: "\8D85\5927";
    font-size: 2em;
  } 
</style>
