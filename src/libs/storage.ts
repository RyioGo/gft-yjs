/**
 * @author Ryio
 * @description 本地缓存
 * */

// 默认有效时间
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

const createStorage = (prefixKey = "", storage = localStorage) => {
  class Storage {
    private storage = storage;
    private prefixKey?: string = prefixKey;

    /**
     * @description 处理存储数据的前缀
     * @param {key: string}
     */
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * @description 获取值
     * @param {key: string, def: any}
     * */
    public get(key: string, def: any = null) {
      const data = storage.getItem(this.getKey(key));
      if (data) {
        try {
          const { value, expire } = JSON.parse(data);
          if (expire === null || expire >= Date.now()) {
            return value;
          } else {
            this.remove(key);
          }
        } catch (error) {
          return def;
        }
      } else {
        return def;
      }
    }

    /**
     * @description 存储值
     * @param {key: string, value: any, expire: number | null}
     * */
    public set(
      key: string,
      value: any,
      expire: number | null = DEFAULT_CACHE_TIME
    ) {
      const data = {
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      };
      this.storage.setItem(this.getKey(key), JSON.stringify(data));
    }

    setCookie(
      name: string,
      value: any,
      expire: number | null = DEFAULT_CACHE_TIME
    ) {
      document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
    }

    /**
     * 根据名字获取cookie值
     * @param name
     */
    getCookie(name: string): string {
      const cookieArr = document.cookie.split("; ");
      for (let i = 0, length = cookieArr.length; i < length; i++) {
        const kv = cookieArr[i].split("=");
        if (kv[0] === this.getKey(name)) {
          return kv[1];
        }
      }
      return "";
    }

    /**
     * 根据名字删除指定的cookie
     * @param {string} key
     */
    removeCookie(key: string) {
      this.setCookie(key, 1, -1);
    }

    /**
     * 清空cookie，使所有cookie失效
     */
    clearCookie(): void {
      const keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie = keys[i] + "=0;expire=" + new Date(0).toUTCString();
        }
      }
    }

    /**
     * @description 清除值
     * @param {key: string}
     * */
    public remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * @description 清空storage
     * */
    public clear(): void {
      this.storage.clear();
    }
  }

  return new Storage();
};

export default createStorage(process.env.VUE_APP_NAME);
