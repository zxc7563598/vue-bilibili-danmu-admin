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
