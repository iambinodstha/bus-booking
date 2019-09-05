import { PermissionsAndroid } from 'react-native'

export async function requestPermission(getUserLocation) {
    const check = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
    if (check) {
        getUserLocation();
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getUserLocation();
            } else {
                console.log("location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
}
