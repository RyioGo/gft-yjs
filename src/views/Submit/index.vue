<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";

import MyFooter from "@/components/Footer/index.vue";
import MyUpload from "@/components/Upload/index.vue";
import Storage from "@/libs/storage";

import request from "@/api/request";

import { submit_type, emsInfo_type, resEms_type } from "@/types/submit";
import { detail_type } from "@/types/detail";

@Component({
  components: { MyUpload, MyFooter },
})
export default class SubmitView extends Vue {
  public formData: submit_type = {
    flowId: "",
    selectItem: [],
    serviceObj: "",
    dataId: "",
    applyObj: {
      name: "",
      sex: "",
      address: "",
      certNo: "",
      certType: "",
      phone: "",
      isAgent: "",
      orgName: "",
      orgCode: "",
      orgType: "",
      linkMan: "",
      linkTelephone: "",
      linkEmail: "",
      linkAddress: "",
      linkMancertificateName: "",
      linkMancertificateNo: "",
      legalPerson: "",
      contactPhone: "",
      certificateNo: "",
      certificateName: "",
    },
    material: [],
    emsInfo: {
      isEms: "",
      emsName: "",
      emsAddress: "",
      emsPhone: "",
      emsAcceptPostCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      sendName: "",
      sendPhone: "",
      sendAddress: "",
    },
    resEms: {
      isEms: "",
      emsName: "",
      emsAddress: "",
      emsPhone: "",
      sender: "",
      senderPhone: "",
      emsAcceptPostCode: "",
      provinceName: "",
      cityName: "",
      county: "",
      addressDetail: "",
    },
  };
  //  业务类型： 1个人，0企业
  public formType: string = Storage.get("select").serviceObj;
  //  左侧激活导航
  public sildebarKey = "基本信息";
  //  当前待申报业务数据模型
  public dataModel: detail_type = Storage.get("getApplicationInfo");

  public onSubmit() {
    console.log();
  }
}
</script>

