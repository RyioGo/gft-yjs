import moment from "moment";
moment.locale("zh-cn");

class Utils {
  //src - 图片路径，deg旋转角度
  async rotateBase64Img(src: string, edg: number, callback: any) {
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    let imgW; // 图片宽度
    let imgH; // 图片高度
    let size; // canvas初始大小
    if (edg % 90 != 0) {
      console.error("旋转角度必须是90的倍数!");
    }
    edg < 0 && (edg = (edg % 360) + 360);
    const quadrant = (edg / 90) % 4; // 旋转象限
    const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; // 裁剪坐标
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = await function () {
      imgW = image.width;
      imgH = image.height;
      size = imgW > imgH ? imgW : imgH;
      canvas.width = size * 2;
      canvas.height = size * 2;
      switch (quadrant) {
        case 0:
          cutCoor.sx = size;
          cutCoor.sy = size;
          cutCoor.ex = size + imgW;
          cutCoor.ey = size + imgH;
          break;
        case 1:
          cutCoor.sx = size - imgH;
          cutCoor.sy = size;
          cutCoor.ex = size;
          cutCoor.ey = size + imgW;
          break;
        case 2:
          cutCoor.sx = size - imgW;
          cutCoor.sy = size - imgH;
          cutCoor.ex = size;
          cutCoor.ey = size;
          break;
        case 3:
          cutCoor.sx = size;
          cutCoor.sy = size - imgW;
          cutCoor.ex = size + imgH;
          cutCoor.ey = size + imgW;
          break;
      }
      ctx.translate(size, size);
      ctx.rotate((edg * Math.PI) / 180);
      ctx.drawImage(image, 0, 0);
      const imgData = ctx.getImageData(
        cutCoor.sx,
        cutCoor.sy,
        cutCoor.ex,
        cutCoor.ey
      );
      if (quadrant % 2 == 0) {
        canvas.width = imgW;
        canvas.height = imgH;
      } else {
        canvas.width = imgH;
        canvas.height = imgW;
      }
      ctx.putImageData(imgData, 0, 0);
      // 获取旋转后的base64图片
      callback(canvas.toDataURL());
    };
  }
  //base64图片转成文件流格式
  base64ToFile(data: string, fileName: string) {
    const dataArr = data.split(",");
    const byteString = atob(dataArr[1]);
    const options: object = {
      type: "image/jpeg",
      endings: "native",
    };
    const u8Arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      u8Arr[i] = byteString.charCodeAt(i);
    }
    const formData = new FormData();
    const fileOfBlob = new File([u8Arr], fileName + ".jpg", options); //返回文件流
    formData.append("file", fileOfBlob);
    return formData;
  }
  GetRequest() {
    const url = decodeURI(window.location.search);
    const theRequest: any = new Object();
    if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    return theRequest;
  }
  // 时间格式工具
  moment = moment;
  //  校验数据类型
  typeOf(data: any) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
}

export default new Utils();
