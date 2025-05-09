<!--------------------------------
 - @Author: 何俊杰
 - @LastEditor: 何俊杰
 - @LastEditTime: 2023/12/05 21:28:22
 - @Email: junjie.he.925@gmail.com
 - Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 --------------------------------->

<template>
  <AppPage show-footer>
    <div v-if="!configLoading" class="flex">
      <!-- 功能模块 -->
      <div class="min-w-400">
        <!-- 功能模块：商城配置 -->
        <div ref="storeConfigRef">
          <n-card id="storeConfig" title="商城配置">
            <n-form
              :model="configForm" :rules="configRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="商城名称" path="shop_name">
                <n-input v-model:value="configForm.shop_name" placeholder="一般建议增加符号避免误触发，例如: #签到" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>打开网页的时候网站的名称</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="商城地址" path="shop_url">
                <n-input v-model:value="configForm.shop_url" placeholder="一般建议增加符号避免误触发，例如: #签到" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>积分商城默认地址，如果需要通过域名进行访问，可以通过<a href="https://dc.console.aliyun.com" target="_blank"><n-gradient-text type="info">阿里云</n-gradient-text></a>或<a href="https://www.godaddy.com" target="_blank"><n-gradient-text type="info">godaddy</n-gradient-text></a>等其他任意平台注册域名，通常费用在每年几十元左右</p>
                    <p class="mt-5">
                      购买域名后解析到服务器后，就可以拥有一个网址链接供粉丝访问，教程出起来好麻烦，搞不懂可以直接<a href="mailto:junjie.he.925@gmail.com" target="_blank"><n-gradient-text type="info">联系作者</n-gradient-text></a>
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="商城二维码" path="shop_url">
                <n-image width="100%" :src="qrcodeUrl" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>二维码扫描后可以打开商城地址，如果需要美化样式，可以前往<a href="https://cli.im/url" target="_blank"><n-gradient-text type="info">草料二维码</n-gradient-text></a>进行美化</p>
                    <p class="mt-5">
                      通常情况下，微信，QQ等软件可能会限制IP类型地址或未备案域名链接的访问，因此需要告知用户通过系统自带扫码工具进行扫码
                    </p>
                    <p class="mt-5">
                      如果无备案域名也想要用户在QQ/微信扫码访问，也可以直接<a href="mailto:junjie.he.925@gmail.com" target="_blank"><n-gradient-text type="info">联系作者</n-gradient-text></a>
                    </p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：项目配置 -->
        <div ref="projectConfigRef" class="mt-12">
          <n-card id="projectConfig" title="项目配置">
            <n-form
              :model="configForm" :rules="configRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="项目地址" path="system_api_url">
                <n-input v-model:value="configForm.system_api_url" placeholder="项目地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定了项目请求的根路径，影响整体项目中所有资源（如图片、CSS、JavaScript 等）的链接地址。</p>
                    <p class="mt-5">
                      调整此配置会改变项目中所有相关资源的访问路径。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="AES 加密 KEY" path="system_aes_key" class="mt-10">
                <n-input v-model:value="configForm.system_aes_key" placeholder="AES 加密 KEY" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定项目接口与前端页面之间数据的加密和解密过程。</p>
                    <p class="mt-5">
                      AES 加密 KEY 用于对前端发送到后端的数据进行加密，同时也用于后端返回给前端的数据的解密。
                    </p>
                    <p class="mt-5">
                      调整此密钥会影响整个项目中的数据安全性，特别是在积分商城等涉及用户敏感数据传输的功能模块中。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="AES 加密 IV" path="system_aes_iv" class="mt-10">
                <n-input v-model:value="configForm.system_aes_iv" placeholder="AES 加密 IV" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定项目接口与前端页面之间数据的加密和解密过程。</p>
                    <p class="mt-5">
                      AES 加密 KEY 用于对前端发送到后端的数据进行加密，同时也用于后端返回给前端的数据的解密。
                    </p>
                    <p class="mt-5">
                      调整此密钥会影响整个项目中的数据安全性，特别是在积分商城等涉及用户敏感数据传输的功能模块中。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="签名 KEY" path="system_key" class="mt-10">
                <n-input v-model:value="configForm.system_key" placeholder="签名 KEY" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定项目接口与前端页面之间的数据签名机制，用于确保数据在传输过程中未被篡改。</p>
                    <p class="mt-5">
                      签名 KEY 用于生成请求数据的签名，并通过接口校验签名的正确性。
                    </p>
                    <p class="mt-5">
                      调整此密钥会影响整个项目中接口的请求验证过程，特别是在积分商城等涉及敏感操作的功能模块中。
                    </p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：启动配置 -->
        <div ref="bootstrapConfigRef" class="mt-12">
          <n-card id="bootstrapConfig" title="启动配置">
            <n-form
              :model="configForm" :rules="configRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="项目启动地址" path="host">
                <n-input v-model:value="configForm.host" placeholder="项目启动地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定项目在系统运行中的本机地址，影响项目的访问路径。调整该配置后，将影响项目的整体运行。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="项目启动端口" path="listen" class="mt-10">
                <n-input v-model:value="configForm.listen" placeholder="项目启动端口" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定项目在系统中运行的端口，影响项目在本机或服务器上启动时的访问端口。</p>
                    <p class="mt-5">
                      调整该配置后，将影响整个项目的访问路径，包括客户端和服务器之间的通信。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="重启项目地址" path="re_open_host" class="mt-10">
                <n-input v-model:value="configForm.re_open_host" placeholder="重启项目地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定了通知系统重新与 B站 直播间建立 WebSocket 连接时使用的地址。</p>
                    <p class="mt-5">
                      调整该配置后，会影响机器人与 B站直播间的实时数据监控功能，包括实时弹幕、消息推送等交互。
                    </p>
                    <p class="mt-5">
                      该地址通常用于通知系统重新启动连接，尤其在连接断开或需要切换直播间时。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="重启密钥" path="secure_api_key" class="mt-10">
                <n-input v-model:value="configForm.secure_api_key" placeholder="重启密钥" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定在通知系统重新与 B站 建立 WebSocket 连接时所使用的加密信息。</p>
                    <p class="mt-5">
                      调整该密钥后，会影响机器人对直播间数据的监控，尤其是在系统发送重启请求时用于验证请求的合法性和防止滥用。
                    </p>
                    <p class="mt-5">
                      该密钥用于生成请求签名，以确保只有有效的请求才能触发 WebSocket 连接的重启操作。
                    </p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：Redis 配置 -->
        <div ref="redisConfigRef" class="mt-12">
          <n-card id="redisConfig" title="Redis 配置">
            <n-form
              :model="configForm" :rules="configRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="Redis 地址" path="redis_host">
                <n-input v-model:value="configForm.redis_host" placeholder="Redis 地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定系统与 Redis 服务之间的通信地址，影响项目中与 Redis 相关的所有功能，如缓存存储、会话管理、消息队列等。</p>
                    <p class="mt-5">
                      调整该配置后，将直接影响到项目中依赖 Redis 的功能，例如商城用户登录时的缓存信息、商品数据缓存等。
                    </p>
                    <p class="mt-5">
                      确保此地址配置正确，以便系统能够正常与 Redis 进行数据交互。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="Redis 端口" path="redis_port" class="mt-10">
                <n-input v-model:value="configForm.redis_port" placeholder="Redis 端口" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定系统与 Redis 服务通信时所使用的端口号。</p>
                    <p class="mt-5">
                      Redis 默认运行在 6379 端口，如果 Redis 服务运行在其他端口，需要通过此配置项指定正确的端口号。
                    </p>
                    <p class="mt-5">
                      调整该端口后，将影响所有依赖 Redis 的功能，如缓存、会话管理、任务队列等，确保系统能够通过正确的端口与 Redis 服务进行数据交互。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="Redis 密码" path="redis_password" class="mt-10">
                <n-input v-model:value="configForm.redis_password" placeholder="Redis 密码，可能为空，为空是正常情况" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定系统与 Redis 服务通信时所使用的端口号。</p>
                    <p class="mt-5">
                      Redis 默认运行在 6379 端口，如果 Redis 服务运行在其他端口，需要通过此配置项指定正确的端口号。
                    </p>
                    <p class="mt-5">
                      调整该端口后，将影响所有依赖 Redis 的功能，如缓存、会话管理、任务队列等，确保系统能够通过正确的端口与 Redis 服务进行数据交互。
                    </p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：数据库配置 -->
        <div ref="databaseConfigRef" class="mt-12">
          <n-card id="databaseConfig" title="数据库配置">
            <n-form
              :model="configForm" :rules="configRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="数据库地址" path="db_host">
                <n-input v-model:value="configForm.db_host" placeholder="数据库地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定应用连接到数据库服务的主机地址。可以是本地地址或远程数据库服务的 IP 地址或域名。</p>
                    <p class="mt-5">
                      确保该地址能够正确指向数据库实例所在的服务器。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="数据库端口" path="db_port" class="mt-10">
                <n-input v-model:value="configForm.db_port" placeholder="数据库端口" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定连接数据库时所使用的端口号。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="数据库账号" path="db_user" class="mt-10">
                <n-input v-model:value="configForm.db_user" placeholder="数据库账号" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定用于连接数据库的用户账号。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="数据库名称" path="db_name" class="mt-10">
                <n-input v-model:value="configForm.db_name" placeholder="数据库名称" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项决定应用程序连接的数据库名称。确保该名称与数据库中实际存在的数据库一致。</p>
                    <p class="mt-5">
                      如果该数据库不存在，系统可能无法正常连接并进行数据操作。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="数据库密码" path="db_password" class="mt-10">
                <n-input v-model:value="configForm.db_password" placeholder="数据库密码" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>此配置项为连接数据库的密码。确保该密码与数据库中指定用户的密码一致。</p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
      </div>
      <div class="ml-12 min-w-200 w-30%">
        <div class="sticky top-0">
          <n-card title="现有功能">
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('storeConfigRef')">
              商城配置
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('projectConfigRef')">
              项目配置
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('bootstrapConfigRef')">
              启动配置
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('redisConfigRef')">
              Redis 配置
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('databaseConfigRef')">
              数据库配置
            </NButton>
            <NButton type="primary" class="mb-12 w-100%" :loading="setConfigLoading" @click="setConfig">
              保存配置
            </NButton>
          </n-card>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { onMounted, ref } from 'vue'
