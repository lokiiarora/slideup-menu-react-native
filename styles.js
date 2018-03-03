import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    bottomNavPadding: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    staticNav: { 
        justifyContent: 'space-between', 
        alignSelf:'stretch',
        alignItems: 'center',
        flexDirection: 'row',
    },
    chevronStaticStyle: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width,
    },
    verticalPadding15: {
        paddingVertical: 15,
    },
    overlayStyle: {
        position: 'absolute', 
        top:0,
        bottom:0,
        right:0,
        backgroundColor: '#000',
    },
})