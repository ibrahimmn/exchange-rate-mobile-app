import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CryptoScreen from "./Screens/CryptoScreen";
import HomeScreen from "./Screens/HomeScreen";
import ConvertScreen from "./Screens/ConvertScreen";

const navigator = createStackNavigator(
  {
   Crypto:CryptoScreen,
   Regular:ConvertScreen,
   Home:HomeScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "MoneyX",
    },
  }
);

export default createAppContainer(navigator);