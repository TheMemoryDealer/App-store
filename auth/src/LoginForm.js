import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

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
        this.setState({ error: 'A user with such email already exists', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    onSignUpSuccess() {
        this.setState({ error: 'sdfhdsfhsdfhsdfh', loading: false });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <CardSection>
                <Button onPress={this.Login.bind(this)}>
                    Log in
      </Button>
                <Button onPress={this.SignUp.bind(this)}>
                    Sign Up
</Button>
            </CardSection>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                {this.renderButton()}
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};