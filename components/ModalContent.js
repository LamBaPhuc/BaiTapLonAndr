import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
const ModalContent = ({ modalVisible, clickModal }) => {
  return (
    <BottomModal
      onBackdropPress={clickModal}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onHardwareBackPress={clickModal}
      visible={modalVisible}
      onTouchOutside={() => {
        clickModal;
      }}
    >
      <ModalContent style={{ width: "100%", height: 400 }}>
        <ScrollView style={{}}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Add a new Address
            </Text>

            <TextInput
              placeholderTextColor={"black"}
              placeholder="India"
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
                value={mobileNo}
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
                value={houseNo}
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
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
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
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

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
  );
};

export default ModalContent;

const styles = StyleSheet.create({});
