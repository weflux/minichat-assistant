import {View} from '@tarojs/components'
import {MiniLoginButton} from '@antmjs/vantui'
import {useUserStore} from 'src/stores/user-store'
import Taro, {useLoad} from '@tarojs/taro'
import {useEffect} from 'react'
import UsersAPI from "src/api/auth"

export default function Index() {
  const setToken = useUserStore.use.setToken()
  const user = useUserStore.use.user()
  const setUser = useUserStore.use.setUser()

  const removeUser = useUserStore.use.removeUser();
  const removeToken = useUserStore.use.removeToken();

  useLoad(() => {
    removeUser()
    removeToken()
  })

  useEffect(() => {
    console.log('user', user)
    if (user.id)
      Taro.navigateBack({
        delta: 1,
        fail: () => Taro.redirectTo({url: '/pages/index/index'})
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async ({code}: { code: string }) => {
    console.log('authCode', code)
    const data = await UsersAPI.getToken({
      grant_type: 'weixin_miniprogram',
      authorization_code: code
    })
    console.log(data)
    setToken(data.token)
    Taro.showToast({title: '登录成功'})
    setUser({
      id: data.user.id,
      name: data.user.name,
      displayName: data.user.display_name,
      avatarUrl: data.user.avatar_url,
      role: "user"
    })

    setTimeout(() => {
      Taro.navigateBack({
        delta: 1,
        fail: () => Taro.redirectTo({url: '/pages/index/index'})
      })
    }, 1500)
  }

  const handleFail = async () => {

  }

  return (
    <View>
      <View className='flex items-center justify-center h-screen'>
        <MiniLoginButton type='primary' onFail={handleFail} onGetLoginCode={handleLogin}>微信登录</MiniLoginButton>
      </View>
    </View>
  )
}
