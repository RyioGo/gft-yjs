<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyFooter from "@/components/Footer/index.vue";

@Component({
  components: { MyFooter },
})
export default class RecordDetailView extends Vue {}
</script>
<template>
  <div class="index-main">
    <MyFooter />
  </div>
</template>

<style scoped lang="less">
.index-main {
  position: relative;
}
</style>
