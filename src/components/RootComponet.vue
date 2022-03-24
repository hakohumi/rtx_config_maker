<script setup lang="ts">
import { ref } from 'vue'
import InputComponet from './InputComponet.vue'
import { IndexList } from './IndexList'
import { CommandHolder } from './CommandHolder'
import EditorComponet from './EditorComponet.vue'

// TODO: editor部分は別のコンポーネントに分ける

// エディタに表示させるコマンドが入っているリスト
const current_view_list = ref<IndexList[]>([])

const commandHolder = new CommandHolder()

const setList = (list: IndexList[]) => {
  current_view_list.value = list
}
</script>

<template>
  <div class="root">
    <header>
      <h1>RTX Config Maker</h1>
    </header>
    <main class="flex-x-nowrap center">
      <InputComponet
        :command-holder="commandHolder"
        :current_view_list="current_view_list"
      ></InputComponet>

      <EditorComponet
        :command-holder="commandHolder"
        :current_view_list="current_view_list"
        @set-list="setList"
      ></EditorComponet>
    </main>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.root {
  height: 100vh;
  width: 100vw;
  margin: 10px;
}

main {
  /* background-color: #e1edff; */
  display: flex;
  flex-flow: column nowrap;
  padding: 0 2%;
}

.flex-x-nowrap {
  display: flex;
  flex-flow: row nowrap;
}

.center {
  text-align: center;
}


</style>
