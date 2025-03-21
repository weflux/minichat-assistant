import {View} from '@tarojs/components'
import {Button} from '@antmjs/vantui'
import {useUserStore} from 'src/stores/user-store'
import Taro from '@tarojs/taro'
import {useEffect} from 'react'
import AuthAPI from "src/api/auth"

export default function Index() {
  const setToken = useUserStore.use.setToken()
  const user = useUserStore.use.user()
  const setUser = useUserStore.use.setUser()

  useEffect(() => {
    console.log('user', user)
    if (user.id)
      Taro.navigateBack({
        delta: 1,
        fail: () => Taro.redirectTo({url: '/pages/index/index'})
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = async () => {
    const {code} = await Taro.login();
    console.log('authCode', code)
    const data = await AuthAPI.getToken({
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
      avatar: data.user.avatar_url,
      role: "user"
    })


    // Taro.showToast({ title: '登录成功' })
    // setUser({
    //   userName: 'hyacinth',
    //   avatar: 'https://avatars.githubusercontent.com/u/11801806?v=4',
    //   role: 'admin'
    // })
    // setTimeout(() => {
    //   Taro.navigateBack({
    //     delta: 1,
    //     fail: () => Taro.redirectTo({ url: '/pages/index/index' })
    //   })
    // }, 1500)
  }

  return (
    <View className='index'>
      <View>
        <Button type='primary' onClick={handleClick}>微信登录</Button>
      </View>
    </View>
  )
}
