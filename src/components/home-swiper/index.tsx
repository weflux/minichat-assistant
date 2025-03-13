import { Swiper, SwiperItem, View } from "@tarojs/components";
import { Image } from "@antmjs/vantui";
import { useState } from "react";

const images = [
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
  // "https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg",
  // "https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg",
];

const HomeSwiper = () => {
  const [initPage] = useState(0);
  const [height] = useState(200);

  return (
    <View>
      <Swiper
        className='h-50'
        indicatorActiveColor='#426543'
        autoplay
        circular
        interval={3000}
        current={initPage}
        indicatorDots
      >
        {images.map((item, index) => (
          <SwiperItem key={`swiper#demo1${index}`}>
            <Image src={item} fit='cover' width='100%' height={`${height}px`} />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeSwiper;
