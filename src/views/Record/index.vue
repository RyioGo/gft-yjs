<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyFooter from "@/components/Footer/index.vue";
import { record_item_type } from "@/types/record";

import Storage from "@/libs/storage";
@Component({
  components: { MyFooter },
})
export default class RecordView extends Vue {
  //  开启加载数据
  public loading = false;
  //  是否所有数据加载完毕
  public finished = false;
  //  列表数据源
  public list: record_item_type[] = [];

  //  触底加载函数
  public onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.push({
          RECEIVCE_ID: "业务流水号" + this.list.length,
          APPLY_SUBJECT: "申办主题" + i,
          BIZ_ID: "业务标识" + i,
          STATUS: "业务状态" + i,
          APPLY_TIME: "申报时间" + i,
          OPINION_DETAIL: "不予受理详细意见" + i,
        });
      }

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.list.length >= 70) {
        this.finished = true;
      }
    }, 1000);
  }
  //  前往办件记录明细页
  public toRecordDetail(item: record_item_type) {
    Storage.set("record-detail", item);
    this.$router.push("/record-detail");
  }
}
</script>
<template>
  <div class="index-main">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="item" v-for="item in list" :key="item.RECEIVCE_ID">
        <van-cell-group :border="false">
          <van-cell title="流水号" :value="item.RECEIVCE_ID" />
          <van-cell title="申办主题" :value="item.APPLY_SUBJECT" />
          <van-cell title="业务标识" :value="item.BIZ_ID" />
          <van-cell title="业务状态" :value="item.STATUS" />
          <van-cell title="申报时间" :value="item.APPLY_TIME" />
          <van-cell clickable @click="toRecordDetail(item)">
            <template>
              <p class="view">查看明细</p>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
    <MyFooter />
  </div>
</template>

<style scoped lang="less">
.index-main {
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  .item {
    box-shadow: @shadow;
    border-radius: @radio;
    padding: 8px;
    margin-bottom: 12px;
    .view {
      text-align: center;
      color: #1989fa;
    }
  }
}
</style>
