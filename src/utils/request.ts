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
  code: number,
  message: string,
}

const request = {
  baseUrl: baseUrl,

  setBaseUrl(url: string) {
    this.baseUrl = url;
  },

  async safeRequest(params: { url: string, data: any, contentType?: string }, method = "GET") {
    let {url, data} = params
    const header: any = {}

    const token = useUserStore.getState().token;
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }

    // -- 设置contentType
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    header['content-type'] = contentType

    const option = {
      isShowLoading: true,
      loadingText: '正在加载',
      url: baseUrl + url,
      data: data,
      method: method,
      header: header,
    }

    return Taro.request(option as Taro.request.Option)
      .then((res) => {
        console.log(res)
        if (res.statusCode === 200) {
          const resp = res.data as APIResponse<any>
          if (resp && resp.code === 0) {
            return Promise.resolve(resp.data)
          } else {
            return Promise.reject(resp.message)
          }
        } else if (res.statusCode === 401) {
          // 清除Token
          const removeUser = useUserStore.use.removeUser()
          const removeToken = useUserStore.use.removeToken()
          removeUser()
          removeToken()
          setTimeout(() => {
            Taro.navigateTo({url: '/pages/login/index'})
          }, 500)
          return Promise.reject("用户未登录或已过期")
        }
      }).catch((err) => {
        console.log(err)
        Taro.showToast({title: err, duration: 3000, icon: "error"})
      })
    // const result = await Taro.request(option as Taro.request.Option).catch((err) => {
    //   console.error("Taro request error:", err)
    //   Taro.showToast({title: "请求服务器失败，请稍后重试!", duration: 3000, icon: "error"})
    // })
    // console.log("request result", result)
    // if (!result) {
    //   return;
    // }
    // if (result.statusCode === 200) {
    //   if (result.data.code === 0) {
    //     return result.data.data
    //   } else {
    //     Taro.showToast({title: result.data.message, duration: 3000, icon: "error"})
    //   }
    // } else if (result.statusCode === 401) {
    //   // 清除Token
    //   const removeUser = useUserStore.use.removeUser()
    //   const removeToken = useUserStore.use.removeToken()
    //   removeUser()
    //   removeToken()
    //   Taro.navigateTo({url: '/pages/login/index'})
    // } else {
    //   console.error("Request error", result.data)
    //   const resp = result.data as APIResponse<any>
    //   Taro.showToast({title: resp.message, duration: 3000, icon: "error"})
    // }
  },

  get(url: string, data = {}) {
    let params
    if (data) {
      const query = qs.stringify(data)
      params = {url: url + '?' + query}
    } else {
      params = {url}
    }
    return this.safeRequest(params)
  },
  post(url: string, data = {}) {
    let params = {url, data}
    return this.safeRequest(params, 'POST')
  },

  put(url: string, data) {
    let params = {url, data}
    return this.safeRequest(params, 'PUT')
  },

  delete(url: string) {
    let params = {url}
    return this.safeRequest(params, 'DELETE')
  },
}

export default request
