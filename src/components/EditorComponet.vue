<script setup lang="ts">
import { ref } from 'vue'
import { CommandHolder } from './CommandHolder'
import { IndexList } from './IndexList'
import draggable from 'vuedraggable'

let drag = ref(false)

const props = defineProps<{
  commandHolder: CommandHolder
  current_view_list: IndexList[]
}>()

const emit = defineEmits<{
  (e: 'setList', value: IndexList[]): void
}>()

const setList = (value: IndexList[]) => {
  emit('setList', value)
}
</script>

<template>
  <div id="frame-editor">
    <div id="category-list" class="flex-x-wrap center-block">
      <button @click="setList(commandHolder.list_all.value)">all</button>
      <button @click="setList(commandHolder.list_ipv6.value)">ipv6</button>
      <button @click="setList(props.commandHolder.list_ipv4.value)">
        ipv4
      </button>
      <button @click="setList(props.commandHolder.list_dns.value)">dns</button>
      <button @click="setList(props.commandHolder.list_dhcp.value)">
        dhcp
      </button>
      <button @click="setList(props.commandHolder.list_nat.value)">nat</button>
      <button @click="setList(props.commandHolder.list_filter_ipv4.value)">
        filter_ipv4
      </button>
      <button @click="setList(props.commandHolder.list_filter_ipv6.value)">
        filter_ipv6
      </button>
      <button @click="setList(props.commandHolder.list_pp.value)">pp</button>
      <button @click="setList(props.commandHolder.list_ipsec.value)">
        ipsec
      </button>
      <button @click="setList(props.commandHolder.list_tunnel.value)">
        tunnel
      </button>
      <button @click="setList(props.commandHolder.list_other.value)">
        other
      </button>
    </div>

    <div class="editer-list">
      <draggable
        v-model="props.current_view_list"
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
</template>

<style scoped>
#frame-editor {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  /* overflow-x: scroll; */
}
#category-list {
  display: flex;
  flex-flow: row wrap;
}
.flex-y {
  display: flex;
  flex-flow: column nowrap;
}

.flex-x-wrap {
  display: flex;
  flex-flow: row wrap;
}
.flex-x-nowrap {
  display: flex;
  flex-flow: row nowrap;
}
.center {
  text-align: center;
}

.flex-align-center {
  align-items: center;
}

.center-block {
  justify-content: flex-start;
}

.editer-list {
  overflow-y: scroll;
}
</style>
