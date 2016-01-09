/* @flow */

import React from 'react-native';
import Card from './Card';
import CardAction from './CardAction';
import Constants from '../Constants';

const {
    StyleSheet,
    TouchableHighlight,
    View,
    Text
} = React;

const styles = StyleSheet.create({
    palette: {
        alignItems: 'stretch',
        flexDirection: 'row',
        height: 100
    },
    color: {
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        flex: 1,
        marginHorizontal: Constants.spacing * 2
    }
});

type Color = {
    color: string,
    name: string
}

type Palette = {
    colors: Array<Color>,
    name: string
}

type Props = {
    palette: Palette
}

const PaletteCard = (props: Props) => (
    <Card>
        <TouchableHighlight {...props} underlayColor={Constants.colorWhite}>
            <View>
                <View style={styles.palette}>
                    {props.palette.colors.map(item => (
                        <View style={[ styles.color, { backgroundColor: item.color } ]} key={item.color} />
                    ))}
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.label}>{props.palette.name}</Text>
                    <CardAction name='create' />
                    <CardAction name='delete' />
                </View>
            </View>
        </TouchableHighlight>
    </Card>
);

export default PaletteCard;
