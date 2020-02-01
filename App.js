import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import {AppLoading} from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";


//<uses-permission android:name="android.permission.INTERNET" />
const {height, width} = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };
  componentDidMount = () => {
    this._loadToDos();
  }
  render() {
    const {newToDo, loadedToDos, toDos} = this.state;
    //어떻게 나오는지 console에서 확인하기
    //console.log(toDos);
    if (!loadedToDos){
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle = "light-content"/>
        <Text style={styles.title}> To Do :) </Text>
        <View style={styles.card}>
          <TextInput style={styles.input} 
            placeholder={"New To DO"} 
            value={newToDo} 
            onChangeText={this._controlNewToDo} 
            placeholderTextColor = {"#999"}
            autoCorrect = {false}
            onSubmitEditing = {this._addToDo}
            />
            <ScrollView contentContainerStyle={styles.toDos}>
              {Object.values(toDos).map(toDo => <ToDo key = {toDo.id} {...toDo} /> )}
            </ScrollView>
        </View>
      </View>
    
    );                                                            
  }
  //scrollView /if it's array/- {toDos.map(todo => <ToDo />)} 
  
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  //new To Do 에 입력한 뒤, enter 하면 new to do 는 "" = empty로 만들기
  _addToDo = () => {
    const {newToDo} = this.state;
    if (newToDo !== ""){
      // this.setState({
      //   newToDo: ""
      // });
      //쉽게 사용하고, 지우기 위해 obj 사용하는 것임 /vs Array 대신에
        //toDos: prevState.toDos + newToDo
        // const newToDoObject = {}
      this.setState( prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          //ID 생성
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        //new object : the name is newState
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return { ...newState};
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
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
    
    //platform 고를 수 있음
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
