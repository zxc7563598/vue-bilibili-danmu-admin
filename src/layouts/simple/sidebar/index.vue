<!--------------------------------
 - @Author: 何俊杰
 - @LastEditor: 何俊杰
 - @LastEditTime: 2023/12/05 21:24:09
 - @Email: junjie.he.925@gmail.com
 - Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 --------------------------------->

<template>
  <SideLogo border-b="1px solid light_border dark:dark_border" />
  <SideMenu class="cus-scroll-y mt-4 h-0 flex-1" />
  <div class="my-12 flex items-center justify-around px-12">
    <UserAvatar v-if="!appStore.collapsed" />
    <MenuCollapse />
  </div>
</template>

<script setup>
import { MenuCollapse, SideLogo, SideMenu, UserAvatar } from '@/layouts/components'
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>
