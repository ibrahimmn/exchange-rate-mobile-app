import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, ImageBackground  } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const CryptoScreen = ({navigation}) => {

    const [ratesList, setRatesList] = useState([]);

    useEffect(() => {

        getRates();      
    
    },
    []);

    const getRates = async () => {

      const getList = await axios(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/try.json`); //Getting data from API

      //Using .data.try to get the rates and put them into "rates"
      const rates = getList.data.try; 
      const ratesTemp = [];

      const cryptoCoins = ["btc","eth","ada","bnb","usdt","xrp","sol","dot","doge"];

      //Looping through "rates" and filtering out the unwanted rates
      for (const [symbol, rate] of Object.entries(rates)) {

        if(cryptoCoins.includes(symbol)){
          ratesTemp.push({ symbol, rate });
        }
      }
      //Putting the crypto currencies' rates into a state variable so that when they change the screen rerenders
      setRatesList(ratesTemp);        
    } 

   return(
    //Showing the rates
    <View style={styles.container}>
    <ImageBackground source={require("../img/img1.jpg")} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Crypto prices in TL : </Text>
      
      <View style={styles.pricecont}>
        <FlatList
          keyExtractor={(rate) => rate.symbol}
          data={ratesList}
          renderItem={(element) => {
            return (
              <Text style={styles.pricetext} >
              1 {element.item.symbol} = {(1/element.item.rate).toFixed(2)}TL
              </Text>
            );
          }}
        /> 
      </View>      

      <View style={styles.buttoncontainer}>
        
        <TouchableOpacity style={styles.button}
        onPress={()=> navigation.navigate("Regular")}>
          <Text style={styles.buttontext}> Go to converter</Text>          
        </TouchableOpacity>

        </View>

    </ImageBackground>
    
    </View>    
);
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    image: {
      flex: 1,
      
    },

    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
    pricetext:{
      color: "white",
      fontSize: 22,
      lineHeight: 34,
      padding:5,
      textTransform:"uppercase",
    
    },
    pricecont:{
        backgroundColor:"#000000c0",
        padding:20,
        alignItems:"center",
        
    },
    button:{
        backgroundColor:"#00FF00",
        paddingHorizontal:8,
        alignItems:"center",
        borderRadius:20,
 
    },
    buttoncontainer:{
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        flex:1,
        justifyContent: 'flex-end'
                                   
    },
    buttontext:{
        color: "white",
      fontSize: 28,     
      fontWeight: "bold",
     
    },
  });

export default CryptoScreen;