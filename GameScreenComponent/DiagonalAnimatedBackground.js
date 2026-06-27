// DiagonalAnimatedBackground.js
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const BG = require("../assets/HomeBackground.png");

export default function DiagonalAnimatedBackground({ children }) {
  const { width, height } = useWindowDimensions();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 25000, // 好きな速度でOK
        useNativeDriver: true,
      })
    ).start();
  }, [anim]);

  // 0 → 1 で「タイル1枚ぶん」だけ動かす
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],   // 左方向へ1枚ぶん
  });
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height],  // 上方向へ1枚ぶん
  });

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* 🔸 3×3 の巨大タイルを斜めに動かすレイヤー */}
      <Animated.View
        style={[
          {
            position: "absolute",
            // 3×3 分の大きさ
            width: width * 3,
            height: height * 3,
            // 真ん中のタイルがちょうど画面に来るように配置
            left: -width,
            top: -height,
            transform: [{ translateX }, { translateY }],
          },
        ]}
      >
        {/*
          3×3のタイル配置
          (row: 0,1,2 / col: 0,1,2)
        */}
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <Image
              key={`${row}-${col}`}
              source={BG}
              style={{
                position: "absolute",
                width,
                height,
                left: width * col,
                top: height * row,
                resizeMode: "cover",
              }}
            />
          ))
        )}
      </Animated.View>

      {/* 🔸 UI は別レイヤーに乗せる（動かない） */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
}
