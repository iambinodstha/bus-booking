Math.radians = function (degrees) {
    return (degrees * Math.PI) / 180;
};

Math.degrees = function (radians) {
    return (radians * 180) / Math.PI;
};

Math.sign = function (x) {
    x = +x;
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 === lat2 && lon1 === lon2) return 0;
    var delta = lon2 - lon1;
    var a = Math.radians(lat1);
    var b = Math.radians(lat2);
    var C = Math.radians(delta);
    var x = Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(C);
    var distance = Math.acos(x); // in radians
    distance = Math.degrees(distance); // in degrees
    distance = distance * 60; // 60 nautical miles / lat degree
    distance = distance * 1852; // conversion to meters

    return distance;
};
