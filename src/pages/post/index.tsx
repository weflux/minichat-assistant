import {Grid, GridItem} from "@antmjs/vantui";
import {PageContainer} from "@tarojs/components"
import Taro from "@tarojs/taro"

const Index = () => {
  const handlePost = () => {
    Taro.navigateTo({
      url: "/pages/editor/index",
    });
  }
  return (
    <PageContainer>
      <Grid columnNum='3'>
        <GridItem icon='photo-o' text='发想法' onClick={handlePost} />
        <GridItem icon='photo-o' text='发文章' onClick={handlePost} />
        <GridItem icon='photo-o' text='发打卡' onClick={handlePost} />
      </Grid>
    </PageContainer>
  )
}

export default Index;
