<template>
  <div class="footer">
    <img class="logo" src="@/assets/gft.png" alt="赣服通" />
    <p class="provider">本服务由新余市政务服务中心提供</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MyFooter extends Vue {}
</script>

<style scoped lang="less">
.footer {
  height: 56px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .logo {
    width: 24px;
    height: 24px;
  }
  .provider {
    height: 20px;
    font-size: 10px;
    color: #000;
  }
}
</style>
