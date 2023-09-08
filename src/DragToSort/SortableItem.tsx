import { ReactElement } from "react";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
  index: number;
  offsets: { y: Animated.SharedValue<number> }[];
  children: ReactElement;
  width: number;
  height: number;
  activeCard: Animated.SharedValue<number>;
}

export const SortableItem = ({index, offsets, children, height, width, activeCard}: Props) => {
  const currentOffset = offsets[index];
  const isGestureActive = useSharedValue(false);

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const onGestureHandler = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      isGestureActive.value = true;
      activeCard.value = index;
      ctx.startY = currentOffset.y.value;
    },
    onActive: (evt, ctx) => {
      x.value = evt.translationX;
      y.value = ctx.startY + evt.translationY;

      const offsetY = Math.round(y.value / height) * height;

      offsets.forEach((offset, i) => {
        if (offset.y.value === offsetY && index !== i) {
          offset.y.value = currentOffset.y.value;
          currentOffset.y.value = offsetY;
        }
      });
    },
    onEnd: () => {
      isGestureActive.value = false;
      x.value = withSpring(0);
      y.value = withSpring(currentOffset.y.value);
    },
  });

  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return y.value;
    } else {
      return withSpring(currentOffset.y.value);
    }
  });

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    zIndex: activeCard.value === index ? 100 : 1,
    transform: [
      {translateX: x.value},
      {translateY: translateY.value},
      {scale: withSpring(isGestureActive.value ? 1.05 : 1)}
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureHandler}>
      <Animated.View style={style}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};
