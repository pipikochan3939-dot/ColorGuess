import { View , Text , Pressable , Animated} from "react-native";
import CircleTimer from "./CircleTimer";
import { useEffect, useRef } from "react";

const Selected=({label,active,color})=>{
  const scale = useRef(new Animated.Value(active?1.1:1)).current;
  useEffect(()=>{
    Animated.spring(scale,{
      toValue:active?1.1:1,
      useNativeDriver:true,
      speed:20,
      bounciness:6
    }).start();
  },[active])

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
    : { borderWidth: 2, borderStyle: "dashed", borderColor: `rgba(0,0,0,)`}
  return(
    <Animated.View style={{padding:7,transform:[{scale}],}}>
      <Pressable  style={[{backgroundColor:color||'tranceparent',width:64,height:64,borderRadius:15,alignItems:"center",justifyContent:"center"},boxShadow,borderStyle]}>
        <Text style={{color:'gray',fontSize:18,fontWeight:'500'}}>{label+1}</Text>
      </Pressable>
    </Animated.View>
  )
}

export default function SelectedColor({
  cards=[null,null,null,null],
  onFocus,
  focusIndex=0,
  isNotsatisfy,
  label
}
){
  return(
    <View style={{ alignItems: "center" }}>
      <View style={{position:"absolute",bottom:60}}>
        <CircleTimer/>
      </View>
      
    <View style={{flexDirection:"row",marginBottom:10,}}>
      {cards.map((c,index)=>(
        <Selected key={index} label={index} active={isNotsatisfy&&index===focusIndex} color={c}/>
      ))}
    </View>
    </View>
  )
}