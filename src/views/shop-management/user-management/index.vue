<template>
  <CommonPage>
    <template #action>
      <NButton
        v-permission="'ShopManagementUserManagementReset'" class="ml-auto" type="warning" :loading="resetPasswordLoading"
        @click="resetPassword"
      >
        <i class="i-material-symbols:add mr-4 text-18" />
        重置全部用户密码
      </NButton>
      <NButton v-permission="'ShopManagementUserManagementAdd'" class="ml-5" type="primary" @click="handleAdd">
        <i class="i-material-symbols:add mr-4 text-18" />
        添加用户
      </NButton>
    </template>

    <MeCrud ref="$table" v-model:query-items="queryItems" :scroll-x="700" :columns="tableColumns" :get-data="api.read">
      <MeQueryItem label="UID" :label-width="70">
        <n-input v-model:value="queryItems.uid" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="名称" :label-width="70">
        <n-input v-model:value="queryItems.uname" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="$checkUser">
      <n-card :bordered="false" size="small">
        <n-form
          :model="editItems" :rules="editItemsRules" label-placement="left" label-width="auto"
          require-mark-placement="right-hanging" size="small"
        >
          <n-form-item label="用户UID" path="uid">
            <n-input-group>
              <n-input v-model:value="editItems.uid" :allow-input="onlyAllowNumber" placeholder="用户UID" />
              <NButton type="primary" ghost :loading="getUserInfoLoading" @click="getUserInfo">
                搜索用户
              </NButton>
            </n-input-group>
          </n-form-item>
          <n-form-item label="用户名称" path="name">
            <n-input v-model:value="editItems.name" type="text" placeholder="可通过UID自动查询" />
          </n-form-item>
          <n-form-item label="登录密码" path="password">
            <n-input v-model:value="editItems.password" type="text" placeholder="不输入则不会变更" />
          </n-form-item>
          <n-form-item label="航海类型" path="vip_type">
            <n-radio-group v-model:value="editItems.vip_type" name="editItems-vip_type">
              <n-radio-button value="0">
                潜在老头
              </n-radio-button>
              <n-radio-button value="1">
                舰长
              </n-radio-button>
              <n-radio-button value="2">
                提督
              </n-radio-button>
              <n-radio-button value="3">
                总督
              </n-radio-button>
            </n-radio-group>
          </n-form-item>
        </n-form>
      </n-card>
    </MeModal>

    <MeModal ref="$checkUserPoint">
      <n-card :bordered="false" size="small">
        <NButton
          v-permission="'ShopManagementUserManagementEditPoint'" strong secondary type="primary" class="mb-12 w-100%"
          @click="openSetPointModal"
        >
          点击添加变更记录
        </NButton>
        <n-data-table :columns="pointTableColumns" :data="pointTableData" :bordered="false" />
      </n-card>
    </MeModal>

    <MeModal ref="$setUserPoint">
      <n-card :bordered="false" size="small">
        <n-form
          :model="editUserPoint" :rules="editUserPointRules" label-placement="left" label-width="auto"
          require-mark-placement="right-hanging" size="small"
        >
          <n-form-item label="变更类型" path="type">
            <n-radio-group v-model:value="editUserPoint.type" name="editUserPoint-type">
              <n-radio-button value="0">
                增加
              </n-radio-button>
              <n-radio-button value="1">
                减少
              </n-radio-button>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="变更积分" path="point">
            <n-input v-model:value="editUserPoint.point" :allow-input="onlyAllowNumber" placeholder="变更数量，增加或减少多少" />
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
import { NButton, NImage, useDialog } from 'naive-ui'
import api from './api'

defineOptions({ name: 'ShopManagementUserManagement' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  uid: '',
  uname: '',
})
const tableColumns = ref([
  { title: 'UID', key: 'uid', minWidth: 170 },
  { title: '名称', key: 'name', minWidth: 150 },
  { title: '积分', key: 'point', minWidth: 80 },
  { title: '类型', key: 'vip_type', minWidth: 80 },
  { title: '开启时间', key: 'last_vip_at', minWidth: 180 },
  { title: '到期时间', key: 'end_vip_at', minWidth: 180 },
  {
    title: '操作',
    key: 'actions',
    align: 'right',
    fixed: 'right',
    minWidth: 220,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => checkUser(row),
          },
          {
            default: () => '编辑',
            icon: () => h('i', { class: 'i-fe:edit text-14' }),
          },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            class: 'ml-5',
            secondary: true,
            onClick: () => checkUserPoint(row),
          },
          {
            default: () => '变更积分',
            icon: () => h('i', { class: 'i-fe:dollar-sign text-14' }),
          },
        ),
      ]
    },
  },
])

// 积分变更列表
const pointTableData = ref([])
const pointTableColumns = ref([
  {
    title: '操作类型',
    key: 'name',
    minWidth: 150,
    render(row) {
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      }, [
        h(NImage, {
          src: row.icon,
          width: 40,
          height: 40,
          objectFit: 'cover',
          previewDisabled: false, // true 表示不允许放大预览
          style: {
            borderRadius: '5px',
          },
        }),
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            height: '100%', // 占满容器高度
            marginLeft: '5px',
          },
        }, row.name),
      ])
    },
  },
  { title: '变更积分', key: 'point', minWidth: 120 },
  { title: '变更后积分', key: 'after_point', minWidth: 80 },
  { title: '变更时间', key: 'date', minWidth: 120 },
])

