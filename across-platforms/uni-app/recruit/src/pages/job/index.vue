<template>
  <view class="content" v-if="jobInfo">
    <view class="jobMeta">
      <view class="title">
        <text>{{jobInfo.job}}</text>
        <text>{{jobInfo.offer}}</text>
      </view>
      <view class="condition">
        <text>{{jobInfo.address}}</text>
        <text>{{jobInfo.condition.years}}</text>
        <text>{{jobInfo.condition.degree}}</text>
      </view>
    </view>
    <view class="poster">
      <image src="/static/logo.png" class="avatar" />
      <view class="posterMeta">
        <view class="posterInfo">
          <text>{{jobInfo.poster.name}}</text>
          <text class="posterStatus">{{jobInfo.poster.status}}</text>
        </view>
        <view>
          <text>{{jobInfo.company.name}}·{{jobInfo.poster.position}}</text>
        </view>
      </view>
    </view>
    <view class="detail">
      <view>
        <text class="title">职位详情</text>
      </view>
      <view class="tags">
        <tag v-for="tag in jobInfo.tags" :text="tag" :key="tag" />
      </view>

      <view>
        <text class="jd">{{jobInfo.condition.detail}}</text>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import Tag from '../../components/Tag.vue';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const jobInfo = ref();

onLoad((option) => {
  const { id } = option;
  uni.getStorage({
    key: 'jobList',
    success: (res: any) => {
      const jobList = res.data;
      const targetJob = jobList.find((item: any) => item.id == id);
      const data = {
        ...targetJob,
        id,
        condition: {
          years: '5-10年',
          degree: '大专',
          detail: `
            岗位职责
                1. 参与需求功能的评审，并提出合理化建议；
                2.良好的产品文档阅读能力；
                3. 参与H5/PC/小程序 各业务端的功能开发；
                4. 高度还原UI给定设计图并完成业务功能；
                5. 领导安排的其他任务。
                任职要求：
                1）5年以上WEB 前端开发经验；
                2）熟练掌握HTML、CSS、Vue、javascript、nodejs等基本知识；
                3）熟练掌握Git、NPM等工具；
                4）逻辑思维严谨，良好的沟通能力和团队合作能力 。
                `
        },
        poster: {
          name: 'Mrs. Li',
          status: '刚刚活跃',
          position: 'HRM'
        },
      }
      jobInfo.value = data;
    }
  })

})
</script>
<style scoped lang="scss">
page {
  background-color: #FFF;
}

.content {
  padding: 0rpx $uni-spacing-row-base;
}


$border-color: #efefef8c;
$block-padding: 30rpx 0;

.jobMeta {
  padding: $block-padding;
  border-bottom: 1px solid $border-color;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .condition {
    display: flex;
    font-size: 12px;
    margin-top: 10rpx;
    display: flex;
    gap: 20rpx;
  }
}

.poster {
  padding: $block-padding;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;

  .avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }

  .posterMeta {
    margin-left: 20rpx;
    font-size: 14px;

    .posterInfo {
      display: flex;
      align-items: center;
      gap: 10rpx;
      margin-bottom: 4rpx;

      .posterStatus {
        color: #CCC;
        font-size: 12px;
      }
    }
  }
}

.detail {
  padding: $block-padding;

  .title {
    font-weight: bold;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
    margin: 10rpx 0;
  }

  .jd {
    font-size: 12px;
  }
}
</style>