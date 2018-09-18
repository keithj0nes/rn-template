import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchUserDataToken } from '../actions/authentication';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: false
    }
  }

  async componentDidMount(){
    this.setState({loading: true})

    let userToken = await AsyncStorage.getItem('userToken');

    //comment userToken above and uncomment below to fake a user token
    // let userToken = '12345';

    console.log(userToken, 'userToken');

    if(!userToken){
      console.log('no user token');
      this.setState({loading: false})
      this.props.navigation.navigate('Auth');
    }

    if(userToken){
      const user = await this.props.fetchUserDataToken(userToken);
      if(!user.payload.isUser){
        return this.props.navigation.navigate('Auth')
      }
      this.setState({loading: false})
      return this.props.navigation.navigate('App')
    }

    // !!userToken && await this.props.fetchUserData(userToken).catch(err => err);
    // this.setState(() => {{loading: false, user: true}})

  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchUserDataToken: (token) => {
      return dispatch(fetchUserDataToken(token))
    }
  };
};



export default connect(null, mapDispatchToProps)(AuthLoadingScreen);
