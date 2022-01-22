import { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, SafeAreaView } from 'react-native';
import React from "react"
import {ListItem} from "react-native-elements"
import axios from "axios"

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            listData: [],
            url: "http://localhost:5000/"
        }
    }
    GetStars = () => {
        const {url} = this.state
        axios.get(url).then(response=>{
            return this.setState({
                listData:response.data.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    componentDidMount(){
        this.GetStars()
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({item, index}) => (
        <ListItem key={index}
        title = {`Star : ${item.name}`}
        subtitle = {`Distance from Earth : ${item.distance_from_earth}`}
        titleStyle = {styles.title}
        containerStyle = {{backgroundColor:"#EEECDA"}}
        bottomDivider
        chevron
        />
    )
    render(){
        const {listData} = this.state
        if(listData.length === 0){
            return(
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
            return(
                <View style={styles.container}>
                    <SafeAreaView/>
                    <View style={styles.upperContainer}>
                        <Text style={styles.headerText}>
                            Stars World
                        </Text>
                    </View>
                    <View style={{flex:0.9, }}>
                        <FlatList keyExtractor={this.keyExtractor} data={this.state.listData} renderItem={this.renderItem}/>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:"#EDC988"},
    upperContainer:{flex:0.1, justifyContent:"center", alignItems:"center"},
    headerText:{fontSize:30, fontWeight:"bold", color:"#132743"},
    title:{fontSize:18, fontWeight:"bold", color:"#D7385E"}
})