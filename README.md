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

# Guide to build app on android:
## 1. generate debug.keystore file
you need to generate debug.keystore file from directory `project/android/app/` by running following command: `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`.

## add your google map api key
you need to add your GOOGLE_API_KEY on `android/app/src/main/AndroidManifest.xml` file and remove YOUR_API_KEY_HERE with your actual api key
`<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_API_KEY_HERE"/>`
