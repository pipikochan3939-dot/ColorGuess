import { Pressable, Animated, Text } from "react-native";
import { useRef } from "react";
import * as Haptics from "expo-haptics";

export default function ActionButton({ label, onPress ,decideOpacty}) {
  const anim = useRef(new Animated.Value(0)).current;

  const down = () =>{
    if(decideOpacty!==1) return
    Animated.timing(anim, { toValue: 1, useNativeDriver: true, duration: 60 }).start();
  }
    

  const up = () => {
    Haptics.selectionAsync();
    Animated.timing(anim, { toValue: 0, useNativeDriver: true, duration: 70 }).start();
    onPress && onPress();
  };

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 5] });

  return (
    <Animated.View style={{ transform: [{ translateY }], width: 130, height: 58 ,opacity:decideOpacty}}>
      {/* 影（下の土台） */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#C49A3A",
          borderRadius: 16,
          transform: [{ translateY: 5 }],
        }}
      />
      {/* 本体 */}
      <Pressable
        onPressIn={down}
        onPressOut={up}
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#6A4A00", fontSize: 20, fontWeight: "900" }}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}
