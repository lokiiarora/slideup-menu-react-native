import React from 'react';
import {View} from 'react-native';
import BottomNavBtn from './BottomNavBtn';
import styles from './styles';
import PropTypes from 'prop-types';
import _ from 'lodash';

const BottomStaticBar = (props) => {
    return (
        <View style={[styles.staticNav, { height: props.initHeight}]}>
            {
                _.map(props.data, (val,key) => {
                    if(val.type==="route"){
                        return <BottomNavBtn size={props.size} color={props.color} route={val.route} key={val.key} name={val.name} onPressNonVisible={props.onPressNonVisible} visible={props.visible} onPress={props.onPress} />
                    }
                    return (<BottomNavBtn size={props.size} color={props.color} route={val.route} key={val.key} name={val.name} onPressNonVisible={props.onPress} visible={props.visible} onPress={props.onPress} />)
                })
            }
        </View>
    );
}

BottomStaticBar.propTypes = {
    initHeight: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onPressNonVisible: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
};


export default BottomStaticBar;