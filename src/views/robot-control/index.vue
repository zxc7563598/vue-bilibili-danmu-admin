<template>
  <AppPage show-footer>
    <div class="flex">
      <n-card v-if="!robot.loading" class="min-w-300 w-30%" title="机器人信息">
        <template #header-extra>
          <NButton
            v-permission="'RobotControlUser'" strong secondary round type="primary"
            :loading="handleAuthActionLoading" @click="handleAuthAction"
          >
            {{ robot.is_login ? '退出登录' : '立即登录' }}
          </NButton>
        </template>
        <n-descriptions label-placement="left" :column="1">
          <n-descriptions-item>
            <template #label>
              <b>UID</b>
            </template>
            {{ robot.uid }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label>
              <b>名称</b>
            </template>
            {{ robot.uname }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label>
              <b>状态</b>
            </template>
            {{ robot.is_login ? '已登陆' : '未登陆' }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card v-if="!room.loading" class="ml-12 min-w-300 w-70%" title="直播间信息">
        <template #header-extra>
          <NButton
            v-permission="'RobotControlRoom'" strong secondary round type="primary"
            :loading="handleLiveRoomActionLoading" @click="handleLiveRoomAction"
          >
            {{ room.is_live ? '断开连接' : '连接直播间' }}
          </NButton>
        </template>
        <n-descriptions label-placement="left" :column="2">
          <n-descriptions-item>
            <template #label>
              <b>房间</b>
            </template>
            {{ room.room_id }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label>
              <b>关注</b>
            </template>
            {{ room.attention }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label>
              <b>标题</b>
            </template>
            {{ room.title }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label>
              <b>观看</b>
            </template>
            {{ room.online }}
          </n-descriptions-item>
          <n-descriptions-item span="2">
            <template #label>
              <b>开播时间</b>
            </template>
            <n-tag v-if="room.live_status === 1" :bordered="false" class="mr-10" type="success" size="small">
              直播中
            </n-tag>
            <n-tag v-else-if="room.live_status === 2" :bordered="false" class="mr-10" type="info" size="small">
              轮播中
            </n-tag>
            <n-tag v-else :bordered="false" class="mr-10" type="error" size="small">
              未开播
            </n-tag>
            <n-tag v-if="room.room_id" :bordered="false" class="mr-10" type="info" size="small" @click="goToLive">
              点击前往直播间
            </n-tag>
            {{ room.live_time }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>

    <div v-if="!configLoading" class="mt-12 flex">
      <!-- 功能模块 -->
      <div class="min-w-400 flex-1">
        <!-- 功能模块：签到 -->
        <div ref="checkInRef">
          <n-card id="checkIn" title="签到">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="checkInForm.opens ? 'primary' : 'default'" round @click="checkInForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="checkInForm.opens ? 'default' : 'primary'" round @click="checkInForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="关于签到功能的说明" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>用户每日可以通过发送特定弹幕进行一次签到</p>
              <p>签到可以发放 <b>硬币</b> 用户在积分商城兑换商品</p>
              <p>商品可以设置由 <b>积分</b> 或者是 <b>硬币</b> 支付</p>
            </n-alert>
            <n-alert title="可用的动态信息变量" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>以下动态信息可用于<b>签到成功</b>或<b>查询成功</b>时的自动回复内容，在实际发送时将自动替换为相应的数据：</p>
              <p>用户名：<b>@name@</b></p>
              <p>总签到天数：<b>@total@</b></p>
              <p>连续签到天数：<b>@serial@</b></p>
              <p>用户积分：<b>@total_point@</b></p>
              <p>用户硬币：<b>@total_coin@</b></p>
            </n-alert>

            <n-form
              ref="checkInFormRef" :model="checkInForm" :rules="checkInRules" label-placement="left"
              label-width="auto" require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="checkInForm.status" name="checkInForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="类型" path="type" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="checkInForm.type" name="checkInForm-type">
                  <n-radio-button value="0">
                    全部
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅牌子
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅航海
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="签到词" path="keywords" feedback-style="margin-bottom: 20px;">
                <n-input v-model:value="checkInForm.keywords" placeholder="一般建议增加符号避免误触发，例如: #签到" />
              </n-form-item>
              <n-form-item label="赠送积分" path="points" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="checkInForm.points" type="text" :allow-input="onlyAllowNumber"
                  placeholder="为 0 则不赠送"
                />
              </n-form-item>
              <n-form-item label="查询词" path="select" feedback-style="margin-bottom: 20px;">
                <n-input v-model:value="checkInForm.select" placeholder="一般建议增加符号避免误触发，例如: #查询">
                  <template #password-visible-icon />
                </n-input>
              </n-form-item>
              <n-form-item label="成功回复" path="success" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="checkInForm.success"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
              <n-form-item label="查询回复" path="reply" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="checkInForm.reply"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：PK播报 -->
        <div ref="pkRef" class="mt-12">
          <n-card title="PK播报">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="pkForm.opens ? 'primary' : 'default'" round @click="pkForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="pkForm.opens ? 'default' : 'primary'" round @click="pkForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="PK 播报说明" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>在 PK 开始前 10 秒，系统会接收到相关信息并启动播报。</p>
              <p>由于机器人发送弹幕的时间间隔需大于 3 秒，否则可能会被平台限制发言，因此建议将播报内容控制在 <b>3 条消息以内</b>。</p>
              <p>配置中的多行播报内容并不会随机发送，而是会在 PK 前 <b>按顺序逐条发送</b>。建议设置成简洁明确的信息，例如：</p>
              <p>即将与 @uname@ 进行 PK</p>
              <p>对方直播间当前在线 @online_num@ 人</p>
              <p>前三名贡献值为 @top_three_score@</p>
              <p>同时建议控制每条消息的长度。过长的内容会被自动拆分为多条发送，可能因为平台的发言频率限制，导致发送延迟或部分内容显示异常。</p>
            </n-alert>
            <n-alert title="可用的动态信息变量" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>以下动态信息可用于发送内容，在实际发送时将自动替换为相应的数据：</p>
              <p>对方主播名称：<b>@uname@</b></p>
              <p>对方高能榜人数：<b>@online_num@</b></p>
              <p>对方高能榜总计贡献度：<b>@online_score@</b></p>
              <p>对方高能榜前三名贡献度：<b>@top_three_score@</b></p>
            </n-alert>

            <n-form
              ref="pkFormRef" :model="pkForm" :rules="pkRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="播报内容" path="content" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="pkForm.content"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时按顺序从上往下进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：定时广告 -->
        <div ref="timingRef" class="mt-12">
          <n-card title="定时广告">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="timingForm.opens ? 'primary' : 'default'" round @click="timingForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="timingForm.opens ? 'default' : 'primary'" round @click="timingForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="广告信息设置说明" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>您可以设置多条广告信息，每条信息之间通过换行符隔开。</p>
              <p>每次发送时，系统会从这些信息中随机选择一条进行发送。</p>
              <p>建议控制留言的发言长度，过长的信息会被拆分成多条发送，可能会因发言频率限制而影响体验。</p>
              <p>由于 B 站的限制，弹幕发送间隔不能低于 3 秒，通常建议将间隔时间设置为 5 秒以上，以避免触发风控问题。</p>
            </n-alert>
            <n-form
              ref="timingFormRef" :model="timingForm" :rules="timingRules" label-placement="left"
              label-width="auto" require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="间隔时间" path="intervals" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="timingForm.intervals" type="text" :allow-input="onlyAllowNumber"
                  placeholder="间隔不允许低于10 秒"
                />
              </n-form-item>
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="timingForm.status" name="timingForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="发送内容" path="content" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="timingForm.content"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：礼物答谢 -->
        <div ref="presentRef" class="mt-12">
          <n-card title="礼物答谢">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="presentForm.opens ? 'primary' : 'default'" round @click="presentForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="presentForm.opens ? 'default' : 'primary'" round @click="presentForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="可用的动态信息" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>您可以将以下动态信息插入到句子中，实际发送时这些内容将会被替换为对应的值：</p>
              <p>送礼人名称：<b>@name@</b></p>
              <p>礼物名称：<b>@giftName@</b></p>
              <p>礼物单价：<b>@price@</b></p>
            </n-alert>
            <n-alert title="关于起始感谢电池" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>对于大于等于设置电池数的礼物，系统会自动发送感谢信息。例如：</p>
              <p>设置为 0 时，所有礼物都会被感谢，包括免费的礼物。</p>
              <p>设置为 100 时，仅会感谢价格在 100 电池及以上的礼物，低于 100 电池的赠送将不会被感谢。</p>
            </n-alert>
            <n-alert title="关于发送内容" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>您可以设置多条感谢信息，每条信息通过换行符隔开。每次发送感谢时，系统会从这些信息中随机选择一条进行发送。</p>
              <p>建议控制留言发言的长度，过长的信息可能会被拆分成多条发送，且由于发言频率限制，可能会影响用户体验。</p>
            </n-alert>
            <n-form
              ref="presentFormRef" :model="presentForm" :rules="presentRules" label-placement="left"
              label-width="auto" require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="展示数量" path="number" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="presentForm.number" name="presentForm-number">
                  <n-radio-button value="0">
                    不展示
                  </n-radio-button>
                  <n-radio-button value="1">
                    展示
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="礼物合并" path="merge" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="presentForm.merge" name="presentForm-merge">
                  <n-radio-button value="0">
                    不合并
                  </n-radio-button>
                  <n-radio-button value="1">
                    合并
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="起始感谢电池" path="price" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="presentForm.price" type="text" :allow-input="onlyAllowNumber"
                  placeholder="为 0 则全部感谢"
                />
              </n-form-item>
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="presentForm.status" name="presentForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="类型" path="type" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="presentForm.type" name="presentForm-type">
                  <n-radio-button value="0">
                    全部感谢
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅感谢牌子
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅感谢航海
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="发送内容" path="content" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="presentForm.content"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：进房欢迎 -->
        <div ref="enterRef" class="mt-12">
          <n-card title="进房欢迎">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="enterForm.opens ? 'primary' : 'default'" round @click="enterForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="enterForm.opens ? 'default' : 'primary'" round @click="enterForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="关于欢迎信息设置" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>欢迎信息支持设置多条内容，每条通过换行分隔。每次触发时，系统会随机选取一条进行发送。</p>
              <p>建议控制每条欢迎语的长度，过长内容会被拆分成多条发送，可能因发言频率限制而影响体验。</p>
              <p>此外，建议仅在人数较少时启用此功能。若用户进入频繁，大量欢迎消息可能造成干扰，影响整体观感。</p>
            </n-alert>
            <n-alert title="可用的动态信息" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>您可以在欢迎语中使用以下动态变量，发送时将自动替换为实际内容：</p>
              <p>名称：<b>@name@</b></p>
            </n-alert>
            <n-form
              ref="enterFormRef" :model="enterForm" :rules="enterRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="enterForm.status" name="enterForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="类型" path="type" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="enterForm.type" name="enterForm-type">
                  <n-radio-button value="0">
                    全部欢迎
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅欢迎牌子
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅欢迎航海
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="欢迎内容" path="content" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="enterForm.content"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：感谢关注 -->
        <div ref="followRef" class="mt-12">
          <n-card title="感谢关注">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="followForm.opens ? 'primary' : 'default'" round @click="followForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="followForm.opens ? 'default' : 'primary'" round @click="followForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="关于感谢信息设置" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>欢迎信息支持设置多条内容，每条通过换行分隔。每次触发时，系统会随机选取一条进行发送。</p>
              <p>建议控制每条感谢语的长度，过长内容会被拆分成多条发送，可能因发言频率限制而影响体验。</p>
              <p>此外，建议仅在人数较少时启用此功能。若用户进入频繁，大量欢迎消息可能造成干扰，影响整体观感。</p>
            </n-alert>
            <n-alert title="可用的动态信息" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>您可以在感谢语中使用以下动态变量，发送时将自动替换为实际内容：</p>
              <p>名称：<b>@name@</b></p>
            </n-alert>
            <n-form
              ref="followFormRef" :model="followForm" :rules="followRules" label-placement="left"
              label-width="auto" require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="followForm.status" name="followForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="类型" path="type" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="followForm.type" name="followForm-type">
                  <n-radio-button value="0">
                    全部感谢
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅感谢牌子
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅感谢航海
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="感谢内容" path="content" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="followForm.content"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：感谢分享 -->
        <div ref="shareRef" class="mt-12">
          <n-card title="感谢分享">
            <template #header-extra>
              <n-button-group size="small">
                <NButton :type="shareForm.opens ? 'primary' : 'default'" round @click="shareForm.opens = true">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton :type="shareForm.opens ? 'default' : 'primary'" round @click="shareForm.opens = false">
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-alert title="关于感谢信息设置" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>欢迎信息支持设置多条内容，每条通过换行分隔。每次触发时，系统会随机选取一条进行发送。</p>
              <p>建议控制每条感谢语的长度，过长内容会被拆分成多条发送，可能因发言频率限制而影响体验。</p>
              <p>此外，建议仅在人数较少时启用此功能。若用户进入频繁，大量欢迎消息可能造成干扰，影响整体观感。</p>
            </n-alert>
            <n-alert title="可用的动态信息" class="mb-20" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>您可以在感谢语中使用以下动态变量，发送时将自动替换为实际内容：</p>
              <p>名称：<b>@name@</b></p>
            </n-alert>
            <n-form
              ref="shareFormRef" :model="shareForm" :rules="shareRules" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="shareForm.status" name="shareForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="类型" path="type" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="shareForm.type" name="shareForm-type">
                  <n-radio-button value="0">
                    全部感谢
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅感谢牌子
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅感谢航海
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="感谢内容" path="content" feedback-style="margin-bottom: 20px;">
                <n-input
                  v-model:value="shareForm.content"
                  placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：自动回复 -->
        <div ref="autorespondersRef" class="mt-12">
          <n-card title="自动回复">
            <template #header-extra>
              <n-button-group size="small">
                <NButton
                  :type="autorespondersForm.opens ? 'primary' : 'default'" round
                  @click="autorespondersForm.opens = true"
                >
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:check" />
                    </n-icon>
                  </template>
                  开启
                </NButton>
                <NButton
                  :type="autorespondersForm.opens ? 'default' : 'primary'" round
                  @click="autorespondersForm.opens = false"
                >
                  <template #icon>
                    <n-icon>
                      <i class="i-fe:close" />
                    </n-icon>
                  </template>
                  关闭
                </NButton>
              </n-button-group>
            </template>
            <n-form
              ref="autorespondersFormRef" :model="autorespondersForm" :rules="autorespondersRules"
              label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="状态" path="status" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="autorespondersForm.status" name="autorespondersForm-status">
                  <n-radio-button value="0">
                    不论何时
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅在直播时
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅在非直播时
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="类型" path="type" feedback-style="margin-bottom: 20px;">
                <n-radio-group v-model:value="autorespondersForm.type" name="autorespondersForm-type">
                  <n-radio-button value="0">
                    全部回复
                  </n-radio-button>
                  <n-radio-button value="1">
                    仅回复牌子
                  </n-radio-button>
                  <n-radio-button value="2">
                    仅回复航海
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <n-data-table :columns="autorespondersColumns" :data="autorespondersForm.content" :bordered="false" />
              <NButton strong secondary type="primary" class="mt-12 w-100%" @click="openAutoResponderModal">
                添加自动回复
              </NButton>
            </n-form>
          </n-card>
        </div>
      </div>
      <div class="ml-12 min-w-200 w-30%">
        <div class="sticky top-0">
          <n-card title="现有功能">
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('checkInRef')">
              签到
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('pkRef')">
              PK播报
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('timingRef')">
              定时广告
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('presentRef')">
              礼物答谢
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('enterRef')">
              进房欢迎
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('followRef')">
              感谢关注
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('shareRef')">
              感谢分享
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('autorespondersRef')">
              自动回复
            </NButton>
            <NButton
              v-permission="'RobotControlEdit'" type="primary" class="mb-12 w-100%" :loading="setConfigLoading"
              @click="setConfig"
            >
              保存配置
            </NButton>
          </n-card>
        </div>
      </div>
    </div>

    <n-modal
      v-model:show="autorespondersShowModal" class="custom-card w-50%" preset="card" title="自动回复" size="huge"
      :bordered="false"
    >
      <n-alert title="关于关键词匹配" class="mb-20" type="default" closable>
        <template #icon>
          <n-icon>
            <i class="i-fe:warning" />
          </n-icon>
        </template>
        <p>系统仅在符合条件的用户发送的弹幕中包含指定关键词时才会触发自动回复，支持设置多个关键词。</p>
        <p>关键词支持两种匹配逻辑：</p>
        <p>使用 <b>&&</b> 表示必须同时包含多个关键词，例如：</p>
        <p><b>原神 && 垃圾</b> 表示弹幕中必须同时包含“原神”和“垃圾”才会触发回复。</p>
        <p>使用 <b>||</b> 表示只要包含任意一个关键词即可，例如：</p>
        <p><b>原神||猿神</b> 表示弹幕中只要包含“原神”或“猿神”之一即可触发回复。</p>
        <p>当然，有些用户可能会选择设置多条规则来达到类似效果，这是完全可行的。至于为什么还要加这个功能……嗯，说实话我也不知道。</p>
      </n-alert>
      <n-alert title="可用的动态信息" class="mb-20" type="default" closable>
        <template #icon>
          <n-icon>
            <i class="i-fe:warning" />
          </n-icon>
        </template>
        <p>在自动回复内容中，可以使用以下动态变量，实际发送时将被替换为对应信息：</p>
        <p>命中的关键词：<b>@keywords@</b></p>
        <p>发送人昵称：<b>@name@</b></p>
      </n-alert>
      <n-alert title="关于安全词" class="mb-20" type="default" closable>
        <template #icon>
          <n-icon>
            <i class="i-fe:warning" />
          </n-icon>
        </template>
        <p>当弹幕中包含设定的安全词时，将不会触发自动回复。</p>
        <p>安全词的逻辑与关键词相同，也支持多个词组合，通过 <b>&&</b> 或 <b>||</b> 进行匹配。</p>
      </n-alert>
      <n-alert title="关于自动回复内容" class="mb-20" type="default" closable>
        <template #icon>
          <n-icon>
            <i class="i-fe:warning" />
          </n-icon>
        </template>
        <p>支持设置多条自动回复信息，使用换行符分隔。每次触发时系统会从中随机选取一条进行发送。</p>
        <p>建议控制每条回复的长度，过长的信息可能会被系统拆分成多条发送，受弹幕频率限制可能影响最终效果和体验。</p>
      </n-alert>
      <n-form
        ref="autorespondersFormEditRef" :model="autorespondersForm.edit" :rules="autorespondersFormEditRules"
        label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="small"
      >
        <n-form-item label="关键词" path="keywords" feedback-style="margin-bottom: 20px;">
          <n-input v-model:value="autorespondersForm.edit.keywords" placeholder="不可以为空" />
        </n-form-item>
        <n-form-item label="安全词" path="safeword" feedback-style="margin-bottom: 20px;">
          <n-input v-model:value="autorespondersForm.edit.safeword" placeholder="可以为空" />
        </n-form-item>
        <n-form-item label="是否禁言" path="silent" feedback-style="margin-bottom: 20px;">
          <n-radio-group v-model:value="autorespondersForm.edit.silent" name="autorespondersForm-edit-silent">
            <n-radio-button value="0">
              否
            </n-radio-button>
            <n-radio-button value="1">
              是
            </n-radio-button>
          </n-radio-group>
        </n-form-item>
        <n-form-item
          v-if="autorespondersForm.edit.silent === '1'" label="禁言时长" path="silent_minute"
          feedback-style="margin-bottom: 20px;"
        >
          <n-input
            v-model:value="autorespondersForm.edit.silent_minute" type="text" :allow-input="onlyAllowNumber"
            placeholder="分钟,最低为 1 分钟"
          />
        </n-form-item>
        <n-form-item
          v-if="autorespondersForm.edit.silent === '1'" label="赎回金额" path="ransom_amount"
          feedback-style="margin-bottom: 20px;"
        >
          <n-input
            v-model:value="autorespondersForm.edit.ransom_amount" type="text" :allow-input="onlyAllowNumber"
            placeholder="电池,最低为 1 电池,若设置 0 则代表不允许通过赠送礼物解除禁言"
          />
        </n-form-item>
        <n-form-item label="回复内容" path="text" feedback-style="margin-bottom: 20px;">
          <n-input
            v-model:value="autorespondersForm.edit.text"
            placeholder="支持设置多条信息，每条用换行分隔。每次触发时系统会随机选取一条进行发送。建议控制每条信息的长度，内容过长将被拆分为多条发送，可能因频率限制影响显示效果。" type="textarea"
            :autosize="{
              minRows: 5,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="w-100% flex">
          <NButton strong secondary class="ml-auto" @click="autorespondersShowModal = false">
            关闭
          </NButton>
          <NButton strong secondary type="primary" class="ml-12" @click="saveAutoResponder">
            保存
          </NButton>
        </div>
      </template>
    </n-modal>

    <n-modal
      v-model:show="loginQrModal" class="custom-card w-50%" preset="card" title="登录哔哩哔哩" size="huge"
      :bordered="false"
    >
      <p class="text-center">
        请使用 <a target="_blank" href="https://app.bilibili.com"><u>哔哩哔哩客户端</u></a> 扫码登录或扫码下载APP
      </p>
      <div class="flex text-center">
        <div class="m-auto w-100%">
          <n-image width="100%" :src="loginQr.url" />
        </div>
      </div>
    </n-modal>

    <n-modal
      v-model:show="connectLiveRoomModal" class="custom-card w-50%" preset="card" title="连接直播间" size="huge"
      :bordered="false"
    >
      <n-alert title="关于自动回复内容" class="mb-20" type="default" closable>
        <template #icon>
          <n-icon>
            <i class="i-fe:warning" />
          </n-icon>
        </template>
        <p>支持设置多条自动回复信息，使用换行符分隔。每次触发时系统会从中随机选取一条进行发送。</p>
        <p>建议控制每条回复的长度，过长的信息可能会被系统拆分成多条发送，受弹幕频率限制可能影响最终效果和体验。</p>
      </n-alert>
      <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="small">
        <n-form-item label="房间ID" feedback-style="margin-bottom: 20px;">
          <n-input v-model:value="room.room_id" type="text" :allow-input="onlyAllowNumber" placeholder="直播间房间ID" />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="w-100% flex">
          <NButton strong secondary class="ml-auto" @click="connectLiveRoomModal = false">
            关闭
          </NButton>
          <NButton
            strong secondary type="primary" class="ml-12" :loading="handleLiveRoomActionLoading"
            @click="connectToLiveRoom"
          >
            连接
          </NButton>
        </div>
      </template>
    </n-modal>
  </AppPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { onMounted, ref } from 'vue'
import api from './api'

const loginQr = ref({
  url: '',
  qrcode_key: '',
})

const robot = ref({
  loading: true,
  face: '',
  uid: 0,
  uname: '',
  is_login: false,
})

const room = ref({
  loading: true,
  is_live: false,
  uid: 0,
  uname: '',
  face: '',
  room_id: 0,
  attention: 0,
  online: 0,
  live_status: 0,
  title: '',
  live_time: '',
  keyframe: '',
})

const checkInRef = ref()
const checkInFormRef = ref(null)
const checkInForm = ref({
  opens: false, // 是否开启
  status: '0', // 状态
  type: '0', // 类型：0=全部感谢，1=仅感谢牌子，2=仅感谢航海
  keywords: '', // 签到词
  points: '0', // 签到赠送积分
  select: '', // 查询词
  success: '', // 成功回复
  reply: '', // 查询回复
})
const checkInRules = ref({
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[签到]请选择状态')
      }
      return true
    },
  },
  type: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[签到]请选择类型')
      }
      return true
    },
  },
  keywords: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[签到]签到词不允许为空')
      }
      return true
    },
  },
  points: {
    required: true,
    validator(rule, value) {
      if (!String(value).length) {
        return new Error('[签到]请填写赠送积分')
      }
      return true
    },
  },
  select: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[签到]查询词不允许为空')
      }
      return true
    },
  },
  success: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[签到]成功回复不允许为空')
      }
      return true
    },
  },
  reply: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[签到]查询回复不允许为空')
      }
      return true
    },
  },
})

