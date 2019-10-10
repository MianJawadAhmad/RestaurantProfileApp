import React, {Component} from 'react'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import Dishdetail from './DIshdetailComponent';
import {View} from 'react-native'

export default class Main extends Component{
    constructor(props){
        super(props);

        this.state={
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishid){
        this.setState({selectedDish: dishid});
    }

    render(){
        return(
            <View>
                <Menu dishes={this.state.dishes}
                    onPress={(dishid)=> this.onDishSelect(dishid)}/>
                
                <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
            </View>
        )
    }
}