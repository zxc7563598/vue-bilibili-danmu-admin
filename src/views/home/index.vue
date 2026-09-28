<template>
  <AppPage show-footer>
    <div class="flex">
      <!-- 左侧欢迎模块（保留不变） -->
      <n-card class="min-w-200 w-30%">
        <div class="flex items-center">
          <NAvatar round :size="60" :src="userStore.avatar" class="flex-shrink-0" />
          <div class="ml-20 flex-col">
            <span class="text-20 opacity-80">
              Hello, {{ userStore.nickName ?? userStore.username }}
            </span>
            <span class="mt-4 opacity-50">当前角色：{{ userStore.currentRole?.name }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-60">
          一个人几乎可以在任何他怀有无限热忱的事情上成功。
        </p>
        <p class="mt-12 text-right text-12 opacity-40">
          —— 查尔斯·史考伯（我也不知道他说没说过）
        </p>
      </n-card>
      <!-- 右侧欢迎说明模块 -->
      <n-card class="ml-12 w-70%" title="🎉 欢迎使用哔哩哔哩直播机器人">
        <template #header-extra>
          <a
            class="text-14 text-primary text-highlight hover:underline hover:opacity-80" href="https://hejunjie.life"
            target="_blank"
          >
            hejunjie.life
          </a>
        </template>

        <p class="opacity-60">
          这是一个集成了弹幕监控、礼物答谢、定时广告、关注感谢、自动回复、PK播报等功能的积分商城型直播机器人。
        </p>
        <p class="mt-2 opacity-60">
          完全出于个人兴趣开发，开源免费，欢迎反馈建议，有空我都会乐于沟通。如果你愿意给我点个 Star 或请我喝杯咖啡就更感激了。
        </p>
        <footer class="mt-12 flex items-center justify-end">
          <NButton
            type="primary" tertiary tag="a" href="https://github.com/zxc7563598/php-bilibili-danmu"
            target="__blank"
          >
            <template #icon>
              <i class="i-fe:github mr-5 text-12" />
            </template>
            前往 GitHub 给作者点 Star
          </NButton>
          <NButton type="primary" ghost class="ml-12" tag="a" href="https://hejunjie.life" target="__blank">
            <template #icon>
              <i class="i-fe:link mr-5 text-12" />
            </template>
            前往作者个人网站
          </NButton>
          <NButton type="primary" class="ml-12" tag="a" href="mailto:junjie.he.925@gmail.com" target="__blank">
            <template #icon>
              <i class="i-fe:mail mr-5 text-12" />
            </template>
            直接给作者发送邮件
          </NButton>
        </footer>
      </n-card>
    </div>
    <n-card class="mt-12" title="🚀 新版机器人已发布，推荐试用">
      <p class="opacity-60">
        新版本是本地免部署版（bilibili-live-assistant）：跑在自己电脑上，下载安装包双击即可运行，无需服务器、无需环境、无需写代码，所有数据都保存在本地。
      </p>
      <p class="mt-2 opacity-60">
        你当前使用的 <b>{{ version.version }}</b> 仍会持续维护与更新，不会被放弃，可以放心继续使用。
      </p>
      <p class="mt-2 opacity-60">
        想迁移到新版本的话，可以先把当前数据导出保存，新版本支持导入本系统的用户/礼物/弹幕信息。
      </p>
      <div v-if="exportVisible" class="mt-16 rounded-8 p-16 card-border">
        <div class="flex items-start justify-between text-14">
          <span class="opacity-60">{{ exportStatusText }}</span>
          <span v-if="exportState.status === 'finished'" class="ml-12 shrink-0 text-right opacity-40">
            {{ exportState.filename }}
          </span>
        </div>
        <n-progress class="mt-8" type="line" :percentage="exportPercent" :height="10" :border-radius="5" :status="exportProgressStatus" />
        <p v-if="exportTableDetail && exportPercent < 100" class="mt-6 text-12 opacity-40">
          {{ exportTableDetail }}
        </p>
        <div v-if="exportState.status === 'finished'" class="mt-12 flex justify-end">
          <NButton type="primary" @click="handleExportDownload">
            <template #icon>
              <i class="i-fe:download mr-5 text-12" />
            </template>
            下载导出文件
          </NButton>
        </div>
      </div>
      <footer class="mt-12 flex items-center justify-end">
        <NButton type="primary" ghost tag="a" href="https://hejunjie.life/danmusuite/local" target="__blank">
          <template #icon>
            <i class="i-fe:globe mr-5 text-12" />
          </template>
          前往新版本官网
        </NButton>
        <NButton class="ml-12" type="primary" :loading="exportBusy" @click="handleExportData">
          <template #icon>
            <i class="i-fe:database mr-5 text-12" />
          </template>
          {{ exportButtonText }}
        </NButton>
      </footer>
    </n-card>
    <div class="mt-12 flex">
      <n-card title="💡 功能特性（可在控制页面中配置）" class="w-50%">
        <ul class="text-14 leading-loose opacity-80">
          <li class="py-2">
            🎁 <b>积分商城：</b> 用户可通过签到或开通大航海获得积分，兑换虚拟或实体奖品。
          </li>
          <li class="py-2">
            📌 <b>直播签到：</b> 支持累计和连续签到，积分自动发放。
          </li>
          <li class="py-2">
            ⚔️ <b>PK播报：</b> 自动播报对手数据，支持内容自定义。
          </li>
          <li class="py-2">
            🙏 <b>礼物答谢：</b> 支持个性化答谢内容与金额门槛设置。
          </li>
          <li class="py-2">
            ⏰ <b>定时广告：</b> 可配置多条广告文案自动轮播推送。
          </li>
          <li class="py-2">
            👋 <b>进房欢迎：</b> 欢迎语随机展示，增强互动感。
          </li>
          <li class="py-2">
            ❤️ <b>感谢关注 / 分享：</b> 自动感谢并随机话术回复。
          </li>
          <li class="py-2">
            💬 <b>自动回复：</b> 弹幕触发关键词自动回复，多套方案切换。
          </li>
          <li class="py-2">
            🚫 <b>自动禁言：</b> 违规内容自动禁言，支持电池礼物解禁机制。
          </li>
        </ul>
      </n-card>
      <n-card title="📌 使用建议与说明" class="ml-12 w-50%">
        <ul class="text-14 leading-loose opacity-80">
          <li class="py-2">
            🔗 一切功能的基础都源自于机器人，请先前往「机器人控制」页面，登陆并链接直播间
          </li>
          <li class="py-2">
            ⚠️ 机器人通常建议使用独立账号登陆，尽量避免使用正在使用的账号，以免使用过程中触发 B 站刷新登录凭证导致机器人登录失效
          </li>
          <li class="py-2">
            🛠️ 强烈建议先配置「商城配置」：设置直播间链接、主题色、积分发放规则等。
          </li>
          <li class="py-2">
            📧 开启邮件通知功能，可在下播时接收当日数据统计，便于对账。
          </li>
          <li class="py-2">
            🌐 默认部署于阿里云香港节点，相较大陆稍慢但影响极小，请合理压缩上传图片以加快页面加载。
          </li>
          <li class="py-2">
            🧑‍💻 若多人协作使用后台，可在「系统管理 - 用户管理」添加账号并通过角色系统控制权限。
          </li>
          <li class="py-2">
            🚨 请勿赋予普通角色「系统管理」权限，否则可能导致其可自行修改权限配置。
          </li>
        </ul>
      </n-card>
    </div>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import { lStorage } from '@/utils'
import { NAvatar, NButton, NDescriptions, NDescriptionsItem, NText, useNotification } from 'naive-ui'
import version from '../../version.json'
import api from './api'

const userStore = useUserStore()
const notification = useNotification()

function handleNotification(logs) {
  notification.create({
    title: logs.title,
    description: logs.description,
    content: logs.content,
    meta: logs.meta,
    action: () => h(
      NButton,
      {
        text: true,
        type: 'primary',
        onClick: () => {
          api.downloadSourceCode(logs.version).then(({ data }) => {
            window.open(data.url, '_blank', 'noopener,noreferrer')
          })
        },
      },
      {
        default: () => '下载源码',
      },
    ),
    avatar: () => h(NAvatar, {
      size: 'small',
      round: true,
      src: `${import.meta.env.VITE_PUBLIC_PATH}/avatar.jpg`,
    }),
    onAfterLeave: () => {
      api.readUpdateLogs(logs.id)
    },
  })
}

function handleVersion(new_version) {
  notification.create({
    content: () => [
      h(
        NDescriptions,
        { title: '版本信息', column: 1, labelPlacement: 'left', size: 'small', bordered: false, class: 'mb-8' },
        {
          default: () => [
            h(
              NDescriptionsItem,
              { label: '您当前的版本为' },
              { default: () => version.version },
            ),
            h(
              NDescriptionsItem,
              { label: '当前最新的版本为' },
              { default: () => new_version },
            ),
          ],
        },
      ),
      version.version !== new_version
        ? h(
            NText,
            { type: 'error' },
            { default: () => '您当前并非最新版本，建议进行更新' },
          )
        : h(
            NText,
            { type: 'success' },
            { default: () => '恭喜，您当前为最新版本' },
          ),
    ],
  })
}

function getUpdateLogs() {
  api.getUpdateLogs().then(({ data }) => {
    handleVersion(data.logs?.[0]?.version)
    data.logs.forEach((logs) => {
      handleNotification(logs)
    })
  })
}

// -------------------- 数据导出（用于迁移到新版本） --------------------
const EXPORT_TASK_KEY = 'home_export_task_id' // 导出任务ID的缓存键
const EXPORT_TASK_EXPIRE = 24 * 60 * 60 // 秒，与后端导出文件保留时长保持一致
const EXPORT_POLL_INTERVAL = 3000 // 轮询间隔（毫秒）
const EXPORT_POLL_MAX_COUNT = 2400 // 最多轮询2400次（2小时，与后端任务锁时长一致），避免任务僵死后一直请求
const EXPORT_TABLE_LABELS = {
  bl_danmu_logs: '弹幕记录',
  bl_gift_records: '礼物记录',
  bl_user_vips: '大航海用户',
}

function emptyExportState() {
  return {
    task_id: '',
    status: 'idle', // idle | pending | running | finished | failed
    current_table: '',
    processed: 0,
    total: 0,
    percent: 0,
    tables: {},
    filename: '',
    size: 0,
    error: '',
    download_url: '',
  }
}

const exportState = ref(emptyExportState())
const exportStarting = ref(false) // 创建任务 / 恢复任务的请求进行中
const exportPolling = ref(false) // 是否正在轮询进度
let exportTimer = null
let exportPollCount = 0

const exportVisible = computed(() => exportState.value.status !== 'idle')
const exportBusy = computed(() => exportStarting.value || exportPolling.value)

// 库为空时后端 total 为 0、percent 会一直是 0，完成时统一按 100% 展示
const exportPercent = computed(() => {
  if (exportState.value.status === 'finished')
    return 100
  return Math.round(Math.min(100, Math.max(0, Number(exportState.value.percent) || 0)))
})

const exportProgressStatus = computed(() => {
  if (exportState.value.status === 'failed')
    return 'error'
  if (exportState.value.status === 'finished')
    return 'success'
  return 'default'
})

const exportStatusText = computed(() => {
  const state = exportState.value
  if (state.status === 'pending')
    return '导出任务已创建，正在等待执行…'
  if (state.status === 'running') {
    // 刚开始时还没统计出待导出总数
    if (!state.total)
      return '正在统计待导出的数据量…'
    return `正在导出${exportTableLabel(state.current_table)}，整体已完成 ${formatNumber(state.processed)} / ${formatNumber(state.total)} 条`
  }
  if (state.status === 'finished')
    return `导出完成，共 ${formatNumber(state.total)} 条数据，文件大小 ${formatSize(state.size)}`
  if (state.status === 'failed')
    return state.error || '导出失败，请重新发起导出'
  return ''
})

// 各表进度明细，让长耗时的导出更可预期
const exportTableDetail = computed(() => {
  return Object.entries(exportState.value.tables ?? {})
    .filter(([, item]) => Number(item?.total) > 0)
    .map(([table, item]) => `${exportTableLabel(table)} ${formatNumber(item.processed)}/${formatNumber(item.total)}`)
    .join(' · ')
})

const exportButtonText = computed(() => {
  const status = exportState.value.status
  if (exportStarting.value)
    return '处理中…'
  if (status === 'finished' || status === 'failed')
    return '重新导出'
  if (status === 'pending' || status === 'running')
    return exportPolling.value ? '导出中…' : '继续查看进度'
  return '导出数据'
})

function exportTableLabel(table) {
  if (!table)
    return '数据'
  return EXPORT_TABLE_LABELS[table] ?? table
}

// 千分位
function formatNumber(num) {
  return Number(num || 0).toLocaleString('zh-CN')
}

// 字节转MB（后端返回的是压缩后的文件大小）
function formatSize(bytes) {
  const value = Number(bytes) || 0
  if (value <= 0)
    return '0 MB'
  return `${(value / 1024 / 1024).toFixed(2)} MB`
}

function stopExportPolling() {
  clearInterval(exportTimer)
  exportTimer = null
  exportPollCount = 0
  exportPolling.value = false
}

function startExportPolling() {
  stopExportPolling()
  exportPolling.value = true
  exportTimer = setInterval(fetchExportProgress, EXPORT_POLL_INTERVAL)
}

// 查询一次进度；quiet 用于页面恢复时的静默探测，任务已失效也不弹提示
function fetchExportProgress(quiet = false) {
  const taskId = exportState.value.task_id
  if (!taskId) {
    stopExportPolling()
    return
  }
  const doRequest = quiet ? api.probeExportProgress : api.getExportProgress
  doRequest(taskId).then(({ data = {} }) => {
    const previousStatus = exportState.value.status
    exportState.value = { ...exportState.value, ...data, task_id: taskId }
    // 只在本页面盯着任务从进行中变成结束时提示，避免每次进首页都为历史任务弹一次
    const watching = previousStatus === 'pending' || previousStatus === 'running'
    if (data.status === 'finished') {
      stopExportPolling()
      if (watching)
        $message.success('数据导出完成，可以下载了')
      return
    }
    if (data.status === 'failed') {
      stopExportPolling()
      if (watching)
        $message.error(data.error || '导出失败，请重新发起导出')
      return
    }
    exportPollCount += 1
    if (exportPollCount > EXPORT_POLL_MAX_COUNT)
      stopExportPolling()
  }).catch(() => {
    stopExportPolling()
    lStorage.remove(EXPORT_TASK_KEY)
    // 具体原因（如800020任务已过期）由响应拦截器统一提示，这里只落一个可重试的状态
    exportState.value = quiet
      ? emptyExportState()
      : { ...exportState.value, status: 'failed', error: '进度查询已中断，任务可能仍在后台执行，点击「重新导出」可继续查看' }
  })
}

function handleExportData() {
  if (exportBusy.value)
    return
  exportStarting.value = true
  api.createExportTask().then(({ data = {} }) => {
    exportState.value = { ...emptyExportState(), task_id: data.task_id, status: 'pending' }
    lStorage.set(EXPORT_TASK_KEY, data.task_id, EXPORT_TASK_EXPIRE)
    startExportPolling()
    // 立即拉一次，避免进度文案停一整个轮询周期
    fetchExportProgress()
  }).catch(() => {
    // 创建失败（如800021）由响应拦截器统一提示
  }).finally(() => {
    exportStarting.value = false
  })
}

// 下载导出文件（静态直链，不能走接口请求）
function handleExportDownload() {
  const url = exportState.value.download_url
  if (!url) {
    $message.warning('下载地址暂不可用，请稍后重试')
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

// 页面重新进入时恢复上次的导出任务：进行中则继续轮询，已完成则直接给出下载入口
function restoreExportTask() {
  const taskId = lStorage.get(EXPORT_TASK_KEY)
  if (!taskId)
    return
  exportStarting.value = true
  exportState.value = { ...emptyExportState(), task_id: taskId }
  api.probeExportProgress(taskId).then(({ data = {} }) => {
    exportState.value = { ...exportState.value, ...data, task_id: taskId }
    if (data.status === 'pending' || data.status === 'running')
      startExportPolling()
  }).catch(() => {
    // 任务已失效（如800020）：静默清理，回到未开始状态
    lStorage.remove(EXPORT_TASK_KEY)
    exportState.value = emptyExportState()
  }).finally(() => {
    exportStarting.value = false
  })
}

onMounted(async () => {
  getUpdateLogs()
  restoreExportTask()
})

// 首页路由没有开启keepAlive，切走即销毁组件，不清理会让轮询在页面销毁后继续请求
onUnmounted(() => {
  stopExportPolling()
})
</script>
