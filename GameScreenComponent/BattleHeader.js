import { View , Text } from 'react-native';
export default function BattleHeader({ myRate = 1200, myColors = ["#FF3B30","#FFCC00","#34C759","#007AFF"], enemyRate = 1180, enemyColors = [] }) {
  return (
    <View
      style={{
        marginTop: 48,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.25)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* --- LEFT PLAYER --- */}
      <View style={{ alignItems: "center" }}>
        <View style={{flexDirection:"row"}}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              backgroundColor: "#34C759",
              marginBottom: 4,
            }}
          />
          <View>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 , }}>
              ⭐ {myRate}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 4, flexWrap:'wrap'}}>
              {myColors.slice(0,2).map((c, i) => (
                <View key={i} style={{ width: 24, height: 24, backgroundColor: c, }} />
              ))}
              
            </View>
            <View style={{flexDirection:'row',borderRadius:8}}>
              {myColors.slice(2,4).map((c, i) => (
                <View key={i} style={{ width: 24, height: 24, backgroundColor: c, }} />
              ))}
            </View>
          </View>
          
        </View>
        <View style={{flexDirection:"row"}}>
          
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 , marginLeft:-59}}>あなた</Text>
          {/* Little color chips */}
          
        </View>


      </View>

      {/* VS */}
      <Text style={{ fontSize: 20, fontWeight: "900", color: "#fff" }}>VS</Text>

      {/* --- RIGHT PLAYER --- */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: "#00C6FF",
            marginBottom: 4,
          }}
        />
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>相手</Text>

        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
          ⭐ {enemyRate}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 4, gap: 4 }}>
          {enemyColors.map((c, i) => (
            <View key={i} style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: c }} />
          ))}
        </View>
      </View>
    </View>
  );
}