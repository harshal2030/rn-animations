import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle } from "react-native-reanimated";

import { StyleGuide } from "../components";
import { PanGestureHandler } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas, clamp } from "react-native-redash";

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: any;
}

export const Cursor = ({ strokeWidth, r, theta }: CursorProps) => {
  const center = { x: r, y: r };
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      ctx.offset = polar2Canvas({
        theta: theta.value,
        radius: r,
      }, center);
    },
    onActive: (evt, ctx) => {
      const {translationX, translationY} = evt;
      // console.log({translationX, translationY});
      const x = ctx.offset.x + translationX;
      const y1 = ctx.offset.y + translationY;
      const y = x < r ? y1 : (theta.value < Math.PI ? clamp(y1, 0, r - 0.001) : clamp(y1, r, 2 * r));
      const value = canvas2Polar({x, y}, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
    },
  });

  const style = useAnimatedStyle(() => {
    const {x, y} = polar2Canvas({theta: theta.value, radius: r}, center);

    return {
      transform: [{translateX: x}, {translateY: y}],
    };
  })

  return (
    <PanGestureHandler {...{onGestureEvent}}>
      <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          width: strokeWidth,
          height: strokeWidth,
          borderRadius: strokeWidth / 2,
          borderColor: "white",
          borderWidth: 5,
          backgroundColor: StyleGuide.palette.primary,
        },
        style,
      ]}
    />
    </PanGestureHandler>
  );
};
