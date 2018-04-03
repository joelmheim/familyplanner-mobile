import React from 'react';
import PropTypes from 'prop-types';
import { 
  Picker, 
  ScrollView, 
  TextInput, 
  Text, 
  DatePickerAndroid, 
  TimePickerAndroid, 
  TouchableNativeFeedback, 
  View,
  ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as css from '../config/styles';
import EventForm from './EventForm';
import * as Actions from '../actions';
import * as config from '../config/config';
import * as DateUtils from '../tools/DateUtils';

class CreateEvent extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
    getEvents: PropTypes.func.isRequired,
    people: PropTypes.array.isRequired
  }
  
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerRight: (
        <TouchableNativeFeedback
          onPress = {() => params.handleSave && params.handleSave()}>
          <Icon 
            name='done'
            containerStyle={{paddingRight: 10}}
            color={css.header.headerTintColor}
          />
        </TouchableNativeFeedback>
      ) 
    };
  }
  
  constructor(props) {
    super(props);
    console.log('CreateEvent constructor');
    this.state = { event: {} };
    let initialDate = new Date();
    initialDate.setHours(0,0,0);
    let event = {
      actor: {},
      activity: {},
      start: DateUtils.clone(initialDate),
      end: DateUtils.clone(initialDate),
      helper: {}
    };
    this.state = {
      event: event
    };
    this.updateEvent = this.updateEvent.bind(this);
    console.log('CreateEvent state: ', this.state);
  }

  init(props) {
    console.log('CreateEvent init');
    let initialDate = new Date();
    initialDate.setHours(0,0,0);
    this.setState({
      event: {
        actor: {},
        activity: {},
        start: DateUtils.clone(initialDate),
        end: DateUtils.clone(initialDate),
        helper: {}
      }
    });   
  }

  componentDidMount () {
    console.log('CreateEvent componentDidMount: ', this.state);
    this.props.navigation.setParams({handleSave: () => this.saveEvent()});
    let event = this.state.event;
    event['actor'] = this.props.people[0];
    this.setState({ event: event });
  }

  saveEvent() {
    ToastAndroid.showWithGravity(`Saving event '${this.state.event.activity.name}'.`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if (this.validateEvent()) {
      this.submitEvent();
    }
    this.props.getEvents();
  }

  validateEvent() {
    console.log('CreateEvent.validateEvent: ', this.state);
    return this.state.event.activity.name;
  }
  
  submitEvent() {
    console.log('CreateEvent.submitEvent: ', this.state);
    let event = {
      activity: this.state.event.activity,
      actor: this.state.event.actor._id,
      start: this.state.event.start.toISOString(),
      end: this.state.event.end.toISOString(),
      helper: (this.state.event.helper != {}) ? this.state.event.helper._id : null
    };
    fetch(config.eventsUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
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

  updateEvent(eventPart) {
    console.log('CreateEvent updateEvent: ', eventPart);
    let event = this.state.event;
    for (let key in eventPart) {
      if (eventPart.hasOwnProperty(key)) {
        console.log('CreateEvent.updateEvent setting key ', key, eventPart[key]);
        event[key] = eventPart[key];
      }
    }
    this.setState({event: event});
    console.log('CreateEvent resulting state: ', this.state);
  }

  render() {
    console.log('CreateEvent.render: ', this.state);
    return (
      <EventForm people={this.props.people} event={this.state.event} onEventChange={this.updateEvent} />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);