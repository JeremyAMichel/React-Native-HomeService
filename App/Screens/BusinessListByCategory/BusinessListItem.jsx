import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();

  const getBookingStatusStyle = (status) => {
    switch (status) {
      case "Booked":
        return [styles.bookingStatus, styles.bookingBooked];
      case "InProgress":
        return [styles.bookingStatus, styles.bookingInProgress];
      case "Canceled":
        return [styles.bookingStatus, styles.bookingCanceled];
      case "Completed":
        return [styles.bookingStatus, styles.bookingCompleted];
      default:
        return [styles.bookingStatus];
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("business-detail", { business: business })}
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {business?.contactPerson}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {business?.name}
        </Text>

        {booking?.bookingStatus && (
          <Text style={getBookingStatusStyle(booking.bookingStatus)}>
            {booking.bookingStatus}
          </Text>
        )}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {booking?.bookingStatus ? (
            <View style={{ marginRight: 5 }}>
              <AntDesign name="calendar" size={20} color={Colors.PRIMARY} />
            </View>
          ) : (
            <View style={{ marginRight: 0 }}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={Colors.PRIMARY}
              />
            </View>
          )}
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
              fontSize: 16,
            }}
          >
            {booking?.bookingStatus
              ? booking.date + " at " + booking.time
              : business?.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  subContainer: {
    display: "flex",
    gap: 7,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },

  bookingStatus: {
    fontSize: 14,
    fontFamily: "outfit",
    padding: 3,
    borderRadius: 3,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
  },

  bookingBooked: {
    color: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT,
  },

  bookingInProgress: {
    color: Colors.IN_PROGRESS_YELLOW,
    backgroundColor: Colors.IN_PROGRESS_YELLOW_LIGHT,
  },

  bookingCanceled: {
    color: Colors.CANCELED_RED,
    backgroundColor: Colors.CANCELED_RED_LIGHT,
  },

  bookingCompleted: {
    color: Colors.BOOKED_GREEN,
    backgroundColor: Colors.BOOKED_GREEN_LIGHT,
  },
});
