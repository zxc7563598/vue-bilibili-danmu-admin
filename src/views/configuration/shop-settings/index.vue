<template>
  <AppPage show-footer>
    <div v-if="!configLoading" class="flex">
      <!-- 功能模块 -->
      <div class="min-w-400 flex-1">
        <!-- 功能模块：商城设置 -->
        <div ref="storeSettingsRef">
          <n-card title="商城设置">
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="登录页面背景图" path="login_background_image">
                <n-upload directory-dnd :show-file-list="false" @before-upload="loginBackgroundUploadHandler">
                  <n-image width="50%" :src="configForm.login_background_image.url" :preview-disabled="true" />
                </n-upload>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                    <p class="mt-5">
                      此配置项决定商城登录页面的背景图，<a :href="configForm.default_images.login" target="_blank"><n-gradient-text
                        type="info"
                      >点击查看页面样式</n-gradient-text></a>，背景图将展示在登录框背后，提供视觉美化和用户体验的提升。
                    </p>
                    <p class="mt-5">
                      登录框本身是半透明的，不会完全遮挡背景图。调整该背景图后，确保页面主体内容能够在背景图上清晰展示，不会与背景图产生冲突或遮挡重要信息。
                    </p>
                    <p class="mt-5">
                      图片上传前可先通过<a href="https://tinypng.com" target="_blank"><n-gradient-text
                        type="info"
                      >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
                    </p>
                    <p class="mt-5">
                      为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="个人中心背景图" path="personal_background_image" class="mt-20">
                <n-upload directory-dnd :show-file-list="false" @before-upload="personalBackgroundUploadHandler">
                  <n-image width="50%" :src="configForm.personal_background_image.url" :preview-disabled="true" />
                </n-upload>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                    <p class="mt-5">
                      此配置项决定个人中心页面的背景图，<a :href="configForm.default_images.user" target="_blank"><n-gradient-text
                        type="info"
                      >点击查看页面样式</n-gradient-text></a>，背景图展示在个人信息部分的后面，通常会与页面底部的内容产生重叠。背景图的显示区域可能会遮挡部分内容，且底部会使用渐变效果与背景色相匹配。为了确保良好的视觉效果，建议控制背景图的高度。
                    </p>
                    <p class="mt-5">
                      图片上传前可先通过<a href="https://tinypng.com" target="_blank"><n-gradient-text
                        type="info"
                      >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
                    </p>
                    <p class="mt-5">
                      为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="主题色" path="theme_color" class="mt-20">
                <n-color-picker
                  v-model:value="configForm.theme_color[0]" :show-alpha="false"
                  :on-complete="handleColorChangeComplete"
                />
                <n-color-picker
                  v-model:value="configForm.theme_color[1]" :show-alpha="false"
                  :on-complete="handleColorChangeComplete"
                />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                    <p class="mt-5">
                      此配置项决定整个商城的主主题色，调整后会影响页面中所有与主题色相关的元素，如按钮颜色、链接颜色、文本强调色等。
                    </p>
                    <p class="mt-5">
                      主题色的变化不仅会改变页面的整体视觉风格，还会影响商城的用户交互体验。第二个主题色（副主题色）可以与主主题色相同，也可以与主主题色有所不同。
                    </p>
                    <p class="mt-5">
                      如果副主题色与主主题色不同，按钮的颜色将呈现从主主题色到副主题色的渐变效果。
                    </p>
                    <p class="mt-5">
                      颜色效果可见下图
                    </p>
                    <div :style="theme_color" class="mt-5 h-30 w-100% rounded-lg" />
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="直播间链接" path="live_streaming_link" class="mt-20">
                <n-input v-model:value="configForm.live_streaming_link" placeholder="链接地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>用户在积分商城「我的」页面中点击「立即爆米」跳转的页面，通常建议填写直播间链接</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="用户使用密码登录" path="user_login_password" class="mt-20">
                <n-radio-group v-model:value="configForm.user_login_password" name="configForm-user_login_password">
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>关闭后，任意用户输入任意人的UID均可进入商城进行兑换，不建议关闭</p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：邮件通知 -->
        <div ref="emailNotificationsRef" class="mt-12">
          <n-card title="邮件通知">
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="是否开启下播邮件" path="enable_aggregate_mail">
                <n-radio-group v-model:value="configForm.enable_aggregate_mail" name="configForm-enable_aggregate_mail">
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>开启后，下播时将发送邮件，展示本场直播直播机器人统计到的数据</p>
                    <p class="mt-5">
                      建议开启该功能以核对本场直播上舰用户均有被记录，如果出现漏记的情况及时手动为用户增加积分
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="是否开启断开邮件" path="enable_disconnect_mail" class="mt-20">
                <n-radio-group v-model:value="configForm.enable_disconnect_mail" name="configForm-enable_disconnect_mail">
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>开启后，如果机器人出现网络或其他问题与直播间断开连接，将会通过邮件进行通知</p>
                    <p class="mt-5">
                      建议开启该功能，以便第一时间接收异常信息
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="是否开启兑换邮件" path="enable_shop_mail" class="mt-20">
                <n-radio-group v-model:value="configForm.enable_shop_mail" name="configForm-enable_shop_mail">
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>开启后，用户兑换商品时将发送邮件，提醒发货</p>
                    <p class="mt-5">
                      建议开启该功能，以便第一时间接收用户兑换信息
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="邮箱" path="email_address" class="mt-20">
                <n-input v-model:value="configForm.email_address" placeholder="邮箱地址" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指用于接受邮件的邮箱地址，若开启有限通知，<b>邮箱</b>与<b>称呼</b>均不能为空</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="称呼" path="address_as" class="mt-20">
                <n-input v-model:value="configForm.address_as" placeholder="称呼名称" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指希望在邮件中如何称呼你，若开启有限通知，<b>邮箱</b>与<b>称呼</b>均不能为空</p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
            <template #cover />
          </n-card>
        </div>
        <!-- 功能模块：积分相关 -->
        <div ref="pointsSettingsRef" class="mt-12">
          <n-card title="积分相关">
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="是否开启礼物记录" path="gift_records">
                <n-radio-group v-model:value="configForm.gift_records" name="configForm-gift_records">
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>开启后，系统会记录监听到的用户赠送礼物的信息，可在 其他 - 礼物信息 中查看</p>
                    <p class="mt-5">
                      注意：需要在 机器人控制 中监听房间后才可生效
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="大航海监听" path="listening_open_vip" class="mt-20">
                <n-radio-group v-model:value="configForm.listening_open_vip" name="configForm-listening_open_vip">
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>开启后，监听到用户在直播间上舰后会自动记录，为其增加积分</p>
                    <p class="mt-5">
                      如果仅需要记录，不需要增加积分，可以在开启后，将开通舰长/提督/总督奖励积分设置为0
                    </p>
                    <p class="mt-5">
                      注意：需要在控制台监听房间后才可生效
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="开通舰长奖励积分" path="vip_lv1_bonus_points" class="mt-20">
                <n-input
                  v-model:value="configForm.vip_lv1_bonus_points" type="text" :allow-input="onlyAllowNumber"
                  placeholder="0 则不增加"
                />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指与用户开通舰长后获得的积分，仅在开启大航海监听后有效</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="开通提督奖励积分" path="vip_lv2_bonus_points" class="mt-20">
                <n-input
                  v-model:value="configForm.vip_lv2_bonus_points" type="text" :allow-input="onlyAllowNumber"
                  placeholder="0 则不增加"
                />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指与用户开通提督后获得的积分，仅在开启大航海监听后有效</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="开通总督奖励积分" path="vip_lv3_bonus_points" class="mt-20">
                <n-input
                  v-model:value="configForm.vip_lv3_bonus_points" type="text" :allow-input="onlyAllowNumber"
                  placeholder="0 则不增加"
                />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指与用户开通总督后获得的积分，仅在开启大航海监听后有效</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="积分过期模式" path="points_expire_mode" class="mt-20">
                <n-radio-group v-model:value="configForm.points_expire_mode" name="configForm-points_expire_mode">
                  <n-radio-button value="0">
                    永久有效
                  </n-radio-button>
                  <n-radio-button value="1">
                    根据不活跃天数清零
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p><b>永久有效</b>：积分不会被自动清空，仅会随着用户的使用消耗</p>
                    <p class="mt-5">
                      <b>根据不活跃天数清零</b>：用户在获得积分后，如果在设置的天数内未进行积分消费，则清空积分
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="积分过期天数" path="points_expire_days" class="mt-20">
                <n-input
                  v-model:value="configForm.points_expire_days" type="text" :allow-input="onlyAllowNumber"
                  placeholder="积分过期天数"
                />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>天数，多少天过期</p>
                    <p class="mt-5">
                      <b>注意</b>：永久有效的模式下，此配置不会生效，无论设置任何内容都不会有任何影响
                    </p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：商城协议 -->
        <div ref="storePolicyRef" class="mt-12">
          <n-card title="商城协议">
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="协议人名称" path="protocols_surname">
                <n-input v-model:value="configForm.protocols_surname" type="text" placeholder="协议人名称" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指与用户签署协议的人员名称（通常为主播的名称），可根据需要自由填写，但建议填写真实的 B 站名称以确保用户识别和信任。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="协议人UID" path="protocols_uid" class="mt-20">
                <n-input v-model:value="configForm.protocols_uid" type="text" placeholder="协议人UID" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>指与用户签署协议的人员唯一标识（通常为主播的 B 站 UID），可自由填写，但建议填写真实的 B 站 UID 以确保准确性和可信度。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="协议名称" path="protocols_name" class="mt-20">
                <n-input v-model:value="configForm.protocols_name" type="text" placeholder="协议名称" />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>
                      此配置项决定用户在兑换商品并填写地址确认下单时，需要签署并确认的协议名称。该协议名称是商城交易过程中必不可少的一部分，用户在确认订单前必须阅读并同意该协议。根据项目需求，可以自定义该协议名称。
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="协议人签名" path="protocols_signature" class="mt-20">
                <n-upload directory-dnd :show-file-list="false" @before-upload="protocolsSignatureUploadHandler">
                  <n-image width="50%" :src="configForm.protocols_signature.url" :preview-disabled="true" />
                </n-upload>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                    <p class="mt-5">
                      此项配置决定协议中主播方的签名，<a
                        :href="configForm.default_images.protocols_signature"
                        target="_blank"
                      ><n-gradient-text
                        type="info"
                      >点击查看页面样式</n-gradient-text></a>，签名将会在协议中进行展示，通常建议上传与主播信息相关的内容（表情包，或头像等）以便增强用户体验
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="协议内容" path="protocols_name" class="mt-20">
                <div>
                  <div id="editor" class="box">
                    <!-- Quill 编辑器会初始化在这里 -->
                  </div>
                </div>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>
                      此配置项允许自定义协议的正文内容，完整的协议由 协议标题 + 协议双方成员信息 + 协议正文 + 协议双方签名 四部分组成，用户需在下单前阅读并同意协议才能继续交易。
                    </p>
                  </div>
                </template>
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：虚拟礼物下单 -->
        <div ref="virtualGiftOrderRef" class="mt-12">
          <n-card title="虚拟礼物下单">
            <n-alert title="配置说明" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>
                虚拟礼物下单成功后的通知页面：<a :href="configForm.default_images.virtual_gift" target="_blank"><n-gradient-text
                  type="info"
                >点击查看页面样式</n-gradient-text></a>
              </p>
              <p>页面由 <b>图标 + 通知标题 + 通知内容 + 回到首页的按钮</b> 四部分组成</p>
              <p>四部分可以自由设置</p>
            </n-alert>
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="下单成功图标" path="virtual_gift_order_successful_icon" class="mt-20">
                <n-upload
                  directory-dnd :show-file-list="false"
                  @before-upload="virtualGiftOrderSuccessfulIconUploadHandler"
                >
                  <n-image
                    width="50%" :src="configForm.virtual_gift_order_successful_icon.url"
                    :preview-disabled="true"
                  />
                </n-upload>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="下单成功标题" path="virtual_gift_order_successful_title" class="mt-20">
                <n-input
                  v-model:value="configForm.virtual_gift_order_successful_title" type="text"
                  placeholder="下单成功标题"
                />
              </n-form-item>
              <n-form-item label="下单成功内容" path="virtual_gift_order_successful_content">
                <n-input
                  v-model:value="configForm.virtual_gift_order_successful_content" placeholder="下单成功内容"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
              <n-form-item label="下单成功按钮内容" path="virtual_gift_order_successful_button">
                <n-input
                  v-model:value="configForm.virtual_gift_order_successful_button" type="text"
                  placeholder="下单成功按钮内容"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：实体礼物下单 -->
        <div ref="physicalGiftOrderRef" class="mt-12">
          <n-card title="实体礼物下单">
            <n-alert title="配置说明" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>
                实体礼物下单成功后的通知页面：<a :href="configForm.default_images.realism_gift" target="_blank"><n-gradient-text
                  type="info"
                >点击查看页面样式</n-gradient-text></a>
              </p>
              <p>页面由 <b>图标 + 通知标题 + 通知内容 + 回到首页的按钮</b> 四部分组成</p>
              <p>四部分可以自由设置</p>
            </n-alert>
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="下单成功图标" path="realism_gift_order_successful_icon" class="mt-20">
                <n-upload
                  directory-dnd :show-file-list="false"
                  @before-upload="realismGiftOrderSuccessfulIconUploadHandler"
                >
                  <n-image
                    width="50%" :src="configForm.realism_gift_order_successful_icon.url"
                    :preview-disabled="true"
                  />
                </n-upload>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="下单成功标题" path="realism_gift_order_successful_title" class="mt-20">
                <n-input
                  v-model:value="configForm.realism_gift_order_successful_title" type="text"
                  placeholder="下单成功标题"
                />
              </n-form-item>
              <n-form-item label="下单成功内容" path="realism_gift_order_successful_content">
                <n-input
                  v-model:value="configForm.realism_gift_order_successful_content" placeholder="下单成功内容"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
              </n-form-item>
              <n-form-item label="下单成功按钮内容" path="realism_gift_order_successful_button">
                <n-input
                  v-model:value="configForm.realism_gift_order_successful_button" type="text"
                  placeholder="下单成功按钮内容"
                />
              </n-form-item>
            </n-form>
          </n-card>
        </div>
        <!-- 功能模块：贡品礼物下单 -->
        <div ref="tributeGiftOrderRef" class="mt-12">
          <n-card title="贡品礼物下单">
            <n-alert title="配置说明" type="default" closable>
              <template #icon>
                <n-icon>
                  <i class="i-fe:warning" />
                </n-icon>
              </template>
              <p>
                贡品下单成功后的通知页面：<a :href="configForm.default_images.tribute_gift" target="_blank"><n-gradient-text
                  type="info"
                >点击查看页面样式</n-gradient-text></a>
              </p>
              <p>页面由 <b>图标 + 通知标题 + 通知内容 + 回到首页的按钮</b> 四部分组成</p>
              <p>四部分可以自由设置</p>
            </n-alert>
            <n-form
              :model="configForm" label-placement="left" label-width="auto"
              require-mark-placement="right-hanging" size="small"
            >
              <n-form-item label="下单成功图标" path="tribute_gift_order_successful_icon" class="mt-20">
                <n-upload
                  directory-dnd :show-file-list="false"
                  @before-upload="tributeGiftOrderSuccessfulIconUploadHandler"
                >
                  <n-image
                    width="50%" :src="configForm.tribute_gift_order_successful_icon.url"
                    :preview-disabled="true"
                  />
                </n-upload>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>点击图片可进行上传。</p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="下单成功标题" path="tribute_gift_order_successful_title" class="mt-20">
                <n-input
                  v-model:value="configForm.tribute_gift_order_successful_title" type="text"
                  placeholder="下单成功标题"
                >
                  <template #password-visible-icon />
                </n-input>
              </n-form-item>
              <n-form-item label="下单成功内容" path="tribute_gift_order_successful_content">
                <n-input
                  v-model:value="configForm.tribute_gift_order_successful_content" placeholder="下单成功内容"
                  type="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5,
                  }"
                />
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>
                      当没有为排名单独设置通知内容时，用户将会收到该默认通知内容
                    </p>
                  </div>
                </template>
              </n-form-item>
              <n-form-item label="下单成功按钮内容" path="tribute_gift_order_successful_button" class="mt-20">
                <n-input
                  v-model:value="configForm.tribute_gift_order_successful_button" type="text"
                  placeholder="下单成功按钮内容"
                />
              </n-form-item>
              <n-form-item label="开启上供排名" path="tribute_gift_order_successful_rankings">
                <n-radio-group
                  v-model:value="configForm.tribute_gift_order_successful_rankings"
                  name="configForm-tribute_gift_order_successful_rankings"
                >
                  <n-radio-button value="0">
                    否
                  </n-radio-button>
                  <n-radio-button value="1">
                    是
                  </n-radio-button>
                </n-radio-group>
                <template #feedback>
                  <div style="font-size: 12px; color: #888;">
                    <p>开启后，下单成功页面将展示按贡品商品购买次数排名的前十名用户及其购买次数。</p>
                  </div>
                </template>
              </n-form-item>
              <n-data-table
                :columns="tributeGiftOrderSuccessfulRankingslistColumns"
                :data="configForm.tribute_gift_order_successful_rankingslist" :bordered="false" class="mt-20"
              />
              <NButton strong secondary type="primary" class="mt-12 w-100%" @click="openRankingsListModal">
                添加规则
              </NButton>
            </n-form>
          </n-card>
        </div>
      </div>
      <div class="ml-12 min-w-200 w-30%">
        <div class="sticky top-0">
          <n-card title="现有功能">
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('storeSettingsRef')">
              商城设置
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('emailNotificationsRef')">
              邮件通知
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('pointsSettingsRef')">
              积分相关
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('storePolicyRef')">
              商城协议
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('virtualGiftOrderRef')">
              虚拟礼物下单
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('physicalGiftOrderRef')">
              实体礼物下单
            </NButton>
            <NButton type="primary" dashed class="mb-12 w-100%" @click="scrollToSection('tributeGiftOrderRef')">
              贡品礼物下单
            </NButton>
            <NButton v-permission="'ConfigurationShopSettingsEdit'" type="primary" class="mb-12 w-100%" :loading="setDataLoading" @click="setData">
              保存配置
            </NButton>
          </n-card>
        </div>
      </div>
    </div>

    <n-modal
      v-model:show="rankingsListModal" class="custom-card w-50%" preset="card" title="排名规则" size="huge"
      :bordered="false"
    >
      <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="small">
        <n-form-item label="规则">
          <n-select v-model:value="rankingsEdit.comparison" :options="comparisonOptions" />
        </n-form-item>
        <n-form-item label="名次">
          <n-input v-model:value="rankingsEdit.position" type="text" :allow-input="onlyAllowNumber" placeholder="名次" />
        </n-form-item>
        <n-form-item label="内容">
          <n-input
            v-model:value="rankingsEdit.content" placeholder="满足名次后展示给用户的内容" type="textarea" :autosize="{
              minRows: 5,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="w-100% flex">
          <NButton strong secondary class="ml-auto" @click="rankingsListModal = false">
            关闭
          </NButton>
          <NButton strong secondary type="primary" class="ml-12" @click="saveRankingsList">
            保存
          </NButton>
        </div>
      </template>
    </n-modal>
  </AppPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import Quill from 'quill'
