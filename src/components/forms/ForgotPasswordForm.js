import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MButton from '../Button';
import CModal from '../CModal';

class SignupForm extends Component {

  state = {
    email: '',
    message: 'Preparing to send',
    modalVisible: false
  }


  fetchUserData = (data) => new Promise((resolve, reject) => {

    const fakeDB = {
      user1: {
        name: 'Keith',
        email: 'K@jwt.com',
        password: 'Pass@@',
        token: '12345'
      }
    }

    if(data.e === fakeDB.user1.email){
      setTimeout(function () {
        resolve({isUser: true})
      }, 2000);
      // return resolve(dispatch(setUser(fakeDB.user1)));
    } else {
      setTimeout(function () {
        resolve({isUser: false})
      }, 2000);
    }

  })





  setModalVisible(visible) {
    this.setState({modalVisible: visible, message: 'Preparing to send'});
  }
  

   handleSubmit = async () => {
    this.setState({modalVisible: true});

    const {email} = this.state;

    // this.setState({showLoading: true})

    if(!email){
      // console.log('no email or password');
      return this.setState({message: 'Please enter email'})
    }

    if(!email.toLowerCase().includes('@jwt.') && !email.toLowerCase().includes('.mil')){
      // console.log('email isnt correct');
      return this.setState({message: "Sorry,ail in our system"})
    }

    const data = await this.fetchUserData({e: this.state.email});
    console.log(data, 'data in forgotempass');

    if(!data.isUser){
      return this.setState({message: "Sorry, we couldn't find this email in our system"})
    }

    return this.setState({message: `Success, an email has been sent to ${this.state.email}`})

  }
  render(){
    return (

      <View style={styles.container}>

      <CModal
        visible={this.state.modalVisible}
        showCloseBtn={()=>this.setModalVisible(!this.state.modalVisible)}

      >
        <Text>{this.state.message}</Text>
      </CModal>

      {/*<CModal
        visible={this.state.modalVisible}
        toggleFunc={()=>this.setModalVisible(!this.state.modalVisible)}
        type="loader"
      >*/}





        <View style={styles.signupForm}>
        <View>
          <Text>Please enter the e-mail address associated with your account. An e-mail notification will be sent with instructions on resetting your password.</Text>
        </View>
          <Text style={styles.signinFormText}>E-mail Address</Text>

          <TextInput
            style={styles.signinFormInput}
             value={this.state.email}
             onChangeText={(email)=>{this.setState({email})}}
             keyboardType={'email-address'}
             returnKeyType={ "done" }
           />

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
    marginTop: 10,
    color: '#999'
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
