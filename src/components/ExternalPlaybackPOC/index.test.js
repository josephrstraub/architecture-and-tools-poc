import React from 'react';
import renderer from 'react-test-renderer';
import ExternalPlaybackPOC from './';

it('renders without crashing', () => {
  const rendered = renderer.create(<ExternalPlaybackPOC />).toJSON();
  expect(rendered).toBeTruthy();
});
