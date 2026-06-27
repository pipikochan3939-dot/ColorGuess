import { useEffect, useRef, useState } from "react";
import { View , Animated, Pressable ,} from "react-native";
import * as Haptics from 'expo-haptics';

export default function SelectButton({
  depth=12,
  color="#FF3B30",
  underColor="#c03028ff",
  onPress,
  canNotSelect,
  endCanNotSelect
})
{
  const anim = useRef(new Animated.Value(0)).current;
  const [press,setPress] = useState(false);

  const pressIn =()=>setPress(true);
  const pressOut =()=>{
    setPress(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  useEffect(()=>{
    Animated.timing(anim,{
      toValue:press?1:canNotSelect?0.7:0,
      duration:80,
      useNativeDriver:true
    }).start()
  },[press,canNotSelect])
  const translateY = anim.interpolate({inputRange:[0,1],outputRange:[0,depth]});
  const elevation  = anim.interpolate({ inputRange: [0, 1], outputRange: [8, 2] });
  return(
    <View style={{width:88,height:72,marginLeft:5}}>
      <View
        style={{
          position:"absolute",
          left:0,
          right:0,
          bottom:0,
          height:72,
          borderRadius:16,
          backgroundColor:underColor,
          transform:[{translateY:depth}]
        }}/>
          <Animated.View
            style={{
              transform:[{translateY}]
          }}>
            <Pressable
              onPressIn={pressIn}
              onPressOut={pressOut}
              onPress={canNotSelect||endCanNotSelect?null:onPress}
              style={{
                backgroundColor:color,
                height:72,
                borderRadius:16
              }}
              >
            </Pressable>
          </Animated.View>
    </View>
  )
}