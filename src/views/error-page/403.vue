<!--------------------------------
 - @Author: 何俊杰
 - @LastEditor: 何俊杰
 - @LastEditTime: 2023/12/05 21:28:09
 - @Email: junjie.he.925@gmail.com
 - Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 --------------------------------->

<template>
  <CommonPage :show-header="false">
    <div class="wh-full flex">
      <n-result
        class="m-auto"
        status="403"
        :title="$t('page.403.title')"
        :description="$t('page.403.tips')"
        size="large"
      >
        <template #footer>
          <n-button v-if="back" type="primary" ghost @click="router.replace(back)">
            {{ $t('page.403.goBack') }}
          </n-button>
          <n-button type="primary" class="ml-20" @click="router.replace('/')">
            {{ $t('page.403.goHome') }}
          </n-button>
        </template>
      </n-result>
    </div>
  </CommonPage>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const back = history.state.back

if (history.state.from === 'permission-guard') {
  delete history.state.from
}
else if (route.query.path) {
  router.replace(route.query.path)
}
</script>
