import { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React from "react"
import {Card, Icon} from "react-native-elements"
import axios from "axios"

export default class DetailsScreen extends Component{
    constructor(){
        super()
        this.state = {
            details:{},
            imagePath:"",
            url:`http://localhost:5000/star?name=${this.props.navigation.getParam("star_name")}`
        }
    }
    GetDetails = () => {
        const {url} = this.state
        axios.get(url).then(response=>{
            this.setDetails(response.data.data)
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    componentDidMount(){
        this.getDetails()
    }
    // setDetails=(planetDetails)=>{
    //     const planetType = planetDetails.planet_type
    //     let imagePath = ""
    //     switch (planetType) {
    //         case "Gas Giant":
    //             imagePath = require("../images/gas_giant.png")
    //             break;
    //         case "Terrestrial":
    //             imagePath = require("../images/terrestrial.png")
    //             break;
    //         case "Super Earth":
    //                 imagePath = require("../images/super_earth.png")
    //                 break;
    //         case "Neptune Like":
    //             imagePath = require("../images/neptune_like.png")
    //             break;
        
    //         default:
    //             break;
    //     }
    //     this.setState({
    //         details:planetDetails,
    //         imagePath:imagePath
    //     })
    // }
    render(){
        const {details} = this.state
        if(details.specifications){
            return (
                <View style={{flex:1}}>
                    <Card title={details.name} image={"./assets/sun.jpeg"} imageProps={{resizeMode:"contain",width:"100%"}}>
                        <View>
                            <Text style={{marginBottom:10}}>
                                {`Distance from Earth : ${details.distance_from_earth}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Gravity : ${details.gravity}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Star Radius : ${details.star_radius}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Star Mass : ${details.star_mass}`}
                            </Text>
                        </View>
                        <View style={{marginBottom:10, flexDirection:"column"}}>
                            <Text>
                                {details.specifications?`Specifications : `:""}
                            </Text>
                            {details.specifications.map((item, index)=>(
                                <Text key={index.toString()} style={{marginLeft:50}}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </Card>
                </View>
            )
        }
        return(
            null
        )
    }
}
