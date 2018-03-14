import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

export default class PersonDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          image: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          phone: PropTypes.string
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { image, name, email, phone } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: image }}
          featured
          title={name}
          caption={email}
        />

        <List>
          <ListItem
            title="Email"
            rightTitle={email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={phone}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}