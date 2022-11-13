<template>
  <div id="app">
    <!-- 开启顶部安全区适配 -->
    <van-nav-bar safe-area-inset-top />
    <router-view />
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
    <van-overlay :show="$store.state.loadData.show" class="g-load" lock-scroll>
      <van-loading color="#0094ff" vertical>
        {{ $store.state.loadData.message }}
      </van-loading>
    </van-overlay>
  </div>
</template>

<style lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100vw;
  min-height: 100vh;
}

#app {
  /*   background-image: linear-gradient(180deg, #84fab0 0%, #8fd3f4 50%); */
  .g-load {
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.index-main {
  .header {
    .title {
      position: absolute;
      top: 50px;
      left: 50%; //12px
      transform: translateX(-50%);
      font-size: 28px;
    }
    .desc {
      position: absolute;
      top: 100px;
      left: 50%; //12px
      width: 100%;
      text-align: center;
      transform: translateX(-50%);
      font-size: 16px;
    }
  }
}
</style>
