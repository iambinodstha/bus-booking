import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    markerFixed: {
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    },

    navButton: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "white",
        elevation: 6,
        borderRadius: 50
    },

    navButtonImage: {
        height: 36,
        width: 36,
        margin: 4
    },

    footerContainer: {
        position: "absolute",
        bottom: 15,
        width: "90%",
        alignSelf: "center",
    },

    footerButton: {
        width: "100%",
        backgroundColor: "#00d084",
        borderRadius: 6,
        alignItems: "center",
        elevation: 4
    },

    footerButtonText: {
        color: "white",
        paddingVertical: 10,
        fontSize: 18
    },

    myLocationButton: {
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 50,
        alignSelf: "flex-end",
        marginBottom: 10
    },
    mylocationmarkerimage: {
        height: 36,
        width: 36,
        margin: 6
    },

    confirmBookingContainer: {
        width: "100%",
        backgroundColor: "white",
        elevation: 5,
        marginBottom: 14,
        borderRadius: 8,
        padding: 15
    },
    dashline: {
        flex: 1,
        borderColor: "black",
        borderWidth: 1,
        borderBottomWidth: 0,
    }
})