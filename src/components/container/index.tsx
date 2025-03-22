import {View} from "@tarojs/components"
import React from "react"
import {NavBar} from "@antmjs/vantui"

type IProps = {
  children: React.ReactNode
  title: string
}
const Index = (props: IProps) => {

  return (
    <View>
      <NavBar title={props.title} />
    </View>
  )
}
export default Index;
