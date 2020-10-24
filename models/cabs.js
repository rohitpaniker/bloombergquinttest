const { generateNumberPlate, generateRandomCoords }  = require("./../utils/helper");

const cabsModel = [
    {
      cabId: 1,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 2,
      cabType: "Pink",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 3,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 4,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 5,
      cabType: "Pink",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 6,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 7,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 8,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 9,
      cabType: "Pink",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    },
    {
      cabId: 10,
      cabType: "Normal",
      cabNumber: generateNumberPlate(),
      isBooked: false,
      occupiedBy: 0,
      cabLocation: generateRandomCoords()
    }
  ]

  module.exports = { cabsModel }