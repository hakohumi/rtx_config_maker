<template>
  <h1>RTX Config Maker</h1>

  <div class="flex center">
    <div class="input">
      <div>
        <p>入力1</p>
        <textarea v-model="input1_config" cols="100" rows="10"></textarea>
      </div>

      <button v-on:click="onClick">読み込み</button>
      <button v-on:click="onClickSave">保存</button>

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
        <p>all</p>
        <p>ipv4</p>
        <p>ipv6</p>
        <p>dns</p>
        <p>dhcp</p>
      </div>

      <div class="editer-list">
        <li v-for="item in list" :key="item">
          <input type="text" :value="item" size="150" />
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class HelloWorld extends Vue {
  msg!: string
  input1_config: string = ''
  input2_config: string = ''
  output_config: string = ''
  is_click: boolean = false

  list: string[] = []

  onClick() {
    let temp_string: string[]

    temp_string = this.input1_config.split('\n')

    temp_string = temp_string
      .filter((line) => line.slice(0, 1) != '#')
      .map((line) => {
        // コマンド1行加工

        // 1行ずつ
        // 先頭のコマンドごとに辞書に追加する感じ
        // TODO: コマンドごとに行を分類して、分けて表示する

        return line
      })

    this.list = temp_string

    this.input2_config = temp_string.join('\n')

    console.log(this.list)
  }

  onClickSave() {
    this.output_config = this.list.join('\n')
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
