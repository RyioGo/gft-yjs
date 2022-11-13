/*
 * @Descripttion:
 * @version:
 * @Author: Z
 * @Date: 2022-04-11 16:58:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-20 11:38:41
 */
import Utils from "@/libs/utils";
import Storage from "@/libs/storage";
import Http from "@/libs/axios";
import { Toast } from "vant";

export function init(auth_token) {
  let ticket = auth_token || Utils.GetRequest().auth_token;
  if (ticket == undefined) {
    Toast({
      message: "ticket获取失败",
      duration: 2000,
    });
    return;
  }
  Storage.set("appid", Utils.GetRequest().appid);
  getUserInfo(ticket);
}

export function getUserInfo(ticket) {
  Http.get(
    "https://ganfutong.jiangxi.gov.cn/jmportalgft/interfaces/getUserInfoByTicket.do",
    {
      ticket: ticket,
      appid: Storage.set("appid"),
    }
  ).then((res) => {
    if (res.token) {
      console.log(res);
      Storage.set("token", res.token);
      Storage.set("name", res.data.name);
      Storage.set("idCard", res.data.cardid);
      Storage.set("tel", res.data.mobile);
      Storage.set("sex", res.data.sex);
    }
  });
}

export function getToken() {
  return new Promise((resolve, reject) => {
    Http.get(
      "https://ganfutong.jiangxi.gov.cn/jxtyyh/interfaces/jis/getTicket.do",
      { token: Storage.get("token") }
    ).then((res) => {
      if (res.result === true) {
        resolve(res);
      } else {
        reject(res);
        Toast({
          message: "用户身份已过期",
          duration: 2000,
        });
        Storage.clear();
      }
    });
  });
}
