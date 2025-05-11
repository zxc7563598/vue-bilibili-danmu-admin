import { useAuthStore } from '@/store'

let isConfirming = false
export function resolveResError(code, message, needTip = true) {
  const t = window.t // 使用全局 t 函数
  switch (code) {
    case 900005:
      if (isConfirming || !needTip)
        return
      isConfirming = true
      $dialog.confirm({
        title: t('helpers.notice'),
        type: 'info',
        content: t('helpers.loggedTitle'),
        confirm() {
          useAuthStore().logout()
          window.$message?.success(t('helpers.loggedContent'))
          isConfirming = false
        },
        cancel() {
          isConfirming = false
        },
      })
      return false
    case 403:
      message = t('helpers.403')
      break
    case 404:
      message = t('helpers.404')
      break
    case 500:
      message = t('helpers.500')
      break
    default:
      message = message ?? t('helpers.unknown', { code })
      break
  }
  needTip && window.$message?.error(message)
  return message
}
