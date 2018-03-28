import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
//import { Icon } from 'react-native-elements';
import { SafeAreaView, DrawerItems, NavigationActions } from 'react-navigation';
import * as css from '../config/styles';

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
    return (
      <View style={css.drawer.container}>
        <View style={{flex: 1}} >
          <View style={css.drawer.headerContainer} >
            <Image
              style={css.header.headerImageStyle}
              source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAACLCAMAAADvXw2kAAAAM1BMVEVhsOKWyuzK5fU5nNry+P2w1/B7vedGot3l8vrX6/hUqd+93vNutuSIw+mj0e7///8sldjl5AJDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gMMDycD0r5xowAAA9lJREFUeNrtmtmCqyAMQAMi7sL/f+10rp2OC0tYW+cmj9VqjgnZAPTdBYiACIiACIiACIiACIiACIiACIiACO5EMKmnsDsSrOok7F4ErTJIcyOCQRllIIJaBL2yyngLAqkcIm9A4ARQ6vMJhPLISASlCZRXPpxAqXoI8BYfypmb4V0mUOKDCRYUQa6kQATRTpRtLScTwHQp/O9EwI8qga+kK1GkphA05s+qVFUj/NcEi7o5wWDRabwLwWDTCW5C0Fp1YkRQiUCVInh8Gj5XIBB2nWQgwZYVl+25LNw6cQSdQ6fQlbyvtoeI7gFy+lBMPtibjJ3bhwnRT0NWE0QQcNvFZUstRBDaAGymR8pkehaccuU7CDosQWd61uknkZlA+AjW0A5nMY0wjr6UlYCp1qOixsdTMD9qPPyqicDQ03DunYdG5LPj782xb825knFzLLwJTKue7Z6g6xNsU6AUE2xXRvRYD3LlstCA2tnT2XPN8UUTgUmmBO+4JI4mx1Q7OCc3OIQBM3q3XGwL92jeHmzwIwzOJw1lCIbfyNZjwpHLkbaPPObpnxEED43Ut0L4qOrxN+0x0kAE1ywmVf9QZwXr0Poo3Mm5euPylJ/gV/oOYQRn+nhemR3/n0sSvDY6RvQUaL18fp8X6qIEr1JFhry/Awior4jAM5vzaCHS02KblcAVKJqUMJJvHgxBW32nF9gipdxAfsPq9Y0yUyRyEzTCG60bQyLiqt/xHUrkuX/dN7uq7mw2QPlp13IlONuv8HMU5QyAMX60Yq49hT9OoIODRYtpcnr7wyMOvEBUyOicywa0ZyNE2PJ6/l0ohgt5HeNhfeZiLJt4gX00TNQG4yAIeVpzTD8x9ccJuF+H3uLkmEa0uQwlujYzQRPTh3WO7ebLWlkP75Mxaxlip0PaMbhFzIvmHwMKeYjES6Vo+lMaiGgC5fwARLCT0V1B2tYoYl9/tnhpbgLrfoz1ItIE1hvb3ATOAmy1eVfiFk5egtExWBQW51jRBGsFAuN3esQ8nhJLXeGYEwEG4eHsbZ9KIDMtBAyBNJ0cMNtA4AmmigSnJbv8KwCY8fUMT2A1F5Qg2JvhOTg3E0AGAkYEzh6ef9fOi7ISjK48jiTghQjOFbeZALdXuLtX1CRQDEDyva15OgGvSnDxVobWKoRgJQIkATd2ySEEYLkXKhGYD2bmINBEEELAAs7cYM/ZteUIVoQCEBBNLQQNEaQtBJZM0Ou6BNKUT5PqoqYkwYLQwHNiwU+gSxKcMlhrI0iprmciuKEQAREQAREQAREQAREQAREQAREQAREQARF8knwBQPxgqpO96QwAAAAASUVORK5CYII=' }}
            />  
            <Text
              style={css.header.text}>
            FamilyPlanner
            </Text>
          </View>
        </View>
        <View style={{flex: 3}} >
          <ScrollView
            style={{
              flex: 3,
              backgroundColor: css.drawer.style.backgroundColor,
            }}>
            <SafeAreaView style={css.header.container} forceInset={{ top: 'never', horizontal: 'left' }}>
              <DrawerItems {...this.props} />
            </SafeAreaView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4abdac',
//     paddingTop: 40,
//     paddingHorizontal: 20
//   },
//   headerImageStyle: {
//     height: 50,
//     width: 50
//     //textAlign: 'left'
//   },
//   headerItemStyle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 10,
//     textAlign: 'right'

//   },
//   navItemStyle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 10,
//     textAlign: 'center'
//   },
//   navSectionStyle: {
//     backgroundColor: 'lightblue'
//   },
//   sectionHeadingStyle: {
//     paddingVertical: 10,
//     paddingHorizontal: 5
//   },
//   footerContainer: {
//     margin: 10,
//     backgroundColor: 'lightblue'
//   }
// });
