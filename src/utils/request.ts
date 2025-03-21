import Taro from "@tarojs/taro";
import qs from 'query-string'
import {useUserStore} from "src/stores/user-store";

// 获取后端地址前缀
const baseUrl = process.env.API_BASE_URL;
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
console.log('编译环境：', env, baseUrl)

// 后端返回的结构体
interface APIResponse<T> {
  data: T,
  success: boolean,
  code: string,
  message: string,
}

const TOKEN_KEY = "TOKEN_KEY"
const TOKEN_VALUE = "TOKEN_VALUE"

const request = {
  baseUrl: baseUrl,

  setBaseUrl(url: string) {
    this.baseUrl = url;
  },

  async doRequest(params: { url: string, data: any, contentType?: string }, method = "GET") {
    let {url, data} = params
    const header: any = {}

    const token = useUserStore.getState().token;
    if (token) {
      // header.token = token
      header['Authorization'] = `Bearer ${token}`;
    }

    // -- 设置contentType
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    header['content-type'] = contentType

    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: baseUrl + url,
      data: data,
      method: method,
      header: header,
    }
    const result = await Taro.request(option as Taro.request.Option).catch((err) => {
      console.error("Taro request error:", err)
      Taro.showToast({title: "请求服务器失败，请稍后重试!", duration: 3000, icon: "error"})
    })
    if (!result) {
      return;
    }
    if (result.statusCode === 200) {
      return result.data.data
    } else if (result.statusCode == 401) {
      // 清除Token
      Taro.removeStorageSync(TOKEN_KEY)
      Taro.removeStorageSync(TOKEN_VALUE)
      console.error('未登录')
    } else {
      console.error("Request error", result.data)
      const resp = result.data as APIResponse<any>
      Taro.showToast({title: resp.message, duration: 3000, icon: "error"})
    }
  },

  get(url: string, data = {}) {
    let params
    if (data) {
      const query = qs.stringify(data)
      params = {url: url + '?' + query}
    } else {
      params = {url}
    }
    return this.doRequest(params)
  },
  post(url: string, data = {}) {
    let params = {url, data}
    return this.doRequest(params, 'POST')
  },

  put(url: string, data) {
    let params = {url, data}
    return this.doRequest(params, 'PUT')
  },

  delete(url: string) {
    let params = {url}
    return this.doRequest(params, 'DELETE')
  },
}

export default request