const pkRef = ref()
const pkFormRef = ref(null)
const pkForm = ref({
  opens: false, // 是否开启
  content: '', // 内容
})
const pkRules = ref({
  content: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[PK播报]播报内容不允许为空')
      }
      return true
    },
  },
})

const timingRef = ref()
const timingFormRef = ref(null)
const timingForm = ref({
  opens: false, // 是否开启
  intervals: '5', // 间隔时间
  status: '0', // 状态
  content: '', // 内容
})
const timingRules = ref({
  intervals: {
    required: true,
    validator(rule, value) {
      if (!String(value).length) {
        return new Error('[定时广告]间隔时间不允许为空')
      }
      if (Number(value) < 10) {
        return new Error('[定时广告]为保障直播间环境，请勿设置过低的间隔时间')
      }
      return true
    },
  },
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[定时广告]请选择状态')
      }
      return true
    },
  },
  content: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[定时广告]发送内容不允许为空')
      }
      return true
    },
  },
})

const presentRef = ref()
const presentFormRef = ref(null)
const presentForm = ref({
  opens: false,
  number: '0', // 数量：0-不展示，1-展示
  merge: '0', // 礼物合并：0-不合并，1-合并
  price: '0', // 起始感谢电池数
  status: '0', // 状态：0=不论何时，1-仅在直播时，2-仅在非直播时
  type: '0', // 类型：0=全部答谢，1=仅答谢牌子，2=仅答谢航海
  content: '', // 内容
})
const presentRules = ref({
  number: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[礼物答谢]请选择展是否展示数量')
      }
      return true
    },
  },
  merge: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[礼物答谢]请选择礼物是否合并')
      }
      return true
    },
  },
  price: {
    required: true,
    validator(rule, value) {
      if (!String(value).length) {
        return new Error('[礼物答谢]起始感谢电池不允许为空')
      }
      return true
    },
  },
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[礼物答谢]请选择状态')
      }
      return true
    },
  },
  type: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[礼物答谢]请选择类型')
      }
      return true
    },
  },
  content: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[礼物答谢]发送内容不允许为空')
      }
      return true
    },
  },
})

