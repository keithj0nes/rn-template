import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Modal, TouchableOpacity, StyleSheet } from 'react-native';

class CModal extends Component {

  render(){
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.props.visible} >

        <View style={styles.container}>
          <View style={styles.loaderBackground}></View>
          <View style={{position: 'absolute', alignItems: 'center'}}>


          {this.props.type === "loader" &&
            <View>
              <ActivityIndicator size="large" color="#00ff00" />
                <Text style={styles.loaderText}>{this.props.children}</Text>

            </View>
          }


          {this.props.type === "alert" &&


            <View style={styles.alertContainer}>
              <View style={{padding: 20}}>

                <Text style={styles.alertTitle}>{this.props.title}</Text>
                <Text style={styles.children}>{this.props.children}</Text>
              </View>
              <View>

              {this.props.showCloseBtn &&
                <TouchableOpacity style={styles.closeButton}
                  onPress={() => {
                    this.props.showCloseBtn();
                  }}>
                  <Text style={styles.closeBtn}>Close</Text>
                </TouchableOpacity>
              }
            </View>
          </View>

          }



          </View>
        </View>
      </Modal>
    )
  }
}

export default CModal;


const darkColor = '#515260';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaderBackground: {
    backgroundColor: '#000',
    opacity: 0.85,
    width: '100%',
    height: '100%'
  },
  loaderText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20
  },
  closeButton: {
    width: '100%',
    // marginTop: 40,
    padding: 20,
    backgroundColor: 'white',
    color: darkColor,
    // paddingTop: 20,
    // paddingBottom: 20,
    // backgroundColor: "gray",
    // borderRadius: 8,
    borderTopWidth: 1,
    borderColor: "black",
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertContainer: {
    width: '100%',
    backgroundColor: '#fff'
  },
  alertTitle: {
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
    color: darkColor
  },
  closeBtn: {
    color: darkColor
  },
  children: {
    color: darkColor
  }
})
