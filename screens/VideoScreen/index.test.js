import React from 'react';
import renderer from 'react-test-renderer';
import VideoScreen from './';

it('renders without crashing', () => {
  const rendered = renderer.create(<VideoScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
