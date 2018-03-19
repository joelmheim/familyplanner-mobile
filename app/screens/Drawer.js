import React from 'react';
import { StyleSheet, Text, View, ScrollView, Icon } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class DrawerContainer extends React.Component {

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'LoginStack' })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.navSectionStyle}>
            <Text
              onPress={() => navigation.navigate('Events')}
              style={styles.navItemStyle}>
              Events
            </Text>
            <Text
              onPress={() => navigation.navigate('Persons')}
              style={styles.navItemStyle}>
              People
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text
            onPress={() => navigation.navigate('Settings')}
            style={styles.navItemStyle}>
            Settings
          </Text>
          <Text
            onPress={this.logout}
            style={styles.navItemStyle}>
            Log Out
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  navItemStyle: {
    fontSize: 15,
    margin: 10,
    textAlign: 'right'
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    margin: 10,
    backgroundColor: 'lightgrey'
  },
  uglyDrawerItem: {
    fontSize: 20,
    color: 'white',
    padding: 5,
    margin: 5,
    //borderRadius: 10,
    //borderColor: 'blue',
    //borderWidth: 1,
    //textAlign: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden'
  }
});
