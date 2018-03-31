import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import dateformat from 'dateformat';
import * as config from '../config/config';
import * as Actions from '../actions';

class Events extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
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
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
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
          data={this.props.events}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.activity.name}
              subtitle={this.eventStartAndEnd(item)}
              avatar={{ uri: item.actor.image }}
              containerStyle={styles.listStyle}
              onPress={() => this.handleListItemPress(item)}
            />
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
        <ActionButton
          buttonColor='#f78733'
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

const styles = StyleSheet.create({
  container: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    height: '100%',
    backgroundColor: '#4abdac'
  },
  listStyle: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    backgroundColor: '#9ebfb7'
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  itemStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 100,
    paddingVertical: 5,
    //paddingHorizontal: 5,
    margin: 10
  }
});