const enterRef = ref()
const enterFormRef = ref(null)
const enterForm = ref({
  opens: false,
  status: '0', // 状态
  type: '0', // 类型：0=全部欢迎，1=仅欢迎牌子，2=仅欢迎航海
  content: null, // 内容
})
const enterRules = ref({
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[进房欢迎]请选择状态')
      }
      return true
    },
  },
  type: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[进房欢迎]请选择类型')
      }
      return true
    },
  },
  content: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[进房欢迎]发送内容不允许为空')
      }
      return true
    },
  },
})

const followRef = ref()
const followFormRef = ref(null)
const followForm = ref({
  opens: false,
  status: '0', // 状态
  type: '0', // 类型：0=全部感谢，1=仅感谢牌子，2=仅感谢航海
  content: null, // 内容
})
const followRules = ref({
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[感谢关注]请选择状态')
      }
      return true
    },
  },
  type: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[感谢关注]请选择类型')
      }
      return true
    },
  },
  content: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[感谢关注]发送内容不允许为空')
      }
      return true
    },
  },
})

const shareRef = ref()
const shareFormRef = ref(null)
const shareForm = ref({
  opens: false,
  status: '0', // 状态
  type: '0', // 类型：0=全部感谢，1=仅感谢牌子，2=仅感谢航海
  content: null, // 内容
})
const shareRules = ref({
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[感谢分享]请选择状态')
      }
      return true
    },
  },
  type: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[感谢分享]请选择类型')
      }
      return true
    },
  },
  content: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[感谢分享]发送内容不允许为空')
      }
      return true
    },
  },
})

