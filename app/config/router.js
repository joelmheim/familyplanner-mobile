import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Persons from '../screens/Persons';
import Settings from '../screens/Settings';
import PersonDetails from '../screens/PersonDetails';
import Events from '../screens/Events';
import EventDetails from '../screens/EventDetails';
import CreateEvent from '../screens/CreateEvent';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgottenPassword from '../screens/ForgottenPassword';
import DrawerContainer from '../screens/Drawer';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

export const PersonStack = StackNavigator({
  Persons: {
    screen: Persons,
    navigationOptions: {
      title: 'People',
    },
  },
  PersonDetails: {
    screen: PersonDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
    }),
  },
});

export const EventStack = StackNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      title: 'Events',
    },
  },
  EventDetails: {
    screen: EventDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.activity.name,
    }),
  },
  CreateEvent: {
    screen: CreateEvent,
    navigationOptions: ({ navigation }) => ({
      title: 'New Event',
    }),
  }
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
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
  Events: { screen: EventStack },
  Persons: { screen: PersonStack },
  Settings: { screen: Settings },
}, {
  gesturesEnabled: false,
  contentComponent: (props) => <DrawerContainer {...props} />
});

export const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'Logged In to your app!',
    gesturesEnabled: false,
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
});

// login stack
const LoginStack = StackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  ForgottenPassword: { screen: ForgottenPassword, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: 'red'},
    title: 'You are not logged in'
  }
});

export const Root = StackNavigator({
  LoginStack: {
    screen: LoginStack,
  },
  DrawerStack: {
    screen: DrawerStack,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'LoginStack',
  transitionConfig: noTransitionConfig
});
