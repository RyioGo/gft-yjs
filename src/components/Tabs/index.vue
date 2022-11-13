<script lang="ts">
import { Component, PropSync, Prop, Vue } from "vue-property-decorator";
@Component
export default class MyTabs extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  dataSource!: Array<{ name: string; value: number }>;

  @PropSync("tab", { type: Number, required: true }) isTab!: number;

  toggleTab(item: { name: string; value: number }): void {
    this.isTab = item.value;
  }
}
</script>

<template>
  <div class="tab">
    <div
      @click="toggleTab(item)"
      :class="{ item: true, isActive: isTab == item.value }"
      v-for="(item, index) in dataSource"
      :key="index"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<style lang="less">
.tab {
  display: flex;
  align-items: center;
  .item {
    flex: 1;
    padding: 16px 0;
    text-align: center;
    position: relative;
    color: #333;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0%;
      background-color: #8fd3f4;
      height: 3px;
      transition: width ease 0.3s;
    }
  }
  .isActive {
    color: #000;
    font-weight: 500;
    &::after {
      width: 50%;
    }
  }
}
</style>
