import  { useState } from "react"
import { Tabbar, TabbarItem } from "@antmjs/vantui"


const TabBar = () => {

	const [active, setActive] = useState<string | number>(0)

	return (
		<Tabbar
			active={active}
			onChange={e => setActive(e.detail)}
		>
			<TabbarItem icon='home-o'>首页</TabbarItem>
			<TabbarItem icon='setting-o'>我的</TabbarItem>
		</Tabbar>
	)
}

export default TabBar
