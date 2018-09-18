import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class MButton extends Component {

  render(){
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this.props.handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>{this.props.children}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%'
  },
  button: {
    backgroundColor: 'gray',
    alignItems: 'center',
    padding: 13,
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default MButton;
