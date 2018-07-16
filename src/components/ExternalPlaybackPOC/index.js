// @flow
import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import jungleRoad from '../../../assets/videos/jungle-road.mp4';
import styles, { videoWidth } from './index.styles';

type Props = {};
type State = {
  videoHeight: number,
};

export default class ExternalPlaybackPOC extends React.Component<Props, State> {
  player: Video;

  constructor() {
    super();
    this.state = { videoHeight: 1 };
  }

  onMediaLoad = ({ naturalSize }: Object) => {
    this.setVideoHeight(naturalSize.width, naturalSize.height);
  }

  setVideoHeight = (encodedWidth: number, encodedHeight: number) => {
    const aspectRatio: number = encodedWidth / encodedHeight;
    this.setState({
      videoHeight: videoWidth / aspectRatio,
    });
  }

  showFullScreen = () => {
    if (this.player) {
      this.player.presentFullscreenPlayer();
    }
  }

  render(): React.Element<*> {
    const dynamicVideoStyles: Object = { height: this.state.videoHeight };

    return (
      <TouchableWithoutFeedback onPress={this.showFullScreen}>
        <Video
          onLoad={this.onMediaLoad}
          ref={(ref) => {
            this.player = ref;
          }}
          source={jungleRoad}
          style={[ styles.video, dynamicVideoStyles ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}
