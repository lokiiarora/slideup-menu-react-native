import React from 'react';
import {View, Button, Text, TouchableOpacity, Dimensions, Animated, Easing, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Constants } from 'expo';
import BottomNavBtn from './BottomNavBtn';
import BottomStaticBar from './BottomStaticNav';
import ChevronBtn from './ChevronBtn';
import {timeTableData} from './dummyData';
import AnimatedMenu from './AnimatedRow';
import Overlay from './Overlay';
import _ from 'lodash';
import styles from './styles';


if(__DEV__){
  require("react-devtools");
}


const calcHeight = (length, constantRowLength ,type) => {
  if(type === "init") return 70;
  return (70*length) + 70
}

class App extends React.Component {
  state = {
    visible: false,
    activitySelected: null,
    containerConstraints:{
      width: null,
      height: null
    },
    visibleHeight: new Animated.Value(0)
  };

  constantRowLength = 4;

  menuData = _.chunk(timeTableData(),4);

  totalHeight = calcHeight(this.menuData.length, this.constantRowLength);
  initHeight = calcHeight(this.menuData.length, this.constantRowLength, "init");

  _renderTextAccordingToState= () => {
    const { activitySelected } = this.state;
    if(!activitySelected) return <Text style={{fontWeight: 'bold', fontSize: 32}}>No activity selected so far</Text>
    return <Text style={{fontWeight: 'bold', fontSize: 32}}>SelectedActivity: {activitySelected}</Text>
  }

  _openSlideUpMenu = (key, callback) => {
    let keyFinal = (!key)? this.state.activitySelected : key;
    if(!callback){
      callback = () => {};
    }
    if(this.state.visibleHeight._value === 0){
      Animated.timing(
        this.state.visibleHeight,
        { toValue: 1, duration: 400 },
      ).start(() => {
        this.setState({visible:true, activitySelected: keyFinal}, callback)
      });
    }else{
      Animated.timing(
        this.state.visibleHeight,
        { toValue: 0, duration: 400 },
      ).start(() => {
        this.setState({visible:false, activitySelected: keyFinal}, callback)
      });
    }
  }

  _measure = ({layout}) => {
    this.setState(prevState => {
      let old = prevState;
      old.containerConstraints.height = layout.height;
      old.containerConstraints.width = layout.width;
      return Object.assign({},old);
    });
  }
  _changeRoute = key => {
    this.setState({activitySelected: key})
  }


  render() {
    const { visibleHeight, containerConstraints, visible } = this.state;
    const heightOfMenu = visibleHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [this.initHeight, this.totalHeight],
      easing: Easing.bezier(0.165, 0.84, 0.44, 1)
    });
    const opacity = visibleHeight.interpolate({
      inputRange: [0,1],
      outputRange: [0,0.75],
      easing: Easing.bezier(0.165, 0.84, 0.44, 1)
    });
    const opacityOtherMenu = visibleHeight.interpolate({
      inputRange:[0,0.2,1],
      outputRange: [0,0,1],
      easing: Easing.bezier(0.165, 0.84, 0.44, 1)
    });
    const heightofChevron = visibleHeight.interpolate({
      inputRange: [0,0.2,1],
      outputRange: [0,50,50],
      easing: Easing.bezier(0.165, 0.84, 0.44, 1)
    });
    const opacityChevron = visibleHeight.interpolate({
      inputRange: [0,0.2,1],
      outputRange: [0,1,1],
      easing: Easing.bezier(0.165, 0.84, 0.44, 1)
    });

    const chevronStyle = [
      styles.chevronStaticStyle,
      { opacity: opacityChevron,
        height: heightofChevron }
    ];
    const otherMenuStyle = [
      styles.staticNav,
      {
        height: this.initHeight,
        opacity:opacityOtherMenu
      }
    ];
    const overlayStyle = [
      styles.overlayStyle,
      {
        height: containerConstraints.height,
        width: containerConstraints.width,
        opacity
      }
    ];

    return (
      <SafeAreaView  style={{flex:1, backgroundColor: 'rgb(10,96,196)'}}>
        <View style={{flex: 1, width: Dimensions.get("window").width, backgroundColor: 'red'}} onLayout={({ nativeEvent }) => this._measure(nativeEvent)}>
          <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            {this._renderTextAccordingToState()}
          </View>
          <Overlay visible={visible} onPress={this._openSlideUpMenu} style={overlayStyle} />
          <View style={[{ position: 'absolute', bottom:0, alignSelf: 'stretch', width: Dimensions.get("window").width}]}>
              <Animated.View style={[{alignSelf: 'stretch', backgroundColor: 'rgb(10,96,196)', paddingLeft: 10, paddingRight: 10},{height: heightOfMenu}]}>
                <ChevronBtn style={chevronStyle} onPress={this._openSlideUpMenu} name="chevron-down" size={30} color={"white"} />
                {
                  _.map(this.menuData, (val,key) => {
                    if(key===0){
                      return (
                        <BottomStaticBar key={key} initHeight={this.initHeight} visible={visible} data={val} onPressNonVisible={this._changeRoute} onPress={this._openSlideUpMenu} size={30} color="white" />
                      );
                    }
                    return <AnimatedMenu key={key} styles={otherMenuStyle} data={val} initHeight={this.initHeight} visible={visible} onPressNonVisible={this._changeRoute} onPress={this._openSlideUpMenu} size={30} color="white"  />
                  })
                }
              </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default App;