<template>
  <div class="page-container">
    <h2 class="page-header">项目列表</h2>
    <div class="page-content">
      <el-row :gutter="24">
        <el-col :span="12" v-for="project in projects" :key="project.address">
          <el-card class="project-card">
            <template #header class="clearfix">
              <strong>{{project.description}}</strong>
              <el-button style="float: right; padding: 3px 0" text>
                <nuxt-link :to="'/projects/' + project.address">查看详情</nuxt-link>
              </el-button>
            </template>
            <div class="progress-container">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="project.progress"></el-progress>
            </div>
            <el-row :gutter="16" class="info-blocks">
              <el-col :span="8">
                <info-block :title="project.goal + ' ETH'" description="募资上限"></info-block>
              </el-col>
              <el-col :span="8">
                <info-block :title="project.minInvest + ' ETH'" description="最小投资金额"></info-block>
              </el-col>
              <el-col :span="8">
                <info-block :title="project.maxInvest + ' ETH'" description="最大投资金额"></info-block>
              </el-col>
              <el-col :span="8">
                <info-block :title="project.investorCount + ' 人'" description="参投人数"></info-block>
              </el-col>
              <el-col :span="8">
                <info-block :title="project.investorCount + ' ETH'" description="已募资金额"></info-block>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script lang="ts" setup>
// import web3 from '../libs/web3';
import Web3 from 'web3'
import ProjectList from "../libs/projectList";
import Project from "../libs/project";

interface Project {
  address: string;
  description: string;
  progress: number;
  goal: number;
  minInvest: number;
  maxInvest: number;
  investorCount: number;
}

const MockProjects: Project[] = [{
  address: '0xf01e7909f1077cd19a5c085fb120fb0bfc9aa8ca',
  description: '123123123',
  progress: 50,
  goal: 1,
  minInvest: 2,
  maxInvest: 3,
  investorCount: 4
}]
const projects = ref<Project[]>(MockProjects)
const addressList = await ProjectList.methods.getProjects().call()
projects.value = addressList
console.log('55555555')
const summaryList = await Promise.all(
  addressList.map(address => {
    console.log('start p')
    const p = Project(address)
    console.log('p', p)
    return p.methods.getSummary().call()
    // return p.methods.owner().call()
  })
)

console.log('summaryList', summaryList)

projects.value = addressList.map((address, index) => {
  const [description, minInvest, maxInvest, goal, balance, investorCount, paymentCount, owner] = Object.values(
    summaryList[index]
  );

  return {
    address,
    description,
    minInvest: Web3.utils.fromWei(minInvest, 'ether'),
    maxInvest: Web3.utils.fromWei(maxInvest, 'ether'),
    goal: Web3.utils.fromWei(goal, 'ether'),
    balance: Web3.utils.fromWei(balance, 'ether'),
    progress: Math.ceil(balance / goal * 100),
    investorCount,
    paymentCount,
    owner
  }
}).reverse();
</script>

<style>
.project-card {
  margin-bottom: 24px;
  height: 388px;
}
.info-block {
  padding: 0.5em 1em;
  border: 1px dotted #aaa;
  height: 80px;
  min-height: 80px;
  margin-bottom: 16px;
  border-radius: 5px;
}
.info-block-title {
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}
.info-block-description {
  margin: 0;
  color: #666;
}
.progress-container {
  margin-bottom: 16px;
}
</style>