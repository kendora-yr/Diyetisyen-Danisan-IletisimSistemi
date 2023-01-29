import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SifreDegistirme = (props) => {
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Şifre Değiştirme</Text>
      <View style={styles.form}>
        <StatusBar style="auto" />
        <View>
          <TextInput
            label="E-posta"
            style={{ margin: 10, backgroundColor: "#EEEEEE" }}
            activeUnderlineColor="green"
            underlineColor="purple"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View>
          <TextInput
            style={{ margin: 10, backgroundColor: "#EEEEEE" }}
            label="Yeni Şifre"
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
        <View>
          <TextInput
            style={{ margin: 10, backgroundColor: "#EEEEEE" }}
            label="Yeni Şifre Tekrar"
            activeUnderlineColor="green"
            underlineColor="purple"
            secureTextEntry={passwordVisibleSecond}
            right={
              <TextInput.Icon
                icon={passwordVisibleSecond ? "eye" : "eye-off"}
                onPress={() => setPasswordVisibleSecond(!passwordVisibleSecond)}
              />
            }
          />
        </View>

        <TouchableOpacity
          style={styles.kaydet_button}
          onPress={() => props.navigation.navigate("Giris")}
        >
          <Text>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SifreDegistirme;

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
    fontSize: 30,
    marginBottom: 55,
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
  },

  kaydet_button: {
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
