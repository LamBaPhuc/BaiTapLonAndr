import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import HeaderBack from "../components/HeaderBack";
import { useDispatch, useSelector } from "react-redux";
import {
  addProdToCart,
  getUserCart,
  getUserOrders,
} from "../features/orders/orderSlice";
import { addRating, getAProduct } from "../features/products/productSlice";
import Footer from "../components/Footer";
const ProductInfoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const productId = route.params.item?._id;

  const addItemToCart = (item) => {
    dispatch(
      addProdToCart({
        productId: productId,
        color: singleProductState?._id?.color,
        price: singleProductState?.price * quantity,
        quantity: quantity,
      })
    );
  };

  useEffect(() => {
    dispatch(getAProduct(productId));
    dispatch(getUserCart());
  }, []);
  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (productId === cartState[i]?.productId?._id) {
        setAddedToCart(true);
      }
    }
  }, []);
  const [addedToCart, setAddedToCart] = useState(false);

  const cartState = useSelector((state) => state?.orders?.userCart);
  const singleProductState = useSelector(
    (state) => state?.products?.singleProduct?.data?.data
  );
  const [titleStarReview, setTitleStarReview] = useState("Excellent");
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      return false;
    }
    if (comment === null) {
      return false;
    } else {
      dispatch(addRating({ star: star, comment: comment, prodId: productId }));
      setTimeout(() => {
        dispatch(getAProduct(productId));
      }, 500);
    }
  };

  const setTitleStar = (star) => {
    if (star === 5) {
      setTitleStarReview("Excellent");
    }
    if (star === 4) {
      setTitleStarReview("Good");
    }
    if (star === 3) {
      setTitleStarReview("Average");
    }
    if (star === 2) {
      setTitleStarReview("Poor");
    }
    if (star === 1) {
      setTitleStarReview("Very Poor");
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBack navigate={"Home"} title={"Product"} />

        <View
          style={{
            width: "100%",
            height: "300px",
            marginBottom: 50,
            alignItems: "center",
          }}
        >
          {route.params.item.image.map((item, index) => (
            <Image
              style={{
                width: "80%",
                height: "100%",
                marginTop: 25,
                resizeMode: "contain",
              }}
              source={{ uri: item.url }}
              key={index}
            ></Image>
          ))}
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route?.params?.item?.title}
          </Text>

          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
            {route?.params?.item?.price} $
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          {/* <Text style={{ color: "#00CED1" }}>
            FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
          </Text> */}

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="black" />

            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver To Binh Chanh - Ho Chi Minh
            </Text>
          </View>
        </View>

        <Text
          style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}
        >
          IN Stock
        </Text>

        {addedToCart ? (
          <Pressable
            onPress={() => navigation.navigate("Cart")}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <Text>Go to Cart</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <Text>Add to Cart</Text>
            </View>
          </Pressable>
        )}

        <View
          style={{
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(233 233 233)",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ margin: 16 }}>Reviews</h3>
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              justifyItems: "center",
              marginTop: 10,
              marginBottom: 12,
            }}
          >
            <View style={{}}>Customer Reviews : </View>

            <View> {singleProductState?.ratings?.length} reviews </View>
          </View>

          <View style={{ width: "100%" }}>
            <View>
              <View></View>

              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      height: 1,
                      borderColor: "#D0D0D0",
                      borderWidth: 1,
                    }}
                  />
                  {singleProductState?.ratings &&
                    singleProductState?.ratings?.map((item, i) => {
                      console.log(item);
                      return (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <h4 style={{ margin: 2, marginRight: 8 }}>
                              {item?.postedBy?.firstName +
                                " " +
                                item?.postedBy?.lastName}
                            </h4>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </View>
                          <p style={{ margin: 4 }}>{item?.comment}</p>
                        </View>
                      );
                    })}
                  <Text
                    style={{
                      height: 1,
                      borderColor: "#D0D0D0",
                      borderWidth: 1,
                    }}
                  />
                </View>

                <h4>Write a Review</h4>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        margin: 0,
                        marginBottom: 12,
                      }}
                    >
                      <ReactStars
                        count={5}
                        size={24}
                        value={5}
                        edit={true}
                        activeColor="#ffd700"
                        onChange={(e) => {
                          console.log(e);
                          setStar(e);
                          setTitleStar(e);
                        }}
                      />
                    </View>

                    <span style={{ marginLeft: 30 }}> {titleStarReview}</span>
                  </View>
                  <View>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #D0D0D0",
                        padding: "5px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        fontSize: "18px",
                      }}
                    ></textarea>
                  </View>

                  <Pressable
                    style={{
                      width: "120px",
                      height: "35px",
                      backgroundColor: "#febd69",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                    onPress={() => addRatingToProduct()}
                  >
                    Submit Review
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Footer />
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
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: singleProductState?.image[0]?.url }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Choose Quantity
              </Text>

              <TextInput
                placeholderTextColor={"black"}
                keyboardType="numeric"
                value={quantity}
                onChangeText={(e) => setQuantity(e)}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                Total : {route.params?.item?.price * quantity} $
              </Text>
              <Pressable
                onPress={() => {
                  addItemToCart();
                  navigation.navigate("Cart");
                  setModalVisible(!modalVisible);
                }}
                style={{
                  backgroundColor: "#FFC72C",
                  padding: 10,
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Add to Cart </Text>
              </Pressable>
            </View>
          </ScrollView>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
