import { View , Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import { ItemsProvider } from "./Context";
const Stack = createStackNavigator();

export default function App(){
  return(
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown:false,
            animation:'fade'
          }}
          >
          <Stack.Screen name="home" component={HomeScreen}/>
          <Stack.Screen name="Game" component={GameScreen}/>
        </Stack.Navigator>
      </NavigationContainer> 
    </ItemsProvider>
  )
}