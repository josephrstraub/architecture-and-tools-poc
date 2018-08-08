import React from 'react';
import renderer from 'react-test-renderer';
import Schedule from '.';

it('renders without crashing', () => {
  const rendered = renderer.create(<Schedule />).toJSON();
  expect(rendered).toBeTruthy();
});
