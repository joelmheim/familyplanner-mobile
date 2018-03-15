import { StackNavigator } from 'react-navigation';
//import { Icon } from 'react-native-elements';

import Persons from '../screens/Persons';
import Settings from '../screens/Settings';
import PersonDetails from '../screens/PersonDetails';

export const PersonStack = StackNavigator({
  Persons: {
    screen: Persons,
    navigationOptions: {
      title: 'Persons',
    },
  },
  Details: {
    screen: PersonDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
    }),
  },
});
/*
export const EventStack = StackNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      title: 'Events',
    },
  },
  Details: {
    screen: EventsDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.event.name,
    }),
  },
});
*/
export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  //Events: {
  //  screen: EventStack,
  //},
  Persons: {
    screen: PersonStack,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});