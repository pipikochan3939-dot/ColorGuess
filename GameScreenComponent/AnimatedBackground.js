// AnimatedBackground.js
import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, StyleSheet } from "react-native";

export default function AnimatedBackground({ children }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 0 → 1 → 0 をずっと繰り返す
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 8000,       // 8秒かけて下へ
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 8000,       // 8秒かけて上へ戻る
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [anim]);

  // 0〜1 を -20〜20px の上下移動に変換
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 20],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { transform: [{ translateY }] },
      ]}
    >
      <ImageBackground
        source={require("../assets/HomeBackground.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
