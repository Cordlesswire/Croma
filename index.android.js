import React from 'react-native';
import Constants from './Constants';
import Home from './views/Home';
import Icon from './views/Icon';

const {
    AppRegistry,
    Navigator,
    Text,
    TouchableOpacity,
    StyleSheet
} = React;

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: Constants.colorPrimary
    },
    title: {
        color: Constants.colorWhite,
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 14,
        paddingHorizontal: 4
    },
    icon: {
        fontSize: 24,
        margin: 16,
        color: '#fff'
    },
    scene: {
        flex: 1,
        marginTop: 56,
        backgroundColor: Constants.colorLightGray
    }
});

const NavigationBarRouteMapper = {
    LeftButton(route, navigator) {
        if (route.index === 0) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => navigator.pop()}>
                <Icon name='arrow-back' style={styles.icon} />
            </TouchableOpacity>
        );
    },

    RightButton(route) {
        if (route.rightButtonIcon) {
            return (
                <TouchableOpacity onPress={route.onRightButtonPress}>
                    <route.rightButtonIcon style={styles.icon} />
                </TouchableOpacity>
            );
        }
    },

    Title(route) {
        return (
            <Text style={styles.title}>
                {route.title}
            </Text>
        );
    }
};

export default class Croma extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navigator
                style={styles.nav}
                initialRoute={{
                    title: 'Palettes',
                    component: Home,
                    rightButtonTitle: 'Add',
                    index: 0,
                    onRightButtonPress: () => {
                    }
                }}
                renderScene={(route, navigator) =>
                    <route.component
                        {...route.passProps}
                        navigator={navigator}
                        style={styles.scene}
                        />
                }
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navbar}
                    />
                }
            />
        );
    }
}

AppRegistry.registerComponent('Croma', () => Croma);