import { onMounted, ref } from 'vue'
import api from './api'
import 'quill/dist/quill.snow.css'

const configForm = ref({
  default_images: {
    login: '',
    user: '',
    protocols_signature: '',
    virtual_gift: '',
    realism_gift: '',
    tribute_gift: '',
  }, // 示例图片
  login_background_image: {
    url: '',
    path: '',
  }, // 登录页面背景图
  personal_background_image: {
    url: '',
    path: '',
  }, // 个人中心背景图
  theme_color: [
    '#7232DD',
    '#9267DC',
  ], // 主题色
  live_streaming_link: '', // 直播间链接
  user_login_password: '1', // 用户是否需要密码登录
  enable_aggregate_mail: '0', // 是否开启下播邮件
  enable_disconnect_mail: '0', // 是否开启断开邮件
  enable_shop_mail: '0', // 是否开启兑换邮件
  email_address: '', // 邮箱
  address_as: '', // 称呼
  gift_records: '1', // 是否开启礼物记录
  listening_open_vip: '1', // 大航海监听
  vip_lv1_bonus_points: '0', // 开通舰长奖励积分
  vip_lv2_bonus_points: '0', // 开通提督奖励积分
  vip_lv3_bonus_points: '0', // 开通总督奖励积分
  points_expire_mode: '0', // 积分过期模式
  points_expire_days: '0', // 积分过期天数
  protocols_surname: '', // 协议人名称
  protocols_uid: '', // 协议人UID
  protocols_name: '', // 协议名称
  protocols_signature: {
    url: '',
    path: '',
  }, // 协议人签名
  protocols_content: '', // 协议内容
  virtual_gift_order_successful_icon: {
    url: '',
    path: '',
  }, // 下单成功图标
  virtual_gift_order_successful_title: '', // 下单成功通知标题
  virtual_gift_order_successful_content: '', // 下单成功通知内容
  virtual_gift_order_successful_button: '', // 下单成功按钮内容
  realism_gift_order_successful_icon: {
    url: '',
    path: '',
  }, // 下单成功图标
  realism_gift_order_successful_title: '', // 下单成功通知标题
  realism_gift_order_successful_content: '', // 下单成功通知内容
  realism_gift_order_successful_button: '', // 下单成功按钮内容
  tribute_gift_order_successful_icon: {
    url: '',
    path: '',
  }, // 下单成功图标
  tribute_gift_order_successful_title: '', // 下单成功通知标题
  tribute_gift_order_successful_content: '', // 下单成功通知内容
  tribute_gift_order_successful_button: '', // 下单成功按钮内容
  tribute_gift_order_successful_rankings: '1', // 是否开启排名
  tribute_gift_order_successful_rankingslist: [], // 排名信息
})

