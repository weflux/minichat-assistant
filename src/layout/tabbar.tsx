import {PropsWithChildren} from "react"
import {View} from "@tarojs/components"

const TabBar = ({children}: PropsWithChildren) => {

  return (
    <View>
      {children}
    </View>
  )
}

export default TabBar;
