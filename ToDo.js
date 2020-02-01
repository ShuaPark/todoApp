import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window");

export default class ToDo extends React.Component{
    static PropTypes= {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        
    }
    state = {
        isEditing: false,
        isCompleted: false,
        todoValue: ""
    };
    render() {
        const {isCompleted, isEditing, todoValue} = this.state;
        const {text} = this.props;

        return(
        <View style = {styles.container}>
            <View style = {styles.column}>
                <TouchableOpacity onPress = {this._toggleComplete}>
                    <View style = {[styles.circle, 
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                {isEditing? 
                    (<TextInput style={[styles.text, styles.input, 
                        isCompleted? styles.completedText: styles.uncompletedText]}
                        value={todoValue} multiline={true} //multiline 허용
                        onChangeText={this._controlInput} //
                        returnKeyType={"done"} //android 안되나봐
                        onBlur={this._finishEditing} //touch outside - finish editing
                         />) : 
                    (<Text style = {[styles.text,
                        isCompleted? styles.completedText: styles.uncompletedText]}> 
                        {text} </Text>)}
            </View>
                {isEditing? (
                    <View style= {styles.actions}>
                        <TouchableOpacity onPressOut = {this._finishEditing}>
                            <View style= {styles.actionContatiner}>
                                <Text style={styles.actionText}> ✅ </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style= {styles.actions}>
                        <TouchableOpacity onPressOut ={this._startEditing}>
                            <View style= {styles.actionContatiner}>
                                <Text style={styles.actionText}> ✏️ </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style= {styles.actionContatiner}>
                                <Text style={styles.actionText}> ❌ </Text>
                            </View>
                        </TouchableOpacity>                        
                    </View>
                ) }
        </View>
        );
    }
    //App.js에서 관리할 거임. // ??????@@@@@
    _toggleComplete = () => {
        this.setState(prevState => {
        return {isCompleted: !prevState.isCompleted};
    });
    };
    _startEditing = () => {
        const {text} = this.props;
        this.setState({isEditing: true, todoValue: text});
    };
    _finishEditing = () => {
        this.setState({isEditing: false});
    };
    _controlInput = (text) => {
        this.setState({todoValue: text});
    };
};

const styles= StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0.6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 3,
      marginRight: 20
    },
    completedCircle:{
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839",
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width /2,
        // justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContatiner: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    actionText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    input: {
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
})