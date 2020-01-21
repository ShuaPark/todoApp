import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native'
import PropTypes from "prop-types";

const{width, height} = Dimensions.get("window");

export default class ToDo extends Component{
    state = {
        isEditing: false,
        isCompleted: false}; //toDovaule: this.props.text
    //componenet 모양새 정리?
    render(){
        const { isCompleted, isEditing} = this.state;
        return(
            <View style = {styles.container}>
                <View style = {styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style = {[styles.circle, isCompleted? styles.completedCircle : styles.uncompletedCircle]}/>
                </TouchableOpacity>
                <Text style={[style.text, isCompleted? styles.completedText: styles.unCompletedText]}>Testing!!</Text>
                </View>
                
                    {isEditing? (
                        <View style = {styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style = {styles.actionContainer}>
                                    <Text style = {styles.actionText}>V</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style = {styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style = {styles.actionContainer}>
                                    <Text style = {styles.actionText}>∡</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {styles.actionContainer}>
                                    <Text style = {styles.actionText}>X</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                
            </View>
            );
    }
    //App에서 관리할 거임
    //State변화를 보여주는 것
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
    //연필 눌렀을 때, start editing
    _startEditing = () => {
        this.setState({
            isEditing = true
        });
    };
    //V눌렀을 때, finish editing
    _finishEditing = () => {
        this.setState({
            isEditing = false
        });
    };
}
const styles = StyleSheet.create({
    container: {
        width : width -50,
        borderBottomColor: "#bbb",
        //간격 ?
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row", //바로 옆에 위치 원해?
        alignItems: "center", //동그라미 center에 두기
        justifyContent = "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        //항상 위의 것의 1/2
        borderRadius:15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle:{borderColor: "#bbb"},
    uncompletedCircle: {borderColor: "F23657"},
    text: {
        fontWeight: "600",
        fontSize: 20,

        //위아래 margin
        marginVertical: 20
    },
    completedText:{ //완성시 Text
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    unCompletedText: {
        color: "#353839",
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        //margin을 통해 주변 영역도 선택 가능. 
        marginVertical: 10,
        marginHorizontal: 10
    }

});