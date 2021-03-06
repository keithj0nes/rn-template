import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CameraRoll, Image, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { determinCaptureRoute } from '../actions/captureActions';
import { RNCamera } from 'react-native-camera';
import  { AudioRecorder, AudioUtils } from 'react-native-audio';

import globalStyles from '../assets/styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class CameraScreen extends Component {

  static navigationOptions = ({navigation}) => {
    // tabBarVisible: false
    // tabBar: ({state}) => ({
    //   visible: false
    // })
  }

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],

    ready: true,
    // photo: '',
    cameraType: '',
    isRecording: false,
    recordingTime: 0,

    audioPath:  AudioUtils.DocumentDirectoryPath + '/test.aac'

  };

  toggleFlash = () => {
    this.setState({flash: !this.state.flash})
  }

  toggleFacing = () => {
    this.setState({type: this.state.type === 'back' ? 'front' : 'back'})
  }

  toggleGallery = () => {
    this.setState({showGallery: !this.state.showGallery})
  }

  takeVideo = async () => {
    if(this.camera){
      console.log('this.camera.getStatus() = ', this.camera.getStatus());
      this.setState({ready: false, mute: false, isRecording: true})
      const options = {orientation: 'auto', quality: 0.5, maxDuration: 5}

      this.camera.recordAsync(options).then((data) => { //fires first time, does not fire second time
        console.log(data, 'loggind data');
        this.props.navigation.navigate('captureDetails', {filePath: data.uri, type: 'video'}) // go to next screen
      })
      .catch(err => console.log(err, 'errorrrrrr'));
    }
  }

  stopVideo = () => {
    this.setState({isRecording: false, ready: true}, () => {
      console.log('this.camera.stopRecording() activated');
      this.camera.stopRecording();
    });
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({ready: false})
      const options = { quality: 0.5, base64: true, orientation: 'auto', forceUpOrientation: true, fixOrientation: true};
      this.camera.takePictureAsync(options).then((data) => {
        this.setState({ready: true})
        // this.setState({photo: data.base64})

        console.log(data, 'res');


        this.props.navigation.navigate('captureDetails', {filePath: data.base64, type: 'photo'})
        // try {
        //   CameraRoll.saveToCameraRoll(data.uri).then((res) => {
        //     console.log(res, 'ressss');
        //   })
        // }
        // catch (err) {
        //   console.log(err, 'logging error');
        // }

      })
    }
  };


  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }


  startAudio = async () => {

    console.log('recording!');
    // let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
    this.setState({isRecording: true})
    //
    // AudioRecorder.prepareRecordingAtPath(audioPath, {
    //   SampleRate: 22050,
    //   Channels: 1,
    //   AudioQuality: "Low",
    //   AudioEncoding: "aac"
    // });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (err){console.log(err, 'start recording error')}
  }


  stopAudio = async () => {
    console.log('stopping');
    this.setState({isRecording: false})
    try {
      const filePath = await AudioRecorder.stopRecording();
      console.log(`Finished recording of duration  seconds at path: ${filePath} and size of  bytes`);

    } catch (err) { console.log(err, 'error in stopAudio')};
  }


  // async _stop() {
  //   if (!this.state.recording) {
  //     console.warn('Can\'t stop, not recording!');
  //     return;
  //   }
  //
  //   this.setState({stoppedRecording: true, recording: false, paused: false});
  //
  //   try {
  //     const filePath = await AudioRecorder.stopRecording();
  //
  //     if (Platform.OS === 'android') {
  //       this._finishRecording(true, filePath);
  //     }
  //     return filePath;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // async _record() {
  //     if (this.state.recording) {
  //       console.warn('Already recording!');
  //       return;
  //     }
  //
  //     if (!this.state.hasPermission) {
  //       console.warn('Can\'t record, no permission granted!');
  //       return;
  //     }
  //
  //     if(this.state.stoppedRecording){
  //       this.prepareRecordingPath(this.state.audioPath);
  //     }
  //
  //     this.setState({recording: true, paused: false});
  //
  //     try {
  //       const filePath = await AudioRecorder.startRecording();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }




  componentDidMount(){
    StatusBar.setHidden(true)
    const params = this.props.navigation.state.params || {}
    let cameraType = params.cameraType || 'photo';

    this.setState({cameraType})

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        StatusBar.setHidden(true);
        this.forceUpdate();
      }
    );



    AudioRecorder.requestAuthorization().then((isAuthorised) => {
        this.setState({ hasPermission: isAuthorised });
        console.log(isAuthorised, 'isAuthorised');
        if (!isAuthorised) return;

        this.prepareRecordingPath(this.state.audioPath);

        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };

        AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            // this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
            // const filePath = data.audioFileURL;
            // console.log(`Finished recording of duration  seconds at path: ${filePath} and size of  bytes`);
            console.log(data.audioFileURL, 'data.audioFileURL');
            this.props.navigation.navigate('captureDetails', {filePath: data.audioFileURL, type: 'audio'})

          } else {
            console.log(data.audioFileURL, 'ANDROID AUDIOFILEURL');
          }
        };
      });
  }

  renderCameraButton = () => {

    const params = this.props.navigation.state.params || {}
    let cameraType = params.cameraType || 'photo';
    console.log(cameraType, 'cameraType');
    // console.log(this.state.cameraType, 'state.cameraType');

    const handleVideoStyle = this.state.isRecording ? styles.recordButtonStop : styles.recordButtonView;
    const handleVideoPress = this.state.isRecording ? this.stopVideo : this.takeVideo;

    const handleAudioStyle = this.state.isRecording ? styles.recordButtonStop : {justifyContent: 'center', flex: 1, alignItems: 'center'}
    const handleAudioPress = this.state.isRecording ? this.stopAudio : this.startAudio;

    if(this.props.captureType === 'photo'){
      return (
          <TouchableOpacity
              onPress={this.takePicture}
              style={styles.captureButton}
          >
              <View style={styles.captureButtonView}></View>
          </TouchableOpacity>
        )

    } else if (this.props.captureType === 'video'){
      return (

        <TouchableOpacity
            onPress={handleVideoPress}
            style={styles.captureButton}
        >
            {/*<View style={[styles.captureButtonView, {backgroundColor: 'red'}]}></View>*/}
            <View style={handleVideoStyle}></View>
        </TouchableOpacity>


        )
    } else if (this.props.captureType  === 'audio'){
      return (

        <TouchableOpacity
            onPress={handleAudioPress}
            style={styles.captureButton}
        >
            {/*<View style={[styles.captureButtonView, {backgroundColor: 'red'}]}></View>*/}
            {/*<View style={handleVideoStyle}></View>*/}
            {/*<View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>*/}
            <View style={handleAudioStyle}>
              {!this.state.isRecording && <Icon name="microphone" size={35} color="#fff"/>}
            </View>

        </TouchableOpacity>
      )
    }

  }

  render() {

    // console.log(this.props.navigation, 'navigation');
    const opacityCam = this.state.cameraType === 'video' ? 0.5 : 1;
    const absoluteCam = this.state.cameraType === 'photo' ? styles.photoView : styles.videoView;

    return (
      <View style={styles.container}>

          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={this.state.type}
              flashMode={this.state.flash}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
          />


        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Home')}}
            style={{position: 'absolute', top: 20, left: 10}}
        >
            <Text style={{color: 'white', fontSize: 14}}> Cancel </Text>
        </TouchableOpacity>




        <View style={ absoluteCam }>


          <View style={{backgroundColor: globalStyles.primaryBackground.backgroundColor, opacity: opacityCam, position: 'absolute', top:0, bottom:0, left:0, right:0}}>
          </View>

          <View style={{paddingBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>

            <Text style={{paddingHorizontal: 4, color: 'white'}} onPress={()=>this.props.determinCaptureRoute('photo')}>Photo</Text>
            <Text style={{paddingHorizontal: 4, color: 'white'}} onPress={()=>this.props.determinCaptureRoute('video')}>Video</Text>
            <Text style={{paddingHorizontal: 4, color: 'white'}} onPress={()=>this.props.determinCaptureRoute('audio')}>Audio</Text>

          </View>


          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

            <View style={{flex: 1, backgroundColor: '', alignItems: 'flex-start'}}>
              <TouchableOpacity
                  onPress={this.toggleGallery}
                  style={{height: 60, width: 60, marginLeft: 7, backgroundColor: 'gray'}}
              >
                  <View></View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 2, backgroundColor: '',  alignItems: 'center'}}>

              {this.renderCameraButton()}
            </View>

            {/*<TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style = {styles.capture}
            >
                <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>*/}
            <View style={{flex: 1, backgroundColor: '', alignItems: 'flex-end'}}>

              {/*<TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing}>*/}
                {/*// <Text style={styles.flipText}> FLIP </Text>*/}
              <TouchableOpacity onPress={this.toggleFacing}>

                <Icon name={"autorenew"} style={styles.flipText}/>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, 'state in CameraScreen');
  return {
    captureType: state.capture && state.capture.captureType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    determinCaptureRoute: captureType => {
      dispatch(determinCaptureRoute(captureType))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    // margin: 20
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "blue"
  },
  flipText: {
    color: 'white',
    fontSize: 38
  },
  captureButton: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1
  },
  captureButtonView: {
    margin: 7,
    backgroundColor: 'white',
    // height: '100%',
    // width: '100%',
    flex: 1,
    borderRadius: 50,

  },

  recordButtonView: {
    margin: 7,
    backgroundColor: 'red',
    // height: '100%',
    // width: '100%',
    flex: 1,
    borderRadius: 50,
  },

  recordButtonStop: {
    margin: 13,
    backgroundColor: 'red',
    // height: '100%',
    // width: '100%',
    flex: 1,
  },


  videoView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    padding: 10,
    paddingBottom: 20
  },
  photoView: {
    flex: 0,
    padding: 10,
    paddingBottom: 20
  }
});
