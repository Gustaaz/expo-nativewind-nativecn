import { createNumberMask } from "react-native-mask-input";

export const AREA_CONSTRUIDA_MASK = createNumberMask({
  separator: ',',
  delimiter: '',
  precision: 3
})
