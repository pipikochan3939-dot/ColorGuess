import { View, Text, Pressable } from "react-native";

export default function WinScreen({
  visible = false,           // 表示するかどうか
  answerColors = [],         // 正解の色配列 ["#FF3B30", ...]
  tries = 0,                 // 何手でクリアしたか
  deltaRate = 0,             // レート変動量
  onNext,                    // 次の問題へ
  onBackHome,                // ホームへ戻る
}) {
  if (!visible) return null; // 非表示なら何も描画しない

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 280,
          paddingVertical: 18,
          paddingHorizontal: 16,
          borderRadius: 24,
          backgroundColor: "#FFD54A",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
            color: "#6B3A00",
            marginBottom: 8,
          }}
        >
          CLEAR!!
        </Text>

        {/* 正解色の列 */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {answerColors.map((c, i) => (
            <View
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: c,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            />
          ))}
        </View>

        {/* スコア情報 */}
        <Text style={{ color: "#6B3A00", fontSize: 14, marginBottom: 4 }}>
          {tries} 手でクリア！
        </Text>
        <Text
          style={{
            color: "#6B3A00",
            fontSize: 12,
            opacity: 0.8,
            marginBottom: 16,
          }}
        >
          レート +{deltaRate}
        </Text>

        {/* ボタンエリア */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {/* 次の問題 */}
          <Pressable
            onPress={onNext}
            style={{
              flex: 1,
              backgroundColor: "#FF8A00",
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>次の問題へ</Text>
          </Pressable>

          {/* ホーム */}
          <Pressable
            onPress={onBackHome}
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#6B3A00", fontWeight: "800" }}>ホーム</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
