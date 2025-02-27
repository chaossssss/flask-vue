<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>上传图片</div>
        <el-upload
          v-model:file-list="fileList"
          action="/gov_api/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <div>
          <el-button type="primary" @click="clear">清空</el-button>
        </div>
        <div>上传视频</div>
        <el-upload
          class="upload-demo"
          drag
          action="/gov_api/upload"
          :on-success="handleUploadSuccess2"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
        <div>车辆视频</div>
        <el-upload
          class="upload-demo"
          drag
          action="/gov_api/upload2"
          :on-success="handleUploadSuccess3"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
        <div>车祸视频</div>
        <el-upload
          class="upload-demo"
          drag
          action="/gov_api/upload3"
          :on-success="handleUploadSuccess4"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
      </el-col>
      <el-col :span="12">
        <div>图片预测</div>
        <div>
          <el-image
            v-for="(item, index) in uploadList"
            :key="index"
            class="show-container"
            :src="item.path"
          />
        </div>
        <div>{{ summary }}</div>
        <div>{{ uploadList }}</div>
        <div>视频预测</div>
        <div>
          <video
            v-for="(item, index) in uploadList2"
            :key="index"
            class="show-container"
            :src="item.path"
            controls
          />
        </div>
        <div>
          <img :src="catchImg" />
        </div>
        <div>AI分析：{{ picDetail }}</div>
        <div>车流量统计</div>
        <div>
          <video
            v-for="(item, index) in uploadList3"
            :key="index"
            class="show-container"
            :src="item.path"
            controls
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, UploadFilled } from '@element-plus/icons-vue'
const fileList = ref([])
const uploadList = ref([])
const picDetail = ref('')
const fileList2 = ref([])
const uploadList2 = ref([])
const uploadList3 = ref([])
const summary = ref([])
// 上传成功回调
function handleUploadSuccess(res, file) {
  if (res.code === 200) {
    console.log(res.summary)
    summary.value = res.summary
    uploadList.value.push({ path: res.file_path })
  }
}
function handleUploadSuccess2(res, file) {
  if (res.code === 200) {
    uploadList2.value.push({ path: res.file_path })
    catchImg.value = res.catch_file
    imageUrlToBase64(res.catch_file, function (base64) {
      console.log('Base64:', base64)
      aigcMethod(base64)
    })
  }
}
function handleUploadSuccess3(res, file) {
  if (res.code === 200) {
    uploadList3.value.push({ path: res.file_path })
  }
}
function handleUploadSuccess4(res, file) {
  if (res.code === 200) {
    uploadList3.value.push({ path: res.file_path })
  }
}
const clear = () => {
  uploadList.value = []
}

// 识别
const catchImg = ref('')

const aigcMethod = (base64) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk-tolvywkiazbhutrvhnzmfxnonkojiijoypexrvexgscpgouj',
      'Content-Type': 'application/json',
    },
    body:
      '{"model":"Qwen/QVQ-72B-Preview","messages":[{"role":"user","content":[{"type":"image_url","image_url":{"url":"' +
      base64 +
      '","detail":"high"}}]}],"stream":false,"max_tokens":512,"temperature":0.7,"top_p":0.7,"top_k":50,"frequency_penalty":0.5,"n":1,"response_format":{"type":"text"}}',
  }

  fetch('https://api.siliconflow.cn/v1/chat/completions', options)
    .then((response) => response.json())
    .then((response) => {
      picDetail.value = response.choices[0].message.content
    })
    .catch((err) => console.error(err))
}

// 图片转base64
function imageUrlToBase64(url, callback) {
  const img = new Image()
  img.crossOrigin = 'Anonymous' // 解决跨域问题（如果图片允许跨域访问）
  img.src = url

  img.onload = function () {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 设置 canvas 的宽高与图片一致
    canvas.width = img.width
    canvas.height = img.height

    // 将图片绘制到 canvas 上
    ctx.drawImage(img, 0, 0)

    // 将 canvas 内容转换为 Base64
    const base64 = canvas.toDataURL('image/png') // 可以指定格式，如 'image/jpeg'
    callback(base64)
  }

  img.onerror = function (error) {
    console.error('图片加载失败', error)
  }
}
</script>

<style scoped>
.show-container {
  width: 200px;
}
</style>