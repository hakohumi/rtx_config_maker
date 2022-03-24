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
}
