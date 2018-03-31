import React from 'react';
import PropTypes from 'prop-types';
import { 
  Picker, 
  StyleSheet, 
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

//import { NEWEVENT_CREATED, NEWEVENT_FAILED } from '../actions';
import * as Actions from '../actions';
import * as config from '../config/config';

class CreateEvent extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }
  
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerRight: (
        <TouchableNativeFeedback
          onPress = {() => params.handleSave && params.handleSave()}>
          <Icon name='done'/>
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
  }

  saveEvent = () => {
    console.log('Save state: ', this.state);
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
      actor: this.state.actor,
      start: this.state.startDate.toISOString(),
      end: this.state.endDate.toISOString(),
      helper: this.state.helper
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

  formatDate(date) {
    return dateformat(date, 'dd.mm.yyyy');
  }

  formatTime(date) {
    return dateformat(date, 'HH:MM');
  }

  showDatePicker = async (stateKey, options) => {
    try {
      let newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date(year, month, day);
        if (stateKey === 'start') {
          newState['startDateText'] = this.formatDate(date);
          newState['startDate'] = date;
          if (this.state.startDate === this.state.endDate) {
            newState['endDateText'] = this.formatDate(date);
            newState['endDate'] = date;
          }
        } else {
          newState['endDateText'] = this.formatDate(date);
          newState['endDate'] = date;
        }
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.log(`Error in example '${stateKey}': `, message);
    }
  };

  updatePerson(stateKey, person_id, index) {
    let newState = {}; 
    if (person_id != '-1' && index >= 0) {
      if (stateKey === 'helper') { index -= 1; }
      newState[stateKey] = this.props.people[index];
      this.setState(newState);
    }
  }

  updateActivity(stateKey, text) {
    let activity = this.state.activity;
    activity[stateKey] = text;
    this.setState({activity: activity});
  }

  showTimePicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, hour, minute} = await TimePickerAndroid.open(options);
      if (action !== TimePickerAndroid.dismissedAction) {
        var date = this.state[stateKey + 'Date'];
        date.setHours(hour, minute, 0, 0);
        if (stateKey == 'start') {
          newState['startTimeText'] = this.formatTime(date);
          newState['startDate'] = date;
          if (this.state.startDate === this.state.endDate) {
            newState['endTimeText'] = this.formatTime(date);
            newState['endDate'] = date;
          } 
        } else {
          newState['endTimeText'] = this.formatTime(date);
          newState['endDate'] = date;
        }
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.log(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text
            style={styles.labelStyle}>
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
        <View style={styles.formRowStyle}>
          <Text
            style={styles.labelStyle}>
            Activity
          </Text>
        </View>
        <View style={styles.formRowStyle}>
          <View style={styles.inputColStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => this.updateActivity('name', text) }
              //value={this.state.text}
              placeholder='Give the activity a descriptive name' 
            />
          </View>
        </View>
        <View style={styles.formRowStyle}>
          <View style={styles.inputColStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => this.updateActivity('description', text) }
              //value={this.state.text}
              placeholder='Give the activity a description'
            />
          </View>
        </View>
        <View style={styles.formRowStyle}>
          <View style={styles.inputColStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => this.updateActivity('location', text) }
              //value={this.state.text}
              placeholder='Where is the activity located?'
            />
          </View>
        </View>
        <View style={styles.formRowStyle}>
          <View style={styles.labelColStyle}>
            <Text
              style={styles.labelStyle}>
              Start:
            </Text>
          </View>
          <View style={styles.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showDatePicker.bind(this, 'start', {date: this.state.startDate, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.startDateText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showTimePicker.bind(this, 'start', {hour: 0, minute: 0, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.startTimeText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.formRowStyle}>
          <View style={styles.labelColStyle}>
            <Text
              style={styles.labelStyle}>
              End:
            </Text>
          </View>
          <View style={styles.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showDatePicker.bind(this, 'end', {date: this.state.endDate, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.endDateText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.inputColStyle}>
            <TouchableNativeFeedback
              onPress={this.showTimePicker.bind(this, 'end', {hour: 0, minute: 0, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.endTimeText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View>
          <Text
            style={styles.labelStyle}>
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

const styles = StyleSheet.create({
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
    margin: 10
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
    //borderColor: 'grey',
    //borderWidth: 1,
    //backgroundColor: '#f78733',
    //borderRadius: 10,
    alignItems: 'flex-end',
    
  },
  timeInputStyle: {
    width: 70,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    //color: 'white',
    fontWeight: 'bold',
    //borderColor: 'white',
    //borderWidth: 1,
    //backgroundColor: '#f78733',
    //borderRadius: 10,
    alignItems: 'flex-end',
    textAlign: 'center'
  },
  inputColStyle: {
    flex: 2,
    //width: '90%',
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
