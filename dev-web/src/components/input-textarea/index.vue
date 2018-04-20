<template>
  <div class="wfc-text-area">
    <textarea name="name" :rows="rows" ref="textarea1"></textarea>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      rv: {
        description: ''
      }
    }
  }
}
</script>
<style lang="scss">
$wfc-text-area-max-width: 580px;

.wfc-text-area {
  max-width: $wfc-text-area-max-width;
  color: rgba(46, 62, 76, 1);
  width: 100%;
  border: 1px solid #F8F8F8;
  background: #F8F8F8;
  border-radius: 4px;
  transition: .2s ease;

  font-family: 'PingFangSC-Medium';
  font-size: 14px;
  line-height: 20px;
  color: #2E3E4C;

  textarea {
    width: 100%;
    padding: 8px 10px;
    margin: 0 0;
    border: 1px solid #F8F8F8;
    background: #F8F8F8;
    resize:none;
  }
}
</style>
