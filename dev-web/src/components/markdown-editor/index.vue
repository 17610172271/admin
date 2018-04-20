<template>
  <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
    <textarea id="mdeditor" name="content"></textarea>
  </div>
</template>
<script>

// https://github.com/sparksuite/simplemde-markdown-editor
import SimpleMDE from 'simplemde'

export default {
  props: {
    value: ''
  },
  data: () => ({
    _content: null,
    simplemde: '' // editor object
  }),
  created () {
    this.$nextTick(() => {
      this.initialize()
      this.setContent()
    })
  },
  methods: {
    initialize () {
      // init editor
      var simplemde = new SimpleMDE({
        element: document.getElementById('mdeditor'),
        spellChecker: false
      })
      this.simplemde = simplemde

      // watch editor change
      this.simplemde.codemirror.on('change', this.onEditorContentChange)

      this.$emit('ready', this.simplemde)
    },

    setContent () {
      return this.simplemde ? this.simplemde.value(this.value || '') : false
    },

    onEditorContentChange () {
      this._content = this.simplemde.value()
      this.$emit('input', this._content)
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (!!newVal && newVal !== this._content) {
        this.setContent()
      } else if (!newVal) {
        this.setContent()
      }
    }
  }
}
</script>
