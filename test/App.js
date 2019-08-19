import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './common'
import firebase from 'firebase'
import { Card, CardSection, Input } from './common';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailScreen'

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  state = { loggedIn: false };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCEmExUNx738gQkdlrwN2b-ahs1NV7Q-5E",
      authDomain: "auth-dff8b.firebaseapp.com",
      databaseURL: "https://auth-dff8b.firebaseio.com",
      projectId: "auth-dff8b",
      storageBucket: "",
      messagingSenderId: "603005366443",
      appId: "1:603005366443:web:ab4dbd960700b17c"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });

  }

  renderContent() {
    console.log(this.state.loggedIn)

    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
          </Button>
          </CardSection>
        );
      case false:
        return <HomeScreen />;
      default:
        return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <AppContainer />

    );

  }
}
