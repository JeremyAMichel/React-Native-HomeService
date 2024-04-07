import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSlider();
  }, []);

  /**
   * Get Slider Content
   */
  const getSlider = () => {
    GlobalApi.getSlider().then((res) => {
      // console.log("resp", res.sliders);
      setSlider(res?.sliders);
    });
  };

  return (
    <View>
      <Heading text="Offers For You" />
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.sliderImage}
            />

            {/* <Text>{item?.name}</Text> */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    marginBottom: 10,
  },

  sliderImage: {
    width: 335,
    height: 150,
    objectFit: "contain",
    borderRadius: 20,
  },
});
