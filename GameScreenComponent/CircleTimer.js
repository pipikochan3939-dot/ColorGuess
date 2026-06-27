import { View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { DrawerActions } from "@react-navigation/native";

export default function CircleTimer({ duration = 60 }) {
  const [time, setTime] = useState(duration);
  const [elapsedTime,setElapsedTime] = useState(duration) // 正確な残り時間
  const startRef = useRef(Date.now());        // 開始時刻を記録

  const size = 70;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const floor = Math.floor(elapsed);
      const remain = duration - floor;
      const remainElapsed = duration - elapsed;

      setTime(remain >= 0 ? remain : 0);
      setElapsedTime(remainElapsed>=0?remainElapsed:0)
    }, 16); // 0.2秒で十分滑らか
    if(time||elapsedTime<=0) return ()=>clearInterval(id)
    return () => clearInterval(id);
  }, []);

  // 円の進捗を秒数から計算
  const progress = 1 - elapsedTime / duration;
  const offset = circumference * progress;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        {/* 背景 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffe08a"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* 進捗（アニメなし・計算で制御） */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ff9500"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      <Text
        style={{
          position: "absolute",
          fontSize: 24,
          fontWeight: "700",
          color: "#ff9500",
        }}
      >
        {time}
      </Text>
    </View>
  );
}
