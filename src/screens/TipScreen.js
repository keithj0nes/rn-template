import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




class TipScreen extends Component {

  static navigationOptions = ({navigation}) => {
    clearParams = () => {
      navigation.setParams({backRoute: null, multimediaType: null})
    }
    if(navigation.state.params && navigation.state.params.backRoute){
      const { backRoute, multimediaType } = navigation.state.params;
      return {
        headerLeft: (<HeaderBackButton onPress={()=>{navigation.navigate(backRoute), clearParams()}}/> ),
        headerRight: (
          <TouchableOpacity onPress={()=>{navigation.navigate(multimediaType), clearParams() }}>
            <Text style={{paddingRight: 10}}> Skip </Text>
          </TouchableOpacity>
        )
      }
    }
    return;
  }

  renderContinueBtn = () => {

    if(this.props.navigation.state.params && this.props.navigation.state.params.backRoute){
      return (
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate(this.props.navigation.state.params.multimediaType), this.props.navigation.setParams({backRoute: null, multimediaType: null})}}>
            <Text style={{alignSelf: 'center'}}> Continue </Text>
          </TouchableOpacity>
        )

    } else {
      return;
    }
  }

  render(){

    return (
      <ScrollView style={styles.container}>

        <View style={styles.contextContainer}>
          <View style={styles.paddingOnly}>
            <Text style={styles.headerText}>Context of Scene</Text>
            <Text style={styles.pText}>Provide the full context of a scene. When in doubt, show more of a scene than less</Text>
          </View>
          <ScrollView horizontal style={styles.contextImageContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Good photo example</Text>
              </View>
              <Text style={styles.boxContainerText}>On brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>

            <View style={{width: 30}}></View>

          </ScrollView>
        </View>


        <View style={styles.contextContainer}>
          <View style={styles.paddingOnly}>
            <Text style={styles.headerText}>Lighting</Text>
            <Text style={styles.pText}>Take a moment to review your lighting. Decide if any adjustments can be made before you begin.</Text>
          </View>
          <ScrollView horizontal style={styles.contextImageContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Good photo example</Text>
              </View>
              <Text style={styles.boxContainerText}>On brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>

            <View style={{width: 30}}></View>

          </ScrollView>
        </View>


        <View style={styles.contextContainer}>
          <View style={styles.paddingOnly}>
            <Text style={styles.headerText}>How to Frame a Good Photo</Text>
            <Text style={styles.pText}>Consider the rule of thirds when framing your shots. Place subjects on the sides of the frame, rather than in the center</Text>
          </View>
          <ScrollView horizontal style={styles.contextImageContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Good photo example</Text>
              </View>
              <Text style={styles.boxContainerText}>On brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxText}>Bad photo example</Text>
              </View>
              <Text style={[styles.boxContainerText, styles.alertColorText]}>Off brand</Text>
            </View>

            <View style={{width: 30}}></View>

          </ScrollView>
        </View>

        <View style={{marginTop: 20}}>
          {this.renderContinueBtn()}
        </View>

      </ScrollView>
    )
  }
}

export default TipScreen;


const styles = StyleSheet.create({
  container: {

  },
  contextContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    // paddingLeft: 20,

    marginTop: 10
  },
  headerText: {
    fontSize: 16,
    paddingBottom: 7,
    color: '#aaa'
  },
  pText: {
    color: '#444',
    paddingBottom: 7
  },
  contextImageContainer: {
    // backgroundColor: 'blue',
    // width: '100%',
    // height: 50
    paddingLeft: 20,
    paddingRight: 20
  },
  boxContainer: {

  },
  boxContainerText: {
    fontSize: 11
  },
  box: {
    height: 125,
    width: 125,
    backgroundColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxText: {
    fontSize: 12
  },
  alertColorText: {
    color: 'red'
  },
  paddingOnly: {
    paddingLeft: 20,
    paddingRight: 20
  }

})
