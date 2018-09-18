import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NewContentRequestItem extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.headerDescContainer}>
          <Text style={styles.title}>{this.props.data.title}</Text>
          <Text style={styles.description}>{this.props.data.description}</Text>

        </View>
        <View style={styles.arrowContainer}>
            <Text style={styles.arrow}> > </Text>
        </View>
      </View>
    )
  }
}

export default NewContentRequestItem;

// const darkColor = '#6e7082';
const darkColor = '#515260';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDescContainer: {
    width: '94%'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: darkColor,
    paddingBottom: 4
  },
  arrowContainer: {
    width: '6%',
    justifyContent: 'center'
  },
  description: {
    fontSize: 12,
    color: darkColor,
  },
  arrow: {
    color: darkColor
  }
})
