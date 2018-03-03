import React from 'react';
import { 
    Animated,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import PropTypes from 'prop-types';


const ChevronBtn = ({style, onPress, name, size, color}) => {
    return (
        <Animated.View style={style}>
            <TouchableWithoutFeedback onPress={() => onPress()}>
                <View style={styles.verticalPadding15}>
                    <FontAwesome color={color} name={name} size={size} />
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
}

ChevronBtn.propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number
};

export default ChevronBtn;