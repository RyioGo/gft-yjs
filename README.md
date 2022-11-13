# gft-ylb

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import MyTabs from "@/components/Tabs/index.vue";
import MyFooter from "@/components/Footer/index.vue";
import MyContent from "@/components/Content/index.vue";
import { ImagePreview } from "vant";

import Storage from "@/libs/storage";
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
  public tab = "个人办事";
  //  tab二级选项卡
  public twoTab = "全部";
  //  列表渲染二级tabs
  public tabs: Array<string> = [];
  //  列表渲染数据
  public list: Array<item> = [];
  //  须知展示状态
  public isOpen = false;
  // Watch
  @Watch("tab")
  private setTab(n: string) {
    switch (n) {
      case "企业办事":
        this.legal();
        break;
      default:
        this.personal();
        break;
    }
  }
  @Watch("twoTab")
  private setTwoTab() {
    switch (this.tab) {
      case "企业办事":
        this.legal();
        break;
      default:
        this.personal();
        break;
    }
  }

  //  个人办事清单
  private personal() {
    import("@/assets/data.js").then(({ default: res }) => {
      if (res && res.code == 200) {
        this.list =
          this.twoTab == "全部"
            ? res.data.p
            : this.filltenData(this.twoTab, res.data.p);
      }
    });
  }
  private filltenData(key: string, arr: item[]) {
    return arr.filter((item) => {
      return item.mainOrg == key;
    });
  }
  //  企业办事清单
  private legal() {
    import("@/assets/data.js").then(({ default: res }) => {
      if (res && res.code == 200) {
        this.list =
          this.twoTab == "全部"
            ? res.data.e
            : this.filltenData(this.twoTab, res.data.e);
      }
    });
  }
  //  前往事项详情
  public toSelect(item: item) {
    Storage.set("select", item);
    if (item.url?.length) {
      /* window.location.href = */
      getToken().then((res: any) => {
        window.location.href = `${item.url}?auth_token=${res.ticket}&appid=${
          Storage.get("appid") || "appid"
        }`;
      });
    } else {
      this.$router.push("/select");
    }
  }
  //  前往办事记录
  public toRecord() {
    this.$router.push("/record");
  }
  //  查看明细
  public view(url: string) {
    ImagePreview([url]);
  }
  //  查看须知
  public open() {
    this.isOpen = true;
  }

  private created() {
    request.getNavScene().then((res) => {
      Storage.set("get", res);
    });
    import("@/assets/data.js").then(({ default: res }) => {
      if (res && res.code == 200) {
        this.tabs = res.data.tabs;
      }
    });
    this.personal();
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
      <div class="mine">
        <div class="item jl" @click="toRecord">
          <p>我的记录</p>
        </div>
        <div class="item jg">
          <p>我的结果</p>
        </div>
      </div>
      <div class="group">
        <MyTabs :dataSource="['个人办事', '企业办事']" :tab.sync="tab" />
        <van-tabs color="#8fd3f4" v-model="twoTab">
          <van-tab
            v-for="item in tabs"
            :key="item"
            :name="item"
            :title="item"
          />
        </van-tabs>
      </div>
      <van-cell-group class="all-list" :border="false">
        <template v-if="list.length">
          <div
            class="item-data"
            v-for="item in list"
            :key="item.id"
            :style="{ backgroundImage: `url(${item.img})` }"
          >
            <van-cell
              class="item"
              :title="item.title + '一件事'"
              :value="'共' + item.children.length + '项业务'"
              clickable
              :border="false"
              label-class="item-label"
              title-class="item-title"
              value-class="item-value"
              @click="toSelect(item)"
            >
              <template #label>
                <van-row :gutter="8">
                  <van-col span="12">
                    <van-button
                      type="info"
                      size="small"
                      @click.stop="view(item.bsmx)"
                    >
                      办事明细
                    </van-button>
                  </van-col>
                  <van-col span="12">
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
    .title {
      position: absolute;
      top: 50px;
      left: 12px;
      font-size: 28px;
    }
    .desc {
      position: absolute;
      top: 100px;
      left: 12px;
      font-size: 16px;
    }
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
        background-color: rgba(153, 153, 153, 0.512);
        background-size: 100% 100%;
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
