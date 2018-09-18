import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



class NameOfSubjects extends Component {

  state = {
    nameOfSubjects: ''
  }

  render(){


    // return (
    //   <KeyboardAwareScrollView
    //     style={{backgroundColor: 'red'}}
    //     contentContainerStyle={styles.container}
    //     resetScrollToCoords={{x:0,y:0}}
    //     scrollEnabled={false}
    //     >
    //     <View style={styles.tagsContainer}>
    //       <Text style={styles.tagsHeader}>Name of Subject(s)</Text>
    //       <TextInput
    //         value={this.state.nameOfSubjects}
    //         onChangeText={(nameOfSubjects)=>this.setState({nameOfSubjects})}
    //         placeholder={'here be some text'}
    //         style={{width: '100%', borderRadius: 4, fontSize: 16, padding: 5,backgroundColor: '#eee'}}
    //       />
    //     </View>
    //   </KeyboardAwareScrollView>
    // )


    return (
      <View style={styles.container}>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsHeader}>Name of Subject(s)</Text>
          <TextInput
            value={this.state.nameOfSubjects}
            onChangeText={(nameOfSubjects)=>this.setState({nameOfSubjects})}
            style={{width: '100%', borderRadius: 4, marginVertical: 8, fontSize: 16, padding: 5,backgroundColor: '#eee'}}
          />

          <Text style={styles.exampleText}>Separate names with commas and indicate who is who in the story (ex. Mike on the left, Sally wearing green).</Text>
        </View>
      </View>
    )
  }
}

export default NameOfSubjects;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#515260',
  },
  tagsContainer: {
    // backgroundColor: 'beige',
    flex: 1,
    // backgroundColor: 'pink',
  },
  tagsHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#515260',
    paddingBottom: 8
  },
  tags: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
  },
  tag: {
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: '#888',
    borderRadius: 13,
    marginRight: 10,
    overflow: 'hidden',
    fontSize: 13,
    color: '#fff'
  },

  exampleText: {
    fontSize: 12,
    color: '#aaa'
  }
})
