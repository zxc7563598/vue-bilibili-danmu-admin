<template>
  <AppPage show-footer>
    <div class="flex">
      <!-- 左侧欢迎模块（保留不变） -->
      <n-card class="min-w-200 w-30%">
        <div class="flex items-center">
          <n-avatar round :size="60" :src="userStore.avatar" class="flex-shrink-0" />
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
          <n-button
            type="primary" tertiary tag="a" href="https://github.com/zxc7563598/php-bilibili-danmu"
            target="__blank"
          >
            <template #icon>
              <i class="i-fe:github mr-5 text-12" />
            </template>
            前往 GitHub 给作者点 Star
          </n-button>
          <n-button type="primary" ghost class="ml-12" tag="a" href="https://hejunjie.life" target="__blank">
            <template #icon>
              <i class="i-fe:link mr-5 text-12" />
            </template>
            前往作者个人网站
          </n-button>
          <n-button
            type="primary" class="ml-12" tag="a" href="mailto:junjie.he.925@gmail.com"
            target="__blank"
          >
            <template #icon>
              <i class="i-fe:mail mr-5 text-12" />
            </template>
            直接给作者发送邮件
          </n-button>
        </footer>
      </n-card>
    </div>
    <div class="mt-12 flex">
      <!-- 功能特性模块 -->
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

      <!-- 使用建议模块 -->
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

const userStore = useUserStore()
</script>
