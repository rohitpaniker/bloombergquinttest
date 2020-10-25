# Füber - Coding Assessment

This is Füber only API whcih has the capabilities mentioned below:

   - List ALL available cabs
   - Book a cab along with ability to mentioned Normal/Pink type of cab preferences
   - End a ride


## API Routes

   - [GET] **HOME** ```localhost:3000/api/v1/```
   - [GET] **LIST CABS** ```localhost:3000/api/v1/cabs```
   - [POST] **BOOK A CAB** ```localhost:3000/api/v1/book```
     - parameters: 
     1. no preference: { 
         "customerId": <your customer ID. Check customers in model.js>,
         "pickupCoords": "19.0061577, 72.828873"
        }
      2. with preference: {
          "customerId": <your customer ID. Check customers in model.js>,
          "pickupCoords": "19.0061577, 72.828873",
          "preference": "Pink"
        }

   - [GET] **END A RIDE** ```localhost:3000/api/v1/endride/<YOUR_END_RIDE_TOKEN>```

   **NOTE** These coordinates: 19.0061577, 72.828873 are dummy, please pass the coordinates you would like to have as initial coordinates

## Usage

  1. Clone this repo
  2. Change directory ```cd bloombergquinttest```
  3. Run ```yarn install```
  4. Run ```yarn start```
  5. To test APP.js, run ```yarn test app.test.js```
  6. To test constants.js, run ```yarn test constants/constants.test.js```


## Change Initial Coordinates for all cabs

Initially all cabs are assigned coordinates which falls within 5 kilometers of predefined coordinates specified in constants.js. These coordinates are of BloombergQuint Office in One Indiabulls Centre.

``` 
  const INITIAL_CENTER_POINT = {
    latitude: 19.0065043,
    longitude: 72.8310389
  }
```

## How cabs get different coordinates?

  1. Initially each cab is within 5 kilometers of predefined coordinates
  
  2. When a cab is booked the cab can travell within 80 kilometers from pickup coordinates. Any cab aggregator service in real life only allows the same distance radius thus the 80 kilometers definition and anything beyond 80 kms becomes inter-state.

  3. When you end the ride, the drop coordinates become's the cab's new coordinates

  4. Anyone who wants to book a cab must be within 5 kmms

