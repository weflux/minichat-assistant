import wxuma from "umtrack-wx";
import aliuma from "umtrack-alipay";
import { TARO_ENV } from "src/types";

const dev = process.env.NODE_ENV === "development";
const env: TARO_ENV = process.env.TARO_ENV || "weapp";
type UMA = typeof wxuma | typeof aliuma;

const UMA_MAP: Record<TARO_ENV, UMA> = {
  weapp: wxuma,
  alipay: aliuma,
};

export const defaultConfig = {
  appKey: "YOUR_APP_KEY", // 由友盟分配的APP_KEY
  debug: dev, // 是否打开调试模式
  uploadUserInfo: false, // 自动上传用户信息，设为false取消上传，默认为false
  // 剪切板功能是用于埋点验证获取测试设备信息的；当开启为true时，用户侧可能会被提示获取剪切板信息；请确认线上发布版本设置为false；在进行发版前埋点验证工作时，可以参数设置为true
  enableVerify: false,
};

const uma: UMA = UMA_MAP[env];

export default uma;
