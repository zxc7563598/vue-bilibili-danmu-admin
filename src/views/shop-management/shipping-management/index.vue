<template>
  <CommonPage>
    <MeCrud ref="$table" v-model:query-items="queryItems" :scroll-x="700" :columns="tableColumns" :get-data="api.read">
      <MeQueryItem label="UID" :label-width="70">
        <n-input v-model:value="queryItems.user_uid" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="用户名称" :label-width="70">
        <n-input v-model:value="queryItems.user_name" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="商品名称" :label-width="70">
        <n-input v-model:value="queryItems.goods_name" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="商品类型" :label-width="70">
        <n-select
          v-model:value="queryItems.goods_type" clearable placeholder="请选择" :options="[
            { label: '虚拟商品', value: 0 },
            { label: '实体商品', value: 1 },
            { label: '供品', value: 2 },
          ]"
        />
      </MeQueryItem>
      <MeQueryItem label="发货状态" :label-width="70">
        <n-select
          v-model:value="queryItems.status" clearable placeholder="请选择" :options="[
            { label: '未发货', value: 0 },
            { label: '已发货', value: 1 },
          ]"
        />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="$checkDetails">
      <n-card :bordered="false" size="small">
        <div class="mb-20 flex">
          <n-card class="w-50%" title="商品信息">
            <n-image width="100%" :src="editItems.goods.cover_image" />
            <n-descriptions label-placement="left" :column="1" class="mt-20">
              <n-descriptions-item>
                <template #label>
                  <b>{{ editItems.goods.type }}</b>
                </template>
                {{ editItems.goods.name }}
              </n-descriptions-item>
              <n-descriptions-item>
                <template #label>
                  <b>商品规格</b>
                </template>
                {{ editItems.goods.subs }}
              </n-descriptions-item>
            </n-descriptions>
          </n-card>
          <n-card class="ml-12 w-50%" title="发货信息">
            <n-descriptions label-placement="left" :column="1" title="发货信息">
              <n-descriptions-item>
                <template #label>
                  <b>收货人</b>
                </template>
                {{ editItems.shipping_name }}
              </n-descriptions-item>
              <n-descriptions-item>
                <template #label>
                  <b>手机号</b>
                </template>
                {{ editItems.shipping_phone }}
              </n-descriptions-item>
              <n-descriptions-item>
                <template #label>
                  <b>收货地址</b>
                </template>
                {{ editItems.shipping_address }}
              </n-descriptions-item>
            </n-descriptions>
            <NButton strong secondary type="primary" class="mt-12 w-100%" @click="copyAddress">
              复制地址
            </NButton>
            <n-descriptions label-placement="left" :column="1" class="mt-20" title="邮箱信息">
              <n-descriptions-item>
                <template #label>
                  <b>邮箱</b>
                </template>
                {{ editItems.shipping_email }}
              </n-descriptions-item>
            </n-descriptions>
            <NButton strong secondary type="primary" class="mt-12 w-100%" @click="sendEmail">
              发送邮件
            </NButton>
          </n-card>
        </div>
        <n-form
          ref="editItemsRef" :model="editItems" :rules="editItemsRules" label-placement="left" label-width="auto"
          require-mark-placement="right-hanging" size="small"
        >
          <n-form-item label="快递单号" path="tracking_number">
            <n-input v-model:value="editItems.tracking_number" type="text" placeholder="如果不存在可不进行输入" />
            <template #feedback>
              <p>如有快递单号，建议填写，便于后续核对</p>
            </template>
          </n-form-item>
          <n-form-item label="发货状态" path="status" class="mt-20">
            <n-radio-group v-model:value="editItems.status" name="editItems-status">
              <n-radio-button value="0">
                未发货
              </n-radio-button>
              <n-radio-button value="1">
                已发货
              </n-radio-button>
            </n-radio-group>
            <template #feedback>
              <p>建议如实填写，避免漏发或重复发货</p>
            </template>
          </n-form-item>
        </n-form>
      </n-card>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { MeCrud, MeModal, MeQueryItem } from '@/components'
import { useModal } from '@/composables'
import { hasPermission } from '@/directives'
import { NButton } from 'naive-ui'
import api from './api'

