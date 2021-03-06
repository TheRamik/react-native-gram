import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getApps } from 'firebase/app';
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

interface IRegisterProps {}

interface IRegisterState {
  email: string;
  password: string;
  name: string;
}

export default class Register extends Component<
  IRegisterProps,
  IRegisterState
> {
  constructor(props: IRegisterProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password, name } = this.state;
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('user:', user);
    } catch (error) {
      console.log(getApps().length);
      console.log(auth);
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          placeholder="name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}
