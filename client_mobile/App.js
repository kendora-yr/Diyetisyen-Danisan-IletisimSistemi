import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import GirisEkrani from "./screens/GirisEkrani";
import Giris from "./screens/GirisEkrani";
import SifreDegistirmeEkrani from "./screens/SifreDegistirmeEkrani";
import DanisanEklemeEkrani from "./Diyetisyen/DanisanEklemeEkrani";
import DiyetisyenEklemeEkrani from "./Admin/DiyetisyenEklemeEkrani";
import DiyetisyenPanelEkrani from "./Diyetisyen/DiyetisyenPanelEkrani";
import AdminPanelEkrani from "./Admin/AdminPanelEkrani"
import DanisanAnaEkran from "./Admin/Danisan/DanisanAnaEkran";
import { NavigationContainer } from "@react-navigation/native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
  useQuery,
} from "@apollo/client";
import Router from "./Router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from "./MainNavigator"


const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});


const AppNavigator = createStackNavigator(
  {
    // Giriş: GirisEkrani,
    SifreDegistirme: SifreDegistirmeEkrani,
    DanisanAnaEkran:DanisanAnaEkran,
    DanisanEkle: DanisanEklemeEkrani,
    
    DiyetisyenEkle: DiyetisyenEklemeEkrani,
    
   
    DiyetisyenPaneli: DiyetisyenPanelEkrani,
    
    
   
    AdminPaneli:AdminPanelEkrani,
    
    
   
    
    
    
    
    
    
   
  
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#FF6D00",
      },
      headerTintColor: "#FFF",
    },
  }
);

const Navigator = createAppContainer(AppNavigator);

export default function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Giris/> */}
    <Router/>
    </ApolloProvider>
  );
}
