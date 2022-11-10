import React, { FC, ReactNode } from "react";
import { View, Animated, PanResponder } from "react-native";

type Props = {
  children: ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
};

const SWIPE_THRESHOLD = 200;

export const SwipeContainer: FC<Props> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => true,
    onPanResponderRelease: (_evt, gestureState) => {
      const { dx } = gestureState;
      if (dx > SWIPE_THRESHOLD) {
        onSwipeRight();
      }
      if (dx < -SWIPE_THRESHOLD) {
        onSwipeLeft();
      }
      // If needed, could add up and down swipes here with `gestureState.dy`
    },
  });

  return (
    <Animated.View {...panResponder.panHandlers}>
      <View>{children}</View>
    </Animated.View>
  );
}