<template>
  <div class="index-main">
    <div class="main">
      <van-form @submit="onSubmit">
        <van-tabs
          v-model="sildebarKey"
          swipeable
          border
          color="#8fd3f4"
          class="formData"
        >
          <van-tab title="基本信息" name="基本信息" style="margin-top: 12px">
            <!-- 个人基本信息 -->
            <div class="model" v-if="formType == '1'">
              <van-cell
                title="个人基本信息"
                :title-style="{ fontWeight: 700 }"
              />
              <van-field
                v-model="formData.applyObj.name"
                name="name"
                label="申报人员"
                placeholder="请填写待申报人员姓名"
                :rules="[{ required: true, message: '请填写待申报人员姓名' }]"
              />
              <van-field
                v-model="formData.applyObj.sex"
                name="sex"
                label="性别"
                placeholder="请选择待申报人员性别"
                :rules="[{ required: true, message: '请选择待申报人员性别' }]"
              />
              <van-field
                v-model="formData.applyObj.certType"
                name="certType"
                label="证件编码"
                placeholder="请选择待申报人员证件编码"
                :rules="[
                  { required: true, message: '请选择待申报人员证件编码' },
                ]"
              />
              <van-field
                v-model="formData.applyObj.certNo"
                name="certNo"
                label="证件编号"
                placeholder="请填写待申报人员证件编号"
                :rules="[
                  { required: true, message: '请填写待申报人员证件编号' },
                ]"
              />
              <van-field
                v-model="formData.applyObj.phone"
                name="phone"
                label="联系电话"
                placeholder="请填写待申报人员联系电话"
                :rules="[
                  { required: true, message: '请填写待申报人员联系电话' },
                ]"
              />
              <van-field
                v-model="formData.applyObj.address"
                name="address"
                label="联系地址"
                placeholder="请填写待申报人员联系地址"
                :rules="[
                  { required: true, message: '请填写待申报人员联系地址' },
                ]"
              />
            </div>
            <!-- 企业基本信息 -->
            <div class="model" v-if="formType == '0'">
              <van-cell
                title="企业基本信息"
                :title-style="{ fontWeight: 700 }"
              />
              <van-field
                v-model="formData.applyObj.orgName"
                name="orgName"
                label="机构名称"
                placeholder="请填写机构名称"
                :rules="[{ required: true, message: '请填写机构名称' }]"
              />
              <van-field
                v-model="formData.applyObj.orgCode"
                name="orgCode"
                label="机构编码"
                placeholder="请填写机构编码"
                :rules="[{ required: true, message: '请填写机构编码' }]"
              />
              <van-field
                v-model="formData.applyObj.orgType"
                name="orgType"
                label="机构类型"
                placeholder="请选择机构类型"
                :rules="[{ required: true, message: '请选择机构类型' }]"
              />
              <van-field
                v-model="formData.applyObj.legalPerson"
                name="legalPerson"
                label="法定代表人"
                placeholder="请填写法人姓名"
                :rules="[{ required: true, message: '请填写法人姓名' }]"
              />
              <van-field
                v-model="formData.applyObj.contactPhone"
                name="contactPhone"
                label="法人联系电话"
                placeholder="请填写法人电话"
                :rules="[{ required: true, message: '请填写法人电话' }]"
              />
              <van-field
                v-model="formData.applyObj.certificateName"
                name="certificateName"
                label="法人证件类型"
                placeholder="请选择申报人证件类型"
                :rules="[{ required: true, message: '请选择申报人证件类型' }]"
              />
              <van-field
                v-model="formData.applyObj.certificateNo"
                name="certificateNo"
                label="法人证件编号"
                placeholder="请填写申报人证件编号"
                :rules="[{ required: true, message: '请填写申报人证件编号' }]"
              />
              <van-field
                v-model="formData.applyObj.linkMan"
                name="linkMan"
                label="申报人员"
                placeholder="请填写申报人姓名"
                :rules="[{ required: true, message: '请填写申报人姓名' }]"
              />
              <van-field
                v-model="formData.applyObj.linkMancertificateName"
                name="linkMancertificateName"
                label="证件类型"
                placeholder="请选择申报人证件类型"
                :rules="[{ required: true, message: '请选择申报人证件类型' }]"
              />
              <van-field
                v-model="formData.applyObj.linkMancertificateNo"
                name="linkMancertificateNo"
                label="证件编号"
                placeholder="请填写申报人证件编号"
                :rules="[{ required: true, message: '请填写申报人证件编号' }]"
              />
              <van-field
                v-model="formData.applyObj.linkTelephone"
                name="linkTelephone"
                label="联系电话"
                placeholder="请填写联系电话"
                :rules="[{ required: true, message: '请填写联系电话' }]"
              />
              <van-field
                v-model="formData.applyObj.linkEmail"
                name="linkEmail"
                label="联系邮箱"
                placeholder="请填写联系邮箱"
                :rules="[{ required: true, message: '请填写联系邮箱' }]"
              />
              <van-field
                v-model="formData.applyObj.linkAddress"
                name="linkAddress"
                label="联系地址"
                placeholder="请填写联系地址"
                :rules="[{ required: true, message: '请填写联系地址' }]"
              />
            </div>
            <!-- 收件人信息 -->
            <div class="model" style="margin-top: 12px" v-if="false">
              <van-cell title="收件人信息" :title-style="{ fontWeight: 700 }" />
              <van-field
                name="isEms"
                label="收件方式"
                :rules="[{ required: true, message: '请选择收件方式' }]"
              >
                <template #input>
                  <van-radio-group
                    v-model="formData.emsInfo.isEms"
                    direction="horizontal"
                  >
                    <van-radio name="1">邮寄</van-radio>
                    <van-radio name="0">自取</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                v-model="formData.emsInfo.emsName"
                name="emsName"
                label="收件人姓名"
                placeholder="请填写收件人姓名"
                :rules="[{ required: true, message: '请填写收件人姓名' }]"
              />
              <van-field
                v-model="formData.applyObj.phone"
                name="phone"
                label="收件人电话"
                placeholder="请填写收件人电话"
                :rules="[{ required: true, message: '请填写收件人电话' }]"
              />
              <van-field
                v-model="formData.emsInfo.emsAddress"
                name="emsAddress"
                label="收件人地址"
                placeholder="请填写收件人地址"
                :rules="[{ required: true, message: '请填写收件人地址' }]"
              />
            </div>
          </van-tab>
          <van-tab
            style="margin-top: 12px"
            v-for="item in dataModel.itemArray"
            :title="item.itemName"
            :name="item.itemName"
            :key="item.itemId"
          >
            <div class="model">
              <van-cell-group>
                <van-cell :title="item.itemName + '业务材料'" />
                <van-cell
                  v-for="(it, key) in item.resourceArray"
                  :key="it.resourceCode"
                >
                  <template #title>
                    <van-tag
                      v-show="it.must == '1'"
                      plain
                      type="danger"
                      style="margin-left: 3px"
                    >
                      必填
                    </van-tag>
                    {{ key + 1 }}. {{ it.resourceName }}
                  </template>
                  <template #label>
                    <van-field>
                      <template #input>
                        <MyUpload :file.sync="it.uploadFile" />
                      </template>
                    </van-field>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </van-tab>
        </van-tabs>
        <div class="btn">
          <van-button block type="info" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
    <MyFooter />
  </div>
</template>
<style lang="less">
.index-main {
  position: relative;
  .main {
    .formData {
      min-height: calc(100vh - 200px);
    }
    .model {
      box-shadow: @shadow;
      border-radius: @radio;
      overflow: hidden;
    }
    .btn {
      margin-top: 12px;
    }
  }
}
</style>
