/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:37:43
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { getPagePathes } from '..'

const PLUGIN_PAGE_PATHES_ID = 'isme:page-pathes'
export function pluginPagePathes() {
  return {
    name: 'isme:page-pathes',
    resolveId(id) {
      if (id === PLUGIN_PAGE_PATHES_ID)
        return `\0${PLUGIN_PAGE_PATHES_ID}`
    },
    load(id) {
      if (id === `\0${PLUGIN_PAGE_PATHES_ID}`) {
        return `export default ${JSON.stringify(getPagePathes())}`
      }
    },
  }
}
