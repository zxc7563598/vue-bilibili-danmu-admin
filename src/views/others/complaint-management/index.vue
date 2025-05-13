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
        <n-descriptions label-placement="left" :column="1">
          <n-descriptions-item>
            <template #label>
              <b>投诉标题</b>
            </template>
            {{ editItems.title }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label>
              <b>投诉内容</b>
            </template>
            <div class="whitespace-pre-wrap">
              {{ editItems.content }}
            </div>
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { MeCrud, MeModal, MeQueryItem } from '@/components'
import { useModal } from '@/composables'
import { NButton } from 'naive-ui'
import api from './api'

defineOptions({ name: 'OthersComplaintManagement' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  uid: '', // 用户UID
  uname: '', // 用户名称
})
const tableColumns = ref([
  { title: 'UID', key: 'uid', minWidth: 170 },
  { title: '名称', key: 'user_name', minWidth: 150 },
  { title: '投诉标题', key: 'title', minWidth: 150 },
  { title: '是否已读', key: 'read', minWidth: 80 },
  { title: '投诉时间', key: 'create_time', minWidth: 180 },
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
            onClick: () => checkComplaint(row),
          },
          {
            default: () => '查看',
            icon: () => h('i', { class: 'i-fe:search text-14' }),
          },
        ),
      ]
    },
  },
])

const editItems = ref({
  title: '',
  content: '',
})

// 查看投诉弹窗
const [$modalRef] = useModal()
function checkComplaint(item) {
  editItems.value = {
    title: '',
    content: '',
  }
  api.details(item.complaint_id).then(({ data = [] }) => {
    editItems.value = { ...editItems.value, ...data.complaint }
  })
  $modalRef.value?.open({
    showCancel: false,
    title: '查看投诉',
    okText: '关闭',
    async onOk() {
      $table.value.handleSearch()
    },
  })
}

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
