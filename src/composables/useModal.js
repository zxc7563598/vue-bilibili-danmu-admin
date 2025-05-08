/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:22:49
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

export function useModal() {
  const modalRef = ref(null)
  const okLoading = computed({
    get() {
      return modalRef.value?.okLoading
    },
    set(v) {
      modalRef.value.okLoading = v
    },
  })
  return [modalRef, okLoading]
}
