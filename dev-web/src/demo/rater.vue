<template>
  <div>
    <h3>Rater</h3>
    <div class="">
      <p>
        评分:
        <rater
          count="5"
          v-model="comment.rater"
          default="1"
          >
        </rater>
      </p>
    </div>
  </div>
</template>
<script>
import { Rater } from '../components'

export default {
  components: {
    Rater
  },
  data () {
    return {
      comment: {
        rater: 2
      }
    }
  }
}
</script>
