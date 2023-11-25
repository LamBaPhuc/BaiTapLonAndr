import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Info", { item: item })}
      style={{ width: "50%", marginTop: "15px", padding: 12 }}
    >
      <Image
        style={{ width: "100%", height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image[0].url }}
      ></Image>
      <Text
        numberOfLines={1}
        style={{
          //   width: 150,
          marginTop: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.price}$</Text>
        {/* <Text>{item?.rating}</Text> */}
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
