import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//import * as config from '../config/config';
import * as css from '../config/styles';
import * as Actions from '../actions';

class Persons extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPeople();
  }

  handleListItemPress = (item) => {
    this.props.navigation.navigate('PersonDetails', { ...item });
  }
  
  renderSeparator = () =>  {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: css.theme.colors.grey,
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
          borderColor: css.theme.colors.grey
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  }

  render() {
    return(
      <List containerStyle={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.name}
              subtitle={item.email}
              avatar={{ uri: item.image }}
              containerStyle={styles.listStyle}
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

function mapStateToProps(state) {
  return {
    loading: state.people.loading,
    data: state.people.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);

const styles = StyleSheet.create({
  container: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    height: '100%',
    backgroundColor: css.theme.colors.main
  },
  listStyle: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    backgroundColor: css.theme.colors.accent
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
  }
});