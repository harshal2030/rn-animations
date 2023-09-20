import { StyleSheet, View } from "react-native";

import { Eye } from "./Eye";
import { Mouth } from "./Mouth";
import { SLIDER_WIDTH, Slider } from "./Slider";
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, interpolateColor } from "react-native-reanimated";


const bad = "#FDBEEB";
const normal = "#FDEEBE";
const good = "#BEFDE5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: bad,
  },
  face: {
    width: 150,
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const ShapeMorphing = () => {
  const translateX = useSharedValue(0);
  const progress = useDerivedValue(() => translateX.value / SLIDER_WIDTH);
  const container = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 0.5, 1], [bad, normal, good]),
  }));

  return (
    <Animated.View style={[styles.container, container]}>
      <View style={styles.face}>
        <View style={styles.eyes}>
          <Eye progress={progress} />
          <Eye flip progress={progress} />
        </View>
        <Mouth progress={progress} />
      </View>
      <Slider translateX={translateX} />
    </Animated.View>
  );
};
