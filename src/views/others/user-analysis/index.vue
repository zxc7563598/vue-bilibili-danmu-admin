<template>
  <CommonPage>
    <MeCrud ref="$table" v-model:query-items="queryItems" :columns="tableColumns" :get-data="api.read">
      <MeQueryItem label="UID" :label-width="70">
        <n-input v-model:value="queryItems.uid" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="用户名称" :label-width="70">
        <n-input v-model:value="queryItems.uname" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="$modalRef">
      <n-card :bordered="false" size="small">
        <n-calendar
          v-model:value="calendarValue" #="{ year, month, date }" :on-panel-change="panelChange"
          class="mb-20"
        >
          {{ year }}-{{ month }}-{{ date }}
          <div v-if="monthData[date] && Number(currentMonth) === Number(month)">
            <n-tag class="mb-5 w-100%" size="small" :type="monthData[date].live ? 'success' : 'error'">
              {{ monthData[date].live ? '已开播' : '未开播' }}
            </n-tag>
            <n-tag
              v-if="monthData[date].total_gift_amount > 0" class="mb-5 w-100%"
              :color="{ color: '#EAF6FB', borderColor: '#A4D2E6', textColor: '#1792C4' }" size="small"
            >
              <template #icon>
                <i class="i-fe:hand-money-yuan text-8" />
              </template>
              {{ monthData[date].total_gift_amount }}
            </n-tag>
            <n-tag
              v-if="monthData[date].total_danmu_count > 0" class="mb-5 w-100%"
              :color="{ color: '#F3F4F6', borderColor: '#D1D5DB', textColor: '#4B5563' }" size="small"
            >
              <template #icon>
                <i class="i-fe:chat-round-like-outline text-8" />
              </template>
              {{ monthData[date].total_danmu_count }}
            </n-tag>
          </div>
        </n-calendar>
      </n-card>
    </MeModal>

    <MeModal ref="$wordCloudFromTextRef">
      <n-card :bordered="false" size="small">
        <div class="h-450 w-700">
          <WordCloud
            :words="wordList" :width="700" :height="450" font-family="Arial" :font-sizes="[12, 60]"
            color="random-dark" background-color="#fff"
          />
        </div>
      </n-card>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { MeCrud, MeModal, MeQueryItem } from '@/components'
import { useModal } from '@/composables'
import { NButton } from 'naive-ui'
import WordCloud from 'vue3-word-cloud'
import api from './api'

defineOptions({ name: 'OthersGiftInfo' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  uid: '', // 用户UID
  uname: '', // 用户名称
})
const uid = ref(0)
const monthData = ref([])
const currentMonth = ref(0)

const tableColumns = ref([
  { title: 'UID', key: 'uid', minWidth: 170 },
  { title: '名称', key: 'name', minWidth: 150 },
  { title: '积分', key: 'point', minWidth: 120 },
  { title: '累计赠送金额', key: 'total_gift_amount', minWidth: 120 },
  { title: '累计发送弹幕', key: 'total_danmu_count', minWidth: 120 },
  {
    title: '操作',
    key: 'actions',
    align: 'right',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleViewDailyActive(row),
          },
          {
            default: () => '每日分析',
            icon: () => h('i', { class: 'i-fe:search text-14' }),
          },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            class: 'ml-5',
            onClick: () => generateWordCloudFromText(row),
          },
          {
            default: () => '词频分析',
            icon: () => h('i', { class: 'i-fe:search text-14' }),
          },
        ),
      ]
    },
  },
])

// 处理每月分析弹窗
const calendarValue = ref()
const [$modalRef] = useModal()
async function handleViewDailyActive(item) {
  uid.value = item.uid
  await dailyActive(uid.value, 0, 0)
  $modalRef.value?.open({
    showFooter: false,
    title: `用户：${item.name}`,
  })
}

async function panelChange(info) {
  await dailyActive(uid.value, info.year, info.month)
}

async function dailyActive(uid, year, month) {
  monthData.value = []
  currentMonth.value = 0
  try {
    const { data = [] } = await api.dailyActive(uid.value, year, month)
    monthData.value = data.data
    currentMonth.value = data.month
  }
  catch (err) {
    console.error('获取每月分析数据失败', err)
  }
}

// 处理词频分析弹窗
const [$wordCloudFromTextRef] = useModal()
const wordList = ref([])
async function generateWordCloudFromText(item) {
  uid.value = item.uid
  wordList.value = []
  try {
    const { data = [] } = await api.getWordCloudFromText(uid.value)
    wordList.value = data.text
  }
  catch (err) {
    console.error('获取用户弹幕词频失败', err)
  }
  $wordCloudFromTextRef.value?.open({
    showFooter: false,
    title: `用户：${item.name}`,
  })
}

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
