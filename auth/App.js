import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './src/common'
import firebase from 'firebase'
import LoginForm from './src/LoginForm'
import { Card, CardSection, Input } from './src/common';



export default class App extends Component {
  state = { loggedIn: null };

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
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>

    );
  }
}


