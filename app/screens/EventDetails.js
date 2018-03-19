import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import dateformat from 'dateformat';

export default class EventDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          start: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          activity: PropTypes.object.isRequred,
          actor: PropTypes.object.isRequired
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { start, end, activity, actor } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: actor.image }}
          featured
          title={activity.name}
          caption={activity.description}
        />

        <List>
          <ListItem
            title="Location"
            rightTitle={activity.location}
            hideChevron
          />
          <ListItem
            title="Start"
            rightTitle={dateformat(new Date(start), 'dd.mm.yyyy, HH:MM:ss')}
            hideChevron
          />
          <ListItem
            title="End"
            rightTitle={dateformat(new Date(end), 'dd.mm.yyyy, HH:MM:ss')}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}