import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function Login() {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("./../../../assets/images/login.png")}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{ fontSize: 27, color: Colors.WHITE, textAlign: "center" }}
        >
          Let's Find
          <Text style={{ fontWeight: "bold" }}>
            
            Professionnal Cleaning and Repair
          </Text>
          Service
        </Text>
        <Text style={{ fontSize: 18, color: Colors.WHITE , textAlign: "center", marginTop: 20}}>
          Best App to find services near you which deliver you a Professionnal
          service
        </Text>

        <TouchableOpacity style={styles.button} onPress={()=>console.log("hello")}>
            <Text style={{textAlign:"center", fontSize:17, color:Colors.PRIMARY}} >Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    backgroundColor: Colors.WHITE,
    width: "100%",
    padding: 15,
    borderRadius: 99,
    marginTop: 40,
  },
});