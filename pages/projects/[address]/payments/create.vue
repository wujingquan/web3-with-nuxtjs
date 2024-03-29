<template>
  <div class="page-container">
    <h2 class="page-header">创建资金支出请求</h2>
    <div class="page-content">
      <el-card>
        <el-form label-position="top" label-width="80px" :model="createForm">
          <el-form-item label="项目名称">
            <el-input :placeholder="project.description + '(' + project.balance + ' ETH)'" disabled></el-input>
          </el-form-item>
          <el-form-item label="支出理由">
            <el-input v-model="createForm.description"></el-input>
          </el-form-item>
          <el-form-item label="支出金额（ETH）">
            <el-input v-model="createForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="收款账户">
            <el-input v-model="createForm.receiver"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createProject" :loading="createForm.loading">立即创建</el-button>
          </el-form-item>
          <el-alert v-if="createForm.errmsg" :title="createForm.errmsg" type="error" />
        </el-form>
      </el-card>
    </div>
  </div>
</template>


<script lang="ts" setup>
import web3 from '../../../../libs/web3';
import Project from '../../../../libs/project';

const route = useRoute()
const createForm = reactive({
  description: '',
  amount: 0,
  receiver: '',
  errmsg: '',
  loading: false,
})
const project = ref({})
{
  const contract = Project(route.params.address as string);
  const summary = await contract.methods.getSummary().call();
  const description = summary[0];
  const balance = web3.utils.fromWei(summary[4], 'ether');
  const owner = summary[7];
  project.value = { address: route.params.address, description, owner, balance }
}

const createProject = async () => {
  const { description, amount, receiver } = createForm;
  console.log('receiver', receiver)

  // 字段合规检查
  if (!description) {
    return ElMessage.error('支出理由不能为空')
  }
  if (amount <= 0) {
    return ElMessage.error('支出金额必须大于0');
  }
  if (!web3.utils.isAddress(receiver)) {
    return ElMessage.error('收款人账户地址不正确')
  }

  const amountInWei = web3.utils.toWei(amount, 'ether');
  let loading
  try {
    loading = ElLoading.service()

    // 获取账户
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    // 检查账户
    if (sender !== project.value.owner) {
      return ElMessage.error('只有管理员能创建资金支出请求');
    }

    // 创建项目
    const contract = Project(project.value.address);
    const result = await contract.methods
      .createPayment(description, amountInWei, receiver)
      .send({ from: sender, gas: '5000000' });

    ElMessage.success('资金支出请求创建成功');
    console.log(result);

    setTimeout(() => {
      location.href = `/projects/${project.value.address}`;
    }, 1000);
  } catch (err) {
    console.error(err);
    ElMessage.error(err.message || err.toString);
  } finally {
    loading?.close()
  }
}

</script>
