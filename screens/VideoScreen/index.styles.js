import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const ASPECT_RATIO: number = 16 / 9;

export default StyleSheet.create({
  video: {
    height: Layout.window.width / ASPECT_RATIO,
    width: Layout.window.width,
  },
});
