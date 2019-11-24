import React, {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import ContactUs from './ContactComponent';
import Dishdetail from './DIshdetailComponent';
import {View, Platform, Image, StyleSheet,ScrollView,Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator ({
    Menu : {screen : Menu ,
    navigationOptions: ({navigation}) => ({
        headerLeft: <Icon name='menu' size={24}
        color='white'
        onPress={()=> navigation.toggleDrawer()}
        />
    })},
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
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={24}
      color='white'
      onPress={()=> navigation.toggleDrawer()}
      />  
    })
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: ContactUs }
}, {
      navigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={()=> navigation.toggleDrawer()}
          />  
          
      })
  });
const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
      navigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={()=> navigation.toggleDrawer()}
          />  
      })
  });

  const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          darwerIcon: ({tintColor, focused}) =>(
              <Icon
                name='home'
                type ='font-awesome'
                size={24}
                color={tintColor}
                />

          ),
        }
      },
      About:
      {
          screen: AboutNavigator,
          navigationOptions: {
              title: 'About',
              drawerLabel: 'About Us',
              darwerIcon: ({tintColor}) =>(
                <Icon
                  name='info-circle'
                  type ='font-awesome'
                  size={24}
                  color={tintColor}
                  />
  
            )
          }
      },

    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          darwerIcon: ({tintColor}) =>(
            <Icon
              name='list'
              type ='font-awesome'
              size={24}
              color={tintColor}
              />

        )
        }, 
      },
    
      Contact:
      {
          screen: ContactNavigator,
          navigationOptions: {
              title: 'Contact Us',
              drawerLabel: 'Contact Us',
              darwerIcon: ({tintColor}) =>(
                <Icon
                  name='address-card'
                  type ='font-awesome'
                  size={22}
                  color={tintColor}
                  />
  
            )
          }
      } 
      
},{
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

class Main extends Component{

  componentDidMount() {
    console.log('jawad');
   // console.log(this.props.fetchDishes());
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }


    render(){
      
        return(
            <View style={{flex:1 , paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
                <MainNavigator/>
            </View>
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);