const autorespondersRef = ref()
const autorespondersFormRef = ref(null)
const autorespondersFormEditRef = ref(null)
const autorespondersForm = ref({
  edit: {
    index: 0, // 索引
    keywords: '', // 关键字
    safeword: '', // 屏蔽字
    text: '', // 内容
    silent: '0', // 是否开启禁言
    silent_minute: '1', // 禁言时长(分钟)
    ransom_amount: '1', // 赎回金额(电池)
  },
  opens: false,
  status: '0', // 状态
  type: '0', // 类型：0=全部响应，1=仅响应牌子，2=仅响应航海
  content: [], // 内容
})
const autorespondersRules = ref({
  status: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]请选择状态')
      }
      return true
    },
  },
  type: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]请选择类型')
      }
      return true
    },
  },
})
const autorespondersFormEditRules = ref({
  keywords: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]关键词不能为空')
      }
      return true
    },
  },
  text: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]回复内容不能为空')
      }
      return true
    },
  },
  silent: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]请选择是否开启禁言')
      }
      return true
    },
  },
  silent_minute: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]禁言时长不能为空')
      }
      if (Number(value) < 1) {
        return new Error('[自动回复]禁言时长最低不能低于 1 分钟')
      }
      return true
    },
  },
  ransom_amount: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('[自动回复]赎回金额不能为空')
      }
      return true
    },
  },

})
const autorespondersColumns = ref([
  { title: '关键词', key: 'keywords' },
  {
    title: '是否禁言',
    key: 'silent',
    render(row) {
      return (row.silent === '1' || row.silent === 1) ? '是' : '否'
    },
  },
  {
    title: '设置',
    key: 'actions',
    align: 'left',
    fixed: 'right',
    render(row, index) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => openAutoResponderModal(index + 1),
          },
          {
            default: () => '修改',
            icon: () => h('i', { class: 'i-fe:edit text-14' }),
          },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            style: 'margin-left: 12px;',
            onClick: () => deleteAutoResponder(index),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-fe:delete text-14' }),
          },
        ),
      ]
    },
  },
])
const autorespondersShowModal = ref(false)

