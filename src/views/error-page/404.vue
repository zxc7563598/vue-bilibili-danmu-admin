<!--------------------------------
 - @Author: 何俊杰
 - @LastEditor: 何俊杰
 - @LastEditTime: 2023/12/05 21:28:15
 - @Email: junjie.he.925@gmail.com
 - Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 --------------------------------->

<template>
  <CommonPage :show-header="false">
    <div class="wh-full flex">
      <n-result
        m-auto
        status="404"
        :title="$t('page.404.title')"
        :description="$t('page.404.tips')"
        size="large"
      >
        <template #footer>
          <n-button type="primary" ghost @click="replace('/')">
            {{ $t('page.404.goHome') }}
          </n-button>
        </template>
      </n-result>
    </div>
  </CommonPage>
</template>

<script setup>
const { replace } = useRouter()
</script>
