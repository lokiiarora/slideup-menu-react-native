import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

const BottomNavBtn = (props) => {
    return (
        <TouchableWithoutFeedback style={{alignItems:'center', width: props.size + 10}} onPress={() => props.visible ? props.onPress(props.route) : props.onPressNonVisible(props.route)}>
            <View style={styles.bottomNavPadding}>
                <FontAwesome color={props.color} name={props.name} size={props.size} />
            </View>
        </TouchableWithoutFeedback>
    );
}

BottomNavBtn.propTypes = {
    visible: PropTypes.bool.isRequired,
    route: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    onPressNonVisible: PropTypes.func,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
};


export default BottomNavBtn;