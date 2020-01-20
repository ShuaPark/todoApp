import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native'
import PropTypes from "prop-types";

const{width, height} = Dimensions.get("window");

export default class ToDo extends Component{
    state = {
        isEditing: false}; //toDovaule: this.props.text
    render(){
        return(
            <View style = {styles.container}>
                <TouchableOpacity>
                    <View style = {style.circle}/> 
                </TouchableOpacity>
                <Text style={style.text}>Testing!!</Text>
            </View>
            );
    }
}
const styles = StyleSheet.create({
    container: {
        width : width -50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row"
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
    text: {
        fontWeight: "600",
        fontSize: 20,

        //위아래 margin
        marginVertical: 20
    }

});