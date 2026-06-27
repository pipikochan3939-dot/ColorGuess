// SlotPreview.js
import { View, Text, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

function usePulse(active) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) {
      a.stopAnimation();
      a.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(a, { toValue: 1, duration: 600, useNativeDriver: false }),
        Animated.timing(a, { toValue: 0, duration: 600, useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [active]);
  return a.interpolate({ inputRange: [0, 1], outputRange: [0.2,0.6] });
}

function Slot({ color, active, index, onPress }) {
  const scale = useRef(new Animated.Value(active ? 1.06 : 1)).current;
  const shadow = useRef(new Animated.Value(active ? 1 : 0)).current;
  const pulse = usePulse(active);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1.06 : 1,
      useNativeDriver: true,
      bounciness: 6,
      speed: 20,
    }).start();
    Animated.timing(shadow, {
      toValue: active ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [active]);

  const boxShadow = {
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: active ? 0.25 : 0.12,
    shadowRadius: active ? 10 : 6,
    shadowOffset: { width: 0, height: active ? 8 : 4 },
    // Android
    elevation: active ? 6 : 2,
  };

  const borderStyle = color
    ? { borderWidth: 1, borderColor: "rgba(0,0,0,0.08)" }
    : { borderWidth: 2, borderStyle: "dashed", borderColor: `rgba(0,0,0,${pulse})` };

  return (
    <Pressable onPress={onPress} style={{ padding: 6 }}>
      <Animated.View
        style={[
          {
            width: 64,
            height: 64,
            borderRadius: 12,
            backgroundColor: color || "transparent",
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale }],
          },
          borderStyle,
          boxShadow,
        ]}
      >
        {!color && <Text style={{ color: "#888", fontWeight: "700" }}>{index + 1}</Text>}
      </Animated.View>
    </Pressable>
  );
}

/**
 * props:
 *  - values: string[]  // HEX色 or null（例: ["#FF3B30", null, ...]）
 *  - focusedIndex: number // いま編集中スロット
 *  - onFocus: (i)=>void   // スロットタップでフォーカス変更
 */
export default function SlotPreview({
  values = [null, null, null, null],
  focusedIndex = 0,
  onFocus = () => {},
  label = "選択中",
}) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#fff", opacity: 0.9, marginBottom: 6, fontWeight: "700" }}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        {values.map((v, i) => (
          <Slot key={i} index={i} color={v} active={i === focusedIndex} onPress={() => onFocus(i)} />
        ))}
      </View>
    </View>
  );
}

