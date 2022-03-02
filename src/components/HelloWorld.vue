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
          <button @click="set_current_view_list(list_all)">all</button>
          <button @click="set_current_view_list(list_ipv4)">ipv4</button>
          <button @click="set_current_view_list(list_ipv6)">ipv6</button>
          <button @click="set_current_view_list(list_dns)">dns</button>
          <button @click="set_current_view_list(list_dhcp)">dhcp</button>
          <button @click="set_current_view_list(list_nat)">nat</button>
          <button @click="set_current_view_list(list_filter_ipv4)">
            filter_ipv4
          </button>
          <button @click="set_current_view_list(list_filter_ipv6)">
            filter_ipv6
          </button>
          <button @click="set_current_view_list(list_other)">other</button>
        </div>

        <div class="editer-list">
          <draggable
            v-model="current_view_list"
            group="people"
            @start="drag = true"
            @end="drag = false"
          >
            <li
              v-for="item in current_view_list"
              :key="item.id"
              class="item flex-y"
            >
              <input type="text" :value="item.line" />
              <!-- <input type="text" :value="item.line" size="150" /> -->
            </li>
          </draggable>
        </div>
      </div>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  /* width: 100%; */
}
</style>
<script lang="ts">
/* eslint-disable no-unused-vars */
import { Component, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'

interface IndexList {
  id: number
  line: string
}

@Component({ components: { draggable } })
export default class HelloWorld extends Vue {
  private input1_config_str = ''
  private input2_config_str = ''
  private output_config_str = ''

  drag = false

  // TODO: editor部分は別のコンポーネントに分ける

  // エディタに表示させるコマンドが入っているリスト
  private current_view_list: IndexList[] = []

  // 編集中のリスト
  private list_all: IndexList[] = []

  // 知らないコマンドを把握しやすいようにリストごとにコマンドを分割する
  private list_ipv4: IndexList[] = []
  private list_ipv6: IndexList[] = []
  private list_dns: IndexList[] = []
  private list_dhcp: IndexList[] = []
  private list_nat: IndexList[] = []
  private list_filter_ipv4: IndexList[] = []
  private list_filter_ipv6: IndexList[] = []
  private list_other: IndexList[] = []

  private set_current_view_list(i_list: IndexList[]) {
    this.current_view_list = i_list
  }

  onClickRead() {
    let temp_string: IndexList[] = []

    temp_string = this.input1_config_str
      .split('\n')
      .filter((line) => line.slice(0, 1) != '#')
      .filter((line) => line.slice(0, 1) != '')
      .map((it, index) => {
        return { id: index, line: it }
      })

    // TODO: 各コマンドごとに配列に格納する

    this.list_all = temp_string
    this.set_current_view_list(temp_string)

    this.parseCommandToList(temp_string)

    this.input2_config_str = temp_string.map((it) => it.line).join('\n')
  }

  parseCommandToList(i_commandList: IndexList[]) {
    // TODO: 完全に各リストに分割する
    // TODO: filterかどうかの判別条件の簡略化

    let commandList: IndexList[] = [...i_commandList]

    // ipv4 だったら、v4リストに追加して、i_commandListから削除する
    commandList.forEach((it) => {
      if (it.line.slice(0, 3) == 'ip ') {
        console.log(`3,10 ${it.line.slice(3, 10)}`)
        if (it.line.slice(3, 10) != 'filter ') {
          this.list_ipv4.push(it)
        } else {
          this.list_filter_ipv4.push(it)
        }
      } else if (it.line.slice(0, 5) == 'ipv6 ') {
        if (it.line.slice(0, 5) == 'ipv6 ') {
          console.log(`5,12 ${it.line.slice(5, 12)}`)
          if (it.line.slice(5, 12) != 'filter ') {
            this.list_ipv6.push(it)
          } else {
            this.list_filter_ipv6.push(it)
          }
        }
      } else if (it.line.slice(0, 4) == 'dns ') {
        this.list_dns.push(it)
      } else if (it.line.slice(0, 5) == 'dhcp ') {
        this.list_dhcp.push(it)
      } else if (it.line.slice(0, 4) == 'nat ') {
        this.list_nat.push(it)
      } else {
        this.list_other.push(it)
      }
    })
  }

  onClickExport() {
    this.output_config_str = this.current_view_list
      .map((it) => it.line)
      .join('\n')
  }
}
</script>
