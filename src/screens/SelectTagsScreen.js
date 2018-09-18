import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class SelectTags extends Component {

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Icon name="magnify" style={styles.iconStyle}/>
            <TextInput
              placeholder={'Search'}
              style={{ flex: 1}}/>
          </View>
        </View>
      </View>
    )
  }
}

export default SelectTags;

const styles = StyleSheet.create({
  container: {

  },
  searchContainer: {
    // backgroundColor: 'pink',
    backgroundColor: '#fff',
    padding: 15
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: '#eee'
  },
  iconStyle: {
    // backgroundColor: 'blue',
    fontSize: 22,
    paddingRight: 4,
    color: '#aaa'
  }
})
