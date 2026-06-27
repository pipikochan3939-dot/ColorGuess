import { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";

export function StartOverlay({ visible, onDone , slideWord}) {
  const x = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");

  useEffect(() => {
    if (!visible) return;

    // 初期位置を左外へ、透明から
    x.setValue(-width);
    opacity.setValue(0);

    Animated.sequence([
      // フェードインしながら中央へ
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.timing(x, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]),
      // 少し見せる
      Animated.delay(360),
      // 右外へスライドアウト
      Animated.timing(x, { toValue: width, duration: 420, useNativeDriver: true }),
      // フェードアウト
      Animated.timing(opacity, { toValue: 0, duration: 140, useNativeDriver: true }),
    ]).start(() => {
      onDone?.();
    });
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 999,
        alignItems:"center",
        justifyContent:"center",
        flex:1
      }}
    > 
        <Animated.View style={{ opacity, transform: [{ translateX: x }] }}>
          <Text
            style={{
              fontSize: 56,
              fontWeight: "900",
              color: "#4A3000",
              letterSpacing: 2,
              textShadowColor: "rgba(0,0,0,0.18)",
              textShadowRadius: 10,
              textShadowOffset: { width: 0, height: 4 },
            }}
          >
            {slideWord}
          </Text>
        </Animated.View>
    </View>
  );
}