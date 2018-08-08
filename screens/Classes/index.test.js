import React from 'react';
import renderer from 'react-test-renderer';
import Classes from '.';

it('renders without crashing', () => {
  const rendered = renderer.create(<Classes />).toJSON();
  expect(rendered).toBeTruthy();
});
