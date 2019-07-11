import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Albumlist from './src/components/AlbumList';


export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'Albums'} />
        <Albumlist />
      </View>
    );
  }
}
