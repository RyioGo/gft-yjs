import { VueConstructor } from "vue";
import Vant from "vant";
import "vant/lib/index.css";

export default (Vue: VueConstructor) => {
  Vue.use(Vant);
};
