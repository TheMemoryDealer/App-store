import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { Spinner } from './common/Spinner'
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = { email: '', password: '', error: '', loading: false, didHeSignUp: false };

    Login() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
    }

    SignUp() {
        const { email, password } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onSignUpSuccess.bind(this))
            .catch(this.onSignUpFail.bind(this));
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    onSignUpFail() {
        this.setState({ error: 'A user with such email already exists', loading: false, didHeSignUp: '', });
    }

    onLoginSuccess() {
        this.props.navigation.navigate('Details')
        console.log('WORKS')
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    onSignUpSuccess() {
        this.setState({
            error: '', email: '', password: '', loading: false, didHeSignUp: 'A new user has been created'
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <View style={{ marginVertical: 100, }}>
                <Button light style={{ marginVertical: 20, borderRadius: 40, justifyContent: 'center', }} onPress={this.Login.bind(this)}>
                    <Text style={{ color: '#021B79' }} > Log in </Text>
                </Button>
                <Text style={{ marginVertical: 20, color: 'white', left: 30 }}> Dont have an account? </Text>
                <Button onPress={() => this.props.navigation.navigate('Details')} transparent style={{ marginVertical: 20, borderRadius: 40, justifyContent: 'center', position: 'absolute', top: 70, alignSelf: 'flex-end', }} >
                    <Text style={{ color: '#00dfff', fontSize: 20 }}  > Sign Up </Text></Button>
            </View>
        );
    }
    render() {

        return (
            <View style={{ backgroundColor: '#021B79' }}>
                <LinearGradient
                    colors={['#0575E6', 'transparent']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 600,
                    }}
                />

                <View style={styles.LoginBlock}>
                    <Image
                        source={require('./assets/logo.png')} style={{ width: 340, height: 110, marginVertical: 30, right: 10, }}
                    />
                    <Item>
                        <Input style={{ backgroundColor: 'transparent', marginVertical: 10, }} placeholder="Username" placeholderTextColor='white' color='white' value={this.state.email}
                            onChangeText={email => this.setState({ email })} />
                    </Item>
                    <Item last>
                        <Input style={{ backgroundColor: 'transparent' }} placeholder="Password" secureTextEntry={true} placeholderTextColor='white' color='white' value={this.state.password}
                            onChangeText={password => this.setState({ password })} />
                    </Item>

                    {this.renderButton()}

                </View>
            </View>
        );
    }
}

const styles = {
    LoginBlock: {
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        marginVertical: 100,
        borderRadius: 0,

    },
    signUpTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'green'
    }
};