// 点击登录&退出登录
const handleAuthActionLoading = ref(false)
function handleAuthAction() {
  handleAuthActionLoading.value = true
  robot.value.is_login ? logout() : showLoginQrModal()
}

// 显示登录二维码
const loginQrModal = ref(false)
let LoginQrTimer = null
let LoginQrCounter = 0
function showLoginQrModal() {
  // 清空轮询
  clearInterval(LoginQrTimer)
  LoginQrTimer = null
  LoginQrCounter = 0
  // 获取二维码
  api.getLoginQr().then(({ data = [] }) => {
    loginQrModal.value = true
    loginQr.value.url = data.url
    loginQr.value.qrcode_key = data.qrcode_key
    LoginQrTimer = setInterval(() => {
      api.loginCheck(loginQr.value.qrcode_key).then(({ data = [] }) => {
        if (data.code === 0 || data.code === '0') {
          getUserInfo().then(() => {
            // 清空轮询
            clearInterval(LoginQrTimer)
            LoginQrTimer = null
            LoginQrCounter = 0
            // 关闭窗口
            loginQrModal.value = false
          })
        }
      })
      // 关闭窗口后清除轮询
      if (!loginQrModal.value) {
        LoginQrCounter += 1
      }
      if (LoginQrCounter > 10) {
        clearInterval(LoginQrTimer)
      }
    }, 3000)
  })
  handleAuthActionLoading.value = false
}

