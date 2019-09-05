import { PixelRatio, Platform } from "react-native";

const iosEdgePadding = { top: 100, right: 70, bottom: 130, left: 70 };

const androidEdgePadding = {
  top: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.top),
  right: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.right),
  bottom: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.bottom),
  left: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.left)
};
export const initialRegion = {
  latitude: 27.698616,
  longitude: 85.317633,
  latitudeDelta: 0.31,
  longitudeDelta: 0.305
};
export const edgePadding = Platform.OS === "android" ? androidEdgePadding : iosEdgePadding;
