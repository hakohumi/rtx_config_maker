import { ref } from 'vue'
import { IndexList } from './IndexList'

export class CommandHolder {
  // 編集中のリスト
  list_all = ref<IndexList[]>([])

  // 知らないコマンドを把握しやすいようにリストごとにコマンドを分割する
  list_ipv4 = ref<IndexList[]>([])
  list_ipv6 = ref<IndexList[]>([])
  list_dns = ref<IndexList[]>([])
  list_dhcp = ref<IndexList[]>([])
  list_nat = ref<IndexList[]>([])
  list_filter_ipv4 = ref<IndexList[]>([])
  list_filter_ipv6 = ref<IndexList[]>([])
  list_pp = ref<IndexList[]>([])
  list_ipsec = ref<IndexList[]>([])
  list_tunnel = ref<IndexList[]>([])
  list_other = ref<IndexList[]>([])

  parseCommandToList = (i_commandList: IndexList[]) => {
    // TODO: ここのコマンドを実装する http://www.rtpro.yamaha.co.jp/RT/docs/console/syntax.html

    const commandList: IndexList[] = [...i_commandList]

    // ipv4 だったら、v4リストに追加して、i_commandListから削除する
    let it: IndexList | undefined
    while ((it = commandList.shift()) !== undefined) {
      if (it.line.slice(0, 3) == 'ip ') {
        console.log(`3,10 ${it.line.slice(3, 10)}`)
        if (it.line.slice(3, 10) != 'filter ') {
          this.list_ipv4.value.push(it)
        } else {
          this.list_filter_ipv4.value.push(it)
        }
      } else if (it.line.slice(0, 5) == 'ipv6 ') {
        if (it.line.slice(0, 5) == 'ipv6 ') {
          console.log(`5,12 ${it.line.slice(5, 12)}`)
          if (it.line.slice(5, 12) != 'filter ') {
            this.list_ipv6.value.push(it)
          } else {
            this.list_filter_ipv6.value.push(it)
          }
        }
      } else if (it.line.slice(0, 4) == 'dns ') {
        this.list_dns.value.push(it)
      } else if (it.line.slice(0, 5) == 'dhcp ') {
        this.list_dhcp.value.push(it)
      } else if (it.line.slice(0, 4) == 'nat ') {
        this.list_nat.value.push(it)
      } else if (it.line.slice(0, 'pp select '.length) == 'pp select ') {
        this.list_pp.value.push(it)

        while (commandList?.[0].line.slice(0, 1) == ' ') {
          const command: IndexList | undefined = commandList.shift()
          if (command == undefined) {
            break
          }

          this.list_pp.value.push(command)
        }
      } else if (
        it.line.slice(0, 3) == 'pp ' ||
        it.line.slice(0, 4) == ' pp '
      ) {
        this.list_pp.value.push(it)
      } else if (it.line.slice(0, 'ipsec '.length) == 'ipsec ') {
        this.list_ipsec.value.push(it)
      } else if (it.line.slice(0, 'tunnel '.length) == 'tunnel ') {
        this.list_tunnel.value.push(it)
      } else {
        this.list_other.value.push(it)
      }
    }
  }
}
