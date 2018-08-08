import React from 'react';
import renderer from 'react-test-renderer';
import Account from '.';

it('renders without crashing', () => {
  const rendered = renderer.create(<Account />).toJSON();
  expect(rendered).toBeTruthy();
});
