// import React, { useContext } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import Giris from "./screens/GirisEkrani";
// import SifreDegistirme from "./screens/SifreDegistirmeEkrani";
// import DiyetisyenPaneli from "./Diyetisyen/DiyetisyenPanelEkrani";

// const Stack = createStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Giris" component={Giris} />
//       <Stack.Screen name="SifreDegistirme" component={SifreDegistirme} />
//       <Stack.Screen name="DiyetisyenPaneli" component={DiyetisyenPaneli} />
//     </Stack.Navigator>
//   );
// };

// const MainNavigator = () => {
//   const { isLoggedIn } = useLogin();
//   return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
// };
// export default MainNavigator;
