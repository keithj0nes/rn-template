import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';

import { addDescription, addTags, nameOfSubjects } from '../actions/story';

import AddTags from '../components/AddTags';
import AddLocation from '../components/AddLocation';
import NameOfSubjects from '../components/NameOfSubjects';

class CaptureDetailsScreen extends Component {

  static navigationOptions = ({navigation}) => {

    // console.log(navigation.state, 'navstate');
      return {
           // headerVisible: navigation.state.params.isHeaderShow
        header: navigation.state.params && navigation.state.params.hideHeader ? null : undefined,
        title: navigation.state.params && navigation.state.params.description ? 'Description' : 'My Story',
        headerRight: navigation.state.params && navigation.state.params.description ? <TouchableOpacity onPress={navigation.state.params.handleOk}><Text style={{paddingRight: 10}}>OK</Text></TouchableOpacity> : undefined,
        headerLeft: navigation.state.params && navigation.state.params.description ? null : undefined,
      }
  }

  state = {
    description: '',
    imageExpanded: false,
    descriptionFocused: false
  }

  componentDidMount(){
    StatusBar.setHidden(false);
    this.props.navigation.setParams({handleOk: this.handleOk})
  }



  handleOk = () => {
    // console.log('handling ok!');
    const description = this.props.navigation.getParam('description')
    this.descriptionInput.blur();
    this.props.navigation.setParams({description: !description});
    this.setState({descriptionFocused: !this.state.descriptionFocused})
  }



  expandImage = () => {
    console.log('expanding image');
    const hideHeader = this.props.navigation.getParam('hideHeader')
    // console.log(hideHeader);

    if(this.state.descriptionFocused){
      this.descriptionInput.blur();
    }

    console.log('here');
    this.props.navigation.setParams({hideHeader: !hideHeader});
    this.setState({imageExpanded: !this.state.imageExpanded, descriptionFocused: false})
  }



  focusDescription = (tf) => {
    if(this.state.descriptionFocused){
      this.descriptionInput.blur();
    }

    this.props.navigation.setParams({description: !this.state.descriptionFocused});
    this.setState({descriptionFocused: !this.state.descriptionFocused})
  }

  onBuffer = () => {
    console.log('on Buffer fired');
  }

  onEnd = ()=> {
    console.log('on end fired');
  }

  onError = (e) => {
    console.log(e, 'error occured');
  }

  renderViewer = () => {
    const { filePath, type } = this.props.navigation.state.params;
    const HEIGHT = Dimensions.get('window').height;


    if(type === 'photo'){
      return (
        <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, height: HEIGHT, backgroundColor: 'rgba(0,0,0,0.9)',  zIndex: 1000}}>
          <TouchableWithoutFeedback  onPress={this.expandImage} style={{width: '100%', height: '100%',}}>
            <Image source={{isStatic: true, uri: `data:image/jpeg;base64,${filePath}`}} style={{width: '100%', height: HEIGHT, resizeMode: 'contain' }}/>
          </TouchableWithoutFeedback>
        </View>
      )
    }

    if(type === 'video'){
      return (
        <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, height: HEIGHT, backgroundColor: 'rgba(0,0,0,0.9)',  zIndex: 1000}}>
          <TouchableWithoutFeedback  onPress={this.expandImage} style={{width: '100%', height: '100%',}}>
              <Video
                source={{uri: filePath}}
                paused={this.state.paused}
                onBuffer={this.onBuffer}
                onEnd={this.onEnd}
                onError={this.videoError}
                style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
              />

          </TouchableWithoutFeedback>
        </View>
      )
    }




    if(type === 'audio'){
      return (
        <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, height: HEIGHT, backgroundColor: 'rgba(0,0,0,0.9)',  zIndex: 1000}}>
          <TouchableWithoutFeedback  onPress={this.expandImage} style={{width: '100%', height: '100%',}}>
              <Video
                source={{uri: filePath}}
                paused={this.state.paused}
                onBuffer={this.onBuffer}
                onEnd={this.onEnd}
                onError={this.videoError}
                style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
              />

          </TouchableWithoutFeedback>
        </View>
      )
    }



  }

  renderThumbnail = () => {
    const { filePath, type } = this.props.navigation.state.params;


    if(type === 'photo'){
      return (
        <Image source={{isStatic: true, uri: `data:image/jpeg;base64,${filePath}`}} style={{width: 160, height: 160, }}/>
      )
    }

    if(type === 'video'){
      return (
        <Video
              source={{uri: filePath}}
              paused={true}
              style={{width: 160, height: 160, }}
              resizeMode="stretch"
        />
      )
    }

    if(type === 'audio'){
      return <View style={{width: 160, height: 160, backgroundColor: 'pink'}}><Text>Preview</Text></View>
    }


  }

  render(){
    const { filePath } = this.props.navigation.state.params;
    const HEIGHT = Dimensions.get('window').height;
    return (



      <View style={styles.container}>

      {this.state.imageExpanded && this.renderViewer()}


        <View style={styles.imageDescContainer}>

          <TouchableWithoutFeedback onPress={this.expandImage}>

            {this.renderThumbnail()}

          </TouchableWithoutFeedback>

          <View style={styles.description}>
            <Text style={styles.descriptionHeader}>Description</Text>
            <TextInput
              ref={(input)=>this.descriptionInput = input}
              onFocus={()=>this.focusDescription(true)}
              value={this.state.description}
              onChangeText={(description)=>this.setState({description})}
              onChangeText={(des) => this.props.addDescription(des)}
              placeholder={'Describe what is happening in the story, and provide any relevant info.'}
              multiline={true}
              style={{flex: 1}}
            />
          </View>



        </View>

        <NameOfSubjects />

        <AddTags addTags={this.props.addTags} navigation={this.props.navigation}/>

        <AddLocation navigation={this.props.navigation} />



        {this.state.descriptionFocused && (

          <TouchableWithoutFeedback onPress={this.focusDescription} >
            <View style={{position: 'absolute',width: '150%', height: '200%', top: 180, left: 0, right: 0, bottom: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            </View>
          </TouchableWithoutFeedback>
          )
        }

      </View>



    )
  }
}

const mapStateToProps = state => {
  console.log(state, 'state in captureDetails');
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDescription: des => {
      dispatch(addDescription(des))
    },
    addTags: tag => {
      dispatch(addTags(tag))
    },
    nameOfSubjects: names => {
      dispatch(addNameOfSubjects(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptureDetailsScreen);


const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink'
    flex: 1,
  },
  imageDescContainer: {
    // borderTopWidth: 1,
    borderColor: '#515260',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  description: {
    // backgroundColor: 'beige',
    marginLeft: 10,
    flex: 1
  },
  descriptionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#515260',
    paddingBottom: 6
  },
  descriptionText: {
    fontSize: 13,
    color: '#888'
  }
})
