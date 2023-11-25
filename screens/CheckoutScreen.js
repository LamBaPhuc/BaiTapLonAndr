import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation, useRoute } from "@react-navigation/native";
import { addOrder } from "../features/orders/orderSlice";
import HeaderBack from "../components/HeaderBack";
const data = [];
const CheckoutScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([
    {
      _id: 1,
      houseNo: "6B/41",
      street: "Thanh Nien",
      landmark: "Binh Chanh ",
      postalCode: "10000",
      mobileNo: "0123456789",
      name: "Nguyen Van A",
    },
  ]);
  const route = useRoute();
  console.log(route);
  const subTotal = route.params.subTotal;
  console.log(subTotal);
  const userCartState = useSelector((state) => state?.orders?.userCart);
  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    userCartState?.map((item) => {
      console.log(item);
      data.push({
        product: item?.productId?._id,
        quantity: item?.quantity,
        price: item?.price,
        color: item?.productId?.color[0],
      });
    });
  }, []);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handlePlaceOrder = async () => {
    setCurrentStep(4);
    try {
      const orderData = {
        shippingInfo: {
          address: "36/50 Tx24",
          city: "Ho Chi Minh",
          state: "delivering",
          pinCode: "1222",
          country: "Viet Nam",
          firstName: "ngo",
          lastName: "Nguyen",
          pinCode: "1111",
          other: "dfdf",
        },
        orderItems: data,
        totalPrice: subTotal,
        totalPriceAfterDiscount: subTotal,
        paymentInfo: {
          razorpayPaymentId: "ass",
          razorpayOrderId: "bcc",
        },
      };
      dispatch(addOrder(orderData));
      setTimeout(() => {
        navigation.navigate("Profile");
      }, 1500);
    } catch (error) {
      console.log("errror", error);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ScrollView style={{}}>
        <HeaderBack navigate={"Cart"} title={"Check out"} />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            {steps?.map((step, index) => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "green" },
                      index <= currentStep && { backgroundColor: "green" },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index < currentStep && { backgroundColor: "green" },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      &#10003;
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                  {step.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {currentStep == 0 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Select Delivery Address
            </Text>

            <Pressable>
              {addresses?.map((item, index) => (
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 17,
                    marginVertical: 7,
                    borderRadius: 6,
                  }}
                >
                  {selectedAddress && selectedAddress._id === item?._id ? (
                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedAdress(item)}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}

                  <View style={{ marginLeft: 6 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {item?.name}
                      </Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>

                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      {item?.houseNo}, {item?.landmark}
                    </Text>

                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      {item?.street}
                    </Text>

                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      VietNam, Ho Chi Minh
                    </Text>

                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      phone No : {item?.mobileNo}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      pin code : {item?.postalCode}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 7,
                      }}
                    >
                      <Pressable
                        style={{
                          backgroundColor: "#F5F5F5",
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          borderWidth: 0.9,
                          borderColor: "#D0D0D0",
                        }}
                      >
                        <Text>Edit</Text>
                      </Pressable>

                      <Pressable
                        style={{
                          backgroundColor: "#F5F5F5",
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          borderWidth: 0.9,
                          borderColor: "#D0D0D0",
                        }}
                      >
                        <Text>Remove</Text>
                      </Pressable>

                      <Pressable
                        style={{
                          backgroundColor: "#F5F5F5",
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          borderWidth: 0.9,
                          borderColor: "#D0D0D0",
                        }}
                      >
                        <Text>Set as Default</Text>
                      </Pressable>
                    </View>

                    <View>
                      {selectedAddress && selectedAddress._id === item?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={{
                            backgroundColor: "#008397",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ textAlign: "center", color: "white" }}>
                            Deliver to this Address
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#FFAC1C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              Add New Address
            </Pressable>
          </View>
        )}

        {currentStep == 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Choose your delivery options
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                padding: 8,
                gap: 7,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              {option ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => setOption(!option)}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text style={{ color: "green", fontWeight: "500" }}>
                  Tomorrow by 10pm
                </Text>{" "}
                - FREE delivery with your Prime membership
              </Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}

        {currentStep == 2 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Select your payment Method
            </Text>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedOption === "cash" ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => setSelectedOption("cash")}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <Text>Cash on Delivery</Text>
            </View>

            {/* <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedOption === "card" ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => {
                    setSelectedOption("card");
                    Alert.alert("UPI/Debit card", "Pay Online", [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel is pressed"),
                      },
                      {
                        text: "OK",
                        onPress: () => pay(),
                      },
                    ]);
                  }}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <Text>UPI / Credit or debit card</Text>
            </View> */}
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}

        {currentStep === 3 && selectedOption === "cash" && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Save 5% and never run out
                </Text>
                <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                  Turn on auto deliveries
                </Text>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text>Shipping to {selectedAddress?.name}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                >
                  Items
                </Text>

                <Text style={{ color: "gray", fontSize: 16 }}>₹{subTotal}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                >
                  Delivery
                </Text>

                <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Order Total
                </Text>

                <Text
                  style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                >
                  ₹{subTotal}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                Pay on delivery (Cash)
              </Text>
            </View>

            <Pressable
              onPress={handlePlaceOrder}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text>Place your order</Text>
            </Pressable>
          </View>
        )}
        {currentStep == 4 && (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="smile-beam" size={30} color="green" />
              <h2 style={{ color: "green" }}>Place Order Successfully</h2>
            </View>
          </View>
        )}
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <ScrollView style={{}}>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Add a new Address
              </Text>

              <TextInput
                placeholderTextColor={"black"}
                placeholder="VietNam"
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              />

              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Full name (First and last name)
                </Text>

                <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholderTextColor={"black"}
                  style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  placeholder="Your Name"
                />
              </View>

              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Mobile number
                </Text>

                <TextInput
                  // value={mobileNo}
                  onChangeText={(text) => setMobileNo(text)}
                  placeholderTextColor={"black"}
                  style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  placeholder="XXX-XXX-XXXX"
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Flat, House No, Building, Company
                </Text>

                <TextInput
                  // value={houseNo}
                  onChangeText={(text) => setHouseNo(text)}
                  placeholderTextColor={"black"}
                  style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  placeholder=""
                />
              </View>

              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Area, Street, Sector, Village
                </Text>
                <TextInput
                  value={street}
                  onChangeText={(text) => setStreet(text)}
                  placeholderTextColor={"black"}
                  style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  placeholder=""
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Landmark
                </Text>
                <TextInput
                  value={landmark}
                  onChangeText={(text) => setLandmark(text)}
                  placeholderTextColor={"black"}
                  style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  placeholder=""
                />
              </View>

              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Pincode
                </Text>

                <TextInput
                  value={postalCode}
                  onChangeText={(text) => setPostalCode(text)}
                  placeholderTextColor={"black"}
                  style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  placeholder=""
                />
              </View>

              <Pressable
                // onPress={}
                style={{
                  backgroundColor: "#FFC72C",
                  padding: 19,
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Add Address</Text>
              </Pressable>
            </View>
          </ScrollView>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
