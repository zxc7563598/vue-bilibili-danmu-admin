<template>
  <CommonPage>
    <MeCrud ref="$table" v-model:query-items="queryItems" :columns="tableColumns" :get-data="api.read">
      <MeQueryItem label="UID" :label-width="70">
        <n-input v-model:value="queryItems.uid" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="用户名称" :label-width="70">
        <n-input v-model:value="queryItems.uname" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="赠送时间" :label-width="70">
        <n-date-picker
          v-model:value="queryItems.create_date" type="datetimerange" clearable
          :default-time="['00:00:00', '00:00:00']"
        />
      </MeQueryItem>
    </MeCrud>
  </CommonPage>
</template>

<script setup>
import { MeCrud, MeQueryItem } from '@/components'
import api from './api'

defineOptions({ name: 'OthersGiftInfo' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  uid: '', // 用户UID
  uname: '', // 用户名称
  create_date: ref(null), // 赠送时间
})
const tableColumns = ref([
  { title: 'UID', key: 'uid', minWidth: 170 },
  { title: '名称', key: 'uname', minWidth: 150 },
  { title: '礼物名称', key: 'gift_name', minWidth: 120 },
  { title: '赠送数量', key: 'num', minWidth: 80 },
  { title: '礼物单价', key: 'price', minWidth: 80 },
  { title: '礼物总价', key: 'total_price', minWidth: 120 },
  { title: '赠送时间', key: 'create_time', minWidth: 180 },
])

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
