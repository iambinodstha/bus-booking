import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { calculateDistance } from "../misc/calculateDistance";
import { timeFormat } from "../misc/timeFormat";
import { styles } from './styles/dashBoardMapStyle';

import pickupmarker from "../images/pickupmarker.png";
import dropmarker from '../images/dropmarker.png';
import mylocationmarker from "../images/mylocation.png";

function FooterContainer(props) {
    const { pickLocationAndTime, dropLocationAndTime, animateToUserLocation, toggleDateTimePicker } = props;
    function measureDistanceofTwoCoordinates() {
        let distanceInMeter = calculateDistance(pickLocationAndTime.latlng.latitude, pickLocationAndTime.latlng.longitude, dropLocationAndTime.latlng.latitude, dropLocationAndTime.latlng.longitude);
        return (distanceInMeter / 1000).toFixed(2)
    }
    return (
        <View style={styles.footerContainer}>
            {/* button footer */}
            {(pickLocationAndTime && dropLocationAndTime) ? null : <TouchableOpacity
                onPress={animateToUserLocation}
                style={styles.myLocationButton}>
                <Image style={styles.mylocationmarkerimage} source={mylocationmarker} />
            </TouchableOpacity>}

            {(pickLocationAndTime && dropLocationAndTime) ? <View
                style={styles.confirmBookingContainer}>
                <View >
                    <Text style={{ fontSize: 20 }}>{measureDistanceofTwoCoordinates()} KM Away</Text>
                    <Text style={{ fontSize: 18, marginBottom: 10, color: "rgba(0,0,0,0.5)" }}>NPR 123</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <Image style={styles.marker} source={pickupmarker} />
                        <Text style={{ color: "#00d084" }}>{timeFormat(pickLocationAndTime.datetime)}</Text>
                    </View>
                    <View style={styles.dashline} />
                    <View style={{ alignItems: "center" }}>
                        <Image style={styles.marker} source={dropmarker} />
                        <Text style={{ color: "#FB0C45" }}>{timeFormat(dropLocationAndTime.datetime)}</Text>
                    </View>
                </View>

            </View> : null}

            {/* button footer */}
            <TouchableOpacity
                onPress={(pickLocationAndTime && dropLocationAndTime) ? null : toggleDateTimePicker}
                style={{ ...styles.footerButton, backgroundColor: (pickLocationAndTime && dropLocationAndTime) ? "gray" : pickLocationAndTime ? "#FB0C45" : "#00d084" }}>
                <Text
                    style={styles.footerButtonText}>
                    {(pickLocationAndTime && dropLocationAndTime) ? `CONFIRM BOOKING` : pickLocationAndTime ? "SET DROP OFF" : "SET PICKUP"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default FooterContainer;