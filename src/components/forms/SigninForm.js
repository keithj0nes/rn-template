import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, Image } from 'react-native';
import MButton from '../Button';
import CModal from '../CModal';
import logo from '../../assets/images/marineslogo.png';

import { connect } from 'react-redux';
import { fetchUserDataLogin } from '../../actions/authentication';

class SigninForm extends Component {

  state = {
    email: '',
    password: '',
    staySignedIn: false,
    errMessage: '',
    showErrMessage: false,
    showLoading: false
  }

  inputs = {};

  focusNextField = (id) => {
    this.inputs[id].focus();
  }


  handleSubmit = async () => {
    //const reg is looking for one uppercase, one special, and at least 6 characters
    const reg =  /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    const {email, password} = this.state;

    this.setState({showLoading: true})

    if(!email || !password){
     // console.log('no email or password');
      return this.setState({errMessage: 'Please enter both email and password'}, ()=>{
        this.setState({showLoading: false, showErrMessage: true})
      })
    }

    if(!email.toLowerCase().includes('@jwt.') && !email.toLowerCase().includes('.mil')){
      // console.log('email isnt correct');
      return this.setState({errMessage: 'Incorrect email or password'}, ()=>{
        this.setState({showLoading: false, showErrMessage: true})
      })
    }

    if(!reg.test(password)){  //reg.test is looking for one uppercase, one special, and at least 6 characters
      // console.log('pass wrong!');
      return this.setState({errMessage: 'Incorrect email or password'}, ()=>{
        this.setState({showLoading: false, showErrMessage: true})
      })
    }

    console.log('evertyihng gooood, fetchUserData now');


    //USING .THEN PROMISE
    // this.fetchUserData({e:this.state.email, p:this.state.password}).then((res, rej) => {
    //   // IF RES.DATA == USER, GO TO APP
    //   console.log(res, 'ressss!!');
    //   this.setState({showLoading: false})
    //   if(res.isUser){
    //     this.props.setUser(res)
    //     this.props.navigation.navigate('App')
    //   } else {
    //     return this.setState({errMessage: 'Incorrect email or password', showLoading: false, showErrMessage: true})
    //   }
    // }).catch(err => console.log(err));

    //USING ASYNC AWAIT
    const myData = await this.props.fetchUserDataLogin({e:this.state.email, p:this.state.password, ssi:this.state.staySignedIn});
    // console.log(myData, 'my data');
    this.setState({showLoading: false})
    // console.log(myData.isUser);
    if(!myData.payload.isUser){
      return this.setState({errMessage: 'Incorrect !', showLoading: false, showErrMessage: true})
    }
    this.props.navigation.navigate('App')
  }

  handleStaySignedIn = () => {
    this.setState({staySignedIn: !this.state.staySignedIn})
  }

  setModalVisible(visible) {
    this.setState({showErrMessage: visible});
  }

  render(){
    // console.log(this.props);
    return (
      <View style={styles.container}>

        <CModal
          visible={this.state.showErrMessage}
          showCloseBtn={()=>this.setModalVisible(!this.state.showErrMessage)}
          type="alert"
          title="Error!"
        >
          <Text>{this.state.errMessage}</Text>
        </CModal>

        <CModal
          visible={this.state.showLoading}
          toggleFunc={()=>this.setModalVisible(!this.state.showLoading)}
          type="loader"
        >
          <Text>Signing you in!</Text>
        </CModal>



          <View style={styles.logo}>
            {/*<Text>[ Logo ]</Text>*/}
            <Image source={require('../../assets/images/marineslogo.png')} style={{width: 300, height: 56}}/>
          </View>

        <View style={styles.loginForm}>

          <TextInput
             style={styles.loginFormInput}
             value={this.state.email}
             placeholder={'Email Addresss'}
             onChangeText={(email)=>{this.setState({email})}}
             onSubmitEditing={() => {
                this.focusNextField('two');
             }}
             autoCapitalize={"none"}
             keyboardType={'email-address'}
             returnKeyType={ "next" }
             ref={ input => {
               this.inputs['one'] = input;
             }}
           />

           <TextInput
              style={styles.loginFormInput}
              value={this.state.password}
              placeholder={'Password'}
              onChangeText={(password)=>{this.setState({password})}}
              returnKeyType={ "done" }
              autoCapitalize={"none"}
              secureTextEntry
              autoCorrect={false}
              ref={ input => {
                this.inputs['two'] = input;
              }}
            />

          <TouchableWithoutFeedback onPress={this.handleStaySignedIn}>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 20}}>
              <View style={{height: 20, width: 20, borderWidth: 2, borderColor: 'gray', borderRadius: 2, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                {this.state.staySignedIn && <View style={{height: '70%', width: '70%', backgroundColor: 'gray'}}></View> }
              </View>
              <Text >Stay signed in</Text>
            </View>
          </TouchableWithoutFeedback>

          <MButton handleButtonPress={this.handleSubmit}>
            Sign In
          </MButton>

          <View style={styles.reset}>
            <Text style={styles.resetText}>Trouble signing in? </Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
              <Text style={styles.resetButton}>Reset your password.</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.new} onPress={()=>{this.props.navigation.navigate('Signup')}}>
          <Text style={styles.newText}>New? </Text>
          <TouchableOpacity><Text style={styles.newButton}>Sign up</Text></TouchableOpacity>
          <Text style={styles.newText}> with your registration code. </Text>
        </TouchableOpacity>

      </View>

    )
  }
}

const mapStateToProps = state => {
  return { user: state.auth }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserDataLogin: (user) => {
      return dispatch(fetchUserDataLogin(user))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  loginForm: {
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10
  },
  loginFormInput: {
    borderRadius: 5,
    width: '100%',
    paddingLeft: 10,
    height: 40,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: '#eee'
  },
  reset: {
    marginTop: 30,
    flexDirection: 'row'
  },
  resetText: {
    fontSize: 12,
    color: 'gray',
  },
  resetButton: {
    fontSize: 12,
    color: 'blue',
    fontWeight: 'bold'
  },
  new: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '95%',
    padding: 20,
    justifyContent: 'center'
  },
  newText: {
    color: 'gray'
  },
  newButton: {
    color: 'blue',
    fontWeight: 'bold'
  }
});
