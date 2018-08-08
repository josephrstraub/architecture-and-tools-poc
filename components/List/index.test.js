import React from 'react';
import renderer from 'react-test-renderer';
import List from '.';

it('renders without crashing', () => {
  const rendered = renderer.create(<List />).toJSON();
  expect(rendered).toBeTruthy();
});
