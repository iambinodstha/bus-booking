const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "October", "Nov", "Dec"
];

export function timeFormat (timestamp, showDate) {
    let time = new Date(timestamp);
    let hrs = time.getHours();
    let min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    var ampm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    return showDate ? `${time.getDay()} ${monthNames[time.getMonth()]} ${hrs}:${min} ${ampm}` : `${hrs}:${min} ${ampm}`;
  }