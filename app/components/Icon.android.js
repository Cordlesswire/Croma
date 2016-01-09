/* @flow */

import React from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Icon extends React.Component {
    _root: Object;

    setNativeProps(nativeProps: any) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <Ionicons
                ref={c => this._root = c}
                allowFontScaling={false}
                {...this.props}
                name={'android-' + this.props.name}
            />
        );
    }
}