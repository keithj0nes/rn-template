import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class AddLocation extends Component {

  state = {
    locations: [
      {id: 1, title: 'Atlanta'},
      {id: 2, title: 'Dallas'},
      {id: 3, title: 'Savannah'}
    ],
    selectedLocation: {id: 3, title: 'Savannah'}
  }

// Only allowed one location
  addLocation = (location) => {
    let selectedLocation = {...this.state.selectedLocation};
    if(location.id === selectedLocation.id){
      selectedLocation = {};
    } else {
      selectedLocation = location;
    }
    this.setState({selectedLocation});
  }


  render(){

    return (
      <View style={styles.container}>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsHeader}>Add Location</Text>
          <View style={styles.tags}>
            {this.state.locations.map(item => {
              const selected = item.id === this.state.selectedLocation.id;
              return (
                <TouchableOpacity key={item.id} onPress={()=>this.addLocation(item)}>
                  <Text style={[styles.tag, {backgroundColor: selected ? '#51aae8' : '#888'} ]}>{item.title}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('selecTags')}>
            <Text> > </Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default AddLocation;

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
  },
  tagsHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#515260',
  },
  tags: {
    paddingTop: 8,
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
  }
})
