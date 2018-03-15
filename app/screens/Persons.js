import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import * as config from '../config/config';

export default class Persons extends React.Component {
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

    fetch(config.personUrl)
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
    this.props.navigation.navigate('Details', { ...item });
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
    return <SearchBar placeholder='Type Here...' darkTheme round />;
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

  imageUrl = (item) =>  `./resources/${item.image}`;

  render() {
    return(
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.name}
              subtitle={item.email}
              avatar={{ uri: item.image }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.handleListItemPress(item)}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </List>
    );
  }
}