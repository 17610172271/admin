<template>
  <div>
    <markdown-editor v-model="content"></markdown-editor>
  </div>
</template>

<script>
// import MarkdownEditor from '@/components/markdown-editor'
import { MarkdownEditor } from '@/components'

export default {
  components: {
    MarkdownEditor
  },
  data: () => ({
    content: null
  }),
  mounted () {
    this.$nextTick(() => {
      this.content = 'init data'
    })
  }
}
</script>