defineOptions({ name: 'ShopManagementShippingManagement' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  user_name: '', // 用户名称
  user_uid: '', // 用户UID
  goods_name: '', // 商品名称
  goods_type: null, // 商品类型
  status: null, // 发货状态
})
const tableColumns = ref([
  { title: 'UID', key: 'uid', minWidth: 170 },
  { title: '兑换人', key: 'user_name', minWidth: 150 },
  {
    title: '兑换商品',
    key: 'goods_name',
    minWidth: 250,
    render(row) {
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'left',
          flexDirection: 'column',
        },
      }, [
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'left',
          },
        }, row.goods_name),
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'left',
          },
        }, row.goods_sub),
      ])
    },
  },
  { title: '支付', key: 'amount', minWidth: 100, render(row) {
    return [
      h('span', row.point),
      h('span', row.amount_type),
    ]
  } },
  { title: '发货状态', key: 'status', minWidth: 80 },
  { title: '下单时间', key: 'create_time', minWidth: 180 },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    fixed: 'right',
    minWidth: 100,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => checkDetails(row),
          },
          {
            default: () => '编辑',
            icon: () => h('i', { class: 'i-fe:edit text-14' }),
          },
        ),
      ]
    },
  },
])

// 编辑信息
const editItemsRef = ref(null)
const editItemsRules = ref({
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('请选择发货状态')
      }
      return true
    },
  },
})
const editItems = ref({
  records_id: '',
  goods: {
    name: '',
    cover_image: '',
    subs: '',
    type: '',
  },
  user: {
    uid: '',
    name: '',
  },
  shipping_email: '',
  shipping_address: '',
  shipping_name: '',
  shipping_phone: '',
  tracking_number: '',
  status: '',
})

// 列表编辑按钮弹窗
const [$checkDetails] = useModal()
function checkDetails(item = {}) {
  editItems.value = {
    records_id: '',
    goods: {
      name: '',
      cover_image: '',
      subs: '',
      type: '',
    },
    user: {
      uid: '',
      name: '',
    },
    shipping_email: '',
    shipping_address: '',
    shipping_name: '',
    shipping_phone: '',
    tracking_number: '',
    status: '',
  }
  api.details(item.records_id).then(({ data = [] }) => {
    editItems.value = { ...editItems.value, ...data }
    editItems.value.status = String(editItems.value.status)
  })
  $checkDetails.value?.open({
    showCancel: true,
    title: '发货信息',
    cancelText: '关闭',
    okText: '存储',
    async onOk() {
      if (!hasPermission('ShopManagementShippingManagementEdit')) {
        $message.error('您没有权限变更发货信息')
        return false
      }
      await editItemsRef.value?.validate((errors) => {
        if (errors) {
          errors.forEach((_errors) => {
            _errors.forEach((item) => {
              $message.error(item.message)
            })
          })
          return false
        }
      })
      await setData()
      $table.value.handleSearch()
    },
  })
}

// 存储用户信息
async function setData() {
  $checkDetails.value.okLoading = true
  try {
    await api.setData(
      editItems.value.records_id,
      editItems.value.tracking_number,
      editItems.value.status,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('保存失败', err)
    console.error('存储失败', err)
  }
  finally {
    $checkDetails.value.okLoading = false
  }
}

// 发送邮件
function sendEmail() {
  if (editItems.value.shipping_email) {
    window.location.href = `mailto:${editItems.value.shipping_email}`
  }
}

// 复制发货地址
function copyAddress() {
  const text = `${editItems.value.shipping_phone}\r\n${editItems.value.shipping_name}\r\n${editItems.value.shipping_address}`
  // 优先使用 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      $message.success('复制成功')
    }).catch((err) => {
      console.error('Clipboard API failed, trying execCommand...', err)
      fallbackCopyText(text)
    })
  }
  else {
    // 如果 Clipboard API 不可用，使用 execCommand 作为回退
    fallbackCopyText(text)
  }
}

// 复制文本
function fallbackCopyText(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed' // 防止在某些浏览器中页面滚动
  textArea.style.opacity = 0
  document.body.appendChild(textArea)
  textArea.select()
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      $message.success('复制成功')
    }
    else {
      $message.warning('复制失败，请手动复制')
    }
  }
  catch (err) {
    console.error('复制失败', err)
    $message.error('复制失败，请手动复制')
  }
  document.body.removeChild(textArea)
}

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