import api from './api'

const storeConfigRef = ref()
const configForm = ref({
  shop_name: '', // 商城名称
  shop_url: '', // 商城链接
  system_api_url: '', // 项目地址
  system_aes_key: '', // AES加密KEY
  system_aes_iv: '', // AES加密IV
  system_key: '', // 签名KEY
  host: '', // 项目启动地址
  listen: '', // 项目启动端口
  re_open_host: '', // 重启项目地址
  secure_api_key: '', // 重启密钥
  redis_host: '', // Redis地址
  redis_port: '', // Redis端口
  redis_password: '', // Redis密码
  db_host: '', // 数据库地址
  db_port: '', // 数据库端口
  db_user: '', // 数据库账号
  db_name: '', // 数据库名称
  db_password: '', // 数据库密码
})
const configRules = ref()

const projectConfigRef = ref()

const bootstrapConfigRef = ref()

const redisConfigRef = ref()

const databaseConfigRef = ref()

// 根据传入的 type 选择目标元素
function scrollToSection(target) {
  const targetRefMap = {
    storeConfigRef,
    projectConfigRef,
    bootstrapConfigRef,
    redisConfigRef,
    databaseConfigRef,
  }
  const targetRef = targetRefMap[target]
  if (targetRef) {
    scrollToElement(targetRef)
  }
  else {
    console.warn(`无效的目标类型: ${target}`)
  }
}

