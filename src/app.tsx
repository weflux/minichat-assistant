import Taro from "@tarojs/taro";
import "./app.less";


const App = ({ children }: React.PropsWithChildren) => {
  Taro.setNavigationBarColor({
    frontColor: "#000000",
    backgroundColor: "#ffffff",
    animation: {
      duration: 400,
      timingFunc: "easeIn",
    },
  });


  return (
    <>
      {children}
    </>
  );
};

export default App;
