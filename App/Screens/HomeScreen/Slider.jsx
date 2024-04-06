import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";

export default function Slider() {
  const [slider, setSlider] = useState();

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = () => {
    GlobalApi.getSlider().then((res) => {
      console.log("resp", res.sliders);
      setSlider(res?.sliders);
    });
  };

  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
