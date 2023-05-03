<template>
  <div class="page-container">
    <h2 class="page-header">创建项目</h2>
    <div class="page-content">
      <el-card>
        <el-form label-position="top" label-width="80px" :model="createForm">
          <el-form-item label="项目名称">
            <el-input v-model="createForm.description"></el-input>
          </el-form-item>
          <el-form-item label="最小募资金额（ETH）">
            <el-input v-model="createForm.minInvest"></el-input>
          </el-form-item>
          <el-form-item label="最大募资金额（ETH）">
            <el-input v-model="createForm.maxInvest"></el-input>
          </el-form-item>
          <el-form-item label="募资上限（ETH）">
            <el-input v-model="createForm.goal"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createProject" :loading="createForm.loading">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const createForm = ref({
  description: '',
  minInvest: 0,
  maxInvest: 0,
  goal: 0,
  loading: false
})
import web3 from '../../libs/web3';
import ProjectList from '../../libs/projectList';

    const createProject = async () => {
      const { description, minInvest, maxInvest, goal } = createForm.value;
      console.log(createForm);

      console.log('description', description)

      // 字段合规检查
      if (!description) {
        return ElMessage.error('项目名称不能为空')
      }
      if (minInvest <= 0) {
        return ElMessage.error('项目最小投资金额必须大于0')
      }
      if (maxInvest <= 0) {
        return ElMessage.error('项目最大投资金额必须大于0')
      }
      if (maxInvest < minInvest) {
        return ElMessage.error('项目最小投资金额必须小于最大投资金额')
      }
      if (goal <= 0) {
        return ElMessage.error('项目募资上限必须大于0')
      }

      const minInvestInWei = web3.utils.toWei(minInvest, 'ether');
      const maxInvestInWei = web3.utils.toWei(maxInvest, 'ether');
      const goalInWei = web3.utils.toWei(goal, 'ether');

      try {
        createForm.value.loading = true

        // 获取账户
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];

        // 创建项目
        const result = await ProjectList.methods
          .createProject(description, minInvestInWei, maxInvestInWei, goalInWei)
          .send({ from: owner, gas: '5000000' });

        ElMessage.success('项目创建成功')
        
        console.log(result);

        setTimeout(() => {
          location.href = '/';
        }, 1000);
      } catch (err) {
        console.error(err);
        ElMessage.error(err.message || err.toString)
      } finally {
        createForm.value.loading = false
      }
    }
</script>

<style>
</style>