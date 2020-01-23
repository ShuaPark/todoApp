import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import {AppLoading} from "expo";

//<uses-permission android:name="android.permission.INTERNET" />
const {height, width} = Dimensions.get("window");



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        isLoaded: false
    }
};
//export default function App() {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ""
  };
  render() {
    const{newToDo} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle = "light-content"/>
        <Text style={styles.title}> To Do List :)</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            //placeholder={"New To DO"}
            value = {newToDo}
            onChangeText = {this._controlNewToDo}
            placeholderTextColor={"#999"}
            autoCorrect = {false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello! I'm To Do"} />
          </ScrollView>

        </View>
      </View>
    );                                                            
    //ToDo -> 렌더링?
    //To do list = scroll
    //new to do = 상단 고정

    //text control
    _controlNewToDo = text => {
      this.setState({
        newToDo: text
      });
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width -25,
    borderTopLeftRadius: 10, //only top&left - radius 10
    borderTopRightRadius: 10, //Top&Right
    
    //platform specific code
   ...Platform.select({
     ios: {
       shadowColor: "rgb(50,50,50)",
       shadowOpacity: 0.5,
       shadowRadius: 5,
       shadowOffset: {
         height: -1,
         width: 0
       }
     },
     android: {
       elevation: 5
     }
   })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
