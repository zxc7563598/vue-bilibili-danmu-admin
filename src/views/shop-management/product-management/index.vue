<template>
  <CommonPage>
    <template #action>
      <NButton v-permission="'ShopManagementProductManagementAdd'" type="primary" @click="handleAdd">
        <i class="i-material-symbols:add mr-4 text-18" />
        添加商品
      </NButton>
    </template>

    <MeCrud ref="$table" v-model:query-items="queryItems" :scroll-x="700" :columns="tableColumns" :get-data="api.read">
      <MeQueryItem label="商品名称" :label-width="70">
        <n-input v-model:value="queryItems.name" type="text" placeholder="可模糊搜索" clearable />
      </MeQueryItem>
      <MeQueryItem label="商品类型" :label-width="70">
        <n-select
          v-model:value="queryItems.type" clearable placeholder="请选择" :options="[
            { label: '虚拟商品', value: 0 },
            { label: '实体商品', value: 1 },
            { label: '供品', value: 2 },
          ]"
        />
      </MeQueryItem>
    </MeCrud>

    <MeModal ref="$modalRef">
      <n-card :bordered="false" size="small">
        <n-form
          :model="editItems" :rules="editItemsRules" label-placement="left" label-width="auto"
          require-mark-placement="right-hanging" size="small"
        >
          <n-form-item label="商品名称" path="name">
            <n-input v-model:value="editItems.name" placeholder="商品的名称" />
          </n-form-item>
          <n-form-item label="商品价格" path="amount">
            <n-input v-model:value="editItems.amount" type="text" :allow-input="onlyAllowNumber" placeholder="积分" />
          </n-form-item>
          <n-form-item label="购买说明" path="tips">
            <n-input v-model:value="editItems.tips" placeholder="展示在商品详情页，一句话就行，为空则不展示" />
          </n-form-item>
          <n-form-item label="商品封面图" path="cover_image">
            <n-upload directory-dnd :show-file-list="false" @before-upload="coverUploadHandler">
              <NImage width="50%" :src="editItems.cover_image.url" :preview-disabled="true" />
            </n-upload>
            <template #feedback>
              <p>点击图片可进行上传。建议与其他商品封面图比例一致</p>
              <p class="mt-5">
                图片上传前可先通过
                <a href="https://tinypng.com" target="_blank"><n-gradient-text
                  type="info"
                >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
              </p>
              <p class="mt-5">
                为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
              </p>
            </template>
          </n-form-item>
          <n-form-item label="商品展示图" path="carousel_images" class="mt-20">
            <n-upload
              :default-file-list="carouselImagesFiles" list-type="image-card"
              :on-remove="carouselImagesFilesRemove" @before-upload="carouselUploadHandler"
            />
            <template #feedback>
              <p>在商品详情页滚动展示，可以上传多张，上传多张时建议保持图片高度一致</p>
              <p class="mt-5">
                图片上传前可先通过
                <a href="https://tinypng.com" target="_blank"><n-gradient-text
                  type="info"
                >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
              </p>
              <p class="mt-5">
                为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
              </p>
            </template>
          </n-form-item>
          <n-form-item label="商品详情图" path="details_images" class="mt-20">
            <n-upload
              :default-file-list="detailsImagesFiles" list-type="image-card"
              :on-remove="detailsImagesFilesRemove" @before-upload="detailsUploadHandler"
            />
            <template #feedback>
              <p>在商品详情页的下方展示，可以上传多张，展示时会自动将宽度拉到100%后顺叙展示</p>
              <p class="mt-5">
                图片上传前可先通过
                <a href="https://tinypng.com" target="_blank"><n-gradient-text
                  type="info"
                >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
              </p>
              <p class="mt-5">
                为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
              </p>
            </template>
          </n-form-item>
          <n-form-item label="服务说明图" path="service_description_images" class="mt-20">
            <n-upload
              :default-file-list="serviceDescriptionImagesFiles" list-type="image-card"
              :on-remove="serviceDescriptionImagesFilesRemove" @before-upload="serviceDescriptionUploadHandler"
            />
            <template #feedback>
              <p>在商品详情页的下方展示，可以上传多张，展示时会自动将宽度拉到100%后顺叙展示</p>
              <p class="mt-5">
                图片上传前可先通过
                <a href="https://tinypng.com" target="_blank"><n-gradient-text
                  type="info"
                >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
              </p>
              <p class="mt-5">
                为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
              </p>
            </template>
          </n-form-item>
          <n-form-item label="商品状态" path="status" class="mt-20">
            <n-radio-group v-model:value="editItems.status" name="editItems-status">
              <n-radio-button value="0">
                停用
              </n-radio-button>
              <n-radio-button value="1">
                正常
              </n-radio-button>
            </n-radio-group>
            <template #feedback>
              <p>停用后，商品将不再进行显示</p>
            </template>
          </n-form-item>
          <n-form-item label="商品类型" path="type" class="mt-20">
            <n-radio-group v-model:value="editItems.type" name="editItems-type">
              <n-radio-button value="0">
                虚拟商品
              </n-radio-button>
              <n-radio-button value="1">
                实体商品
              </n-radio-button>
              <n-radio-button value="2">
                供品
              </n-radio-button>
            </n-radio-group>
            <template #feedback>
              <p>商品类型会影响到用户购买成功后展示的页面，以及是否需要填写收货地址</p>
            </template>
          </n-form-item>
          <n-form-item label="商品排序" path="sort" class="mt-20">
            <n-input v-model:value="editItems.sort" type="text" :allow-input="onlyAllowNumber" placeholder="商品排序" />
            <template #feedback>
              <p>在积分商城中，商品会按照 2 个为 1 行的顺序进行展示，排序决定展示的顺序，数字越小越靠前</p>
            </template>
          </n-form-item>
          <n-form-item label="销售数量" path="sale_num" class="mt-20">
            <n-input v-model:value="editItems.sale_num" type="text" :allow-input="onlyAllowNumber" placeholder="销售数量" />
            <template #feedback>
              <p>会随购买上涨，可自行修改，数字改大点看起来好看些？</p>
            </template>
          </n-form-item>
          <n-form-item label="每次销售递增" path="sale_increase" class="mt-20">
            <n-input
              v-model:value="editItems.sale_increase" type="text" :allow-input="onlyAllowNumber"
              placeholder="每次销售递增"
            />
            <template #feedback>
              <p>每次有人购买后销售数量涨多少，可以设置一个大一点的数，可以显得很受欢迎 ✅</p>
            </template>
          </n-form-item>
          <n-data-table :columns="subsColumns" :data="editItems.subs" :bordered="false" class="mt-20" />
          <NButton strong secondary type="primary" class="mt-12 w-100%" @click="openSubsModal">
            添加规格
          </NButton>
        </n-form>
      </n-card>
    </MeModal>

    <n-modal
      v-model:show="subsShowModal" class="custom-card w-50%" preset="card" title="编辑规格" size="huge"
      :bordered="false"
    >
      <n-alert title="关于规格设置的说明" class="mb-20" type="default" closable>
        <template #icon>
          <n-icon>
            <i class="i-fe:warning" />
          </n-icon>
        </template>
        <p>每个规格的商品都应该携带一张对应规格的图片作为样图</p>
        <p>如果实在没有可以使用封面图</p>
        <p>建议所有样图比例相同</p>
      </n-alert>
      <n-form
        :model="editSubs" label-placement="left" label-width="auto" require-mark-placement="right-hanging"
        size="small"
      >
        <n-form-item label="规格图片" path="icon">
          <n-upload directory-dnd :show-file-list="false" @before-upload="subsUploadHandler">
            <NImage v-if="editSubs.icon.url" width="50%" :src="editSubs.icon.url" :preview-disabled="true" />
            <n-empty v-else description="点击上传图片" />
          </n-upload>
          <template #feedback>
            <p>点击图片可进行上传。建议与其他商品封面图比例一致</p>
            <p class="mt-5">
              图片上传前可先通过
              <a href="https://tinypng.com" target="_blank"><n-gradient-text
                type="info"
              >thiify（点击前往）</n-gradient-text></a>进行压缩，可在不影响分辨率的情况下显著降低图片大小
            </p>
            <p class="mt-5">
              为了保障客户流畅访问，通常建议图片分辨率不宜过高（1000像素左右宽度的图片即可，过高的分辨率在移动端效果并不明显，但会显著增加文件体积影响用户加载速度）
            </p>
          </template>
        </n-form-item>
        <n-form-item label="规格名称" path="name" class="mt-20">
          <n-input v-model:value="editSubs.name" placeholder="不可以为空" />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="w-100% flex">
          <NButton strong secondary class="ml-auto" @click="subsShowModal = false">
            关闭
          </NButton>
          <NButton strong secondary type="primary" class="ml-12" @click="saveSubs">
            保存
          </NButton>
        </div>
      </template>
    </n-modal>
  </CommonPage>
