import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MButton from '../Button';
import CModal from '../CModal';

class SignupForm extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    code: '',
    // password: ''
    modalVisible: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleSubmit = () => {
    this.setState({modalVisible: true});
    var that = this;
    setTimeout(function () {
      that.setState({modalVisible: false});
      that.props.navigation.navigate('App')
    }, 3000);

  }
  render(){
    return (

      <View style={styles.container}>

      <CModal
        visible={this.state.modalVisible}
        toggleFunc={()=>this.setModalVisible(!this.state.modalVisible)}
        type="loader"
      >
        <Text>Signing you up!</Text>
      </CModal>

      {/*<CModal
        visible={this.state.modalVisible}
        toggleFunc={()=>this.setModalVisible(!this.state.modalVisible)}
        type="loader"
      >*/}


        <View style={styles.signupForm}>
          <Text style={styles.signinFormText}>First Name</Text>
          <TextInput style={styles.signinFormInput}/>

          <Text style={styles.signinFormText}>Last Name</Text>
          <TextInput style={styles.signinFormInput}/>

          <Text style={styles.signinFormText}>E-mail Address*</Text>
          <TextInput style={styles.signinFormInput}/>
          <Text style={styles.signinFormSubText}>*Must use .mil or JWT e-mail address</Text>

          <Text style={styles.signinFormText}>Registration Code*</Text>
          <TextInput style={styles.signinFormInput}/>
          <Text style={styles.signinFormSubText}>*This is located in your registration e-mail.</Text>

          <View style={{marginTop: 20}}>
            <MButton handleButtonPress={this.handleSubmit}> Submit </MButton>

          </View>

        </View>

      </View>

    )
  }
}

export default SignupForm;


const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#eee'
  },
  signupForm: {
    backgroundColor: '#fff',
    padding: 20,
  },
  signinFormText: {
    marginTop: 10
  },
  signinFormSubText: {
    fontSize: 12,
    marginBottom: 13
  },
  signinFormInput: {
    borderRadius: 5,
    width: '100%',
    paddingLeft: 10,
    height: 40,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#eee'
  }

})
