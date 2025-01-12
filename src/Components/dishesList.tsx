import { GET_DISHES } from "../Globals/query";
import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import { useQuery } from "@apollo/client";
import DishItem from "./dishItem";
import { Dish } from "../Globals/types";

const DishesList = () => {
  const { loading, error, data } = useQuery<{dishes: Dish[]}>(GET_DISHES);

  if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
      return <Text>Error: {error.message}</Text>;
  }

  if (!data || !data.dishes) {
    return <Text>No dishes found.</Text>;
  }

  const renderDishItem = ({ item }:{item: Dish}) => {
    return (<DishItem {...item} />);
  }
  
  return (
    <View style={styles.sectionContainer}>
      <FlatList
        data={data.dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDishItem}
      />
    </View>
  );
};

export default DishesList;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 24,
    justifyContent:"center"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: "center"
  },
})