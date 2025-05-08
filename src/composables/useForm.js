/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:22:43
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { cloneDeep } from 'lodash-es'
import { inject } from 'vue'

export function useForm(initFormData = {}) {
  const formRef = ref(null)
  const formModel = ref(cloneDeep(initFormData))
  const t = inject('t') // 注入 t 函数
  const rules = {
    required: {
      required: true,
      message: t('common.RequiredField'),
      trigger: ['blur', 'change'],
    },
  }
  const validation = () => {
    return formRef.value?.validate()
  }
  return [formRef, formModel, validation, rules]
}
