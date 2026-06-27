import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeBackGround:{
    flex:1,
  },
  image:{
    width:400,height:400,marginTop:100
  },
  startButton:{
    width:150,
    backgroundColor: "#ce8a02ff",
    borderRadius: 30,paddingVertical: 14, 
    paddingHorizontal: 34,shadowColor: "#000000", 
    shadowOpacity: 0.15, shadowRadius: 14, 
    shadowOffset: { width: 8, height: 8 },
    elevation: 6,alignItems:'center',
    marginTop:10
  },
  startButtonText:{
    fontSize:24
  },
  button:{
    width:100,height:100,marginTop:50
  }
})