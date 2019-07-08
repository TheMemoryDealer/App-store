import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/header';


export default function App() {
  return (
    <Header headerText={'Albums'}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
