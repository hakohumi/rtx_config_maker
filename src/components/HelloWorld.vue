<template>
  <div class="root">
    <header>
      <h1>RTX Config Maker</h1>
    </header>
    <main>
      <div class="flex center">
        <div id="frame-input">
          <div>
            <p>入力1</p>
            <textarea v-model="input1_config" cols="100" rows="10"></textarea>
          </div>

          <button @click="onClickRead">読み込み</button>
          <button @click="onClickSave">保存</button>

          <div>
            <p>コメント行除去</p>
            <textarea v-model="input2_config" cols="100" rows="10"></textarea>
          </div>

          <p>出力</p>
          <textarea v-model="output_config" cols="100" rows="10"></textarea>
        </div>

        <div id="frame-editor" class="flex-x">
          <div class="flex center-block">
            <button @click="set_current_view_list(list_all)">all</button>
            <button @click="set_current_view_list(list_ipv4)">ipv4</button>
            <button @click="set_current_view_list(list_ipv6)">ipv6</button>
            <button @click="set_current_view_list(list_dns)">dns</button>
            <button @click="set_current_view_list(list_dhcp)">dhcp</button>
            <button @click="set_current_view_list(list_nat)">nat</button>
            <button @click="set_current_view_list(list_other)">other</button>
            <button @click="set_current_view_list(list_filter_ipv4)">
              filter_ipv4
            </button>
            <button @click="set_current_view_list(list_filter_ipv6)">
              filter_ipv6
            </button>
          </div>

          <div class="editer-list">
            <li v-for="item in current_view_list" :key="item.id" class="item">
              <div>
                {{ item.id }}
                <input type="text" :value="item.line" size="150" />
              </div>
            </li>

            <draggable
              v-model="current_view_list"
              group="people"
              @start="drag = true"
              @end="drag = false"
            >
              <li v-for="item in current_view_list" :key="item.id">
                {{ item.line }}
              </li>
            </draggable>
          </div>
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
  margin: 0;
}
main {
  /* background-color: #e1edff; */
  display: flex;
  flex-flow: column wrap;
  padding: 0 2%;
}

.center {
  text-align: center;
}

.center-block {
  width: 80%;
  margin: 0 auto;
  justify-content: space-around;
}

#frame-input {
  flex-basis: 30%;
}

#frame-editor {
  flex-basis: auto;
  overflow-x: scroll;
}

.flex-x {
  flex-direction: column;
}

.editer-list {
  overflow-y: scroll;
  height: 80vh;
  /* width: 100%; */
}

.lists {
}

.flex {
  display: flex;
}
</style>
<script lang="ts">
/* eslint-disable no-unused-vars */
// import { Vue } from 'vue-class-component'
import { Component, Prop, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'

type TAB_MODE =
  | 'all'
  | 'ipv4'
  | 'ipv6'
  | 'dns'
  | 'dhcp'
  | 'nat'
  | 'other'
  | 'filter_ipv4'
  | 'filter_ipv6'

interface IndexList {
  id: number
  line: string
}

@Component({ components: { draggable } })
export default class HelloWorld extends Vue {
  input1_config = ''
  private input2_config = ''
  private output_config: IndexList[] = []

  drag = false

  // TODO: editor部分は別のコンポーネントに分ける

  // current_tab_mode: TAB_MODE
  private current_view_list: IndexList[] = []

  private list_all: IndexList[] = []
  private list_ipv4: IndexList[] = [{ id: 1, line: 'test' }]
  private list_ipv6: IndexList[] = []
  private list_dns: IndexList[] = []
  private list_dhcp: IndexList[] = []
  private list_nat: IndexList[] = []
  private list_other: IndexList[] = []
  private list_filter_ipv4: IndexList[] = []
  private list_filter_ipv6: IndexList[] = []

  private set_current_view_list(i_list: IndexList[]) {
    this.current_view_list = i_list
  }

  private get current_tab_mode() {
    return this.current_tab_mode
  }
  private set current_tab_mode(mode: TAB_MODE) {
    switch (mode) {
      case 'all':
        this.current_view_list = this.list_all
        break
      case 'ipv4':
        this.current_view_list = this.list_ipv4
        break
      case 'ipv6':
        this.current_view_list = this.list_ipv6
        break
      case 'dns':
        this.current_view_list = this.list_dns
        break
      case 'dhcp':
        this.current_view_list = this.list_dhcp
        break
      case 'nat':
        this.current_view_list = this.list_nat
        break
      case 'other':
        this.current_view_list = this.list_other
        break
      case 'filter_ipv4':
        this.current_view_list = this.list_filter_ipv4
        break
      case 'filter_ipv6':
        this.current_view_list = this.list_filter_ipv6
        break
    }
  }

  onClickRead() {
    let temp_string: IndexList[] = []

    // #がついている行を除外したい

    temp_string = this.input1_config
      .split('\n')
      .filter((line) => line.slice(0, 1) != '#')
      .map((it, index) => {
        return { id: index, line: it }
      })

    // 先頭のコマンドごとに辞書に追加する感じ
    // TODO: コマンドごとに行を分類して、分けて表示する

    // TODO: 各コマンドごとに配列に格納する

    this.list_all = temp_string

    this.input2_config = temp_string.map((it) => it.line).join('\n')

    console.log(this.list_all)
  }

  onClickSave() {
    // this.output_config = this.list_all.join('\n')
    // this.output_config = String(this.current_tab_mode)
  }
}
</script>
