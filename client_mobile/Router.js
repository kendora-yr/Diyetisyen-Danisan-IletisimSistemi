import "react-native-gesture-handler"
//import * as React from "react"
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import Characters from './../Characters';
import Giris from "./screens/GirisEkrani";
import SifreDegistirme from "./screens/SifreDegistirmeEkrani";
import DiyetisyenPaneli from "./Diyetisyen/DiyetisyenPanelEkrani";

const Stack = createStackNavigator();

export default function Router() {
  const [email, setEmail] = useState(10);

 return (
 <NavigationContainer>
 <Stack.Navigator>
  {
    email==5 ? <Stack.Screen name="SifreDegistirme" component={SifreDegistirme} /> : email==6 ?<Stack.Screen name="DiyetisyenPaneli" component={DiyetisyenPaneli} />:<Stack.Screen name="Giris" component={Giris} />
  }
 {/* <Stack.Screen name="Giris" component={Giris} />
 <Stack.Screen name="SifreDegistirme" component={SifreDegistirme} />
 <Stack.Screen name="DiyetisyenPaneli" component={DiyetisyenPaneli} /> */}
 </Stack.Navigator>
 </NavigationContainer>
  );
}

//{user ? <Stack.Screen component={AppNavigator}/> : <Stack.Screen component={AuthNavigator}/>}