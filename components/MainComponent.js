import React, {Component} from 'react'
import Menu from './MenuComponent'
import Home from './HomeComponent';
import Dishdetail from './DIshdetailComponent';
import {View, Platform} from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator ({
    Menu : {screen : Menu},
    Dishdetail :{screen: Dishdetail}
},{
    initialRouteKey: 'Menu',
    navigationOptions:{
        headerStyle:{
            backgroundColor: '#fff'
        },
        headerTintColor: '#fff',
        headerBackTitleStyle:{
            color:'#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

export default class Main extends Component{


    render(){
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                <MainNavigator/>
            </View>
        )
    }
} 