</template>

<script setup>
import { MeCrud, MeModal, MeQueryItem } from '@/components'
import { useModal } from '@/composables'
import { hasPermission } from '@/directives'
import { NButton, NImage } from 'naive-ui'
import api from './api'

defineOptions({ name: 'ShopManagementProductManagement' })

// 列表信息
const $table = ref(null)
const queryItems = ref({
  name: '',
  type: '',
})
const tableColumns = [
  {
    title: '封面图',
    key: 'cover_image',
    minWidth: 120,
    render(row) {
      return h(
        NImage,
        {
          src: row.cover_image,
          width: 40,
          height: 40,
          objectFit: 'cover',
          previewDisabled: false, // true 表示不允许放大预览
          style: {
            borderRadius: '5px',
          },
        },
      )
    },
  },
  { title: '商品名称', key: 'name', minWidth: 150 },
  { title: '商品价格', key: 'amount', minWidth: 80 },
  { title: '状态', key: 'status', minWidth: 80 },
  { title: '商品类型', key: 'type', minWidth: 80 },
  { title: '排序', key: 'sort', minWidth: 80 },
  {
    title: '操作',
    key: 'actions',
    align: 'right',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => checkGoods(row),
          },
          {
            default: () => '查看',
            icon: () => h('i', { class: 'i-fe:search text-14' }),
          },
        ),
      ]
    },
  },
]

