import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const HeaderBack = ({ navigate, title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: "50px",
        width: "100%",
        backgroundColor: "rgb(216, 216, 216)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        style={{ marginLeft: 12 }}
        onPress={() => navigation.navigate(navigate)}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </Pressable>
      <View style={{ fontSize: "25px" }}>{title}</View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={{ marginRight: 12 }}
          onPress={() => navigation.navigate("Cart")}
        >
          <AntDesign name="shoppingcart" size={24} color="black" />
        </Pressable>
        <Pressable
          style={{ marginRight: 8 }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({});
