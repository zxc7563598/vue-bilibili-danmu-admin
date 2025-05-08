<!--------------------------------
 - @Author: 何俊杰
 - @LastEditor: 何俊杰
 - @LastEditTime: 2023/12/04 22:51:12
 - @Email: junjie.he.925@gmail.com
 - Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 --------------------------------->

<template>
  <main class="cus-scroll h-full flex-col flex-1 bg-#f5f6fb dark:bg-#121212">
    <main :class="{ 'flex-1': full }" class="m-12">
      <slot />
    </main>
    <slot name="footer">
      <TheFooter v-if="showFooter" class="mb-12 mt-auto" />
    </slot>
    <n-back-top :bottom="20" />
  </main>
</template>

<script setup>
defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
})
</script>
