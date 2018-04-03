import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import dateformat from 'dateformat';
import * as Actions from '../actions';
import * as css from '../config/styles';

class Events extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    getEvents: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    events: PropTypes.array.isRequired,
    people: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  handleListItemPress = (item) => {
    this.props.navigation.navigate('EventDetails', { ...item });
  }

  onNewItemPressed = () => {
    this.props.navigation.navigate('CreateEvent');
  }
  
  renderSeparator = () =>  {
    return (
      <View
        style={{
          height: 1,
          width: '88%',
          backgroundColor: css.colors.background_dark,
          marginLeft: '12%'
        }}
      />
    );
  }

  renderHeader = () => {
    return null;
  }

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: css.colors.background_light
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
      <List containerStyle={css.body.container}>
        <FlatList
          data={this.props.events}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.activity.name}
              subtitle={this.eventStartAndEnd(item)}
              avatar={{ uri: item.actor.image }}
              containerStyle={css.body.listStyle}
              chevronColor={css.colors.text_medium}
              onPress={() => this.handleListItemPress(item)}
            />
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
        <ActionButton
          buttonColor={css.colors.button_new}
          onPress={this.onNewItemPressed}/>
      </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(Events);