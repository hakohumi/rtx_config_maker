<script setup lang="ts">
import { Ref, ref } from 'vue'
import { CommandHolder } from './CommandHolder'
import { IndexList } from './IndexList'

let input1_config_str = ref('')
let input2_config_str = ref('')
let output_config_str = ref('')

const props = defineProps<{
  commandHolder: CommandHolder
  current_view_list: IndexList[]
}>()

const parseCommandToList = (i_commandList: IndexList[]) => {
  // TODO: ここのコマンドを実装する http://www.rtpro.yamaha.co.jp/RT/docs/console/syntax.html
  if (props.commandHolder == undefined) {
    throw Error('not init commandHolder')
  }
  const commandList: IndexList[] = [...i_commandList]

  // ipv4 だったら、v4リストに追加して、i_commandListから削除する
  let it: IndexList | undefined
  while ((it = commandList.shift()) !== undefined) {
    if (it.line.slice(0, 3) == 'ip ') {
      console.log(`3,10 ${it.line.slice(3, 10)}`)
      if (it.line.slice(3, 10) != 'filter ') {
        props.commandHolder.list_ipv4.value.push(it)
      } else {
        props.commandHolder.list_filter_ipv4.value.push(it)
      }
    } else if (it.line.slice(0, 5) == 'ipv6 ') {
      if (it.line.slice(0, 5) == 'ipv6 ') {
        console.log(`5,12 ${it.line.slice(5, 12)}`)
        if (it.line.slice(5, 12) != 'filter ') {
          props.commandHolder.list_ipv6.value.push(it)
        } else {
          props.commandHolder.list_filter_ipv6.value.push(it)
        }
      }
    } else if (it.line.slice(0, 4) == 'dns ') {
      props.commandHolder.list_dns.value.push(it)
    } else if (it.line.slice(0, 5) == 'dhcp ') {
      props.commandHolder.list_dhcp.value.push(it)
    } else if (it.line.slice(0, 4) == 'nat ') {
      props.commandHolder.list_nat.value.push(it)
    } else if (it.line.slice(0, 'pp select '.length) == 'pp select ') {
      props.commandHolder.list_pp.value.push(it)

      while (commandList?.[0].line.slice(0, 1) == ' ') {
        const command: IndexList | undefined = commandList.shift()
        if (command == undefined) {
          break
        }

        props.commandHolder.list_pp.value.push(command)
      }
    } else if (it.line.slice(0, 3) == 'pp ' || it.line.slice(0, 4) == ' pp ') {
      props.commandHolder.list_pp.value.push(it)
    } else if (it.line.slice(0, 'ipsec '.length) == 'ipsec ') {
      props.commandHolder.list_ipsec.value.push(it)
    } else if (it.line.slice(0, 'tunnel '.length) == 'tunnel ') {
      props.commandHolder.list_tunnel.value.push(it)
    } else {
      props.commandHolder.list_other.value.push(it)
    }
  }
}

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

  // TODO: 各コマンドごとに配列に格納する

  props.commandHolder.list_all.value = temp_string

  // TODO: 読み込みボタンが押された時のイベントを親側へ渡す必要がある
  //   props.current_view_list = temp_string

  parseCommandToList(temp_string)

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
  <div id="frame-input" class="flex-y flex-align-stretch">
    <div class="flex-y-stretch">
      <p>入力1</p>
      <textarea v-model="input1_config_str"></textarea>
      <button @click="onClickRead">読み込み</button>
    </div>

    <div class="flex-y-stretch">
      <p>コメント行除去</p>
      <textarea v-model="input2_config_str"></textarea>
    </div>

    <div class="flex-y-stretch">
      <p>出力</p>

      <button @click="onClickExport">エディタの設定値を出力</button>

      <textarea v-model="output_config_str"></textarea>
    </div>
  </div>
</template>

<style scoped>

#frame-input {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}

.flex-y-stretch {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 0;
  align-items: stretch;
}
</style>
