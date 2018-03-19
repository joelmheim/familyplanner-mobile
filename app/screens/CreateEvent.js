import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, TextInput, Text, DatePickerAndroid, TimePickerAndroid, TouchableNativeFeedback, View } from 'react-native';
import dateformat from 'dateformat';

export default class CreateEvent extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    let initialDate = new Date();
    initialDate.setHours(0,0,0);
    this.state = {
      actor: {},
      activity: '',
      startDateText: this.formatDate(initialDate),
      startTimeText: this.formatTime(initialDate),
      startDate: initialDate,
      endDateText: this.formatDate(initialDate),
      endTimeText: this.formatTime(initialDate),
      endDate: initialDate,
      helper: {}
    };   
  }

  formatDate(date) {
    return dateformat(date, 'dd.mm.yyyy');
  }

  formatTime(date) {
    return dateformat(date, 'HH:MM');
  }

  showDatePicker = async (stateKey, options) => {
    try {
      var newState = {};
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

  showTimePicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, hour, minute} = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'TimeText'] = 'pick a time';
      } else {
        var date = this.state[stateKey + 'Date'];
        date.setHours(hour, minute, 0, 0);
        newState[stateKey + 'TimeText'] = this.formatTime(date);
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.log(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formRowStyle}>
          <Text
            style={styles.labelStyle}>
          Activity
          </Text>
        </View>
        <View style={styles.formRowStyle}>
          <View style={styles.formColStyle}>
            <View style={styles.formRowStyle}>
              <View>
                <Text
                  style={styles.labelStyle}>
                  Title:
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({activity: text})}
                  value={this.state.text}
                />
              </View>
            </View>
            <View style={styles.formRowStyle}>
              <View>
                <Text
                  style={styles.labelStyle}>
                  Description:
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({activity: text})}
                  value={this.state.text}
                />
              </View>
            </View>
            <View style={styles.formRowStyle}>
              <View>
                <Text
                  style={styles.labelStyle}>
                  Location:
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({activity: text})}
                  value={this.state.text}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.formRowStyle}>
          <View>
            <Text
              style={styles.labelStyle}>
              Start date:
            </Text>
          </View>
          <View>
            <TouchableNativeFeedback
              onPress={this.showDatePicker.bind(this, 'start', {date: this.state.startDate, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.startDateText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback
              onPress={this.showTimePicker.bind(this, 'start', {hour: 0, minute: 0, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.startTimeText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.formRowStyle}>
          <View>
            <Text
              style={styles.labelStyle}>
              End date:
            </Text>
          </View>
          <View>
            <TouchableNativeFeedback
              onPress={this.showDatePicker.bind(this, 'end', {date: this.state.endDate, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.endDateText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback
              onPress={this.showTimePicker.bind(this, 'end', {hour: 0, minute: 0, mode: 'default'})}>
              <View>
                <Text style={styles.dateInputStyle}>{this.state.endTimeText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View>
          <Text style={styles.textInputStyle}>{dateformat(this.state.startDate, 'dd.mm.yyyy HH:MM:ss Z')}</Text>
        </View>
        <View>
          <Text style={styles.textInputStyle}>{dateformat(this.state.endDate, 'dd.mm.yyyy HH:MM:ss Z')}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  labelStyle: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left'
  },
  textInputStyle: {
    width: 250,
    margin: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  dateInputStyle: {
    width: 100,
    margin: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center'
  },
  formRowStyle: { 
    flex: 1, 
    flexDirection: 'row' 
  }
});
