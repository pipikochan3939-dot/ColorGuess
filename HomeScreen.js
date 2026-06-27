import { View , Text , ImageBackground , Pressable , Image , Animated } from "react-native";
import { DiagonalAnimatedBackground } from "./GameScreenComponent/DiagonalAnimatedBackground"
import styles from './app.style'
import HomeButton from "./HomeButton";
export default function HomeScreen({navigation}){
  return(
    <ImageBackground
      source={require('./assets/HomeBackground.png')}
      style={styles.homeBackGround}
      resizeMode="cover"
    >
      <View style={styles.homeButtonContainer}>
        <Image
          source={require("./assets/homeTitle.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{alignItems:"center"}}>
          <HomeButton label='START' onPress={()=>navigation.navigate('Game')}/>
          <HomeButton label='遊び方'/>
        </View>
        
      </View>
    </ImageBackground>
  )
}