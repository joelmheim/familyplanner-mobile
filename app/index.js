import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { DrawerStack } from './config/router';

import * as css from './config/styles';
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
    this.props.getPeople();
    this.props.getEvents();
  } 

  render() {
    if (this.props.loading) {
      return (
        <View style={css.global.activityIndicatorContainer}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      );
    } else {
      return <DrawerStack />;
    }
  }
}

function mapStateToProps(state) {
  return {
    loading: state.people.loading,
    people: state.people.data,
    events: state.events.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);