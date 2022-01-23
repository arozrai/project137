import { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React from "react"
import {ListItem, Card, Header} from "react-native-elements"
import {RFValue} from "react-native-responsive-fontsize"
import axios from "axios"

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            url: "http://localhost:5000/"
        }
    }
    GetData = () => {
        const {url} = this.state
        axios.get(url).then(response=>{
            return this.setState({
                data:response.data.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    componentDidMount(){
        this.GetData()
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({item, index}) => (
        <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Star",{name:item.name})}>
            <Card image={require("../assets/icon.png")}
            imageStyle = {{marginTop:RFValue(30)}}
            featuredTitle = {item.name}
            featuredTitleStyle = {{fontSize:RFValue(25), textAlign:"center"}}
            containerStyle = {{borderWidth:0, backgroundColor:"#1A2D5F"}}
            >

            </Card>
        </TouchableOpacity>
    )
    render(){
        const {data} = this.state
        
        return(
            <View style={styles.container}>
                <SafeAreaView/>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>
                        Stars World
                    </Text>
                </View>
                {data.length>0?(
                    <View style={{flex:0.9, }}>
                        <FlatList keyExtractor={this.keyExtractor} data={this.state.listData} renderItem={this.renderItem}/>
                    </View>
                ):null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:"#EDC988"},
    upperContainer:{flex:0.1, justifyContent:"center", alignItems:"center"},
    headerText:{fontSize:30, fontWeight:"bold", color:"#132743"},
    title:{fontSize:18, fontWeight:"bold", color:"#D7385E"}
})