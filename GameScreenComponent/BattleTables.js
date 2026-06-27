import { View , Text , ScrollView} from "react-native";
import { useItems } from "../Context";
import { useRef } from "react";
function MiniRow({ guess = [] }) {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {guess.map((c, i) => (
        <View
          key={i}
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            backgroundColor: c ?? "transparent",
            borderWidth: 1,
            borderColor: c? "#ccc": "transparent",
          }}
        />
      ))}
    </View>
  );
}


/** 1行（左：MiniCard／右：HとBの数） */
function HistoryRow({ guess, hit, blow}) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 44,                 // ← 行を少し低く
        borderTopWidth: 2,
        borderColor: "#2E6BBF",
      }}
    >
      {/* 左セル：ミニカード */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MiniRow guess={guess} />
      </View>

      {/* 右側：H / B */}
      <View
        style={{
          width: 60,                // ← 右側を少し細く(最初72)
          flexDirection: "row",
          borderLeftWidth: 2,
          borderColor: "#2E6BBF",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRightWidth: 2,
            borderColor: "#2E6BBF",
          }}
        >
          <Text style={{ color: "#1F3E72", fontSize: 18, fontWeight: "800" }}>{hit}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#1F3E72", fontSize: 18, fontWeight: "800" }}>{blow}</Text>
        </View>
      </View>
    </View>
  );
}

/** 表全体（ヘッダー付き） */
function HistoryTable({
  title = "あなた",
  data = [
    { guess: ["#FF3B30", "#FFCC00", "#34C759", "#007AFF"], hit: 0, blow: 0 },
    { guess: ["#AF52DE", "#FF8800", "#39393A", "#E5E5EA"], hit: 1, blow: 2 },
    { guess: ["#34C759", "#FFCC00", "#007AFF", "#FF3B30"], hit: 0, blow: 1 },
  ],
  guessList=[],
  listLength,
  rows = 6, // ← 6行にして高さを抑える（必要なら5〜7で調整）
  style,
}) {
  const scrollRef = useRef(null);
  const pad = Array.from({ length: Math.max(0, rows - guessList.length) }, () => ({
    guess: [null, null, null, null],
    hit: 0,
    blow: 1,
    empty: true,
  }));
  const list = [...guessList, ...pad];

  return (
    <View
      style={[
        {
          backgroundColor: "#4C86D9",
          borderRadius: 16,
          padding: 8,
          width: "48%",            // ← 2枚並べても収まる
          overflow: "hidden",
        },
        style,
      ]}
    >
      {/* ヘッダー */}
      <View
        style={{
          flexDirection: "row",
          height: 28,              // ← 少し低く
          alignItems: "center",
          paddingHorizontal: 8,
          borderBottomWidth: 2,
          borderColor: "#2E6BBF",
        }}
      >
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: "#FFFFFF", fontSize: 14, fontWeight: "800" }}
        >
          {title}
        </Text>
        <View style={{ width: 72, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#E8F1FF", fontWeight: "800", letterSpacing: 1 }}>H</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#E8F1FF", fontWeight: "800", letterSpacing: 1 }}>B</Text>
          </View>
        </View>
      </View>

      {/* 本体 */}
      <ScrollView 
        ref={scrollRef} 
        showsVerticalScrollIndicator={false} 
        style={{ maxHeight: 44 * rows , }}
        onContentSizeChange={(w,h)=>{
          scrollRef.current?.scrollTo({ x: 0, y: h, animated: true });
        }}
        >
        {list.map((r, idx) => (
          <HistoryRow key={idx} guess={r.guess} hit={r.empty ? "" : r.hit} blow={r.empty ? "" : r.blow} />
        ))}
      </ScrollView>
    </View>
  );
}

/** 2枚並べた“対戦表”（あなた / 相手） */
export default function BattleTables() {
  const {guessList} = useItems();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        gap: 10,
        paddingHorizontal: 12,
        paddingTop: 8,
        marginTop:10,
        marginBottom:-100
      }}
    >
      <HistoryTable title="あなた" rows={6} guessList={guessList} />
      <HistoryTable title="相手" rows={6} />
    </View>
  );
}