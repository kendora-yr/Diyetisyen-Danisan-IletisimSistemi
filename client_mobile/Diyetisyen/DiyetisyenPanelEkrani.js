import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useMutation,useQuery } from "@apollo/client";
import {DANISANLARINI_GETIR} from "../graphql/queries";

const DiyetisyenPaneli = () => {

  const { data, loading } = useQuery(DANISANLARINI_GETIR);

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
      <View style={styles.panel}>
      
        <View>
          <TouchableOpacity style={styles.Btn}>
            <Icon name="md-people" color="#424242" size={30} />
            <Text>Danışan İşlemleri</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.Btn}>
            <Icon name="md-person" color="#424242" size={30} />
            <Text>Profilim</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.Btn}>
            <Icon name="md-chatbox" color="#424242" size={30} />
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default DiyetisyenPaneli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFD8DC",
    justifyContent: "center",
  },
  panel: {
    marginLeft: 40,
    marginRight: 40,
  },

  Btn: {
    width: "60%",
    height: 85,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 60,
    backgroundColor: "#CFD8DC",
    fontSize: 20,
    borderColor: "#90A4AE",
    borderRadius: 15,
    borderWidth: 2,
  },
});
