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
import dateformat from 'dateformat';
import * as css from '../config/styles';

import * as Actions from '../actions';
import * as config from '../config/config';

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
    let initialDate = new Date();
    initialDate.setHours(0,0,0);
    this.state = {
      actor: {},
      activity: {},
      startDateText: this.formatDate(initialDate),
      startTimeText: this.formatTime(initialDate),
      startDate: initialDate,
      endDateText: this.formatDate(initialDate),
      endTimeText: this.formatTime(initialDate),
      endDate: initialDate,
      helper: {}
    };   
  }

  componentDidMount () {
    this.props.navigation.setParams({handleSave: () => this.saveEvent()});
    this.setState({actor: this.props.people[0]});
    console.log('After setState(\'ComponentDidMount\'): ', this.state);
  }

  saveEvent() {
    ToastAndroid.showWithGravity(`Saving event '${this.state.activity.name}'.`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if (this.validateEvent()) {
      this.submitEvent();
    }
    this.props.getEvents();
  }

  validateEvent() {
    return this.state.activity.name;
  }
  
  submitEvent() {
    let event = {
      activity: this.state.activity,
      actor: this.state.actor._id,
      start: this.state.startDate.toISOString(),
      end: this.state.endDate.toISOString(),
      helper: (this.state.helper != {}) ? this.state.helper._id : null
    };
    console.log('Saving event: ', JSON.stringify(event) );
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

  formatDate(date) {
    return dateformat(date, 'dd.mm.yyyy');
  }

  formatTime(date) {
    return dateformat(date, 'HH:MM');
  }

  clone(date) {
    return new Date(date.getTime());
  }

  showDatePicker = async (stateKey, options) => {
    try {
      let newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = this.clone(this.state[`${stateKey}Date`]);
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        if (stateKey === 'start') {
          newState['startDateText'] = this.formatDate(date);
          newState['startDate'] = this.clone(date);
          if (this.state.startDate === this.state.endDate) {
            newState['endDateText'] = this.formatDate(date);
            newState['endDate'] = this.clone(date);
          }
        } else {
          newState['endDateText'] = this.formatDate(date);
          newState['endDate'] = this.clone(date);
        }
      }
      this.setState(newState);
    } catch ({code, message}) {
      ToastAndroid.showWithGravity(`Error: ${code}. Message: ${message}.`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  };

  updatePerson(stateKey, person_id, index) {
    let newState = {}; 
    if (stateKey === 'helper') { index -= 1; }
    if (person_id != '-1' && index >= 0) {
      newState[stateKey] = this.props.people[index];
    } else {
      newState[stateKey] = {};
    }
    this.setState(newState);
  }

  updateActivity(stateKey, text) {
    let activity = this.state.activity;
    activity[stateKey] = text;
    this.setState({activity: activity});
  }

  showTimePicker = async (stateKey, options) => {
    try {
      let newState = {};
      const {action, hour, minute} = await TimePickerAndroid.open(options);
      if (action !== TimePickerAndroid.dismissedAction) {
        let date = this.clone(this.state[`${stateKey}Date`]);
        date.setHours(hour, minute, 0, 0);
        if (stateKey == 'start') {
          newState['startTimeText'] = this.formatTime(date);
          newState['startDate'] = this.clone(date);
          if (this.state.startDate === this.state.endDate) {
            newState['endTimeText'] = this.formatTime(date);
            newState['endDate'] = this.clone(date);
          } 
        } else {
          newState['endTimeText'] = this.formatTime(date);
          newState['endDate'] = this.clone(date);
        }
      }
      this.setState(newState);
    } catch ({code, message}) {
      ToastAndroid.showWithGravity(`Error: ${code}. Message: ${message}.`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  };

  render() {
    return (
      <ScrollView style={css.input.container}>
        <View>
          <Text
            style={css.input.labelStyle}>
            Who?
          </Text>
          <Picker
            selectedValue={this.state.actor._id}
            onValueChange={(itemValue, itemIndex) => this.updatePerson('actor', itemValue, itemIndex)}>
            {this.props.people.map((person, index) => {
              return (< Picker.Item label={person.name} value={person._id} key={index} />);
            })}   
          </Picker>
        </View>
        <View style={css.input.formRowStyle}>
          <Text
            style={css.input.labelStyle}>
            Activity
          </Text>
        </View>
        <View style={css.input.formRowStyle}>
          <View style={css.input.inputColStyle}>
            <TextInput
              style={css.input.textInputStyle}
              onChangeText={(text) => this.updateActivity('name', text) }
              placeholder='Give the activity a descriptive name' 
            />
          </View>
        </View>
        <View style={css.input.formRowStyle}>
          <View style={css.input.inputColStyle}>
            <TextInput
              style={css.input.textInputStyle}
              onChangeText={(text) => this.updateActivity('description', text) }
              //value={this.state.text}
              placeholder='Give the activity a description'
            />
          </View>
        </View>
        <View style={css.input.formRowStyle}>
          <View style={css.input.inputColStyle}>
            <TextInput
              style={css.input.textInputStyle}
              onChangeText={(text) => this.updateActivity('location', text) }
              //value={this.state.text}
              placeholder='Where is the activity located?'
            />
          </View>
        </View>
        <View style={css.input.formRowStyle}>
          <View style={css.input.labelColStyle}>
            <Text
              style={css.input.labelStyle}>
              Start:
            </Text>
          </View>
          <View style={css.input.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showDatePicker.bind(this, 'start', {date: this.state.startDate, mode: 'default'})}>
              <View>
                <Text style={css.input.dateInputStyle}>{this.state.startDateText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={css.input.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showTimePicker.bind(this, 'start', {hour: 0, minute: 0, mode: 'default'})}>
              <View>
                <Text style={css.input.dateInputStyle}>{this.state.startTimeText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={css.input.formRowStyle}>
          <View style={css.input.labelColStyle}>
            <Text
              style={css.input.labelStyle}>
              End:
            </Text>
          </View>
          <View style={css.input.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showDatePicker.bind(this, 'end', {date: this.state.endDate, mode: 'default'})}>
              <View>
                <Text style={css.input.dateInputStyle}>{this.state.endDateText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={css.input.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showTimePicker.bind(this, 'end', {hour: 0, minute: 0, mode: 'default'})}>
              <View>
                <Text style={css.input.dateInputStyle}>{this.state.endTimeText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View>
          <Text
            style={css.input.labelStyle}>
            Helper?
          </Text>
          <Picker
            selectedValue={this.state.helper._id}
            onValueChange={(itemValue, itemIndex) => this.updatePerson('helper', itemValue, itemIndex)}>
            <Picker.Item label='None' value='0' key='-1' />
            {this.props.people.map((person, index) => {
              return (< Picker.Item label={person.name} value={person._id} key={index} />);
            })}   
          </Picker>
        </View>
      </ScrollView>
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