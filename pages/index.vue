<script lang="ts" setup>
  import { ElMessage } from "element-plus";
  const fuck = () => ElMessage.success('fuck')
  const open  = ref(true)
</script>

<template>
  <div>
    <div class="header">
      <el-button type="default">连接钱包</el-button>
      <el-button type="default">账号信息</el-button>
      <el-button type="primary">创建项目</el-button>
      <nuxt-link to="niubi">
      <el-button type="primary">Niubi</el-button>
      </nuxt-link>
    </div>
    <div class="main">
       <div class="left">
        <ul>
          <li>所有项目</li>
          <li>已投资</li>
          <li>我创建的</li>
        </ul>
      </div>
      
      <div class="right">

        <button @click="open = true">
          Open Modal
        </button>
        <Teleport to="body">
          <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">
              Close
            </button>
          </div>
        </Teleport>

      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
}
</style>