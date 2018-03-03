import React from 'react';
import {
    Animated,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const Overlay = ({ visible, onPress, style, ...extraProps }) => {
    return (
        <TouchableWithoutFeedback onPress={() => (visible)?onPress(): () => {}}>
            <Animated.View style={style}/>
        </TouchableWithoutFeedback>
    );
}

Overlay.propTypes = {
    visible: PropTypes.bool.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.any.isRequired
};

export default Overlay;