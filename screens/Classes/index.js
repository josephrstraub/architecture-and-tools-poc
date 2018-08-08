/* @flow */
import * as React from 'react';
import { Text, View } from 'react-native';
import MockService from '../../mock/service';
import withDataFetch from '../../HOC/withDataFetch';
import List from '../../components/List';
import styles from './index.styles';

type Props = {
  classes: Object[],
  navigation: Object,
};

function Classes({ classes, navigation }: Props): React.Element<*> {
  return (
    <View>
      <Text>Here are all the classes you can take!</Text>
      <List
        data={classes}
        onItemPress={classInstance => navigation.navigate('ClassDetail', classInstance)}
      />
    </View>
  );
}

export default withDataFetch(
  MockService.getAllClasses,
  'classes',
)(Classes);
