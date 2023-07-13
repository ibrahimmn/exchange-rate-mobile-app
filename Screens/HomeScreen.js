import React from "react";
import { StyleSheet, Text, View, ImageBackground  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";



const HomeScreen = ({navigation}) => (
   

    <View style={styles.container}>
    <ImageBackground source={require("../img/img1.jpg")} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Choose exchange: </Text>
    
      <View style={styles.buttoncontainer}>
        
      <TouchableOpacity style={styles.button}
       onPress={()=> navigation.navigate("Regular")}>
        <Text style={styles.buttontext}> Converter</Text>
        

      </TouchableOpacity>
      </View>
      <View style={styles.buttoncontainer}>
        
      <TouchableOpacity style={styles.button}
       onPress={()=> navigation.navigate("Crypto")}>
        <Text style={styles.buttontext}> Crypto prices</Text>
        

      </TouchableOpacity>
      </View>


    </ImageBackground>
  </View>

    
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    button:{
        backgroundColor:"#00FF00",
        height:60,
        alignItems:"center",
        borderRadius:20,
        
        

    },
    buttoncontainer:{
        justifyContent:"center",
        padding:20,
        backgroundColor: "#000000c0",
        
                    
    },
    buttontext:{
        color: "white",
      fontSize: 42,
      
      fontWeight: "bold",
      textAlign: "center",

    },
  });

export default HomeScreen;