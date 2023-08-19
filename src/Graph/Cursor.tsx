/* eslint-disable react-native/no-unused-styles */

import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, withDecay} from "react-native-reanimated";

import type { Path } from "../components/AnimatedHelpers";
import { PanGestureHandler } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const CURSOR = 100;
const styles = StyleSheet.create({
  cursorContainer: {
    width: CURSOR,
    height: CURSOR,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(100, 200, 300, 0.4)",
  },
  cursor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#367be2",
    borderWidth: 4,
    backgroundColor: "white",
  },
});

interface CursorProps {
  path: Path;
  length: Animated.SharedValue<number>;
  point: Animated.SharedValue<{
    data: {
      x: number;
      y: number;
    };
    coords: {
      x: number;
      y: number;
    };
  }>;
}

export const Cursor = ({path, length, point}: CursorProps) => {
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      ctx.offsetX = interpolate(length.value, [0, path.length], [0, width], Extrapolate.CLAMP);
    },
    onActive: (evt, ctx) => {
      length.value = interpolate(ctx.offsetX + evt.translationX, [0, width], [0, path.length], Extrapolate.CLAMP);
    },
    onEnd: (evt, ctx) => {
      length.value = withDecay({velocity: evt.velocityX, clamp: [0, path.length]});
    },
  });
  const style = useAnimatedStyle(() => {
    const translateX = point.value.coords.x - CURSOR / 2;
    const translateY = point.value.coords.y - CURSOR / 2;

    return {
      transform: [{translateX}, {translateY}],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.View style={[styles.cursorContainer, style]}>
          <View style={styles.cursor} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
