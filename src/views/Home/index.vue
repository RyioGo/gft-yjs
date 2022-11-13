<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import MyTabs from "@/components/Tabs/index.vue";
import MyFooter from "@/components/Footer/index.vue";
import MyContent from "@/components/Content/index.vue";

import Storage from "@/libs/storage";
import dataState from "@/assets/data.js";
import { addTag } from "@/utils/eval.js";
import { init, getToken } from "@/utils/init.js";

import { item, itemChildren, evalDataType } from "@/types/home";
import config from "@/utils/config";
import request from "@/api/request";
@Component({
  components: { MyTabs, MyFooter, MyContent },
})
export default class HomeView extends Vue {
  //  tab选项卡
  public tab = 1;
  //  列表渲染数据
  public list: Array<item> = [];
  //  须知展示状态
  public isOpen = false;
  // Watch
  @Watch("tab")
  private setTab(n: number) {
    this.getList(n);
  }

  //  前往事项选择
  public toSelect(item: item) {
    if (item.declareUrl?.length) {
      getToken().then((res: any) => {
        window.location.href = `${item.declareUrl}?auth_token=${
          res.ticket
        }&appid=${config().appid}`;
      });
    } else {
      Storage.set("select", item);
      this.$router.push("/select");
    }
  }
  //  前往办事记录
  public toRecord() {
    this.$router.push("/record");
  }
  //  查看明细
  public view() {
    /*     ImagePreview([url]); */
  }
  //  查看须知
  public open() {
    this.isOpen = true;
  }
  //  获取场景清单
  public async getList(key = 1) {
    this.list = [];
    this.$store.commit(
      "setLoadData",
      `加载${key == 1 ? "个人" : "企业"}办事清单...`
    );
    const res = await request.getNavScene({ serviceObj: key, flowType: 1 });

    if (res && res.state == "200") {
      this.list = res.info;
    }
    //  TODO
    this.list = this.list.concat(
      key == 1 ? dataState.data.p : dataState.data.e
    );
    this.$store.commit("setLoadData", false);
  }

  private created() {
    //  获取初始场景清单
    this.getList();
    //  获取
    init();
    //  设置评价参数
    const { appCode, appName, regCode, regName } = config().evalData;
    addTag(appCode, appName, regCode, regName);
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
        <p>一表申请，一套材料，一次提交。</p>
        <p>一窗受理，一网通办。</p>
      </div>
    </div>
    <div class="main">
      <!--       <div class="mine">
        <div class="item jl" @click="toRecord">
          <p>我的记录</p>
        </div>
        <div class="item jg">
          <p>我的结果</p>
        </div>
      </div> -->
      <div class="group">
        <MyTabs
          :dataSource="[
            { name: '个人办事', value: 1 },
            { name: '企业办事', value: 0 },
          ]"
          :tab.sync="tab"
        />
      </div>
      <van-cell-group class="all-list" :border="false">
        <template v-if="list.length">
          <div
            class="item-data"
            v-for="item in list"
            :key="item.flowId"
            :style="item.img ? { 'background-image': `url(${item.img})` } : ''"
          >
            <van-cell
              class="item"
              :title="item.flowName"
              clickable
              :border="false"
              label-class="item-label"
              title-class="item-title"
              value-class="item-value"
              @click="toSelect(item)"
            >
              <template #label>
                <van-row>
                  <!--                   <van-col span="12">
                    <van-button type="info" size="small" @click.stop="view()">
                      办事明细
                    </van-button>
                  </van-col> -->
                  <van-col span="24">
                    <van-button type="info" size="small" @click.stop="open">
                      办事须知
                    </van-button>
                  </van-col>
                </van-row>
              </template>
            </van-cell>
          </div>
        </template>
        <template v-else>
          <van-empty description="暂无清单" />
        </template>
      </van-cell-group>
    </div>
    <MyFooter />
    <van-popup v-model="isOpen" position="bottom" round style="height: 70vh">
      <MyContent />
    </van-popup>
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
    padding: 12px;
    .mine {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      box-shadow: @shadow;
      border-radius: @radio;
      padding: 8px;
      .item {
        width: 50%;
        text-align: center;

        p {
          height: 64px;
          line-height: 64px;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          letter-spacing: 1px;
        }
      }
      .jl {
        background-image: url("@/assets/bbqd.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
      }
      .jg {
        background-image: url("@/assets/bbjd.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 4px;
      }
    }
    .group {
      margin-top: 12px;
      border-radius: @radio;
      box-shadow: @shadow;
      background-color: #fff;
      overflow: hidden;
    }
    .all-list {
      margin-top: 8px;
      background-color: rgba(255, 255, 255, 0);
      min-height: calc(100vh - 390px);
      .item-data {
        background-image: url("@/assets/bgi.png");
        background-color: rgba(153, 153, 153, 0.512);
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 12px;
        margin-bottom: 12px;
        position: relative;
        height: 120px;
        overflow: hidden;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.152);
        }
        .item {
          z-index: 10;
          height: 120px;
          color: #fff;
          font-size: 16px;
          background-color: rgba(255, 255, 255, 0);
        }
        .item-title {
          width: 70%;
        }
        .item-value {
          width: 30%;
          flex: none;
          color: #fff;
          font-size: 14px;
        }
        .item-label {
          position: absolute;
          bottom: 10px;
          left: 12px;
        }
      }
    }
  }
}
</style>
