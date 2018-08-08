/* @flow */
import * as React from 'react';

export default function withDataFetch<Props: {}>(
  fetchData: Function,
  dataPropName: string,
): (React.ComponentType<Props>) => Class<React.Component<Props, any>> {
  return (WrappedComponent) => {
    type State = { data: Object[] };
    class WithDataFetch extends React.Component<Props, State> {
      constructor() {
        super();
        this.state = { data: [] };
      }

      componentDidMount() {
        const data = fetchData();
        this.setState({ data });
      }

      render(): React.Element<*> {
        const { data } = this.state;

        return <WrappedComponent {...this.props} {...{ [dataPropName]: data }} />;
      }
    }

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';

    WithDataFetch.displayName = `withDataFetch(${wrappedComponentName})`;
    return WithDataFetch;
  };
}