// 退出登录
function logout() {
  api.loginOut().then(() => {
    disconnectLiveRoom()
    getUserInfo().then(() => {
      $message.success('已退出登录')
    })
  })
  handleAuthActionLoading.value = false
}

// 点击连接直播间&断开连接
const handleLiveRoomActionLoading = ref(false)
function handleLiveRoomAction() {
  handleLiveRoomActionLoading.value = true
  room.value.is_live ? disconnectLiveRoom() : showConnectLiveRoomModal()
}

// 显示连接直播间
const connectLiveRoomModal = ref(false)
function showConnectLiveRoomModal() {
  connectLiveRoomModal.value = true
  handleLiveRoomActionLoading.value = false
}

// 连接直播间
function connectToLiveRoom() {
  handleLiveRoomActionLoading.value = true
  getRealRoomInfo(room.value.room_id).then(() => {
    connectLiveRoomModal.value = false
    handleLiveRoomActionLoading.value = false
  })
}

// 断开直播间链接
function disconnectLiveRoom() {
  api.connectOut().then(() => {
    handleLiveRoomActionLoading.value = false
    getRealRoomInfo().then(() => {
      $message.success('已断开连接')
    })
  })
}

// 开启自动回复单条编辑
function openAutoResponderModal(index = 0) {
  autorespondersForm.value.edit = {
    index: 0, // 索引
    keywords: '', // 关键字
    safeword: '', // 屏蔽字
    text: '', // 内容
    silent: '0', // 是否开启禁言
    silent_minute: '1', // 禁言时长(分钟)
    ransom_amount: '1', // 赎回金额(电池)
  }
  if (index - 1 >= 0) {
    autorespondersForm.value.edit = {
      index,
      keywords: autorespondersForm.value.content?.[index - 1]?.keywords ?? '', // 关键字
      safeword: autorespondersForm.value.content?.[index - 1]?.safeword ?? '', // 屏蔽字
      text: autorespondersForm.value.content?.[index - 1]?.text ?? '', // 内容
      silent: autorespondersForm.value.content?.[index - 1]?.silent ?? false, // 是否开启禁言
      silent_minute: autorespondersForm.value.content?.[index - 1]?.silent_minute ?? '1', // 禁言时长(分钟)
      ransom_amount: autorespondersForm.value.content?.[index - 1]?.ransom_amount ?? '1', // 赎回金额(电池)
    }
  }
  autorespondersShowModal.value = true
}

