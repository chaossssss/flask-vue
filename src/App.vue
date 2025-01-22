<template>
  <RouterView />
</template>

<script setup>
import request from '@/utils/request'
import { onMounted } from 'vue'
onMounted(() => {
  request.get('/gov_api').then((res) => {
    console.log(res)
  })
})
</script>