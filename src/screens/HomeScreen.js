import React, { Component } from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../actions/authentication';

import AddNewStory from '../components/AddNewStory';
import NewContentRequests from '../components/NewContentRequests';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Home',
      headerRight: (
        <View style={{paddingRight: 20}}>
          <Icon name="bell" size={25} color="#666" />
        </View>
      )
    }
  }

  // componentDidMount(){
  //   // allows user and logOut to be in navigation's button
  //   this.props.navigation.setParams({
  //     user: this.props.user,
  //     logOut: this.props.logOut
  //   })
  // }

  componentDidMount(){

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        StatusBar.setHidden(false)
      }
    );

  }

  render(){
    //this sends to SigninForm if no user
    // if(!this.props.user){
    //   this.props.navigation.navigate('Auth')
    // }
    return (
      <View style={{flex:1}}>
        {/*<Text>{this.props.user && this.props.user.name}</Text>*/}
        <AddNewStory {...this.props}/>
        <NewContentRequests />
      </View>
    )
  }
}


const mapStateToProps = state => {
  // console.log(state, 'state');
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: (user) => {
      return dispatch(logOut(user))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
// export default connect(mapStateToProps, {logOut})(HomeScreen);


// <Button
//   onPress={async () => {
//     await navigation.state.params.logOut(navigation.state.params.user)
//     navigation.navigate('Auth')
//   }}
//   title="LogOut"
//   color="#000"
// />
