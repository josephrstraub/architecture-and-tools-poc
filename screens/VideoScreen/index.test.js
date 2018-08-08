import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import VideoScreen from '.';

describe('VideoScreen', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<VideoScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });
  it('renders text when video playback position is more than 29 seconds', () => {
    const wrapper = shallow(<VideoScreen />);
    wrapper.setState({ videoPosition: 30000 });
    expect(wrapper.find(Text)).toHaveLength(1);
  });
  it('does not render text when video playback position is less than 30 seconds', () => {
    const wrapper = shallow(<VideoScreen />);
    expect(wrapper.find(Text)).toHaveLength(0);
  });
});
