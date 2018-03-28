import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { DrawerStack } from './config/router';

import * as Actions from './actions';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: []
    };
  }

  componentDidMount() {
    Actions.getPeople();
    Actions.getEvents();
  } 

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      );
    } else {
      return <DrawerStack />;
    }
  }
}

//function mapStateToProps(state) {
//  return {
//    loading: state.people.loading,
//    people: state.people.data,
//    events: state.events.data
//  };
//}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(null, mapDispatchToProps)(Home);
//export default Home;

const styles = StyleSheet.create({
  activityIndicatorContainer:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

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