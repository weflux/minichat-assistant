import wxuma from "umtrack-wx";
import aliuma from "umtrack-alipay";
import { TARO_ENV } from "src/types";

const env: TARO_ENV = process.env.TARO_ENV;
type UMA = typeof wxuma | typeof aliuma;

const UMA_MAP: Record<TARO_ENV, UMA> = {
  weapp: wxuma,
  alipay: aliuma,
};

const uma: UMA = UMA_MAP[env];

export default uma;