// 通用的滚动方法
function scrollToElement(elementRef) {
  if (elementRef && elementRef.value) {
    elementRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  else {
    console.warn(`目标元素未找到: ${elementRef}`)
  }
}

// 调用API接口获取用户信息
const configLoading = ref(false)
async function getData() {
  configLoading.value = true
  try {
    const { data = [] } = await api.getData()
    configForm.value.shop_name = data.shop_name
    configForm.value.shop_url = data.shop_url
    configForm.value.system_api_url = data.system_api_url
    configForm.value.system_aes_key = data.system_aes_key
    configForm.value.system_aes_iv = data.system_aes_iv
    configForm.value.system_key = data.system_key
    configForm.value.host = data.host
    configForm.value.listen = data.listen
    configForm.value.re_open_host = data.re_open_host
    configForm.value.secure_api_key = data.secure_api_key
    configForm.value.redis_host = data.redis_host
    configForm.value.redis_port = data.redis_port
    configForm.value.redis_password = data.redis_password
    configForm.value.db_host = data.db_host
    configForm.value.db_port = data.db_port
    configForm.value.db_user = data.db_user
    configForm.value.db_name = data.db_name
    configForm.value.db_password = data.db_password
    await getDataQrcode(configForm.value.shop_url)
    configLoading.value = false
  }
  catch (err) {
    console.error('获取用户信息失败', err)
  }
}

// 调用API接口获取二维码链接
const qrcodeUrl = ref('')
async function getDataQrcode(url) {
  try {
    const { data = [] } = await api.getDataQrcode(url)
    qrcodeUrl.value = data.url
  }
  catch (err) {
    console.error('获取二维码链接失败', err)
  }
}

// 调用API接口存储用户信息
const setConfigLoading = ref(false)
async function setConfig() {
  setConfigLoading.value = true
  try {
    await api.setData(
      configForm.value.shop_name,
      configForm.value.shop_url,
      configForm.value.system_api_url,
      configForm.value.system_aes_key,
      configForm.value.system_aes_iv,
      configForm.value.system_key,
      configForm.value.host,
      configForm.value.listen,
      configForm.value.re_open_host,
      configForm.value.secure_api_key,
      configForm.value.redis_host,
      configForm.value.redis_port,
      configForm.value.redis_password,
      configForm.value.db_host,
      configForm.value.db_port,
      configForm.value.db_name,
      configForm.value.db_user,
      configForm.value.db_password,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('存储用户信息失败', err)
  }
  finally {
    setConfigLoading.value = false
  }
}

onMounted(async () => {
  await getData()
})
</script>