// 删除自动回复单条
function deleteAutoResponder(index) {
  autorespondersForm.value.content.splice(index, 1)
}

// 存储自动回复编辑信息
async function saveAutoResponder() {
  await autorespondersFormEditRef.value?.validate((errors) => {
    if (errors) {
      errors.forEach((_errors) => {
        _errors.forEach((item) => {
          $message.error(item.message)
        })
      })
      return false
    }
  })
  if (autorespondersForm.value.edit.index - 1 >= 0) {
    autorespondersForm.value.content[autorespondersForm.value.edit.index - 1] = {
      keywords: autorespondersForm.value.edit.keywords,
      safeword: autorespondersForm.value.edit.safeword,
      text: autorespondersForm.value.edit.text,
      enable: true,
      silent: autorespondersForm.value.edit.silent,
      silent_minute: String(autorespondersForm.value.edit.silent_minute),
      ransom_amount: String(autorespondersForm.value.edit.ransom_amount),
    }
  }
  else {
    autorespondersForm.value.content.push({
      keywords: autorespondersForm.value.edit.keywords,
      safeword: autorespondersForm.value.edit.safeword,
      text: autorespondersForm.value.edit.text,
      enable: true,
      silent: autorespondersForm.value.edit.silent,
      silent_minute: String(autorespondersForm.value.edit.silent_minute),
      ransom_amount: String(autorespondersForm.value.edit.ransom_amount),
    })
  }
  autorespondersShowModal.value = false
}

