import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import { ScrollView } from "react-native-gesture-handler";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { format } from "date-fns";

export default function BookingModal({ businessId, hideModal }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);

  const { user } = useUser();

  const onDateChange = (date) => {
    setSelectedStartDate(date);
    // setSelectedDate()
  };

  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeList(timeList);
  };

  // Create Booking Method
  const createNewBooking = () => {
    if (!selectedStartDate || !selectedTime) {
      ToastAndroid.show("Please Select Date & Time", ToastAndroid.LONG);
      return;
    }

    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: format(selectedStartDate, "dd-MMM-yyyy"),
      // note: note, TODO : Add Note Field in Hygraph
      businessId: businessId,
    };

    GlobalApi.createBooking(data).then((res) => {
      // console.log(res);
      ToastAndroid.show("Booking Created Successfully !", ToastAndroid.LONG);
      hideModal();
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>

        {/* Calendar Section */}
        <Heading text={"Select Date"} />

        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={onDateChange}
            width={340}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>

        {/* Time Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select Time Slot"} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.time}
          />
        </View>

        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note"} />
          <TextInput
            placeholder="Note"
            style={styles.noteTextArea}
            numberOfLines={5}
            multiline={true}
            onChange={(text) => setNote(text)}
          />
        </View>

        {/* Confirmation Button */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.confirmButton}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },

  selectedTime: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },

  unSelectedTime: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },

  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
  },

  confirmButton: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 10,
    borderRadius: 99,
    elevation: 2,
  },
});
