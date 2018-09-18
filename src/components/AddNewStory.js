import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { determinCaptureRoute } from '../actions/captureActions';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const darkColor = '#6e7082';



class AddNewStory extends Component {


  whereToGo = async (cameraType) => {
    // console.log(this.props);
    if(this.props.user.onBoarding){
      console.log('onBoarding is true, send to tips');
      // const tipOnboarding = {backRoute: 'homeFirst', multimediaType}
      // await AsyncStorage.setItem('tipOnboarding', JSON.stringify(tipOnboarding))
      // return this.props.navigation.navigate('tipFirst');
      // return this.props.navigation.navigate('tipFirst', {backRoute: 'homeFirst', multimediaType});
      this.props.determinCaptureRoute(cameraType);
      return this.props.navigation.navigate('cameraFirst', {cameraType})
    } else {
      console.log('no board on, send to pix');
      return this.props.navigation.navigate('Camera')
    }
  }


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Add New Story</Text>
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>this.whereToGo('photo')}>
            <Icon name="camera" size={35} color={darkColor} />
            <Text style={styles.btnText}>Photo</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={()=>this.whereToGo('video')}>
            <Icon name="cellphone-iphone" size={35} color={darkColor} />
            <Text style={styles.btnText}>Video</Text>
          </TouchableOpacity>



          <TouchableOpacity style={styles.button} onPress={()=>this.whereToGo('audio')}>
            <Icon name="microphone" size={35} color={darkColor} />
            <Text style={styles.btnText}>Audio</Text>
          </TouchableOpacity>




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
    determinCaptureRoute: captureName => {
      dispatch(determinCaptureRoute(captureName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStory);




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 25,
    paddingTop: 15,
    marginTop: 10
  },
  headerText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 15
  },
  btnsContainer: {
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // padding: 25
  },
  button: {
    // backgroundColor: 'yellow',
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 16,
    paddingTop: 16,
    // paddingRight: '7%',
    // paddingLeft: '7%',
    // paddingBottom: '5%',
    // paddingTop: '5%',
    // padding: 10,
    // margin: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: darkColor
  },
  btnText: {
    paddingTop: 7,
    fontSize: 12,
    color: darkColor
  }
})
