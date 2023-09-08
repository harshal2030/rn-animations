import type { ReactElement } from "react";
import React from "react";
import { ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { SortableItem } from "./SortableItem";

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

export const SortableList = ({ children, item: {height, width} }: SortableListProps) => {
  const activeCard = useSharedValue(-1);
  const offsets = children.map((_, index) => ({ y: useSharedValue(index * height) }));

  return (
    <ScrollView contentContainerStyle={{height: height * children.length}}>
      {children.map((child, index) => {
        return (
          <SortableItem index={index} offsets={offsets} key={index} height={height} width={width} activeCard={activeCard}>
            {child}
          </SortableItem>
        );
      })}
    </ScrollView>
  );
};
