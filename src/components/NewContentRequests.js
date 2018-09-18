import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import NewContentRequestItem from '../components/NewContentRequestItem';

class NewContentRequests extends React.Component {

  state = {
    requests: [{
      id: 1,
      title: 'Marine Parade Atlanta',
      description: 'I am looking for stories from the Marine parade held in Atlanta, Georgia on July 12th, 2018'
    },
    {
      id: 2,
      title: 'Training Exercises',
      description: 'I need both photos and videos of any training exercises you might be participating in.'
    },
    {
      id: 3,
      title: 'Welcome Back',
      description: 'We just wanted to wish you a warm welcome back to the states after your service, thank you!'
    },
    {
      id: 4,
      title: 'More photos',
      description: 'I was hoping for a couple more photos from the event last week?'
    },
    {
      id: 5,
      title: 'Training Exercises',
      description: 'I need both photos and videos of any training exercises you might be participating in.'
    },
    {
      id: 6,
      title: 'Training Exercises',
      description: 'I need both photos and videos of any training exercises you might be participating in.'
    }]
  }

  render(){
    return (

      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>New Content Requests</Text>
          <Text style={styles.headerSubText}>View All Requests ></Text>
        </View>
        {this.state.requests.map(request => {
          return <NewContentRequestItem key={request.id} data={request} />
        })}
      </ScrollView>


    )
  }
}

export default NewContentRequests;

// const darkColor = '#6e7082';
const darkColor = '#515260';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // backgroundColor: 'red'
    backgroundColor: '#fff',
    // flex: 1,
  },
  headerContainer: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkColor
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkColor
  },
  headerSubText: {
    fontSize: 12,
    color: darkColor
  }
})
