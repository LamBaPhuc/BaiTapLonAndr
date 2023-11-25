import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/orders/orderSlice";
import HeaderBack from "../components/HeaderBack";
import { getCurrentUser } from "../features/auth/authSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const orderState = useSelector(
    (state) => state.orders?.orderedProduct?.orders
  );

  const currentUserState = useSelector((state) => state?.auth?.currentUser);
  console.log(currentUserState);
  useEffect(() => {
    dispatch(getUserOrders());
    dispatch(getCurrentUser());
  }, []);

  return (
    <>
      <HeaderBack navigate={"Home"} title={"Profile"} />

      <ScrollView>
        <View
          style={{
            backgroundColor: "#AFEEEE",
            height: 70,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{ width: 100, height: 50, resizeMode: "contain" }}
            source={{
              uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
            }}
          />
          <p>
            Hi,{" "}
            {currentUserState?.data ? currentUserState?.data?.firstName : ""}
          </p>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {currentUserState?.user?.name}
          </Text>
        </View>
        {orderState &&
          orderState?.map((item, index) => {
            const date = new Date(item.createdAt);
            return (
              <View
                key={index}
                style={{
                  flexDirection: "column",

                  margin: 8,
                  marginTop: 20,
                  borderTopWidth: 5,
                  borderTopColor: "rgb(216, 216, 216)",
                }}
              >
                <p>{date.toDateString()}</p>

                {item?.orderItems?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        marginTop: 20,
                        overflow: "hidden",
                      }}
                    >
                      <View style={{ width: "30%" }}>
                        <Image
                          style={{
                            width: 100,
                            height: 50,
                            resizeMode: "contain",
                          }}
                          source={{ uri: item?.product?.image[0].url }}
                        ></Image>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          maxWidth: "100%",
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{ alignItems: "center", maxWidth: "100%" }}
                        >
                          {item?.product?.title}
                        </Text>
                        <span>x{item?.quantity}</span>
                      </View>
                    </View>
                  );
                })}

                <View
                  style={{
                    margin: 0,
                    justifyContent: "space-around",
                    flexDirection: "row",
                    marginTop: "30px",
                  }}
                >
                  <View
                    style={{
                      width: 80,
                      height: 25,
                      backgroundColor: "orange",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <span>{item?.orderStatus}</span>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    Total Amount: 
                    <span style={{ fontWeight: "bold" }}>
                      {item?.totalPrice}$
                    </span>{" "}
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
