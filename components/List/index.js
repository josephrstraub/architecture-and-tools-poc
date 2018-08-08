/* @flow */
import * as React from 'react';
import {
  FlatList, Platform, Text, TouchableHighlight, View,
} from 'react-native';
import { Icon } from 'expo';
import styles from './index.styles';

const renderItem = ({ item, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item.title}</Text>
      <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'} />
    </View>
  </TouchableHighlight>
);

type Props = {
  data: Object[],
  onItemPress: Function
};

export default function List({ data, onItemPress }: Props): React.Element<*> {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => renderItem({
        item,
        onPress: () => onItemPress(item),
      })}
    />
  );
}
