<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-upload
          v-model:file-list="fileList"
          action="/gov_api/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <div>
          <el-button type="primary" @click="clear">清空</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-image
            v-for="(item, index) in uploadList"
            :key="index"
            class="show-container"
            :src="item.path"
          />
        </div>
        <div>{{ uploadList }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const fileList = ref([])
const uploadList = ref([])
// 上传成功回调
function handleUploadSuccess(res, file) {
  if (res.code === 200) {
    uploadList.value.push({ path: res.file_path })
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