const tributeGiftOrderSuccessfulRankingslistColumns = ref([
  {
    title: '规则',
    key: 'comparison',
    render(row) {
      let comparison = '未知'
      switch (String(row.comparison)) {
        case '0':
          comparison = '大于'
          break
        case '1':
          comparison = '大于等于'
          break
        case '2':
          comparison = '小于'
          break
        case '3':
          comparison = '小于等于'
          break
        case '4':
          comparison = '等于'
          break
      }
      return comparison
    },
  },
  { title: '名次', key: 'position' },
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
            onClick: () => openRankingsListModal(index + 1),
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
            onClick: () => deleteRankingsList(index),
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

const rankingsEdit = ref({
  index: 0,
  comparison: '0',
  position: '0',
  content: '',
})

const comparisonOptions = ref([
  {
    label: '大于',
    value: '0',
  },
  {
    label: '大于等于',
    value: '1',
  },
  {
    label: '小于',
    value: '2',
  },
  {
    label: '小于等于',
    value: '3',
  },
  {
    label: '等于',
    value: '4',
  },
])

// 设置中的主题色预览
const theme_color = ref({ background: `linear-gradient(to right, ${configForm.value.theme_color[0]}, ${configForm.value.theme_color[1]})` })
function handleColorChangeComplete() {
  theme_color.value = { background: `linear-gradient(to right, ${configForm.value.theme_color[0]}, ${configForm.value.theme_color[1]})` }
}

const storeSettingsRef = ref()

const emailNotificationsRef = ref()

const pointsSettingsRef = ref()

const storePolicyRef = ref()

const virtualGiftOrderRef = ref()

const physicalGiftOrderRef = ref()

const tributeGiftOrderRef = ref()

// 开启排名规则编辑
const rankingsListModal = ref(false)
function openRankingsListModal(index = 0) {
  rankingsEdit.value = {
    index,
    comparison: '0',
    position: 0,
    content: '',
  }
  if (index - 1 >= 0) {
    rankingsEdit.value = {
      index,
      comparison: configForm.value.tribute_gift_order_successful_rankingslist?.[index - 1]?.comparison ?? '0',
      position: configForm.value.tribute_gift_order_successful_rankingslist?.[index - 1]?.position ?? '0',
      content: configForm.value.tribute_gift_order_successful_rankingslist?.[index - 1]?.content ?? '',
    }
    rankingsEdit.value.comparison = String(rankingsEdit.value.comparison)
  }
  rankingsListModal.value = true
}

// 删除自动回复单条
function deleteRankingsList(index) {
  configForm.value.tribute_gift_order_successful_rankingslist.splice(index, 1)
}

// 存储自动回复编辑信息
function saveRankingsList() {
  if (rankingsEdit.value.index - 1 >= 0) {
    configForm.value.tribute_gift_order_successful_rankingslist[rankingsEdit.value.index - 1] = {
      comparison: String(rankingsEdit.value.comparison),
      position: rankingsEdit.value.position,
      content: rankingsEdit.value.content,
    }
  }
  else {
    configForm.value.tribute_gift_order_successful_rankingslist.push({
      comparison: String(rankingsEdit.value.comparison),
      position: rankingsEdit.value.position,
      content: rankingsEdit.value.content,

    })
  }
  rankingsListModal.value = false
}

// 富文本编辑器构建
let quill
function quillInit(htmlContent) {
  quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: '在这里写下你的内容...',
    modules: {
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        ['link'],
      ],
    },
  })
  quill.root.innerHTML = htmlContent
}

