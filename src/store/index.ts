import Vue from "vue";
import Vuex from "vuex";
import Utils from "@/libs/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadData: {
      show: false,
      message: "加载中...",
    },
  },
  getters: {},
  mutations: {
    setLoadData(state, value) {
      switch (Utils.typeOf(value)) {
        case "string":
          state.loadData.message = value;
          state.loadData.show = true;
          break;
        case "boolean":
          state.loadData.show = value;
          state.loadData.message = "加载中...";
          break;
        default:
          state.loadData = value;
      }
    },
  },
  actions: {},
  modules: {},
});
