import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class AddTags extends Component {

  state = {
    tags: [
      {id: 1, title: 'Military Dog'},
      {id: 2, title: 'Enlisted'},
      {id: 3, title: 'Training'}
    ],
    selectedTags: [{id: 1, title: 'Military Dog'}]
  }

  addTag = (tag) => {

    const selectedTags = [...this.state.selectedTags]
    const index = selectedTags.findIndex(o => o.id === tag.id);
    if(index >= 0){
      // console.log(index, 'index');
      selectedTags.splice(index,1);
    } else {
      selectedTags.push(tag)
    }

    this.setState({selectedTags}, () => {

      this.props.addTags(this.state.selectedTags)
        
    })
    console.log(selectedTags);
  }


  render(){
    // console.log(this.props, 'props');
    // console.log(this.state.selectedTags.indexOf({id: 1}), 'hello');

    return (
      <View style={styles.container}>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsHeader}>Add Tags</Text>
          <View style={styles.tags}>
            {this.state.tags.map(item => {
              const index = this.state.selectedTags.findIndex(o => o.id === item.id);
              // console.log(index, 'index!');
              return (
                <TouchableOpacity key={item.id} onPress={()=>this.addTag(item)}>
                  <Text style={[styles.tag, {backgroundColor: index >= 0 ? '#51aae8' : '#888'} ]}  >{item.title}</Text>
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

export default AddTags

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
