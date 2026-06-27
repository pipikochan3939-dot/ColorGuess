import { View , Text , Pressable , Animated } from "react-native";
import * as Haptics from 'expo-haptics';
import { useRef } from "react";
export default function HomeButton({label,onPress}){
  const pressAnim = useRef(new Animated.Value(0)).current;

  const up =()=>{
    Haptics.selectionAsync();
    Animated.timing(pressAnim,{
      toValue:0,
      useNativeDriver:true,
      speed:80,
      bounciness:0,
      duration:40
    }).start();
  };

  const down =()=>{
    
    Animated.timing(pressAnim,{
      toValue:1,
      useNativeDriver:true,
      speed:80,
      duration:40,
      bounciness:6,
    }).start();
  };

  const translateY = pressAnim.interpolate({inputRange:[0,1],outputRange:[0,4]});
  const scale = pressAnim.interpolate({inputRange:[0,1],outputRange:[1,0.98]});

  return(
    <Animated.View style={{transform:[{translateY},{scale}]}}>
      <Pressable
        onPressIn={down}
        onPressOut={up}
        onPress={onPress}
        style={({pressed})=>[
          {
            width:150,
            backgroundColor: "#ce8a02ff",
            borderRadius: 30,paddingVertical: 14, 
            paddingHorizontal: 34,shadowColor: "#000000", 
            shadowOpacity: 0.15, shadowRadius: 14, 
            shadowOffset: { width: 8, height: 8 },
            elevation: 6,alignItems:'center',
            marginTop:10
          }
        ]}
      >
        <Text style={{ color: "#4A3000", fontSize: 20, fontWeight: "900" }}>{label}</Text>
      </Pressable>
    </Animated.View>
    
  )
}