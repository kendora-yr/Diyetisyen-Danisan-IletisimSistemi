import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";


const DiyetisyenEkle = (props) => {
 
  return (
    <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.form}>
          <StatusBar style="auto" />
          <View>
            <TextInput
              label="Ad-Soyad"
              style={{ margin: 10, backgroundColor: "#EEEEEE" }}
              activeUnderlineColor="green"
              underlineColor="purple"
            />
          </View>

          <View>
            <TextInput
              style={{ margin: 10, backgroundColor: "#EEEEEE" }}
              label="E-mail"
              activeUnderlineColor="green"
              underlineColor="purple"
            />
          </View>

          <View>
            <TextInput
              style={{ margin: 10, backgroundColor: "#EEEEEE" }}
              label="Telefon"
              activeUnderlineColor="green"
              underlineColor="purple"
            />
          </View>
          

          <View>
            <TextInput
              style={{ margin: 10, backgroundColor: "#EEEEEE" }}
              label=" Şifre"
              activeUnderlineColor="green"
              underlineColor="purple"
            />
          </View>
          <View>
            <TextInput
              style={{ margin: 10, backgroundColor: "#EEEEEE" }}
              label=" Yaş"
              activeUnderlineColor="green"
              underlineColor="purple"
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
    </ScrollView>
  );
};
export default DiyetisyenEkle;

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
    marginTop:70,
    marginBottom:120,
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
