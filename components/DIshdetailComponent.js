import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
 import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, addComment, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment:(dishId, rating, comment, author) =>dispatch(addComment(dishId, rating, comment, author)),
    postComment:(dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
})


function RenderDish(props){
    const dish = props.dish;
    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if(dx > 200)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

                if(recognizeComment(gestureState))
                props.onSelect();


            return true;
        }
    })

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>
            <Card
                featuredTitle = {dish.name}
                image={{uri: baseUrl + dish.image}}>
                >
                <Text style={{margin:10}}>
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />

                <Icon
                         raised
                         reverse
                         name = {'pencil'}
                         type = 'font-awesome'
                         color = '#512DA8'
                         onPress = {() => props.onSelect()}
                         />   
            </Card>
            </Animatable.View>

        );
    }
    else{
        return(<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
         </Animatable.View>
    );
}


class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComments(dishId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                     favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onSelect = {() => this.toggleModal()}
                    />
                <RenderComments comments = {this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                 <Modal animation = {"slide"} transparent = {false}
                         visible = {this.state.showModal}
                         onDismiss = {() => this.toggleModal()}
                         onRequestClose = {() => this.toggleModal}>
                     <View style = {styles.modal}>
                         <View>
                             <Rating showRating
                                     type = "star"
                                     fractions = {0}
                                     startingValue = {0}
                                     imageSize = {40}
                                     onFinishRating = {(rating) => this.setState({rating: rating})}
                                     />
                         </View>
                         <View>
                             <Input
                             placeholder='Author'
                             leftIcon={
                                 <Icon
                                 name='user-o'
                                 type = 'font-awesome'
                                 size={24}
                                 />
                             }
                             onChangeText = {(value) => this.setState({author: value})}
                             />
                         </View>
                         <View>
                             <Input
                                 placeholder = "Comment"
                                 leftIcon = {
                                     <Icon
                                     name = 'comment-o'
                                     type = 'font-awesome'
                                     size = {24}
                                     />
                                 }
                                 onChangeText = {(value) => this.setState({comment: value})}
                             />
                         </View>
                         <View>
                             <Button color = "#512DA8"
                                     title = "SUBMIT"
                                     onPress = {() => this.handleComments(dishId)}
                                     />
                         </View>
                         <View>
                             <Button onPress = {() => this.toggleModal()}
                                     color = "#989898"
                                     title = "CLOSE"
                                     />
                         </View> 
                     </View>       
                 </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 28
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);