import { View } from "@tarojs/components";
import React from "react"

type PageContainerProps = {
	title: string
	// className: string
	children: React.ReactNode
}

const PageContainer = (props:PageContainerProps) => {
	return (
		<View>
			{props.children}
		</View>
	)
}

export default PageContainer;
