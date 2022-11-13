import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//  初始化根节点size
import "@/libs/rem";
//  导入自定义插件包
import PluginInstall from "@/libs/plugin";

PluginInstall(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
