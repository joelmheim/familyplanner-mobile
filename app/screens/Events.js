import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Button, FlatList, ActivityIndicator, View } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import dateformat from 'dateformat';
import * as config from '../config/config';

export default class Events extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      data: [],
      error: null
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });

    fetch(config.eventsUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          data: res,
          error: res.error,
        });
      })
      .catch(error => {
        this.setState({
          error: error, 
          loading: false 
        });
      });
  }

  handleListItemPress = (item) => {
    this.props.navigation.navigate('EventDetails', { ...item });
  }

  onPressNew = () => {
    this.props.navigation.navigate('CreateEvent');
  }
  
  renderSeparator = () =>  {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  }

  renderHeader = () => {
    return (
      <View>  
        <SearchBar placeholder='Type Here...' lightTheme round />
        <Button
          onPress={this.onPressNew}
          style={styles.buttonStyle}
          title='+'
          color='grey'
          accessibilityLabel='New Event'
        />
      </View>
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  }

  eventStartAndEnd = (event) => {
    return `${dateformat(event.start, 'dd.mm HH:MM')} - ${dateformat(event.end, 'dd.mm HH:MM')}`;
  } 

  render() {
    return(
      <List containerStyle={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.activity.name}
              subtitle={this.eventStartAndEnd(item)}
              avatar={{ uri: item.actor.image }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.handleListItemPress(item)}
            />
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0 
  },
  buttonStyle: {
    margin: 10
  }
});