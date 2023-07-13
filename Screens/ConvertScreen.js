import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Image} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";


const ConvertScreen = ({navigation}) => {

  const [base, setBase] = useState(["usd"]);
  const [ratesList, setRatesList] = useState([]);
  const [currConvert, setCurrConvert] = useState([]);
  const [ratio, setRatio] = useState([0]);
  const [userInput, setUserInput] = useState([]);
  const [key, setKey] = useState(0);
  
  //Calling getRates everytime "base" changes in order to get the exchange rate ist of specified currency
  useEffect(() => {

      getRates();
          
  },
  [base]);

  const getRates = async () => {

    const getList = await axios(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`); //Getting data from API

      //Using .data[base] to get the rates of specified base currency and put them into "rates"
      const rates = getList.data[base]; 
      const ratesTemp = [];

      const wanted = ["kwd", "bhd", "omr", "jod", "gbp", "kyd", "eur", "chf", "usd", "bsd", "bmd", "pab", "cad", "aud", "sgd", "bnd", "nzd", "bgn", "fjd", "brl", "try"];

      //Looping through "rates" and filtering out the unwanted currencies
      for (const [symbol, rate] of Object.entries(rates)) {

        if(wanted.includes(symbol)){
          ratesTemp.push({ symbol, rate });
        }
      }
      //Putting the rates into a state variable so that when they change the screen rerenders
      setRatesList(ratesTemp);
    }  

   return(
    <View style={styles.container}>
    <ImageBackground source={require("../img/img1.jpg")} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Convert currency : </Text>

    <View style={styles.dropcont}>

      <Text style={styles.textt}> From</Text>

      <View>
      <TextInput 
      style={styles.textinput}
      placeholder="  ENTER NUMBER"
        keyboardType='numeric'
        onChangeText= {(newUserInput) => setUserInput(newUserInput)}
      />

      <SelectDropdown
      style={styles.dropdown}
        data = {ratesList}
        onSelect={(currSymbol, index) => {
          setBase(currSymbol.symbol);

          //Changing value key of second dropdown to reset it 
          setKey(key+1);
          setRatio(0);       
        }}        

        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.symbol
        }}

        rowTextForSelection={(item, index) => {
          
          return (item.symbol).toUpperCase();
        }}
      /> 
      </View>
      </View>
      <View style={styles.dropcont}>
        <Text style={styles.textt}> To</Text>
      

      <SelectDropdown key={key}
        data = {ratesList}
        onSelect={(currSymbol, index) => {
          setCurrConvert(currSymbol.symbol);
          setRatio(currSymbol.rate);          
        }}

        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.symbol
        }}

        rowTextForSelection={(item, index) => {
          return (item.symbol).toUpperCase();
        }}
      />
      
      </View>
            
      <View style={styles.pricecont}>
        <Text style={styles.pricetext}>   {ratio*userInput}             
        </Text>
      </View> 
      <View style={styles.buttoncontainer}>
        
        <TouchableOpacity style={styles.button}

        onPress={()=> navigation.navigate("Crypto")}>
        <Text style={styles.buttontext}> Go to crypto</Text>  

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
    

    },

    pricecont:{
        backgroundColor:"#000000c0",
        padding:20,
        alignItems:"center",
        marginTop:40,
        

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
    dropcont:{
      alignItems:"center",
      
    },
    
   
    textt:{
      fontSize:40,
      color:"white",

    },

    textinput:{
    
      borderColor:"white",
      borderWidth:1,
      alignItems:"center",
      marginBottom:1,
      color:"white",

      flex:0,
    
    },

    
   
  });



export default ConvertScreen;