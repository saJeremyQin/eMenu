/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/Globals/apolloClient';
import DishesList from './src/Components/dishesList';

import {
  StyleSheet,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <DishesList />
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
