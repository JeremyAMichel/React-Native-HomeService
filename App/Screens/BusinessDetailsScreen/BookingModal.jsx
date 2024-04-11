import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";

export default function BookingModal({ hideModal }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={() => hideModal()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Booking
        </Text>
      </TouchableOpacity>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={onDateChange}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Colors.PRIMARY}
          todayTextStyle={{ color: Colors.WHITE }}
          selectedDayColor={Colors.BLACK}
          selectedDayTextColor={Colors.WHITE}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
});