// 编辑信息
const editItemsRules = ref({})
const editItems = ref({
  user_id: 0, // 用户ID
  uid: '', // 用户UID
  name: '', // 用户名称
  password: '', // 登录密码
  vip_type: '', // 航海类型
})

// 列表编辑按钮弹窗
const [$checkUser] = useModal()
function checkUser(item = {}) {
  editItems.value = {
    user_id: 0, // 用户ID
    uid: '', // 用户UID
    name: '', // 用户名称
    password: '', // 登录密码
    vip_type: '', // 航海类型
  }
  api.details(item.user_id).then(({ data = [] }) => {
    editItems.value = { ...editItems.value, ...data.users }
    editItems.value.vip_type = String(editItems.value.vip_type)
  })
  $checkUser.value?.open({
    showCancel: true,
    title: '编辑用户',
    cancelText: '关闭',
    okText: '存储',
    async onOk() {
      if (!hasPermission('ShopManagementUserManagementEdit')) {
        $message.error('您没有权限变更用户信息')
        return false
      }
      await setData()
      $table.value.handleSearch()
    },
  })
}

// 列表新增按钮
function handleAdd() {
  editItems.value = {
    user_id: 0, // 用户ID
    uid: '', // 用户UID
    name: '', // 用户名称
    password: '', // 登录密码
    vip_type: '', // 航海类型
  }
  $checkUser.value?.open({
    showCancel: true,
    title: '添加用户',
    cancelText: '关闭',
    okText: '存储',
    async onOk() {
      if (!hasPermission('ShopManagementUserManagementAdd')) {
        $message.error('您没有权限添加用户')
        return false
      }
      await setData()
      $table.value.handleSearch()
    },
  })
}

// 存储用户信息
async function setData() {
  $checkUser.value.okLoading = true
  try {
    await api.setData(
      editItems.value.user_id,
      editItems.value.uid,
      editItems.value.name,
      editItems.value.password,
      editItems.value.vip_type,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('存储失败', err)
  }
  finally {
    $checkUser.value.okLoading = false
  }
}

// 根据UID获取用户名称
const getUserInfoLoading = ref(false)
async function getUserInfo() {
  getUserInfoLoading.value = true
  try {
    const { data = [] } = await api.getUserInfo(editItems.value.uid)
    if (data.uname) {
      editItems.value.name = data.uname
    }
    else {
      $message.warning('未获取到用户信息，请确认 UID 是否正确')
    }
  }
  catch (err) {
    console.error('存储失败', err)
    $message.error('获取用户信息失败')
  }
  finally {
    getUserInfoLoading.value = false
  }
}

// 重置所有用户密码
const dialog = useDialog()
const resetPasswordLoading = ref(false)
async function resetPassword() {
  dialog.warning({
    title: '警告',
    content: '此操作会重置所有用户的密码，你确定这么做吗？',
    positiveText: '确定',
    negativeText: '不确定',
    draggable: true,
    onPositiveClick: () => {
      $message.warning('请稍后，现在你后悔也晚了')
      resetPasswordLoading.value = true
      api.resetPassword().then(() => {
        resetPasswordLoading.value = false
        $message.success('所有用户密码均已清空')
      })
    },
  })
}

// 查看用户积分变更列表
const [$checkUserPoint] = useModal()
const editUserPointUserId = ref(0)
function checkUserPoint(item = {}) {
  api.getUserRecords(item.user_id).then(({ data = [] }) => {
    pointTableData.value = data.records
    editUserPointUserId.value = item.user_id
  })
  $checkUserPoint.value?.open({
    showCancel: false,
    title: '积分变更记录',
    okText: '关闭',
  })
}

// 点击添加变更记录弹窗
const [$setUserPoint] = useModal()
const editUserPointRules = ref({})
const editUserPoint = ref({
  user_id: '', // 用户id
  type: '0', // 类型
  point: '', // 积分
})
function openSetPointModal() {
  editUserPoint.value = {
    user_id: editUserPointUserId.value, // 用户id
    type: '0', // 类型
    point: '', // 积分
  }
  $setUserPoint.value?.open({
    showCancel: true,
    title: '变更积分',
    cancelText: '关闭',
    okText: '保存',
    async onOk() {
      if (!hasPermission('ShopManagementUserManagementEditPoint')) {
        $message.error('您没有权限变更用户积分')
        return false
      }
      await setUserPoint()
      await api.getUserRecords(editUserPointUserId.value).then(({ data = [] }) => {
        pointTableData.value = data.records
      })
    },
  })
}

// 变更用户积分信息
async function setUserPoint() {
  $setUserPoint.value.okLoading = true
  try {
    await api.setUserPoint(
      Number(editUserPoint.value.type),
      editUserPoint.value.point,
      editUserPoint.value.user_id,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('存储失败', err)
  }
  finally {
    $setUserPoint.value.okLoading = false
  }
}

// 只允许输入数字
function onlyAllowNumber(value) {
  return !value || /^\d+$/.test(value)
}

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
