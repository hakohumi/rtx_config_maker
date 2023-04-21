<script setup lang="ts">
import { ref } from 'vue'
import { CommandHolder } from './CommandHolder'
import { IndexList } from './IndexList'
import AutoResizeTextarea from './AutoResizeTextarea.vue/AutoResizeTextarea.vue'

let input1_config_str = ref('')
let input2_config_str = ref('')
let output_config_str = ref('')

const props = defineProps<{
  commandHolder: CommandHolder
  current_view_list: IndexList[]
}>()

const onClickRead = () => {
  console.log('読み込みボタンが押されました。')
  if (props.commandHolder == undefined) {
    throw Error('not init commandHolder')
  }
  let temp_string: IndexList[] = []

  temp_string = input1_config_str.value
    .split('\n')
    .filter((line) => line.slice(0, 1) != '#')
    .filter((line) => line.slice(0, 1) != '')
    .map((it, index) => {
      return { id: index, line: it }
    })

  props.commandHolder.list_all.value = temp_string

  // TODO: 読み込みボタンが押された時のイベントを親側へ渡す必要がある
  //   props.current_view_list = temp_string
  if (props.commandHolder == undefined) {
    throw Error('not init commandHolder')
  }
  props.commandHolder.parseCommandToList(temp_string)

  input2_config_str.value = temp_string.map((it) => it.line).join('\n')
  console.log(`input2_config_str = ${input2_config_str}`)
}

const onClickExport = () => {
  output_config_str.value = props.current_view_list
    .map((it) => it.line)
    .join('\n')
}
</script>

<template>
  <div class="flex-y-nowrap">
    <div class="flex-y-nowrap flex-align-center">
      <p>入力1</p>
      <textarea v-model="input1_config_str"></textarea>
      <AutoResizeTextarea :value="input1_config_str"> </AutoResizeTextarea>
      <button @click="onClickRead">読み込み</button>
    </div>

    <div class="flex-y-nowrap flex-align-center">
      <p>コメント行除去</p>
      <textarea v-model="input2_config_str"></textarea>
    </div>

    <div class="flex-y-nowrap flex-align-center">
      <p>出力</p>

      <button @click="onClickExport">エディタの設定値を出力</button>

      <textarea v-model="output_config_str"></textarea>
    </div>
  </div>
</template>

<style scoped>
.flex-y-nowrap {
  display: flex;
  flex-flow: column nowrap;
}

.flex-grow-0 {
  flex-grow: 0;
}
.flex-grow-1 {
  flex-grow: 1;
}
.flex-align-stretch {
  align-items: stretch;
}
.flex-align-center {
  align-items: center;
}
</style>
