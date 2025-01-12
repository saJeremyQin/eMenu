import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button, Image } from '@rneui/themed';
import { Dish } from "../Globals/types";

import { Colors } from "react-native/Libraries/NewAppScreen";

const cardSize = 180;


const DishItem:React.FC<Dish> = ({id, name, type, price, description, image}) => {
  const [dishName, setDishName] = useState<string>();
  const [dishDescription, setDishDescription] = useState<string>(); 


  function TrimText() {
    if (name.length > 15) setDishName(`${name.slice(0, 15)}...`);
    if (description.length > 15) setDishDescription(`${description.slice(0, 15)}...`);
  }

  useEffect(()=>{
    TrimText();
  },[]);


  const addDishToChart = () => {
 
  };
  
  
  return (
      <View style={styles.container}>
        <Pressable
          onPress={() => addDishToChart()}
          style={[
            styles.bottom_container,
            { backgroundColor: "#ccc" },
          ]}
        >
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: "#703e22" }]}>
          {dishName || "N/A"}
        </Text>
        <Text style={[styles.price, { color: "#703e22" }]}>
          {"$"} {price || "N/A"}
        </Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // margin: 20,
    margin: 20,
    // backgroundColor:"blue"
  },
  image: {
    width: cardSize,
    height: cardSize / 1.25,
  },
  bottom_container: {
    alignItems: "flex-start",
    width: cardSize,
    paddingBottom: cardSize / 15,
    // backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderRadius: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: cardSize / 10,
    paddingLeft: cardSize / 15,
    marginTop: cardSize / 15,
  },
  description: {
    paddingLeft: cardSize / 15,
    fontSize: cardSize / 12,
    color: "#595959",
  },
  price: {
    fontWeight: "bold",
    fontSize: cardSize / 9.5,
    paddingLeft: cardSize / 15,
  },
});

export default React.memo(DishItem);

