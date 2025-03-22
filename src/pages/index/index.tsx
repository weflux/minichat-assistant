import {View} from "@tarojs/components";
import {Col, Image, Row} from "@antmjs/vantui";
import {useUserStore} from "src/stores/user-store";
import Taro from "@tarojs/taro"
import {useEffect} from "react"
import "./index.less";

export default function Index() {
  const user = useUserStore.use.user();
  useEffect(() => {
    if (!user?.id)
      Taro.navigateTo({
        url: "/pages/login/index",
      });
  }, [user?.id]);


  return (
    <View className='text-center'>
      <Row>
        <Col span={12}>{user.displayName}</Col>
        <Col span={2} offset={20}>
          <Image src={user?.avatarUrl ?? ""} round width={40} height={40} />
        </Col>
      </Row>
    </View>
  );
}
