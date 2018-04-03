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
import * as css from '../config/styles';
import * as DateUtils from '../tools/DateUtils';

class EventForm extends React.Component {

  static propTypes = {
    people: PropTypes.array.isRequired,
    event: PropTypes.shape({
      actor: PropTypes.shape.isRequired,
      activity: PropTypes.shape.isRequired,
      start: PropTypes.objectOf(Date).isRequired,
      end: PropTypes.objectOf(Date).isRequired,
      helper: PropTypes.objectOf(Object)
    }).isRequired,
    onEventChange: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      actor: props.event.actor,
      activity: props.event.activity,
      startDateText: DateUtils.formatDate(props.event.start),
      startTimeText: DateUtils.formatTime(props.event.start),
      startDate: props.event.start,
      endDateText: DateUtils.formatDate(props.event.end),
      endTimeText: DateUtils.formatTime(props.event.end),
      endDate: props.event.end,
      helper: props.event.helper
    };   
  }

  componentDidMount () {
  }

  showDatePicker = async (stateKey, options) => {
    try {
      let newState = {};
      let event = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = DateUtils.clone(this.state[`${stateKey}Date`]);
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        if (stateKey === 'start') {
          newState['startDateText'] = DateUtils.formatDate(date);
          newState['startDate'] = DateUtils.clone(date);
          event['start'] = DateUtils.clone(date);
          if (this.state.startDate.toISOString() === this.state.endDate.toISOString()) {
            newState['endDateText'] = DateUtils.formatDate(date);
            newState['endDate'] = DateUtils.clone(date);
            event['end'] = DateUtils.clone(date);
          }
        } else {
          newState['endDateText'] = DateUtils.formatDate(date);
          newState['endDate'] = DateUtils.clone(date);
          event['end'] = DateUtils.clone(date);
        }
      }
      //this.setState(newState);
      this.props.onEventChange(event);
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
    //this.setState(newState);
    this.props.onEventChange(newState);
  }

  updateActivity(stateKey, text) {
    let activity = this.state.activity;
    activity[stateKey] = text;
    //this.setState({activity: activity});
    this.props.onEventChange({activity: activity});
  }

  showTimePicker = async (stateKey, options) => {
    try {
      let newState = {};
      let event = {};
      const {action, hour, minute} = await TimePickerAndroid.open(options);
      if (action !== TimePickerAndroid.dismissedAction) {
        let date = DateUtils.clone(this.state[`${stateKey}Date`]);
        date.setHours(hour, minute, 0, 0);
        if (stateKey == 'start') {
          newState['startTimeText'] = DateUtils.formatTime(date);
          newState['startDate'] = DateUtils.clone(date);
          event['start'] = DateUtils.clone(date);
          if (this.state.startDate.toISOString() === this.state.endDate.toISOString()) {
            newState['endTimeText'] = DateUtils.formatTime(date);
            newState['endDate'] = DateUtils.clone(date);
            event['end'] = DateUtils.clone(date);
          } 
        } else {
          newState['endTimeText'] = DateUtils.formatTime(date);
          newState['endDate'] = DateUtils.clone(date);
          event['end'] = DateUtils.clone(date);
        }
      }
      //this.setState(newState);
      this.props.onEventChange(event);
    } catch ({code, message}) {
      ToastAndroid.showWithGravity(`Error: ${code}. Message: ${message}.`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  };

  render () {
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
              placeholder='Give the activity a description'
            />
          </View>
        </View>
        <View style={css.input.formRowStyle}>
          <View style={css.input.inputColStyle}>
            <TextInput
              style={css.input.textInputStyle}
              onChangeText={(text) => this.updateActivity('location', text) }
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

// function mapStateToProps(state) {
//   return {
//     loading: state.people.loading,
//     people: state.people.data,
//     events: state.events.data
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
export default EventForm;