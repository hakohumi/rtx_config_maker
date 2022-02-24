<template>
  <h1>RTX Config Maker</h1>

  <div class="flex center">
    <div class="input">
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

    <div class="flex editer-frame">
      <div class="flex center">
        <!-- TODO: 後でボタンにする -->
        <button @click="current_tab_mode = 'all'">all</button>
        <button @click="current_tab_mode = 'ipv4'">ipv4</button>
        <button @click="current_tab_mode = 'ipv6'">ipv6</button>
        <button @click="current_tab_mode = 'dns'">dns</button>
        <button @click="current_tab_mode = 'dhcp'">dhcp</button>
        <button @click="current_tab_mode = 'nat'">nat</button>
        <button @click="current_tab_mode = 'other'">other</button>
        <button @click="current_tab_mode = 'filter_ipv4'">filter_ipv4</button>
        <button @click="current_tab_mode = 'filter_ipv6'">filter_ipv6</button>
      </div>

      <div class="editer-list">
        <li v-for="item in current_view_list" :key="item">
          <input type="text" :value="item" size="150" />
        </li>
      </div>
    </div>
  </div>
</template>

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
  msg!: string
  input1_config = ''
  input2_config = ''
  output_config = ''

  // TODO: editor部分は別のコンポーネントに分ける

  // current_tab_mode: TAB_MODE
  current_view_list: string[] = ['']

  list_all: string[] = ['a', 'l', 'l']
  list_ipv4: string[] = ['ip', 'v4']
  list_ipv6: string[] = ['']
  list_dns: string[] = ['']
  list_dhcp: string[] = ['']
  list_nat: string[] = ['']
  list_other: string[] = ['']
  list_filter_ipv4: string[] = ['']
  list_filter_ipv6: string[] = ['']

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

.center {
  width: 80%;
  margin: 0 auto;
  justify-content: space-around;
}

.input {
}

.editer-frame {
  flex-direction: column;
  height: 80vh;
}

.editer-list {
  overflow-y: scroll;
  height: 100%;
}

.lists {
}
.flex {
  display: flex;
}
</style>
