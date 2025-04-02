import Taro from "@tarojs/taro";
import qs from 'query-string'
import { useUserStore } from "src/stores/user-store";
import { Toast } from "@antmjs/vantui"

// 获取后端地址前缀
const baseUrl = process.env.API_BASE_URL;
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'

console.log('编译环境：', env, baseUrl)

// 后端返回的结构体
interface APIResponse<T> {
  data?: T
  code: number
  message: string
}

const request = {
  baseUrl: baseUrl,

  setBaseUrl(url: string) {
    this.baseUrl = url;
  },

  async safeRequest(params: { url: string; data: any; contentType?: string }, method = "GET") {
    const { url, data } = params
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
      .then(res => {
        console.log(`${url} response`, res)
        if (res.statusCode === 200) {
          const resp = res.data as APIResponse<any>
          if (resp && resp.code === 0) {
            return Promise.resolve(resp.data)
          } else {
            return Promise.reject(resp.message)
          }
        } else if (res.statusCode === 401) {
					console.log('unauthorized')
          // 清除Token
          // const removeUser = useUserStore.use.removeUser()
          // const removeToken = useUserStore.use.removeToken()
          // removeUser()
          // removeToken()
          setTimeout(() => {
						console.log('redirect to login')
            Taro.navigateTo({ url: '/pages/login/index' })
          }, 500)
					Toast.fail('用户未登录或已过期')
          return Promise.reject()
        }
      }).catch(err => {
        console.log(err)
				Toast.fail('用户未登录或已过期')
				return Promise.reject(err)
        // Taro.showToast({ title: err, duration: 3000, icon: "error" })
      })
  },

  get(url: string, data = {}) {
    let params
    if (data) {
      const query = qs.stringify(data)
      params = { url: url + '?' + query }
    } else {
      params = { url }
    }
    return this.safeRequest(params)
  },
  post(url: string, data = {}) {
    const params = { url, data }
    return this.safeRequest(params, 'POST')
  },

  put(url: string, data = {}) {
    const params = { url, data }
    return this.safeRequest(params, 'PUT')
  },

  delete(url: string) {
    const params = { url }
    return this.safeRequest(params, 'DELETE')
  },
}

export default request
