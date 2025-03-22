import {View} from "@tarojs/components"
import {NavBar, Toast} from "@antmjs/vantui"

const Post = () => {
  return (
    <View>
      <NavBar
        title='发布'
        leftText='返回'
        rightText='确认'
        leftArrow
        onClickLeft={() => Toast.show({ message: '点击按钮 返回' })}
        onClickRight={() => Toast.show({ message: '点击按钮 right' })}
      />
      <Toast />
    </View>
  )
}

export default Post;
