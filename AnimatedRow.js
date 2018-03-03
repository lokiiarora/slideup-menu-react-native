import React from 'react';
import {
    Animated    
} from 'react-native';
import BottomNavBtn from './BottomNavBtn';
import _ from 'lodash';

const AnimatedMenu = ({ styles, data, size, color, onPressNonVisible, visible, onPress }) => (
    <Animated.View style={styles}>
        {
            _.map(data, (val,key) => {
                return (
                    <BottomNavBtn size={size} color={color} route={val.route} key={val.key} name={val.name} onPressNonVisible={onPressNonVisible} visible={visible} onPress={onPress} />
                );
            })
        }
    </Animated.View>
);

export default AnimatedMenu;