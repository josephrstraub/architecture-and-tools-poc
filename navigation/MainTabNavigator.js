/* @flow */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Account from '../screens/Account';
import Classes from '../screens/Classes';
import Schedule from '../screens/Schedule';

const tabs: Object[] = [
  { icon: 'person', label: 'Account', screen: Account },
  { icon: 'videocam', label: 'Classes', screen: Classes },
  { icon: 'calendar', label: 'Schedule', screen: Schedule },
];

const getRouteConfigs = (): Object => tabs.reduce((routeConfigs, tab) => {
  const Stack = createStackNavigator({ [tab.label]: tab.screen });

  Stack.navigationOptions = {
    tabBarLabel: tab.label,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-${tab.icon}${focused ? '' : '-outline'}` : `md-${tab.icon}`}
      />
    ),
  };

  return {
    ...routeConfigs,
    [tab.label]: Stack,
  };
}, {});

const bottomTabNavigatorConfig: Object = {
  order: tabs.map(tab => tab.label),
};

export default createBottomTabNavigator(
  getRouteConfigs(),
  bottomTabNavigatorConfig,
);
