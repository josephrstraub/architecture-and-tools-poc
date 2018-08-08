/* @flow */
import * as React from 'react';
import { Text, View } from 'react-native';
import { Video } from 'expo';
import styles from './index.styles';

const BADGE_THRESHOLD: number = 29000;

type Props = {};
type State = {
  videoPosition: number,
};

export default class VideoScreen extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      videoPosition: 0,
    };
  }

  onPlaybackStatusUpdate = ({ positionMillis }: Object) => {
    this.setState({ videoPosition: positionMillis });
  }

  render(): React.Element<*> {
    const { videoPosition } = this.state;
    const thresholdCrossedText: string = `You've watched ${Math.floor(videoPosition / 1000)} seconds of this video. Perhaps you deserve a badge!`;

    return (
      <View testID="welcome">
        <Video
          onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          shouldPlay
          style={styles.video}
          useNativeControls
          resizeMode={Video.RESIZE_MODE_CONTAIN}
        />
        {videoPosition > BADGE_THRESHOLD && <Text>{thresholdCrossedText}</Text>}
      </View>
    );
  }
}
