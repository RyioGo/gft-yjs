<template>
  <div class="Upload">
    <van-uploader v-model="fileList" :after-read="afterRead" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import request from "@/api/request";
import { fileList, materials_type } from "@/types/components";
@Component
export default class MyUpload extends Vue {
  //prop
  @Prop(Boolean) required!: boolean;
  @Prop({ default: 3, type: Number }) limit!: number;

  //propsync
  @PropSync("file", { type: Array, required: true })
  fileList!: Array<fileList>;

  //methods
  public async afterRead(file: any) {
    file.status = "uploading";
    file.message = "上传中...";
    /*     const res = await request.uploadFileToNetPan(file);
    if (res && res.state == '200') {
      console.log(1);
    } */
    file.status = "done";
    file.message = "成功";
  }

  private created() {
    console.log(this.fileList);
  }
}
</script>

<style scoped lang="less">
.Upload {
  position: relative;
}
</style>
