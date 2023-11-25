import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import {
  getUserCart,
  removeFrCart,
  updateFrCart,
} from "../features/orders/orderSlice";
import HeaderBack from "../components/HeaderBack";
import Footer from "../components/Footer";

const CartScreen = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(null);
  const [id, setId] = useState(null);
  const userCartState = useSelector((state) => state?.orders?.userCart);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  useEffect(() => {
    if (quantity !== null) {
      console.log(quantity);
      updateCartProduct(id, quantity);
    }
  }, [quantity]);
  let subTotal = 0;
  const removeProduct = (id) => {
    dispatch(removeFrCart(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 500);
  };
  const updateCartProduct = (id, quantity) => {
    dispatch(updateFrCart({ cartItemId: id, quantity }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 500);
  };

  const navigation = useNavigation();
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <HeaderBack navigate={"Home"} title={"My Cart"} />
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        />
        <View style={{ marginHorizontal: 10 }}>
          {userCartState?.map((item, index) => {
            subTotal = subTotal + item?.price * item?.quantity;

            return (
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderBottomColor: "#F0F0F0",
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                }}
                key={index}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      style={{ width: 140, height: 140, resizeMode: "contain" }}
                      source={{ uri: item?.productId?.image[0]?.url }}
                    />
                  </View>

                  <View>
                    <Text
                      numberOfLines={3}
                      style={{ width: 150, marginTop: 10 }}
                    >
                      {item?.productId?.title}
                    </Text>
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                    >
                      {item?.price} $
                    </Text>
                    <Image
                      style={{ width: 30, height: 30, resizeMode: "contain" }}
                      source={{
                        uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                      }}
                    />
                    <Text style={{ color: "green" }}>In Stock</Text>
                    {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                    {item?.rating?.rate} ratings
                  </Text> */}
                  </View>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7,
                    }}
                  >
                    {item?.quantity > 1 ? (
                      <Pressable
                        onPress={() => {
                          setQuantity(item?.quantity - 1);
                          setId(item?._id);
                        }}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => removeProduct(item?._id)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </Pressable>
                    )}

                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{item?.quantity}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setQuantity(item?.quantity + 1);
                        setId(item?._id);
                      }}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Feather name="plus" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => removeProduct(item?._id)}
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 15,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Save For Later</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>See More Like this</Text>
                  </Pressable>
                </Pressable>
              </View>
            );
          })}
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Total: </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{subTotal} $</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Checkout", { subTotal })}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text>Proceed to Buy ({userCartState?.length}) items</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
