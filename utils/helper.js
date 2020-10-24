const { INITIAL_CENTER_POINT, INITIAL_RADIUS_LIMIT } = require("./../constants/constants");
const randomLocation = require('random-location');

const generateNumberPlate = () => `MH ${Math.floor(01 + Math.random() * 50)} AK ${Math.floor(1000 + Math.random() * 9000)}`

const generateRandomCoords = (centerPoint = null, radiusLimit = null) => {
    if(centerPoint === null || radiusLimit === null ) {
    return randomLocation.randomCirclePoint(INITIAL_CENTER_POINT, INITIAL_RADIUS_LIMIT);  
    }
    return randomLocation.randomCirclePoint(centerPoint, radiusLimit);
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  const calcDistanceBetweenInKMS = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  const toRad = (Value) => {
      return Value * Math.PI / 180;
  }

  const dateDiffToString = (a, b) => {
    let diff = Math.abs(a - b);
  
    let ms = diff % 1000;
    diff = (diff - ms) / 1000;
    let s = diff % 60;
    diff = (diff - s) / 60;
    let m = diff % 60;
    diff = (diff - m) / 60;
    let h = diff;
  
    // let ss = s <= 9 && s >= 0 ? `0${s}` : s;
    let mm = m <= 9 && m >= 0 ? `0${m}` : m;
    let hh = h <= 9 && h >= 0 ? `0${h}` : h;

    if(hh > mm) {
        return (hh*60)+mm;
    } else {
        return mm;
    }
  };

module.exports = {
    generateNumberPlate,
    generateRandomCoords,
    calcDistanceBetweenInKMS,
    dateDiffToString
}