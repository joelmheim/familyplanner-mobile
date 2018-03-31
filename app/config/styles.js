import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    main: '#4abdac',
    accent: '#9ebfb7',
    event: '#f78733',
    grey: '#dfdce3',
    orange: '#fcac1a',
    borderColor: '#ced0ce'
  }
};
export const colors = {
  'background_dark': '#455a64',
  'background_medium': '#b3c4cb',
  'background_light': '#d9e3f0',
  'button_bg': '#0693e3',
  'button_fg': '#d9e3f0',
  'button_new': '#f78733',
  'text_light': '#d9d9d9',
  'text_medium': '#455a64',
  'text_dark': '#263238',
};
export const values = {
  'font_title': 'NotoSans-Bold',
  'font_body': 'NotoSans-Regular',
  'font_body_size': 14,
  'font_title_size': 20,
  'border_radius': 2,
};
export const global = StyleSheet.create({
  v_container: {
    flex: 1,
    padding: 8,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
    backgroundColor: colors.text_light,
  },
  title: {
    flex: -1, // shrink to min height & width if needed
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 4,
    fontSize: values.font_title_size,
    color: colors.text_dark,
    fontFamily: values.font_title, // more info https://goo.gl/7wYazn
  },
  body1: {
    flex: -1,
    marginTop: 4,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    fontFamily: values.font_body, // more info https://goo.gl/7wYazn
    fontSize: values.font_body_size,
    color: colors.text_medium,
  },
  h_container: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch', // overrides container alignItems
    backgroundColor: colors.background_medium,
    padding: 16,
  },
  icon: {
    flex: -1,
    margin: 8,
    height: 100,
    width: 75,
    resizeMode: 'contain', //'cover' | 'contain'
  },
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  navItemStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  navSectionStyle: {
    backgroundColor: 'lightblue'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    margin: 10,
    backgroundColor: 'lightblue'
  },
  activityIndicatorContainer:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export const header = {
  // background
  headerStyle: {
    backgroundColor: colors.background_dark,
  },
  // arrows
  headerTintColor: colors.text_light,
  // my own styles for titleAndIcon
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
  },
  // my own styles for titleAndIcon
  text: {
    paddingLeft: 8,
    color: colors.text_light,
    fontFamily: values.font_body,
    fontSize: values.font_title_size,
  },
  headerImageStyle: {
    height: 50,
    width: 50
    //textAlign: 'left'
  },
  headerItemStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'right'

  }
};

export const body = {
  // background
  bodyStyle: {
    backgroundColor: colors.background_dark,
  },
  container: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    height: '100%',
    backgroundColor: colors.background_dark
  },
  listStyle: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    backgroundColor: colors.background_medium
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  itemStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 100,
    paddingVertical: 5,
    margin: 10
  }
};

export const input = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    width: '100%'
  },
  labelStyle: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingTop: 10
  },
  textInputStyle: {
    width: '100%',
    margin: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 0,
    alignItems: 'flex-end',
  },
  dateInputStyle: {
    width: 100,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'flex-end',
    
  },
  timeInputStyle: {
    width: 70,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'flex-end',
    textAlign: 'center'
  },
  inputColStyle: {
    flex: 2,
    alignItems: 'flex-end'
  },
  labelColStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  formRowStyle: { 
    flex: 1, 
    flexDirection: 'row' 
  }
});

export const drawer = {
  activeBackgroundColor: colors.background_medium,
  inactiveBackgroundColor: colors.background_dark,
  inactiveTintColor: colors.text_light, // text color for inactive drawer items
  activeTintColor: colors.text_dark, // text color for active drawer items
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
    backgroundColor: colors.background_dark
  },
  headerStyle: {
    backgroundColor: colors.background_dark
  },
  // style object for text style
  labelStyle: {
    fontFamily: values.font_body,
    fontSize: values.font_body_size,
    fontWeight: 'bold'
  },
  // style object for the content section
  style: {
    backgroundColor: colors.background_dark,
  },
};


// Unused styles below
const styles = StyleSheet.create({

  row:{
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },

  title:{
    fontSize: 15,
    fontWeight: '600'
  },

  description:{
    marginTop: 5,
    fontSize: 14,
  }
});

