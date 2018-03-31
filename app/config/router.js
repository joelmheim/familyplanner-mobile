import React from 'react';
//import { ScrollView, DrawerView, View, Text, Animated, Easing, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Persons from '../screens/Persons';
import Settings from '../screens/Settings';
import PersonDetails from '../screens/PersonDetails';
import Events from '../screens/Events';
import EventDetails from '../screens/EventDetails';
import CreateEvent from '../screens/CreateEvent';
//import Login from '../screens/Login';
//import Signup from '../screens/Signup';
//import ForgottenPassword from '../screens/ForgottenPassword';
import DrawerContainer from '../screens/Drawer';
import * as css from './styles';

// const noTransitionConfig = () => ({
//   transitionSpec: {
//     duration: 0,
//     timing: Animated.timing,
//     easing: Easing.step0
//   }
// });

export const PersonStack = StackNavigator({
  Persons: {
    screen: Persons,
    navigationOptions: {
      backgroundColor: css.body.bodyStyle,
      headerStyle: css.header.headerStyle,
      headerTintColor: css.header.headerTintColor,
      title: 'People'
    },
  },
  PersonDetails: {
    screen: PersonDetails,
    navigationOptions: ({ navigation }) => ({
      backgroundColor: css.body.bodyStyle,
      headerStyle: css.header.headerStyle,
      headerTintColor: css.header.headerTintColor,
      title: navigation.state.params.name,
    }),
  },
});

export const EventStack = StackNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      backgroundColor: css.body.bodyStyle,
      headerStyle: css.header.headerStyle,
      headerTintColor: css.header.headerTintColor,
      title: 'Events'
    },
  },
  EventDetails: {
    screen: EventDetails,
    navigationOptions: ({ navigation }) => ({
      backgroundColor: css.body.bodyStyle,
      headerStyle: css.header.headerStyle,
      headerTintColor: css.header.headerTintColor,
      title: navigation.state.params.activity.name,
    }),
  },
  CreateEvent: {
    screen: CreateEvent,
    navigationOptions: {
      backgroundColor: css.body.bodyStyle,
      headerStyle: css.header.headerStyle,
      headerTintColor: css.header.headerTintColor,
      title: 'New Event',
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerStyle: css.header.headerStyle,
      title: 'Settings'
    },
  },
});

// export const Tabs = TabNavigator({
//   EventTab: {
//     screen: EventStack,
//     navigationOptions: {
//       tabBarLabel: 'Events',
//       tabBarIcon: ({ tintColor }) => <Icon name="event" size={35} color={tintColor} />,
//     },
//   },
//   PersonTab: {
//     screen: PersonStack,
//     navigationOptions: {
//       tabBarLabel: 'People',
//       tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
//     },
//   },
// });

// drawer stack
export const DrawerStack = DrawerNavigator({
  Events: { 
    screen: EventStack,
    navigationOptions: {
      drawerLabel: 'Events',
      drawerIcon: ({tintColor}) => <Icon name='event' color={tintColor}/> 
    }
  },
  Persons: { 
    screen: PersonStack,
    navigationOptions: {
      drawerLabel: 'People',
      drawerIcon: ({tintColor}) => <Icon name='account-circle' color={tintColor}/>
    }
  },
  Settings: { 
    screen: Settings,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ({tintColor}) => <Icon name='settings' color={tintColor}/>
    }
  },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerPosition: 'left',
  contentOptions: css.drawer
});

//export const DrawerNavigation = StackNavigator({
//  Drawer: { screen: DrawerStack }
//}, {
//  headerMode: 'float',
//  navigationOptions: ({navigation}) => ({
//    headerStyle: {backgroundColor: 'green'},
//    title: 'Logged In to your app!',
//    gesturesEnabled: false,
//    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
//  })
//});

// login stack
// export const LoginStack = StackNavigator({
//   Login: { screen: Login },
//   Signup: { screen: Signup },
//   ForgottenPassword: { screen: ForgottenPassword, navigationOptions: { title: 'Forgot Password' } }
// }, {
//   headerMode: 'float',
//   navigationOptions: {
//     headerStyle: {backgroundColor: 'red'},
//     title: 'You are not logged in'
//   }
// });

// export const Root = StackNavigator({
// //  LoginRoute: {
// //    screen: LoginStack,
// //  },
//   Drawer: {
//     screen: DrawerStack,
//   }
// }, {
//   headerMode: 'none',
//   title: 'Main',
// //  initialRouteName: 'LoginRoute',
// //  transitionConfig: noTransitionConfig
// });
