/* @flow */

import React from 'react-native';
import ColorCard from './ColorCard';
import Details from './Full';
import Constants from '../Constants';

const {
    ListView,
    StyleSheet
} = React;

const styles = StyleSheet.create({
    container: {
        marginVertical: Constants.spacing / 2
    }
});

type Color = {
    color: string,
    name: string
}

type Palette = {
    colors: Array<Color>
}

type Props = {
    palette: Palette
}

export default class Colors extends React.Component {
    constructor(props: Props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: ds.cloneWithRows(this.props.palette.colors)
        };
    }

    _handlePress = (color: Color) => {
        this.props.navigator.push({
            title: color.color,
            component: Details,
            passProps: { color }
        });
    };

    _renderRow = (color: Color) => {
        return (
            <ColorCard
                color={color}
                key={color.name}
                onPress={() => this._handlePress(color)}
            />
        );
    };

    render() {
        return (
            <ListView
                {...this.props}
                dataSource={this.state.dataSource}
                contentContainerStyle={styles.container}
                renderRow={this._renderRow}
            />
        );
    }
}