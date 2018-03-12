import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, ToolbarAndroid } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ loading: true}
  }

  componentDidMount(){
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = 'https://familyplanner-api.herokuapp.com/api/persons';
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          data: res,
        });
      })
      .catch(error => {
        this.setState({ error: error, loading: false });
      });
  };
  
  onActionSelected(position){
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  imageUrl = (item) => {
    return `./resources/${item.image}`;
  };

  render(){
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
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.loading}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
};