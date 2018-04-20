<template>
  <div>
    <h3>{{name}}</h3>
    <div>
      <input-text></input-text>
      <input-text
        title="标题"
        placeholder="填写车辆标题"
        :max-length="30"
        :required="true"
        v-model="rv.title"
        ></input-text>
        <input-text
          title="副标题"
          placeholder="填写副标题"
          :max-length="30"
          :min-length="2"
          :required="true"
          v-model="rv.sub_title"
          ></input-text>
          <input-text
            title="副标题"
            placeholder="填写副标题"
            :max-length="30"
            :min-length="2"
            :required="true"
            v-model="rv.sub_title2"
            ></input-text>
            <input-text
              title="副标题"
              placeholder="填写副标题"
              :max-length="30"
              :min-length="2"
              :required="true"
              v-model="rv.sub_title3"
              ></input-text>
              <input-text
                title="副标题"
                placeholder="填写副标题"
                :max-length="30"
                :min-length="2"
                :required="true"
                v-model="rv.sub_title4"
                ></input-text>
    </div>
  </div>
</template>
<script>
import { InputText } from '../components'

export default {
  components: {
    InputText
  },
  data () {
    return {
      name: 'Input Text',
      value1: false,
      rv: {
        title: '',
        sub_title: '',
        sub_title2: '',
        sub_title3: '',
        sub_title4: '',
        mp3: false,
        mp4: false
      }
    }
  }
}
</script>
