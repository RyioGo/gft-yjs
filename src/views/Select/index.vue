<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";

import MyFooter from "@/components/Footer/index.vue";

import Storage from "@/libs/storage";
import { item, itemChildren } from "@/types/home";
import { detailDataItem_type } from "@/types/select";

import request from "@/api/request";
import { itemArray_type, resourceArray_type } from "@/types/detail";

@Component({
  components: { MyFooter },
})
export default class SelectView extends Vue {
  //  当前半件数据业务详细
  public selectData: item = Storage.get("select");
  //  当前业务流数据结构
  public detailData: Array<detailDataItem_type> = [];
  //  折叠面板展示项
  public isOpen: Array<number> = [];
  //  自定义ref
  public boxToRef: any = {};

  //  使用方法插入ref
  public setRef(e: any, id: string) {
    this.boxToRef[id] = e;
  }

  public selected(id: string): void {
    this.boxToRef[id].toggle();
  }

  public async toDetail() {
    try {
      //  初始化已选中的事项清单
      let selectItem: string[] = [];
      this.detailData.forEach((item: detailDataItem_type) => {
        //  抛出未进行必选操作的提醒
        if (item.must == "1" && item.select?.length == 0) {
          throw new Error(`${item.statusName}业务未选择办理事项！`);
        }
        //  汇总选中的事项清单且跳过未选的业务
        if (item.select?.length) {
          item.statusMode == "0"
            ? selectItem.push(item.select as string)
            : (selectItem = selectItem.concat(item.select as string[]));
        }
      });
      this.$store.commit("setLoadData", `正在生成本次办事须知！`);
      const res = await request.getApplicationInfo({
        flowId: this.selectData.flowId,
        selectItem: selectItem.toString(),
      });
      if (res && res.state == "200") {
        //  向材料清单中注入上传文件的数据变量
        res.info.itemArray = res.info.itemArray.map((item: itemArray_type) => {
          item.resourceArray.forEach((it: resourceArray_type) => {
            it.uploadFile = [];
          });
          return item;
        });
        console.log(res.info);
        Storage.set("getApplicationInfo", res.info);
        this.$router.push("/detail");
      }
      this.$store.commit("setLoadData", false);
    } catch (error: any) {
      this.$toast({
        message: error.message,
      });
    }
  }

  private async getStatusItemGroups() {
    this.$store.commit("setLoadData", `正在配置事项清单...`);
    const res = await request.getStatusItemGroups({
      flowId: this.selectData.flowId,
    });
    if (res && res.state == "200") {
      this.detailData = res.info.map(
        (item: detailDataItem_type, index: number) => {
          // 按事项选择方式初始化备选事项清单类型
          item.select = item.statusMode == "0" ? "" : [];
          // 配置默认展开的折叠面板
          this.isOpen[index] = index;
          // 返回本次配置
          return item;
        }
      );
    }
    this.$store.commit("setLoadData", false);
  }

  private created() {
    this.getStatusItemGroups();
  }
}
</script>

<template>
  <div class="index-main">
    <div class="header">
      <van-image
        style="width: 100vw"
        height="180"
        :src="require('@/assets/banner.jpg')"
      />
      <div class="title">一事通办专区</div>
      <div class="desc">
        <p>{{ selectData.flowName }}一件事</p>
      </div>
    </div>
    <div class="main">
      <van-divider content-position="left" style="font-size: 16px">
        我要联办{{ detailData.length }}项业务
      </van-divider>
      <div class="select">
        <van-collapse :border="false" v-model="isOpen">
          <van-collapse-item
            v-for="(item, index) in detailData"
            :key="index"
            :name="index"
          >
            <template #title>
              <van-tag plain type="primary">
                {{ item.statusMode == "0" ? "单选" : "多选" }}
              </van-tag>
              <van-tag
                v-show="item.must == '1'"
                plain
                type="danger"
                style="margin-left: 3px"
              >
                必选
              </van-tag>
              <span style="margin-left: 8px">{{ item.statusName }}业务</span>
            </template>
            <!-- 单选 -->
            <template v-if="item.statusMode == '0'">
              <van-radio-group v-model="item.select">
                <van-cell-group>
                  <van-cell
                    v-for="(it, key) in item.items"
                    clickable
                    center
                    :key="key"
                    :title="it.itemName"
                    :label="`相关部门：${it.orgName}`"
                    @click="selected(it.itemId)"
                  >
                    <template #right-icon>
                      <van-radio
                        style="margin-left: 8px"
                        :name="it.itemId"
                        :ref="(e) => setRef(e, it.itemId)"
                      />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </template>
            <!-- 多选 -->
            <template v-if="item.statusMode == '1'">
              <van-checkbox-group v-model="item.select">
                <van-cell-group>
                  <van-cell
                    v-for="(it, key) in item.items"
                    clickable
                    center
                    :key="key"
                    :title="it.itemName"
                    :label="`相关部门：${it.orgName}`"
                    @click="selected(it.itemId)"
                  >
                    <template #right-icon>
                      <van-checkbox
                        style="margin-left: 8px"
                        :name="it.itemId"
                        :ref="(e) => setRef(e, it.itemId)"
                      />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </template>
          </van-collapse-item>
        </van-collapse>
        <van-empty v-show="detailData.length == 0" />
      </div>
      <div class="btn" v-if="detailData.length">
        <van-button type="info" size="large" @click="toDetail">
          下一步
        </van-button>
      </div>
    </div>
    <MyFooter />
  </div>
</template>
<style lang="less" scoped>
.index-main {
  position: relative;
  .header {
    color: #fff;
    position: relative;
  }
  .main {
    padding: 12px;
    .select {
      background-color: #fff;
      padding: 8px;
      box-shadow: @shadow;
      border-radius: @radio;
      min-height: calc(100vh - 380px);
      .item-title {
        display: flex;
        align-items: center;
      }
    }
    .btn {
      margin-top: 8px;
    }
  }
}
</style>
