var express = require('express');
var router = express.Router();
const randomLocation = require('random-location');
const { customersModel } = require('./../models/customers');
const { cabsModel } = require('./../models/cabs');
const { generateRandomCoords, calcDistanceBetweenInKMS, dateDiffToString }  = require("./../utils/helper");
const { INITIAL_CENTER_POINT, INITIAL_RADIUS_LIMIT, PER_MIN_COST, PER_KM_COST, PINK_CAR_COST } = require("./../constants/constants");
const customerEnroute = [];

const customers = customersModel;
const cabs = cabsModel;

const calculateDistanceCovered = () => {
  return 0;
}

const cabOnHire = {};

router.get('/', (req, res) => {
  res.render('index', { title: `Hello There! Welcome to Füber API.
  \r\n[GET] /cabs => Show fleets of available cabs` });
});

router.get('/randomcoord', (req, res) => {
  res.send(generateRandomCoords());
});

router.get('/cabs', (req, res) => {
  res.send(cabs);
});

router.post('/book', async (req, res) => {
  if(!req.body.customerId || !req.body.pickupCoords) {
    return res.send({
      error: "Invalid request, please specify customerId and pickup coordinates.",
      customers: customers
    });
  }

  const {customerId, pickupCoords} = req.body;

  let preferrence = "Normal";

  const currentCustomer = {
    index: -1
  }
  
  const freeCabFound = {
    index: -1
  }

  const customerPickupCoords = {
    latitude: pickupCoords.split(", ")[0],
    longitude: pickupCoords.split(", ")[1]
  }
  let customerExists = false;
  let customerIsFreeToBook = true;
  let isAnyCabFree = false;
  let cabIDNumber = "";

  if(req.body.preferrence && req.body.preferrence === "Pink") {
    preferrence = "Pink"
  }

  for(cust in customers) {
    if(customers[cust].customerId === customerId) {
      customerExists = true;
      if(customers[cust].isFreeToBook) {
        currentCustomer.index = cust;
        break;
      }
      customerIsFreeToBook = false;
      break;
    }
  }

  if(!customerExists) {
    return res.send({
      error: "Invalid customer ID, Customer doesn't exist.",
      customers: customers
    });
  }

  if(!customerIsFreeToBook) {
    return res.send({
      error: "Customer can not book a ride again until the ride is complete.",
      customers: customers
    });
  }

  for(cab in cabs) {
    if(cabs[cab].isBooked === false && cabs[cab].cabType === preferrence) {
      isAnyCabFree = true;
      freeCabFound.index = cab;
      break;
    }
  }

  if(!isAnyCabFree) {
    return res.send({
      error: "No cabs available at this time. Please try again later.",
      cabStatus: cabs
    });
  }

  const pickupDistance = await calcDistanceBetweenInKMS(cabs[freeCabFound.index].cabLocation.latitude, cabs[freeCabFound.index].cabLocation.longitude, customerPickupCoords.latitude, customerPickupCoords.longitude);

  if(pickupDistance > INITIAL_RADIUS_LIMIT) {
    return res.send({
      error: "No cabs available in your proximity. You or the cabs need to be atleast withint 5 kilometers to find a cab. Please try again later.",
    });
  }

  cabs[freeCabFound.index].isBooked = true;
  cabs[freeCabFound.index].occupiedBy = customers[currentCustomer.index].customerId
  customers[currentCustomer.index].isFreeToBook = false;
  customers[currentCustomer.index].start = new Date();
  customerEnroute.push(currentCustomer.index);
  cabIDNumber = cabs[freeCabFound.index].cabNumber
  cabOnHire[currentCustomer.index] = {
    cabIndex: freeCabFound.index,
    customerIndex: currentCustomer.index,
    cabNumber: cabs[freeCabFound.index].cabNumber,
    bookedBy: customers[currentCustomer.index].customerId,
    preferrence,
    pickupCoords: {
      latitude: customerPickupCoords.latitude,
      longitude: customerPickupCoords.longitude
    }
  };

  res.send({
      pickupDistance,
      INITIAL_RADIUS_LIMIT,
      rideEndToken: currentCustomer.index,
      success: "Your Füber has been book and is on the way to pick you up",
      cabIDNumber,
      cabs,
      cabOnHire,
      customers,
      customerEnroute
    });

  // res.send(cabs);
});

router.get('/endride/:rideEndToken', async (req, res) => {
  const { rideEndToken } = req.params;
  const endRideCoords = generateRandomCoords(INITIAL_CENTER_POINT, 80);
  const endRide = new Date();
  
  const totalDistanceTravelledInKMS = await calcDistanceBetweenInKMS(cabOnHire[rideEndToken].pickupCoords.latitude, cabOnHire[rideEndToken].pickupCoords.longitude, endRideCoords.latitude, endRideCoords.longitude);
  const totalTimeTookToTravel = await dateDiffToString(customers[cabOnHire[rideEndToken].customerIndex].start, endRide);
  const preferrence = cabOnHire[rideEndToken].preferrence;
  cabs[cabOnHire[rideEndToken].cabIndex].cabLocation = endRideCoords;
  cabs[cabOnHire[rideEndToken].cabIndex].isBooked = false;
  cabs[cabOnHire[rideEndToken].cabIndex].occupiedBy = 0;
  customers[cabOnHire[rideEndToken].customerIndex].isFreeToBook = true;
  customers[cabOnHire[rideEndToken].customerIndex].start = null;
  customerEnroute.splice(cabOnHire[rideEndToken].customerIndex, 1);
  delete cabOnHire[rideEndToken];

  const TOTAL_FARE = preferrence === "Normal" ? (totalDistanceTravelledInKMS*PER_KM_COST) + (totalTimeTookToTravel*PER_MIN_COST) : (totalDistanceTravelledInKMS*PER_KM_COST) + (totalTimeTookToTravel*PER_MIN_COST) + PINK_CAR_COST;
  
  res.send({
    message: "Thank you for choosing Füber.",
    total: `Please pay Ɖ ${Math.ceil(TOTAL_FARE)} (Dogecoin) to the rider to complete your ride`,
  });
});

module.exports = router;
