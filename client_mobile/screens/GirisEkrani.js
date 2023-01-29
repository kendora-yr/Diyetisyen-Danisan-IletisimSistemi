import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { useMutation,useQuery } from "@apollo/client";
import { DIYETISYENLERI_GETIR } from "../graphql/queries";
import DiyetisyenPaneli from "../Diyetisyen/DiyetisyenPanelEkrani"
import DanisanAnaEkran from "../Admin/Danisan/DanisanAnaEkran";
import AdminPaneli from "../Admin/AdminPanelEkrani"
import { GIRISYAP_KULLANICI } from "../graphql/mutations";
import { GETIR_KULLANICITIPI } from "../graphql/mutations";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Giris = ({ navigation }) => {

  //const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [kullaniciTipi, setKullaniciTipi] = useState(9);
  const [formData,setFormData]= useState({email:'', sifre:''})
  //setKullaniciTipi(9)

  const { data, loading } = useQuery(DIYETISYENLERI_GETIR);


  const [girisYapKullanici,{data:d1,loading:l1,error:e1}] = useMutation(GIRISYAP_KULLANICI,{
    onCompleted(data){
      
      AsyncStorage.setItem('jwt',data.KullaniciGirisYap.token)
      console.log(data)
    }
  })

  const [kullaniciTipiGetir,{data:d2,loading:l2,error:e2}] = useMutation(GETIR_KULLANICITIPI,{
    onCompleted(data){
      

      console.log(data)
      setKullaniciTipi(data.kullaniciTipiGetir.kullaniciTipi)
    }
  })

  {e1 && <view>{e1.message}</view>}

  function submit(){
    console.warn(formData)
    girisYapKullanici({
      variables:{
        kullaniciGiris:formData
      }
    })
    kullaniciTipiGetir({
      variables:{
        kullaniciGiris2:formData
      }
    })
  }

  if(kullaniciTipi==0){
    return(
    <AdminPaneli/>
    )
  }
  if(kullaniciTipi==1){
    return(
    <DanisanAnaEkran/>
    )
  }
  if(kullaniciTipi==2){
    return(
    <DiyetisyenPaneli/>
    )
  }

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  } else {
    console.log(data);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>diyetisyenim</Text>
      <View style={styles.form}>
        <StatusBar style="auto" />
        <View>
          <TextInput
            label="E-posta"
            style={{ margin: 10, backgroundColor: "#EEEEEE" }}
            activeUnderlineColor="green"
            underlineColor="purple"
            onChangeText={(text) => {setFormData({...formData,email:text})}}
          />
        </View>
        <View>
          <TextInput
            style={{ margin: 10, backgroundColor: "#EEEEEE" }}
            onChangeText={(text) => {setFormData({...formData,sifre:text})}}
            label="Şifre"
            activeUnderlineColor="green"
            underlineColor="purple"
            secureTextEntry={passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </View>

        <TouchableOpacity>
          <Text
            style={styles.forgot_button}
            onPress={() =>
              navigation.navigate('DiyetisyenPaneli')
            }
          >
            Şifrenizi mi Unuttunuz?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() =>{
              //setKullaniciTipi(1)
              submit()
        }
            }>
          <Text>OTURUM AÇIN</Text>
        </TouchableOpacity>
        {/* <Button title="OTURUM AÇIN" style={styles.loginBtn} onPress={submit()}/> */}
      </View>
    </View>
  );
};
export default Giris;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCC80",
    justifyContent: "center",
  },
  form: {
    borderColor: "#90A4AE",
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "white",
  },

  baslik: {
    fontSize: 40,
    marginBottom: 65,
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
  },

  forgot_button: {
    height: 30,
    marginBottom: 15,
    paddingLeft: 145,
    color: "#000000",
    fontSize: 13,
  },
  loginBtn: {
    width: "80%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 30,
    backgroundColor: "#FF6D00",
    fontSize: 20,
  },
});
