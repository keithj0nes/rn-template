import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../actions/authentication';


class UserProfileScreen extends Component {

  render(){
    console.log(this.props, 'propssss');
    return (
      <View>
        <Text>USER PROFILE SCREEN </Text>

        <View>
          <Button title="log me out!"  onPress={()=>{this.props.logOut().then(() => this.props.navigation.navigate('Auth'))}}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      return dispatch(logOut())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