// 编辑信息
const editItemsRules = ref({})
const editItems = ref({
  goods_id: 0, // 商品ID
  name: '', // 商品名称
  amount: '', // 商品价格
  tips: '', // 购买说明
  cover_image: {
    url: '',
    path: '',
  }, // 封面图
  carousel_images: [], // 商品展示图（多个）
  details_images: [], // 详情图（多个）
  service_description_images: [], // 服务说明图（多个）
  status: '1', // 状态
  type: '0', // 商品类型
  sort: '0', // 排序，从小到大
  sale_num: '0', // 销售数量
  sale_increase: '1', // 每次销售递增
  subs: [], // 商品规格
})

// 商品规格列表
const subsColumns = ref([
  { title: '规格名称', key: 'name' },
  {
    title: '规格图片',
    key: 'icon',
    render(row) {
      return h(
        NImage,
        {
          src: row.icon.url,
          width: 40,
          height: 40,
          objectFit: 'cover',
          previewDisabled: false, // true 表示不允许放大预览
          style: {
            borderRadius: '5px',
          },
        },
      )
    },
  },
  {
    title: '设置',
    key: 'actions',
    align: 'left',
    fixed: 'right',
    render(row, index) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => openSubsModal(index + 1),
          },
          {
            default: () => '修改',
            icon: () => h('i', { class: 'i-fe:edit text-14' }),
          },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            style: 'margin-left: 12px;',
            onClick: () => deleteSubs(index),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-fe:delete text-14' }),
          },
        ),
      ]
    },
  },
])

