<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import InputComponet from './InputComponet.vue'
import { IndexList } from './IndexList'
import { CommandHolder } from './CommandHolder'

let drag = ref(false)

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
    <main class="flex-x center">
      <InputComponet
        :command-holder="commandHolder"
        :current_view_list="current_view_list"
      ></InputComponet>

      <div id="frame-editor">
        <div class="flex-x center-block flex">
          <button @click="setList(commandHolder.list_all.value)">all</button>
          <button @click="setList(commandHolder.list_ipv4.value)">ipv4</button>
          <button @click="setList(commandHolder.list_ipv6.value)">ipv6</button>
          <button @click="setList(commandHolder.list_dns.value)">dns</button>
          <button @click="setList(commandHolder.list_dhcp.value)">dhcp</button>
          <button @click="setList(commandHolder.list_nat.value)">nat</button>
          <button @click="setList(commandHolder.list_filter_ipv4.value)">
            filter_ipv4
          </button>
          <button @click="setList(commandHolder.list_filter_ipv6.value)">
            filter_ipv6
          </button>
          <button @click="setList(commandHolder.list_pp.value)">pp</button>
          <button @click="setList(commandHolder.list_ipsec.value)">
            ipsec
          </button>
          <button @click="setList(commandHolder.list_tunnel.value)">
            tunnel
          </button>
          <button @click="setList(commandHolder.list_other.value)">
            other
          </button>
        </div>

        <div class="editer-list">
          <draggable
            v-model="current_view_list"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <li class="item flex-y">
                <input type="text" :value="element.line" />
                <!-- <input type="text" :value="item.line" size="150" /> -->
              </li>
            </template>
          </draggable>
        </div>
      </div>
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

#frame-input {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}

#frame-editor {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  overflow-x: scroll;
}
#category-list {
  display: flex;
  flex-flow: row wrap;
}
.flex-y {
  display: flex;
  flex-flow: column nowrap;
}
.flex-x-nowrap {
  display: flex;
  flex-flow: row nowrap;
}
.center {
  text-align: center;
}

.center-block {
  justify-content: flex-start;
}

.flex-align-center {
  align-items: center;
}

.flex > button {
  flex-grow: 1;
}

.editer-list {
  overflow-y: scroll;
  height: 80vh;
}
</style>
