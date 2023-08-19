/* eslint-disable react-native/no-unused-styles */

import { View, StyleSheet } from "react-native";

import { StyleGuide } from "../components";
import { ReText, round } from "react-native-redash";
import { SharedValue, useAnimatedReaction, useDerivedValue, useSharedValue, withDecay, withDelay, withTiming } from "react-native-reanimated";

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});

console.log({ styles });

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: SharedValue<DataPoint>;
}

export const Label = ({point}: LabelProps) => {
  const date = useDerivedValue(() => {
    return new Date(point.value.data.x).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  const price = useDerivedValue(() => {
    let price = `$${round(point.value.data.y, 2).toLocaleString("en-US", {
      currency: "USD",
    })}`;

    return price;
  });
  return (
    <View>
      <ReText style={styles.date} text={date} />
      <ReText style={styles.price} text={price} />
    </View>
  );
};