// 根据传入的 type 选择目标元素
function scrollToSection(target) {
  const targetRefMap = {
    pkRef,
    checkInRef,
    timingRef,
    presentRef,
    enterRef,
    followRef,
    shareRef,
    autorespondersRef,
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

// 跳转前往直播间
function goToLive() {
  window.open(`https://live.bilibili.com/${room.value.room_id}`, '_blank', 'noopener,noreferrer')
}

// 只允许输入数字
function onlyAllowNumber(value) {
  return !value || /^\d+$/.test(value)
}

// 调用API接口获取用户信息
async function getUserInfo() {
  robot.value.loading = true
  try {
    const { data = [] } = await api.getUserInfo()
    robot.value.face = data.data.face
    robot.value.uid = data.data.uid
    robot.value.uname = data.data.uname
    robot.value.is_login = data.is_login
    robot.value.loading = false
  }
  catch (err) {
    console.error('获取用户信息失败', err)
  }
}

// 调用API获取房间信息
async function getRealRoomInfo(room_id = 0) {
  room.value.loading = true
  try {
    const { data = [] } = await api.getRealRoomInfo(room_id)
    room.value.is_live = data.is_live
    room.value.uid = data.data.uid
    room.value.uname = data.data.uname
    room.value.face = data.data.face
    room.value.room_id = data.data.room_id
    room.value.attention = data.data.attention
    room.value.online = data.data.online
    room.value.live_status = data.data.live_status
    room.value.title = data.data.title
    room.value.live_time = data.data.live_time
    room.value.keyframe = data.data.keyframe
    room.value.loading = false
  }
  catch (err) {
    console.error('获取房间信息失败', err)
  }
}

// 调用API获取配置信息
const configLoading = ref(false)
async function getConfig() {
  configLoading.value = true
  try {
    const { data = [] } = await api.getConfig()
    // 定时广告
    timingForm.value.opens = data.timing.opens
    timingForm.value.intervals = String(data.timing.intervals)
    timingForm.value.status = String(data.timing.status)
    timingForm.value.content = data.timing.content
    // 礼物答谢
    presentForm.value.opens = data.present.opens
    presentForm.value.number = String(data.present.number)
    presentForm.value.merge = String(data.present.merge)
    presentForm.value.price = String(data.present.price)
    presentForm.value.status = String(data.present.status)
    presentForm.value.type = String(data.present.type)
    presentForm.value.content = data.present.content
    // 进房欢迎
    enterForm.value.opens = data.enter.opens
    enterForm.value.status = String(data.enter.status)
    enterForm.value.type = String(data.enter.type)
    enterForm.value.content = data.enter.content
    // PK播报
    pkForm.value.opens = data.pk.opens
    pkForm.value.content = data.pk.content
    // 感谢关注
    followForm.value.opens = data.follow.opens
    followForm.value.status = String(data.follow.status)
    followForm.value.type = String(data.follow.type)
    followForm.value.content = data.follow.content
    // 感谢分享
    shareForm.value.opens = data.share.opens
    shareForm.value.status = String(data.share.status)
    shareForm.value.type = String(data.share.type)
    shareForm.value.content = data.share.content
    // 签到
    checkInForm.value.opens = data.check_in.opens
    checkInForm.value.status = String(data.check_in.status)
    checkInForm.value.type = String(data.check_in.type)
    checkInForm.value.keywords = data.check_in.keywords
    checkInForm.value.select = data.check_in.select
    checkInForm.value.success = data.check_in.success
    checkInForm.value.reply = data.check_in.reply
    // 自动回复
    autorespondersForm.value.opens = data.autoresponders.opens
    autorespondersForm.value.status = String(data.autoresponders.status)
    autorespondersForm.value.type = String(data.autoresponders.type)
    autorespondersForm.value.content = data.autoresponders.content
    autorespondersForm.value.content.forEach((item) => {
      item.silent = typeof item.silent === 'boolean' ? item.silent ? 1 : 0 : String(item.silent)
    })
    configLoading.value = false
  }
  catch (err) {
    console.error('获取配置信息失败', err)
  }
}

// 调用API存储配置信息
const setConfigLoading = ref(false)
async function setConfig() {
  if (checkInForm.value.opens) {
    await checkInFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (pkForm.value.opens) {
    await pkFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (timingForm.value.opens) {
    await timingFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (presentForm.value.opens) {
    await presentFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (enterForm.value.opens) {
    await enterFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (followForm.value.opens) {
    await followFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (shareForm.value.opens) {
    await shareFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  if (autorespondersForm.value.opens) {
    await autorespondersFormRef.value?.validate((errors) => {
      if (errors) {
        errors.forEach((_errors) => {
          _errors.forEach((item) => {
            $message.error(item.message)
          })
        })
        return false
      }
    })
  }
  setConfigLoading.value = true
  try {
    await api.setConfig(
      timingForm.value,
      presentForm.value,
      enterForm.value,
      pkForm.value,
      followForm.value,
      shareForm.value,
      autorespondersForm.value,
      checkInForm.value,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('设置失败', err)
  }
  finally {
    setConfigLoading.value = false
  }
}

onMounted(async () => {
  await getUserInfo()
  await getRealRoomInfo()
  await getConfig()
})
</script>
