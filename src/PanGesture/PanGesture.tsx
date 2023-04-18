import { View, StyleSheet } from "react-native";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from '../components';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { diffClamp, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay } from "react-native-reanimated";
import { clamp } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

export const PanGesture = ({ width, height }: GestureProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = clamp(ctx.startX + translationX, 0, boundX);
      translateY.value = clamp(ctx.startY + translationY, 0, boundY);
    },
    onEnd: (evt) => {
      translateX.value = withDecay({
        velocity: evt.velocityX,
        clamp: [0, boundX],
      });
      translateY.value = withDecay({
        velocity: evt.velocityY,
        clamp: [0, boundY],
      });
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  console.log({ width, height });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
