/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';

import client from './src/apolloClient';
import { GET_DISHES } from './src/graphql/query';

const DishList = () => {
  const { loading, error, data } = useQuery(GET_DISHES);

  if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
      return <Text>Error: {error.message}</Text>;
  }

  console.log('data is', data);
  
  return (
    <View style={styles.sectionContainer}>
      <FlatList
        data={data.dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View>
                <Text>Name: {item.name}</Text>
                <Text>Price: ${item.price}</Text>
                {/* <Text>type:${item.type}</Text> */}
                <Text>Description: {item.description}</Text>
            </View>
        )}
      />
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    // <View style={styles.sectionContainer}>
    //   <Text style={styles.sectionTitle}>
    //     Hello eMenu
    //   </Text>
    // </View>
    <ApolloProvider client={client}>
      <DishList />
    </ApolloProvider>
  )
}

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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
