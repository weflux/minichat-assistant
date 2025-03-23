import {View} from "@tarojs/components"
import {PropsWithChildren} from "react"

const FloatButton = (props: PropsWithChildren<{}>) => {

  return (<View className='fixed mb-10 mr-4'>{props.children}</View>)
}

export default FloatButton;
