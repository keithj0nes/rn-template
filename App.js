import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Button} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';

import SigninForm from './src/components/forms/SigninForm';
// import SigninForm from './SigninForm';
import SignupForm from './src/components/forms/SignupForm';
import ForgotPasswordForm from './src/components/forms/ForgotPasswordForm';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import TipScreen from './src/screens/TipScreen';
import RequestsScreen from './src/screens/RequestsScreen';
import CameraScreen from './src/screens/CameraScreen';
import CaptureDetailsScreen from './src/screens/CaptureDetailsScreen';
import SelectTagsScreen from './src/screens/SelectTagsScreen';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const store = createStore(reducers, {}, applyMiddleware(thunk));


const AuthStack = createStackNavigator({
  Login: {
    screen: SigninForm,
    navigationOptions: {
      header: null
    }
  },
  Signup: {
    screen: SignupForm,
    navigationOptions: {
      title: 'Register Your Account'
    }
  },
  ForgotPassword: {
    screen: ForgotPasswordForm,
    navigationOptions: {
      title: 'Forgot Password'
    }
  }
})

// const RequestsScreen = () => {
//   return (
//     <View>
//       <Text>RequestsScreen</Text>
//     </View>
//   )
// }

// const CameraScreen = () => {
//   return (
//     <View>
//       <Text>CameraScreen</Text>
//     </View>
//   )
// }


const HomeStack = createStackNavigator({
  homeFirst: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Story Teller',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  }
})

const RequestsStack = createStackNavigator({
  requestsFirst: {
    screen: RequestsScreen,
    navigationOptions: {
      title: 'Requests Screen',
      headerTitleStyle: {
        fontWeight: 'normal',
      }
    }
  }
})

const CameraStack = createStackNavigator({
  cameraFirst: {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  },
  captureDetails: {
    screen: CaptureDetailsScreen,
    navigationOptions: {
      // title set in CaptureDetailsScreen
      headerBackTitle: null
    }
  },
  selecTags: {
    screen: SelectTagsScreen,
    navigationOptions: {
      title: 'Select Tags',
    }
  }
})

const ProfileStack = createStackNavigator({
  first: {
    screen: UserProfileScreen,
    navigationOptions: {
      title: 'My Profile',
      headerTitleStyle: {
        fontWeight: 'normal',
      }
    }
  }
})

const TipStack = createStackNavigator({
  tipFirst: {
    screen: TipScreen,
    navigationOptions: {
      title: 'Tips on Capturing Stories',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  }
})

const AppStack =  createBottomTabNavigator({
  Home: {
    screen: HomeStack
  },
  Requests: {
    screen: RequestsStack
  },
  Camera: {
    screen: CameraStack,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  Profile: {
    screen: ProfileStack
  },
  Tips: {
    screen: TipStack,
  }
}, {
  // lazy: false,
  navigationOptions: ({navigation}) => ({
    // tabBarOnPress: ({scene, jumpToIndex}) => {
    //   console.log('gahaha');
    //   console.log(scene, 'scene');
    //   console.log(jumpToIndex, 'jumpToIndex');
    //
    // },

    // tabBarOnPress: (a, b) => {
    //   console.log(a, b,"TAB BAR PRESSSEDD");
    // },
    tabBarIcon: ({focused, tintColor}) => {
      const { routeName } = navigation.state;
      let iconName;
      let iconSize = 25;
      if(routeName === "Home"){
        iconName = "home";
      } else if(routeName === "Profile"){
        iconName = "account-circle"
      } else if(routeName === "Tips"){
        iconName = "information-outline"
      } else if(routeName === "Requests"){
        iconName = "calendar-check"
      } else if(routeName === "Camera"){
        // navigation.setParams({cameraType: 'photo'})
        iconName = "plus"
        iconSize = 45
      }

      return (<Icon name={iconName} size={iconSize} color={tintColor} />);
    },
  }),
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#ccc',
    labelStyle: {
      fontSize: 12,
    },
    showLabel: false,
    style: {
      backgroundColor: '#6e7082',
    },
  }
})



// const AppStack = createTabNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Requests: {
//     screen: RequestsScreen
//   }
// })

const RootStack = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    // initialRouteName: 'App',

  });

export default App = () =>  <Provider store={store}><RootStack /></Provider>
// export default App = () =>  <SignupForm />
