# Markdown Editor

## install simplemde

https://github.com/sparksuite/simplemde-markdown-editor

```
npm install simplemde --save
```

## Copy Folder

copy `src/components/markdown-editor` to your project


## Example

```vue
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
```
