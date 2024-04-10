import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import Colors from "../../Utils/Colors";
import PageHeading from "../../Components/PageHeading";

export default function BusinessListByCategory() {
  const param = useRoute().params;

  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    param && getBusinessListByCategory();
  }, [param]);

  /**
   * Business List By Category
   */
  const getBusinessListByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((res) => {
      setBusinessList(res.businessLists);
    });
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={param?.category} />

      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          style={{ marginTop: 15 }}
          renderItem={({ item, index }) => <BusinessListItem business={item} />}
        />
      ) : (
        <Text style={styles.noBusinessFound}>No Business Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noBusinessFound: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    textAlign: "center",
    marginTop: "20%",
    color: Colors.GRAY,
  },
});
