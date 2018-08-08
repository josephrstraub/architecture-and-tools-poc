import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import withDataFetch from '.';

it('renders without crashing', () => {
  const StubComponent = () => <View />;
  const rendered = renderer.create(withDataFetch()(StubComponent)).toJSON();
  expect(rendered).toBeTruthy();
});
