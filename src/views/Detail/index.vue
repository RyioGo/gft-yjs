<script lang="ts">
import { Component, Vue, Ref, Watch } from "vue-property-decorator";

import MyFooter from "@/components/Footer/index.vue";

import Storage from "@/libs/storage";

import request from "@/api/request";
import {
  detail_type,
  itemArray_type,
  resourceArray_type,
} from "@/types/detail";
@Component({
  components: { MyFooter },
})
export default class SelectView extends Vue {
  //  数据源
  public data: detail_type = Storage.get("getApplicationInfo");
  //  tab页标记
  public tabKey = 0;
  //  事项依据详情
  public detail: itemArray_type = {
    condition: [],
    formId: "",
    handleLevel: "",
    isMust: null,
    itemCode: "",
    itemId: "",
    itemName: "",
    itemServiceType: "",
    limitTime: 0,
    limitType: "",
    orgCode: "",
    orgName: "",
    passType: "",
    resourceArray: [],
    resultName: "",
  };
  @Watch("tabKey")
  private getDetail(n: number) {
    this.detail = this.data.itemArray[n];
  }

  //  过滤选项卡的配置项
  public farmetDataToMenu(arr: Array<itemArray_type>) {
    return arr.map((item: itemArray_type, index: number) => {
      return {
        text: item.itemName + "明细",
        value: index,
      };
    });
  }

  //  前往申报
  public toSubmit() {
    this.$router.push("/submit");
  }

  private created() {
    this.detail = this.data.itemArray[0];
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
        <p>关于申报{{ data.flowName }}须知</p>
      </div>
    </div>
    <div class="main">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="tabKey"
          :options="farmetDataToMenu(data.itemArray)"
          get-container=".nav"
        />
      </van-dropdown-menu>
      <div class="detail">
        <van-cell-group>
          <van-cell
            title-class="title-cell"
            value-class="value-cell"
            title="业务名称"
            :value="detail.itemName"
          />
          <van-cell
            title-class="title-cell"
            value-class="value-cell"
            title="业务编号"
            :value="detail.itemId"
          />
          <van-cell
            title-class="title-cell"
            value-class="value-cell"
            title="业务编码"
            :value="detail.itemCode"
          />
          <van-cell
            title-class="title-cell"
            value-class="value-cell"
            title="相关机构"
            :value="detail.orgName"
          />
        </van-cell-group>
      </div>
      <div class="detail">
        <van-cell-group>
          <van-cell title="受理条件" />
          <van-cell
            v-for="(item, index) in detail.condition"
            :key="index"
            label-class="label-cell"
            :title="``"
            :label="item.name"
          />
        </van-cell-group>
      </div>
      <div class="detail">
        <van-cell-group>
          <van-cell title="所需材料" />
          <van-cell
            v-for="(item, index) in detail.resourceArray"
            :key="index"
            label-class="label-cell"
            :title="``"
          >
            <template #label>
              <van-tag
                v-show="item.must == '1'"
                plain
                type="danger"
                style="margin-left: 3px"
              >
                必填
              </van-tag>
              <span>
                {{ index + 1 + ". " + item.resourceName }}
              </span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="btn">
        <van-button type="info" size="large" @click="toSubmit">
          已阅，开始办理
        </van-button>
      </div>
    </div>
    <MyFooter />
  </div>
</template>
<style lang="less">
.index-main {
  position: relative;
  .header {
    color: #fff;
    position: relative;
  }
  .main {
    .detail {
      margin-top: 12px;
      box-shadow: @shadow;
      border-radius: @radio;
      .title-cell {
        width: 20%;
        flex: none;
      }
      .value-cell {
        margin-left: 12px;
        text-align: left;
      }
      .label-cell {
        font-size: 14px;
        line-height: 1.5;
      }
    }
    .btn {
      margin-top: 12px;
    }
  }
}
</style>
