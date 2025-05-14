<template>
  <CommonPage>
    <MeCrud ref="$table" v-model:query-items="queryItems" :columns="tableColumns" :get-data="api.read">
      <MeQueryItem label="UID" :label-width="70">
        <n-input v-model:value="queryItems.uid" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="用户名称" :label-width="70">
        <n-input v-model:value="queryItems.uname" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="发送时间" :label-width="70">
        <n-date-picker
          v-model:value="queryItems.send_date" type="datetimerange" clearable
          :default-time="['00:00:00', '00:00:00']"
        />
      </MeQueryItem>
    </MeCrud>
  </CommonPage>
</template>

<script setup>
import { MeCrud, MeQueryItem } from '@/components'
import { NTag } from 'naive-ui'
import api from './api'

defineOptions({ name: 'OthersGiftInfo' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  uid: '', // 用户UID
  uname: '', // 用户名称
  send_date: ref(null), // 发送时间
})
const levelColor = {
  0: '',
  1: '#FFD700',
  2: '#8A2BE2',
  3: '#4A90E2',
}
const tableColumns = ref([
  { title: 'UID', key: 'uid', minWidth: 170 },
  { title: '名称', key: 'uname', minWidth: 150 },
  {
    title: '牌子',
    key: 'badge_room_id',
    minWidth: 120,
    render(row) {
      return row.badge_room_id
        ? h(
            NTag,
            {
              size: 'small',
              color: {
                borderColor: levelColor[String(row.badge_type)],
                textColor: levelColor[String(row.badge_type)],
              },
              onClick: () => goToLive(row.badge_room_id),
            },
            {
              default: () => row.badge_name,
              icon: () => Number(row.badge_type) > 0 ? [h('i', { class: 'i-fe:anchor text-14' }), h('i', { class: `i-fe:tabler-number-${row.badge_level}-small text-14` })] : h('i', { class: `i-fe:tabler-number-${row.badge_level}-small text-14` }),
            },
          )
        : ''
    },
  },
  { title: '弹幕信息', key: 'msg', minWidth: 120 },
  { title: '发送时间', key: 'send_time', minWidth: 180 },
])

function goToLive(room_id) {
  window.open(`https://live.bilibili.com/${room_id}`, '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
