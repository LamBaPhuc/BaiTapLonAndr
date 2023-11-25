import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <>
      <View
        style={{
          height: "50px",
          width: "100%",
          backgroundColor: "rgb(216, 216, 216)",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          display: "flex",
        }}
      >
        <span>Created by Phuc</span>

        <span> 2023</span>
      </View>
    </>
  );
};

export default Footer;

const styles = StyleSheet.create({});
