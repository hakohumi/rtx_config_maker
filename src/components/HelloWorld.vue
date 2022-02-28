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
            <button @click="current_tab_mode = 'all'">all</button>
            <button @click="current_tab_mode = 'ipv4'">ipv4</button>
            <button @click="current_tab_mode = 'ipv6'">ipv6</button>
            <button @click="current_tab_mode = 'dns'">dns</button>
            <button @click="current_tab_mode = 'dhcp'">dhcp</button>
            <button @click="current_tab_mode = 'nat'">nat</button>
            <button @click="current_tab_mode = 'other'">other</button>
            <button @click="current_tab_mode = 'filter_ipv4'">
              filter_ipv4
            </button>
            <button @click="current_tab_mode = 'filter_ipv6'">
              filter_ipv6
            </button>
          </div>

          <div class="editer-list">
            <li v-for="item in current_view_list" :key="item">
              <input type="text" :value="item" size="150" />
            </li>
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
import { Vue } from 'vue-class-component'

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

export default class HelloWorld extends Vue {
  private msg!: string
  private input1_config = ''
  private input2_config = ''
  private output_config = ''

  // TODO: editor部分は別のコンポーネントに分ける

  // current_tab_mode: TAB_MODE
  private current_view_list: string[] = ['']

  private list_all: string[] = ['a', 'l', 'l']
  private list_ipv4: string[] = ['ip', 'v4']
  private list_ipv6: string[] = ['']
  private list_dns: string[] = ['']
  private list_dhcp: string[] = ['']
  private list_nat: string[] = ['']
  private list_other: string[] = ['']
  private list_filter_ipv4: string[] = ['']
  private list_filter_ipv6: string[] = ['']

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
    let temp_string: string[] = []

    temp_string = this.input1_config.split('\n')

    temp_string = temp_string
      .filter((line) => line.slice(0, 1) != '#')
      .map((line) => {
        return line
      })

    // 先頭のコマンドごとに辞書に追加する感じ
    // TODO: コマンドごとに行を分類して、分けて表示する

    // TODO: 各コマンドごとに配列に格納する

    this.list_all = temp_string

    this.input2_config = temp_string.join('\n')

    console.log(this.list_all)
  }

  onClickSave() {
    // this.output_config = this.list_all.join('\n')
    this.output_config = String(this.current_tab_mode)
  }
}
</script>
