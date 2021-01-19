# bus-booking
bus booking system mobile application build on react native which helps user to select their pickup time and date with their location along with drop off time and date with their location.

## Application scenario:
Let’s take a case of bus booking system.

1. User's input following things:
- Pickup date and time
- Pickup point using google map
- Return date and time
- Return drop point using google map

2. Application rules
- Pickup Date Time should be at least 3 hours from current time and should not be more than 8 hours from current time.
Eg if current date time is 2017 Jan 18 10:00 am, user cannot choose pickup date as 2017 Jan 18 12:59 pm (because it’s less than 3 hours from current date time) but he can choose pickup date as 2017 Jan 18 1:00 pm (because its at least 3 hours from current date time). User can choose pickup date as 2017 Jan 18 6:00 pm (because it’s not more than 8 hours from current time) but user cannot choose pickup date as 2017 Jan 18 6:01 pm (because it’s more than 8 hours from current time )

# How  to install
1. clone this react project by running below command in git terminal: git clone https://github.com/iambinodstha/bus-booking.git
2. after Step 1. goto project directory: cd bus-booking
3. install dependencies: npm install or yarn install

# Android installation
1. add your google map api key
you need to add your GOOGLE_API_KEY on `android/app/src/main/AndroidManifest.xml` file and remove YOUR_GOOGLE_MAPS_API_KEY_HERE with your actual api key
```xml
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
```
you can get your api key from [Google Maps Platform](https://console.cloud.google.com/google/maps-apis)

2. `npx react-native run-android` or `react-native run-android`

# IOS installation
1. pod install `cd ios && pod install`
2. add api key on `ios/projectname/AppDelegate.m`
<pre>
[GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY_HERE"]; // get your API_KEY from google cloud console
</pre>
3. build `npx react-native run-ios` or `react-native run-ios`


## Packages used
1. [react-native-maps](https://github.com/react-native-maps/react-native-maps)
1. [@react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation)
2. [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)
3. [react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker)