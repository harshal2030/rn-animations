import {Ref, forwardRef, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useSharedValue, withSpring} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import type { ProfileModel } from "./Profile";
import { A, Profile } from "./Profile";

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
  scale: Animated.SharedValue<number>;
}

const swipe = (translateX: Animated.SharedValue<number>, dest: number, velocity: number, onSwipe: () => void) => {
  "worklet";
  translateX.value = withSpring(
    dest,
    {
      velocity: velocity,
      restSpeedThreshold: dest === 0 ? 0.01 : 100,
      restDisplacementThreshold: dest === 0 ? 0.01 : 100
    }, () => {
    if (dest !== 0) {
      runOnJS(onSwipe)();
    }
  });
};

const {width} = Dimensions.get("window");

const snapPoints = [-A, 0, A];

type Offset = {
  x: number;
  y: number;
};

export interface Swiper {
  swipeLeft: () => void;
  swipeRight: () => void;
}

const Swipeable = ({ profile, onTop, onSwipe, scale }: SwiperProps, ref: Ref<Swiper>) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      swipe(translateX, -width, 25, onSwipe);
    },
    swipeRight: () => {
      swipe(translateX, width, 25, onSwipe);
    },
  }));

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Offset>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
      scale.value = interpolate(translateX.value, [-width / 2, 0, width / 2], [1, 0.95, 1], Extrapolate.CLAMP);
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      swipe(translateX, dest, velocityX, onSwipe);
      translateY.value = withSpring(0, {velocity: velocityY});
    },
  });

  return (
    <PanGestureHandler {...{onGestureEvent}}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Profile {...{ profile, onTop, translateX, translateY, scale }} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default forwardRef(Swipeable);
