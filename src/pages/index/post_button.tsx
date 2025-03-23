import {View} from "@tarojs/components"
import {Icon} from "@antmjs/vantui"

interface FloatPostButtonProps {
  onClick: () => void;
}

const FloatPostButton = (props: FloatPostButtonProps) => {
  return (
    <View className='float-post-button'>
      <Icon name='add' color='red' size='100' onClick={props.onClick} />
    </View>
  )
}
export default FloatPostButton;
