import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Alert,
    Platform,
    Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const DateTimePicker = lazy(() => import("react-native-modal-datetime-picker"));
const FooterContainer = lazy(() => import("./FooterContainer"));

import { requestPermission } from "./requestLocationPermission";
import { timeFormat } from "../misc/timeFormat";
import { edgePadding } from "../misc/mapEdgePadding";
import { styles } from './styles/dashBoardMapStyle';

import pickupmarker from "../images/pickupmarker.png";
import dropmarker from '../images/dropmarker.png';
import backIcon from "../images/back.png";
import crossIcon from "../images/cross.png";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

function DashBoardMap() {
    let mapRef = React.createRef();
    const [region, setRegion] = useState({
        latitudeDelta,
        longitudeDelta,
        latitude: 27.694341,
        longitude: 85.320226
    })
    const [pickLocationAndTime, setPickLocationAndTime] = useState();
    const [dropLocationAndTime, setDropLocationAndTime] = useState();
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
    const [userLocation, setUserLocation] = useState('');

    // request android permission to use location
    useEffect(() => {
        Platform.OS === "android" ? requestPermission(getUserLocation) : null
    }, [])

    function getUserLocation() {
        Geolocation.getCurrentPosition(
            position => {
                const userPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                setUserLocation(userPosition);
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { timeout: 20000, maximumAge: 1000 },
        );
    }

    function animateToUserLocation() {
        if (Platform.OS === "android") {
            (userLocation && (mapRef.current !== null)) ? mapRef.current.animateToRegion({
                ...userLocation,
                latitudeDelta,
                longitudeDelta
            }, 500) : requestPermission(getUserLocation);
        }
    }


    // fit marker to map after pickup and drop location is set
    useEffect(() => {
        if (pickLocationAndTime && dropLocationAndTime) {
            mapRef.current !== null ? mapRef.current.fitToCoordinates([pickLocationAndTime.latlng, dropLocationAndTime.latlng], {
                edgePadding,
                animated: true
            }) : null;
        }
    }, [pickLocationAndTime, dropLocationAndTime])

    function onRegionChange(region) {
        setRegion(region)
    }

    function toggleDateTimePicker() {
        // toggle DateTimePicker modal and save date with user location
        setIsDateTimePickerVisible(!isDateTimePickerVisible)
    }


    const handleDatePicked = date => {
        toggleDateTimePicker();
        let timediffinms = date.getTime() - new Date().getTime();

        if (pickLocationAndTime) {
            setDropLocationAndTime({
                latlng: {
                    latitude: region.latitude,
                    longitude: region.longitude
                },
                datetime: date
            })
        } else {
            if ((timediffinms >= 10800000) && (timediffinms <= 28800000)) {
                setPickLocationAndTime({
                    latlng: {
                        latitude: region.latitude,
                        longitude: region.longitude
                    },
                    datetime: date
                })
            } else {
                Alert.alert("PICKUP FAILED",
                    "Time should be above 3 hours and below 8 hours from current time.")
            }
        }
    };



    function navButtonPressed() {
        if (pickLocationAndTime && dropLocationAndTime) {
            setPickLocationAndTime('');
            setDropLocationAndTime('');
        } else {
            setPickLocationAndTime('');
        }
    }

    return (
        <View style={styles.map}>
            <MapView
                showsUserLocation
                ref={mapRef}
                moveOnMarkerPress={false}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={onRegionChange}
            >
                {/* pickup marker */}
                {pickLocationAndTime ? <Marker
                    title="PICKUP LOCATION"
                    description={`${timeFormat(pickLocationAndTime.datetime, "showdate")}`}
                    coordinate={pickLocationAndTime.latlng} >
                    <Image style={{ height: 35, width: 35 }} source={pickupmarker} />
                </Marker> : null}

                {/* dropoff marker marker */}
                {dropLocationAndTime ? <Marker
                    title="DROP LOCATION"
                    description={`${timeFormat(dropLocationAndTime.datetime, "showdate")}`}
                    coordinate={dropLocationAndTime.latlng} >
                    <Image style={{ height: 35, width: 35 }} source={dropmarker} />
                </Marker> : null}

                {/* map Polyline netween pick and drop */}
                {(pickLocationAndTime && dropLocationAndTime) ? <Polyline
                    strokeWidth={4}
                    strokeColor="#00d084"
                    coordinates={[pickLocationAndTime.latlng, dropLocationAndTime.latlng]}
                /> : null}
            </MapView>

            {/* static marker  at center of map */}
            {(pickLocationAndTime && dropLocationAndTime) ? null : <View
                style={styles.markerFixed}>
                <Image style={styles.marker} source={pickLocationAndTime ? dropmarker : pickupmarker} />
            </View>}


            {/* back and cancel button */}
            {pickLocationAndTime ? <TouchableOpacity
                onPress={navButtonPressed}
                style={styles.navButton}>
                <Image
                    style={styles.navButtonImage}
                    source={(pickLocationAndTime && dropLocationAndTime) ? crossIcon : backIcon} />
            </TouchableOpacity> : null}

            {/* footer container*/}
            <Suspense fallback={<Text>loading...</Text>}>
                <FooterContainer
                    pickLocationAndTime={pickLocationAndTime}
                    dropLocationAndTime={dropLocationAndTime}
                    toggleDateTimePicker={toggleDateTimePicker}
                    animateToUserLocation={animateToUserLocation}
                />

                <DateTimePicker
                    mode="datetime"
                    is24Hour={false}
                    minimumDate={new Date()}
                    timePickerModeAndroid="default"
                    isVisible={isDateTimePickerVisible}
                    onConfirm={handleDatePicked}
                    onCancel={toggleDateTimePicker}
                />
            </Suspense>

        </View>
    )
}

export default DashBoardMap;