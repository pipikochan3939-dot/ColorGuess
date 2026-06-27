import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const SERVER_URL = "http://10.195.58.9:3000"; // ★ここを自分のPCのIPに変える！

export default function ColorList() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/colors`);
        if (!res.ok) {
          throw new Error("サーバーエラー: " + res.status);
        }
        const data = await res.json();
        setColors(data);
      } catch (e) {
        setError(e.message ?? "通信エラー");
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color List</Text>
      <FlatList
        data={colors}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={[styles.colorPreview, { backgroundColor: item.code }]} />
            <Text style={styles.text}>
              {item.name} — {item.code}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  colorPreview: { width: 24, height: 24, borderRadius: 4, marginRight: 8 },
  text: { fontSize: 16 }
});
