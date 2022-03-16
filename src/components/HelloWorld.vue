<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

interface IndexList {
  id: number
  line: string
}

let input1_config_str = ref('')
let input2_config_str = ref('')
let output_config_str = ref('')
let drag = ref(false)

// TODO: editor部分は別のコンポーネントに分ける

// エディタに表示させるコマンドが入っているリスト
const current_view_list = ref<IndexList[]>([])

// 編集中のリスト
let list_all = ref<IndexList[]>([])

// 知らないコマンドを把握しやすいようにリストごとにコマンドを分割する
let list_ipv4 = ref<IndexList[]>([])
let list_ipv6 = ref<IndexList[]>([])
let list_dns = ref<IndexList[]>([])
let list_dhcp = ref<IndexList[]>([])
let list_nat = ref<IndexList[]>([])
let list_filter_ipv4 = ref<IndexList[]>([])
let list_filter_ipv6 = ref<IndexList[]>([])
let list_pp = ref<IndexList[]>([])
let list_ipsec = ref<IndexList[]>([])
let list_tunnel = ref<IndexList[]>([])
let list_other = ref<IndexList[]>([])

const setList = (list: IndexList[]) => {
  current_view_list.value = list
}

const onClickRead = () => {
  console.log('読み込みボタンが押されました。')
  let temp_string: IndexList[] = []

  temp_string = input1_config_str.value
    .split('\n')
    .filter((line) => line.slice(0, 1) != '#')
    .filter((line) => line.slice(0, 1) != '')
    .map((it, index) => {
      return { id: index, line: it }
    })

  // TODO: 各コマンドごとに配列に格納する

  list_all.value = temp_string
  current_view_list.value = temp_string

  parseCommandToList(temp_string)

  input2_config_str.value = temp_string.map((it) => it.line).join('\n')
  console.log(`input2_config_str = ${input2_config_str}`)
}

const parseCommandToList = (i_commandList: IndexList[]) => {
  // TODO: ここのコマンドを実装する http://www.rtpro.yamaha.co.jp/RT/docs/console/syntax.html

  const commandList: IndexList[] = [...i_commandList]

  // ipv4 だったら、v4リストに追加して、i_commandListから削除する
  let it: IndexList | undefined
  while ((it = commandList.shift()) !== undefined) {
    if (it.line.slice(0, 3) == 'ip ') {
      console.log(`3,10 ${it.line.slice(3, 10)}`)
      if (it.line.slice(3, 10) != 'filter ') {
        list_ipv4.value.push(it)
      } else {
        list_filter_ipv4.value.push(it)
      }
    } else if (it.line.slice(0, 5) == 'ipv6 ') {
      if (it.line.slice(0, 5) == 'ipv6 ') {
        console.log(`5,12 ${it.line.slice(5, 12)}`)
        if (it.line.slice(5, 12) != 'filter ') {
          list_ipv6.value.push(it)
        } else {
          list_filter_ipv6.value.push(it)
        }
      }
    } else if (it.line.slice(0, 4) == 'dns ') {
      list_dns.value.push(it)
    } else if (it.line.slice(0, 5) == 'dhcp ') {
      list_dhcp.value.push(it)
    } else if (it.line.slice(0, 4) == 'nat ') {
      list_nat.value.push(it)
    } else if (it.line.slice(0, 'pp select '.length) == 'pp select ') {
      list_pp.value.push(it)

      while (commandList?.[0].line.slice(0, 1) == ' ') {
        const command: IndexList | undefined = commandList.shift()
        if (command == undefined) {
          break
        }

        list_pp.value.push(command)
      }
    } else if (it.line.slice(0, 3) == 'pp ' || it.line.slice(0, 4) == ' pp ') {
      list_pp.value.push(it)
    } else if (it.line.slice(0, 'ipsec '.length) == 'ipsec ') {
      list_ipsec.value.push(it)
    } else if (it.line.slice(0, 'tunnel '.length) == 'tunnel ') {
      list_tunnel.value.push(it)
    } else {
      list_other.value.push(it)
    }
  }
}

const onClickExport = () => {
  output_config_str.value = current_view_list.value
    .map((it) => it.line)
    .join('\n')
}
</script>

<template>
  <div class="root">
    <header>
      <h1>RTX Config Maker</h1>
    </header>
    <main class="flex-x center">
      <div id="frame-input" class="flex-y filex-align-stretch">
        <div class="flex-y flex-grow-0 filex-align-center">
          <p>入力1</p>
          <!-- <textarea v-model="input1_config_str" cols="90" rows="10"></textarea> -->
          <textarea v-model="input1_config_str"></textarea>
          <button @click="onClickRead">読み込み</button>
        </div>

        <div class="flex-y flex-grow-0 filex-align-center">
          <p>コメント行除去</p>
          <!-- <textarea v-model="input2_config_str" cols="90" rows="10"></textarea> -->
          <textarea v-model="input2_config_str"></textarea>
        </div>

        <div class="flex-y flex-grow-0 filex-align-center">
          <p>出力</p>

          <button @click="onClickExport">エディタの設定値を出力</button>

          <!-- <textarea v-model="output_config_str" cols="90" rows="10"></textarea> -->
          <textarea v-model="output_config_str"></textarea>
        </div>
      </div>

      <div id="frame-editor" class="flex-y filex-align-stretch">
        <div class="flex-x center-block flex">
          <button @click="setList(list_all)">all</button>
          <button @click="setList(list_ipv4)">ipv4</button>
          <button @click="setList(list_ipv6)">ipv6</button>
          <button @click="setList(list_dns)">dns</button>
          <button @click="setList(list_dhcp)">dhcp</button>
          <button @click="setList(list_nat)">nat</button>
          <button @click="setList(list_filter_ipv4)">filter_ipv4</button>
          <button @click="setList(list_filter_ipv6)">filter_ipv6</button>
          <button @click="setList(list_pp)">pp</button>
          <button @click="setList(list_ipsec)">ipsec</button>
          <button @click="setList(list_tunnel)">tunnel</button>
          <button @click="setList(list_other)">other</button>
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
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  overflow-x: scroll;
}

.center {
  text-align: center;
}

.center-block {
  justify-content: flex-start;
}

.flex-grow-0 {
  flex-grow: 0;
}
.filex-align-center {
  align-items: center;
}
.filex-align-stretch {
  align-items: stretch;
}

.flex > button {
  flex-grow: 1;
}

.flex-x {
  display: flex;
  flex-flow: row nowrap;
}
.flex-y {
  display: flex;
  flex-flow: column nowrap;
}

.editer-list {
  overflow-y: scroll;
  height: 80vh;
}
</style>