// 提取富文本编辑器数据
function getQuillHtml() {
  return quill.root.innerHTML
}
// 根据传入的 type 选择目标元素
function scrollToSection(target) {
  const targetRefMap = {
    storeSettingsRef,
    emailNotificationsRef,
    pointsSettingsRef,
    storePolicyRef,
    virtualGiftOrderRef,
    physicalGiftOrderRef,
    tributeGiftOrderRef,
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

// 创建处理器函数（只创建一次）
const loginBackgroundUploadHandler = createBeforeUploadHandler('login_background_image')
const personalBackgroundUploadHandler = createBeforeUploadHandler('personal_background_image')
const protocolsSignatureUploadHandler = createBeforeUploadHandler('protocols_signature')
const virtualGiftOrderSuccessfulIconUploadHandler = createBeforeUploadHandler('virtual_gift_order_successful_icon')
const realismGiftOrderSuccessfulIconUploadHandler = createBeforeUploadHandler('realism_gift_order_successful_icon')
const tributeGiftOrderSuccessfulIconUploadHandler = createBeforeUploadHandler('tribute_gift_order_successful_icon')
// 上传图片
const uploadLoading = ref(false)
function createBeforeUploadHandler(image_type) {
  return async function onBeforeUpload({ file }) {
    if (!file.file?.type.startsWith('image/')) {
      $message.error('请上传图片文件')
      return false
    }
    uploadLoading.value = true
    const formData = new FormData()
    formData.append('image', file.file)
    formData.append('type', image_type)
    try {
      const { data = [] } = await api.uploadImages(formData)
      switch (image_type) {
        case 'login_background_image':
          configForm.value.login_background_image = data
          break
        case 'personal_background_image':
          configForm.value.personal_background_image = data
          break
        case 'protocols_signature':
          configForm.value.protocols_signature = data
          break
        case 'virtual_gift_order_successful_icon':
          configForm.value.virtual_gift_order_successful_icon = data
          break
        case 'realism_gift_order_successful_icon':
          configForm.value.realism_gift_order_successful_icon = data
          break
        case 'tribute_gift_order_successful_icon':
          configForm.value.tribute_gift_order_successful_icon = data
          break
      }
    }
    catch (err) {
      console.error('上传文件失败', err)
    }
    finally {
      uploadLoading.value = false
    }
    return true
  }
}

// 调用API接口获取用户信息
const configLoading = ref(false)
async function getData() {
  configLoading.value = true
  try {
    const { data = [] } = await api.getData()
    configForm.value.default_images = data.default_images
    configForm.value.login_background_image = data.login_background_image
    configForm.value.personal_background_image = data.personal_background_image
    configForm.value.theme_color = data.theme_color
    configForm.value.live_streaming_link = data.live_streaming_link
    configForm.value.user_login_password = data.user_login_password
    configForm.value.enable_aggregate_mail = data.enable_aggregate_mail
    configForm.value.enable_disconnect_mail = data.enable_disconnect_mail
    configForm.value.enable_shop_mail = data.enable_shop_mail
    configForm.value.email_address = data.email_address
    configForm.value.address_as = data.address_as
    configForm.value.gift_records = data.gift_records
    configForm.value.listening_open_vip = data.listening_open_vip
    configForm.value.vip_lv1_bonus_points = data.vip_lv1_bonus_points
    configForm.value.vip_lv2_bonus_points = data.vip_lv2_bonus_points
    configForm.value.vip_lv3_bonus_points = data.vip_lv3_bonus_points
    configForm.value.points_expire_mode = data.points_expire_mode
    configForm.value.points_expire_days = data.points_expire_days
    configForm.value.protocols_surname = data.protocols_surname
    configForm.value.protocols_uid = data.protocols_uid
    configForm.value.protocols_name = data.protocols_name
    configForm.value.protocols_signature = data.protocols_signature
    configForm.value.protocols_content = data.protocols_content
    configForm.value.virtual_gift_order_successful_icon = data.virtual_gift_order_successful_icon
    configForm.value.virtual_gift_order_successful_title = data.virtual_gift_order_successful_title
    configForm.value.virtual_gift_order_successful_content = data.virtual_gift_order_successful_content
    configForm.value.virtual_gift_order_successful_button = data.virtual_gift_order_successful_button
    configForm.value.realism_gift_order_successful_icon = data.realism_gift_order_successful_icon
    configForm.value.realism_gift_order_successful_title = data.realism_gift_order_successful_title
    configForm.value.realism_gift_order_successful_content = data.realism_gift_order_successful_content
    configForm.value.realism_gift_order_successful_button = data.realism_gift_order_successful_button
    configForm.value.tribute_gift_order_successful_icon = data.tribute_gift_order_successful_icon
    configForm.value.tribute_gift_order_successful_title = data.tribute_gift_order_successful_title
    configForm.value.tribute_gift_order_successful_content = data.tribute_gift_order_successful_content
    configForm.value.tribute_gift_order_successful_button = data.tribute_gift_order_successful_button
    configForm.value.tribute_gift_order_successful_rankings = data.tribute_gift_order_successful_rankings
    configForm.value.tribute_gift_order_successful_rankingslist = data.tribute_gift_order_successful_rankingslist
    configLoading.value = false
  }
  catch (err) {
    console.error('获取用户信息失败', err)
  }
}

// 调用API接口存储用户信息
const setDataLoading = ref(false)
async function setData() {
  setDataLoading.value = true
  try {
    await api.setData(
      configForm.value.login_background_image.path,
      configForm.value.personal_background_image.path,
      configForm.value.theme_color,
      configForm.value.live_streaming_link,
      configForm.value.user_login_password,
      configForm.value.protocols_surname,
      configForm.value.protocols_uid,
      configForm.value.protocols_name,
      configForm.value.protocols_signature.path,
      getQuillHtml(),
      configForm.value.gift_records,
      configForm.value.listening_open_vip,
      configForm.value.vip_lv1_bonus_points,
      configForm.value.vip_lv2_bonus_points,
      configForm.value.vip_lv3_bonus_points,
      configForm.value.points_expire_mode,
      configForm.value.points_expire_days,
      configForm.value.virtual_gift_order_successful_icon.path,
      configForm.value.virtual_gift_order_successful_title,
      configForm.value.virtual_gift_order_successful_content,
      configForm.value.virtual_gift_order_successful_button,
      configForm.value.realism_gift_order_successful_icon.path,
      configForm.value.realism_gift_order_successful_title,
      configForm.value.realism_gift_order_successful_content,
      configForm.value.realism_gift_order_successful_button,
      configForm.value.tribute_gift_order_successful_icon.path,
      configForm.value.tribute_gift_order_successful_title,
      configForm.value.tribute_gift_order_successful_content,
      configForm.value.tribute_gift_order_successful_button,
      configForm.value.tribute_gift_order_successful_rankings,
      configForm.value.tribute_gift_order_successful_rankingslist,
      configForm.value.enable_disconnect_mail,
      configForm.value.enable_aggregate_mail,
      configForm.value.enable_shop_mail,
      configForm.value.email_address,
      configForm.value.address_as,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('存储用户信息失败', err)
  }
  finally {
    setDataLoading.value = false
  }
}

// 只允许输入数字
function onlyAllowNumber(value) {
  return !value || /^\d+$/.test(value)
}

onMounted(async () => {
  await getData()
  quillInit(configForm.value.protocols_content)
})
</script>
