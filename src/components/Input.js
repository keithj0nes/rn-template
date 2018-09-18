import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';

class Input extends Component {

  state = {
    text: ''
  }

  inputs = {};

  render(){
    return (
      <View style={{marginBottom: 10}}>

        <Text>{this.props.label}</Text>

        <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, paddingLeft: 10}}
           value={this.state.text}
           keyboardType={this.props.type}
           secureTextEntry={this.props.secure ? true : false}
           onChangeText={(text)=>{this.setState({text})}}



           onSubmitEditing={() => {
              this.focusNextField('two');
           }}
           returnKeyType={ "next" }
           ref={ input => {
              this.inputs['one'] = input;
            }}
           autoCorrect={false}


         />
      </View>
    )
  }
}

export default Input;
