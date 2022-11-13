import Http from "@/libs/axios";
import Utils from "@/libs/utils";
import config from "@/utils/config";

export default {
  getSign(params: any) {
    return Http.post(
      "http://ganfutong.jiangxi.gov.cn:30014/api-gateway/jpaas-jags-server/interface/createsign",
      params
    );
  },
  async getNavScene(params?: any) {
    //  配置赣服通参数
    const data = defaultParams("cjdh", params, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
    //  获取赣服通签名
    const res = await this.getSign(data);

    data.sign = res.data.sign;
    return Http.post("", data);
  },
  async getStatusItemGroups(params?: any) {
    //  配置赣服通参数
    const data = defaultParams("ltjd", params, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
    //  获取赣服通签名
    const res = await this.getSign(data);

    data.sign = res.data.sign;
    return Http.post("", data);
  },
  async getApplicationInfo(params?: any) {
    //  配置赣服通参数
    const data = defaultParams("hqsbxx", params, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
    //  获取赣服通签名
    const res = await this.getSign(data);

    data.sign = res.data.sign;
    return Http.post("", data);
  },
  async uploadFileToNetPan(params?: any) {
    //  配置赣服通参数
    const data = defaultParams("wpwjsc", params, {
      "Content-Type": "multipart/form-data",
    });

    //  获取赣服通签名
    const res = await this.getSign(data);
    data.sign = res.data.sign;
    return Http.post("", data);
  },
};

/*
key: 接口标识，data: 接口参数， header：请求头
 */
const defaultParams = (key: string, data: any = {}, header: any = {}) => {
  return {
    app_id: config().appid,
    interface_id: key,
    version: process.env.VUE_APP_API_VERSION,
    header: JSON.stringify(header),
    biz_content: JSON.stringify(data),
    charset: "UTF-8",
    timestamp: Utils.moment().valueOf(),
    //来源0：PC；1：APP；2：支付宝；3：微信
    origin: "2",
    sign: null,
  };
};
