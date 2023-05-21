import { StyleSheet, Dimensions } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import type { Cards } from "../components";
import { Card, StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: Animated.SharedValue<number>;
  index: number;
  card: Cards;
}

export const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  const alpha = interpolate(transition.value, [0, 1], [0, (index - 1) * Math.PI / 6]);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: origin },
        { rotate: `${alpha}rad` },
        { translateX: -origin },
      ],
    };
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};
