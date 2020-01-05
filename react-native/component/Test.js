import * as React from 'react';
import {Text, View} from 'react-native';
import NetInfo  from '@react-native-community/netinfo';



export default class ConnectionInfoSubscription extends React.Component {
  _subscription = null;

  state = {
    connectionInfoHistory: {},
  };

  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectionInfoChange,
    );
  }

  componentWillUnmount() {
    //this._subscription && this._subscription();
  }

  _handleConnectionInfoChange = (connectionInfo) => {
    this.setState({connectionInfoHistory:connectionInfo});
  };

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state.connectionInfoHistory)}</Text>
      </View>
    );
  }
}