// 编辑商品规格信息
const editSubs = ref({
  index: 0,
  icon: '',
  name: '',
})

// 开启商品规格单条编辑
const subsShowModal = ref(false)
function openSubsModal(index = 0) {
  editSubs.value = {
    index: 0, // 索引
    icon: {
      url: '',
      path: '',
    }, // 规格图片路径
    name: '', // 规格名称
  }
  if (index - 1 >= 0) {
    editSubs.value = {
      index,
      icon: {
        url: editItems.value.subs?.[index - 1]?.icon?.url ?? '',
        path: editItems.value.subs?.[index - 1]?.icon?.path ?? '',
      },
      name: editItems.value.subs?.[index - 1]?.name ?? '', // 规格名称
    }
  }
  subsShowModal.value = true
}

// 删除商品规格单条
function deleteSubs(index) {
  editItems.value.subs.splice(index, 1)
}

// 存储商品规格编辑信息
function saveSubs() {
  if (editSubs.value.index - 1 >= 0) {
    editItems.value.subs[editSubs.value.index - 1] = {
      icon: editSubs.value.icon,
      name: editSubs.value.name,
    }
  }
  else {
    editItems.value.subs.push({
      icon: editSubs.value.icon,
      name: editSubs.value.name,
    })
  }
  subsShowModal.value = false
}

// 创建处理器函数（只创建一次）
const carouselImagesFiles = ref([])
const detailsImagesFiles = ref([])
const serviceDescriptionImagesFiles = ref([])
const coverUploadHandler = createBeforeUploadHandler('cover_image')
const carouselUploadHandler = createBeforeUploadHandler('carousel_images')
const detailsUploadHandler = createBeforeUploadHandler('details_images')
const serviceDescriptionUploadHandler = createBeforeUploadHandler('service_description_images')
const subsUploadHandler = createBeforeUploadHandler('sub_cover_image')

// 上传图片
const uploadLoading = ref(false)
function createBeforeUploadHandler(image_type) {
  return async function onBeforeUpload({ file }) {
    if (!file.file?.type.startsWith('image/')) {
      $message.error('请上传图片文件')
      return false
    }
    uploadLoading.value = true
    const formData = new FormData()
    formData.append('image', file.file)
    formData.append('type', image_type)
    try {
      const { data = [] } = await api.uploadImages(formData)
      switch (image_type) {
        case 'cover_image':
          editItems.value.cover_image = data
          break
        case 'carousel_images':
          editItems.value.carousel_images.push(data)
          break
        case 'details_images':
          editItems.value.details_images.push(data)
          break
        case 'service_description_images':
          editItems.value.service_description_images.push(data)
          break
        case 'sub_cover_image':
          editSubs.value.icon = data
          break
      }
    }
    catch (err) {
      console.error('上传文件失败', err)
    }
    finally {
      uploadLoading.value = false
    }
    return true
  }
}

// 商品展示图删除
function carouselImagesFilesRemove(options) {
  editItems.value.carousel_images.splice(options.index, 1)
}

// 商品详情图删除
function detailsImagesFilesRemove(options) {
  editItems.value.details_images.splice(options.index, 1)
}

// 服务说明图删除
function serviceDescriptionImagesFilesRemove(options) {
  editItems.value.service_description_images.splice(options.index, 1)
}

