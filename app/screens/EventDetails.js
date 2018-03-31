import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import { Tile, List, ListItem, Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import dateformat from 'dateformat';
import * as config from '../config/config';
import * as css from '../config/styles';
import * as Actions from '../actions';

class EventDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          activity: PropTypes.object.isRequred,
          actor: PropTypes.object.isRequired
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerRight: (
        <TouchableNativeFeedback
          onPress = {() => params.handleDelete && params.handleDelete()}>
          <Icon 
            name='delete'
            containerStyle={{paddingRight: 10}}
            color={css.header.headerTintColor}
          />
        </TouchableNativeFeedback>
      ) 
    };
  }
  
  componentDidMount() {
    this.props.navigation.setParams({handleDelete: () => this.deleteEvent()});
  }

  deleteEvent() {
    ToastAndroid.showWithGravity(`Deleting event '${this.props.navigation.state.params.activity.name}'.`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    let eventId = this.props.navigation.state.params._id;
    fetch(`${config.eventsUrl}/${eventId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        ToastAndroid.showWithGravity(res.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        this.props.navigation.navigate('Events');
      })
      .catch(error => {
        ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      });
  }

  render() {
    const { start, end, activity, actor } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: actor.image }}
          featured
          title={activity.name}
          caption={activity.description}
        />

        <List>
          <ListItem
            title="Location"
            rightTitle={activity.location}
            hideChevron
          />
          <ListItem
            title="Start"
            rightTitle={dateformat(new Date(start), 'dd.mm.yyyy, HH:MM:ss')}
            hideChevron
          />
          <ListItem
            title="End"
            rightTitle={dateformat(new Date(end), 'dd.mm.yyyy, HH:MM:ss')}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.events.loading,
    events: state.events.data,
    people: state.people.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);