// src/components/AnimatedHeader.js
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
type AnimatedHeaderProps = {
  scrollY: Animated.Value;
};

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ scrollY }) => {
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}
    >
      <View style={styles.tabsContainer}>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    elevation: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
});

export default AnimatedHeader;
