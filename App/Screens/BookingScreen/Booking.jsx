import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../BusinessListByCategory/BusinessListItem";

export default function Booking() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  /**
   * Get user bookings
   */
  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        // console.log(res);
        setBookingList(res.bookings);
        setLoading(false);
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 26 }}>
        My Booking
      </Text>

      <View>
        <FlatList
          data={bookingList}
          onRefresh={() => getUserBookings()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListItem business={item?.businessList} booking={item} />
          )}
        />
      </View>
    </View>
  );
}
