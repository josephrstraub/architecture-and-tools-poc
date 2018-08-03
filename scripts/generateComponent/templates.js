#!/usr/bin/env node

const getClassComponentMainJSTemplate = name =>
`/* @flow */
import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './index.styles';

type Props = {};
type State = {};

export default class ${name} extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {};
  }

  render(): React.Element<*> {
    return (
      <View>
        <Text>This is the ${name} component!</Text>
      </View>
    );
  }
}
`;

const getFunctionalComponentMainJSTemplate = name =>
`/* @flow */
import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './index.styles';

type Props = {};

export default function ${name}(props: Props): React.Element<*> {
  return (
    <View>
      <Text>This is the ${name} component!</Text>
    </View>
  );
}
`;

const getHigherOrderComponentMainJSTemplate = (name) => {
  const innerClassName = `${name[0].toUpperCase()}${name.slice(1)}`;
  return `/* @flow */
import * as React from 'react';

export default function ${name}<Props: {}>(
/* Write your parameters and their types here */
): (React.ComponentType<Props>) => Class<React.Component<Props, any>> {
  return (WrappedComponent) => {
    type State = {};
    class ${innerClassName} extends React.Component<Props, State> {
      constructor() {
        super();
        this.state = {};
      }

      render(): React.Element<*> {
        return <WrappedComponent {...this.props} />;
      }
    }

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';

    ${innerClassName}.displayName = \`${name}(\${wrappedComponentName})\`;
    return ${innerClassName};
  };
}
`;
};

const getStylesJS = () =>
`import { StyleSheet } from 'react-native';

export default StyleSheet.create({});
`;

const getRegularComponentTestJSTemplate = name =>
`import React from 'react';
import renderer from 'react-test-renderer';
import ${name} from './';

it('renders without crashing', () => {
  const rendered = renderer.create(<${name} />).toJSON();
  expect(rendered).toBeTruthy();
});
`;

const getHigherOrderComponentTestJSTemplate = name =>
`import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import ${name} from './';

it('renders without crashing', () => {
  const StubComponent = () => <View />;
  const rendered = renderer.create(${name}()(StubComponent)).toJSON();
  expect(rendered).toBeTruthy();
});
`;

const getMainJSTemplate = (type) => {
  switch (type) {
    case 'Class': return getClassComponentMainJSTemplate;
    case 'Functional': return getFunctionalComponentMainJSTemplate;
    case 'Higher Order': return getHigherOrderComponentMainJSTemplate;
    default: return getFunctionalComponentMainJSTemplate;
  }
};
const getTestsJSTemplate = type => (type === 'Higher Order' ? getHigherOrderComponentTestJSTemplate : getRegularComponentTestJSTemplate);

const getMainJS = (name, type) => getMainJSTemplate(type)(name);
const getTestsJS = (name, type) => getTestsJSTemplate(type)(name);

module.exports = {
  getStylesJS,
  getMainJS,
  getTestsJS,
};
