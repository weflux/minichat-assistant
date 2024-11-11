import { View } from '@tarojs/components'
import { Button } from '@antmjs/vantui'
import { useUserStore } from 'src/stores/user-store'
import Taro from '@tarojs/taro'
import { useEffect } from 'react'

export default function Index() {
  const user = useUserStore.use.user()
  const setUser = useUserStore.use.setUser()

  useEffect(() => {
    console.log('user', user)
    if (user.userName)
      Taro.navigateBack({
        delta: 1,
        fail: () => Taro.redirectTo({ url: '/pages/index/index' })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    Taro.showToast({ title: '登录成功' })
    setUser({
      userName: 'hyacinth',
      avatar: 'https://avatars.githubusercontent.com/u/11801806?v=4',
      role: 'admin'
    })
    setTimeout(() => {
      Taro.navigateBack({
        delta: 1,
        fail: () => Taro.redirectTo({ url: '/pages/index/index' })
      })
    }, 1500)
  }

  return (
    <View className='index'>
      <View>
        <Button type='primary' onClick={handleClick}>Login</Button>
      </View>
    </View>
  )
}
