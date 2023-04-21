<template>
  <textarea
    class="textarea bg-white"
    :style="textareaStyle"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput($event)"
  />
</template>

<script setup lang="ts">
import { nextTick, ref, StyleValue } from 'vue'

const props = withDefaults(
  defineProps<{
    placeholder: string
    value: string
  }>(),
  { placeholder: '', value: '' }
)

const textareaHeight = ref(1000) // デフォルト値いれとく。minHeightといっしょでよい。borderあるのでちょっとずれる
const textareaStyle = () => {
  // 動的にtextareaのheightをいじれるようにしている
  return { height: `${textareaHeight}px` } as StyleValue
}

const emits = defineEmits<{ (e: 'input', value: any): void }>()

const handleInput = async (event: any) => {
  // 入力されるたびによばれる。anyなのはゆるして。。。
  emits('input', event.target.value) // これは親に伝えるためだけ。

  textareaHeight.value = 0 // ミソ。一旦textareaのheightを0にしちゃう

  await nextTick() // さらにミソ。ここで待たないとDOMの更新前に下のコードが走って変な挙動になる

  // heightが0になった瞬間textareaはminHeight: 100になる
  // 入力済み文字列の高さが100を超えたら、scrollHeightが必要な分だけ大きくなる = それをheightにしちゃえばOK！
  textareaHeight.value = event.target.scrollHeight
  console.log(`${event.target.scrollHeight}`)
}
</script>

<style scoped>
.textarea-container {
  width: 100%;
}
.textarea {
  width: 100%;
  min-height: 2em;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 5px 12px;
}
.placeholder {
  color: #d9d9d9;
}
</style>
<!-- // ここはお好み。変えるならdata()の値も変えるとよいよ -->
