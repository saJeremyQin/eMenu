import { GET_DISHES } from "../Globals/query";
import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import { useQuery } from "@apollo/client";
import DishItem, {Dish}  from "./dishItem";


const DishesList = () => {
  const { loading, error, data } = useQuery(GET_DISHES);

  if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
      return <Text>Error: {error.message}</Text>;
  }

  const renderDishItem = ({ item }:{item: Dish}) => {
    return (<DishItem id={item.id} name={item.name} type={item.type} price={item.price} description={item.description} image={item.image}/>)
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