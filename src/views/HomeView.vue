<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>上传图片</div>
        <el-upload v-model:file-list="fileList" action="/gov_api/upload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleUploadSuccess">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <div>
          <el-button type="primary" @click="clear">清空</el-button>
        </div>
        <div>上传视频</div>
        <el-upload class="upload-demo" drag action="/gov_api/upload" :on-success="handleUploadSuccess2" multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>

        </el-upload>
      </el-col>
      <el-col :span="12">
        <div>图片预测</div>
        <div>
          <el-image v-for="(item, index) in uploadList" :key="index" class="show-container" :src="item.path" />
        </div>
        <div>{{ uploadList }}</div>
        <div>视频预测</div>
        <div>
          <video v-for="(item, index) in uploadList2" :key="index" class="show-container" :src="item.path" controls />
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

const fileList2 = ref([])
const uploadList2 = ref([])
// 上传成功回调
function handleUploadSuccess(res, file) {
  if (res.code === 200) {
    uploadList.value.push({ path: res.file_path })
  }
}
function handleUploadSuccess2(res, file) {
  if (res.code === 200) {
    uploadList2.value.push({ path: res.file_path })
  }
}
const clear = () => {
  uploadList.value = []
}
</script>

<style scoped>
.show-container {
  width: 200px;
}
</style>