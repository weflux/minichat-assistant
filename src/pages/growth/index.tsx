import {View} from "@tarojs/components"
import {Calendar, Col, Empty, Row} from "@antmjs/vantui"

const Index = () => {
  const minDate = new Date()
  const maxDate = new Date()
  return (
    <View>
      <Row>
        <Col span={24}>
          <Calendar
            poppable={false}
            showConfirm={false}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Col>
        <Col span={24}>
          <Empty description='成长系统施工中...' />
        </Col>
      </Row>

    </View>
  )
}

export default Index;