// 列表编辑按钮弹窗
const [$modalRef] = useModal()
function checkGoods(item = {}) {
  editItems.value = {
    goods_id: 0, // 商品ID
    name: '', // 商品名称
    amount: '', // 商品价格
    tips: '', // 购买说明
    cover_image: {
      url: '',
      path: '',
    }, // 封面图
    carousel_images: [], // 商品展示图（多个）
    details_images: [], // 详情图（多个）
    service_description_images: [], // 服务说明图（多个）
    status: '1', // 状态
    type: '0', // 商品类型
    sort: '0', // 排序，从小到大
    sale_num: '0', // 销售数量
    sale_increase: '1', // 每次销售递增
    subs: [], // 商品规格
  }
  carouselImagesFiles.value = []
  detailsImagesFiles.value = []
  serviceDescriptionImagesFiles.value = []
  api.details(item.goods_id).then(({ data = [] }) => {
    editItems.value = { ...editItems.value, ...data.goods }
    editItems.value.amount = String(editItems.value.amount)
    editItems.value.type = String(editItems.value.type)
    editItems.value.status = String(editItems.value.status)
    editItems.value.sort = String(editItems.value.sort)
    editItems.value.sale_num = String(editItems.value.sale_num)
    editItems.value.sale_increase = String(editItems.value.sale_increase)
    editItems.value.carousel_images.forEach((item) => {
      carouselImagesFiles.value.push({
        id: item.path,
        name: item.path,
        url: item.url,
        status: 'finished',
      })
    })
    editItems.value.details_images.forEach((item) => {
      detailsImagesFiles.value.push({
        id: item.path,
        name: item.path,
        url: item.url,
        status: 'finished',
      })
    })
    editItems.value.service_description_images.forEach((item) => {
      serviceDescriptionImagesFiles.value.push({
        id: item.path,
        name: item.path,
        url: item.url,
        status: 'finished',
      })
    })
  })
  $modalRef.value?.open({
    showCancel: true,
    title: '编辑商品',
    cancelText: '关闭',
    okText: '存储',
    async onOk() {
      if (!hasPermission('ShopManagementProductManagementEdit')) {
        $message.error('您没有权限变更商品')
        return false
      }
      await setDataDetails()
      $table.value.handleSearch()
    },
  })
}

// 列表新增按钮
function handleAdd() {
  editItems.value = {
    goods_id: 0, // 商品ID
    name: '', // 商品名称
    amount: null, // 商品价格
    tips: null, // 购买说明
    cover_image: {
      url: '',
      path: '',
    }, // 封面图
    carousel_images: [], // 商品展示图（多个）
    details_images: [], // 详情图（多个）
    service_description_images: [], // 服务说明图（多个）
    status: 1, // 状态
    type: 0, // 商品类型
    sort: 0, // 排序，从小到大
    sale_num: 0, // 销售数量
    sale_increase: 1, // 每次销售递增
    subs: [], // 商品规格
  }
  $modalRef.value?.open({
    showCancel: true,
    title: '添加商品',
    cancelText: '关闭',
    okText: '存储',
    async onOk() {
      if (!hasPermission('ShopManagementProductManagementAdd')) {
        $message.error('您没有权限变更商品')
        return false
      }
      await setDataDetails()
      $table.value.handleSearch()
    },
  })
}

// 存储商品
async function setDataDetails() {
  $modalRef.value.okLoading = true
  try {
    await api.setDataDetails(
      editItems.value.goods_id,
      editItems.value.name,
      editItems.value.amount,
      editItems.value.tips,
      editItems.value.cover_image,
      editItems.value.carousel_images,
      editItems.value.details_images,
      editItems.value.service_description_images,
      editItems.value.status,
      editItems.value.type,
      editItems.value.sort,
      editItems.value.sale_num,
      editItems.value.sale_increase,
      editItems.value.subs,
    )
    $message.success('保存成功')
  }
  catch (err) {
    console.error('存储失败', err)
  }
  finally {
    $modalRef.value.okLoading = false
  }
}

// 只允许输入数字
function onlyAllowNumber(value) {
  return !value || /^\d+$/.test(value)
}

onMounted(() => {
  $table.value?.handleSearch()
})
</script>
