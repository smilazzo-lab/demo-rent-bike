import BikeTypeInterface from "./bike-type-interface.js";

export default class BikeTypeCityBike extends BikeTypeInterface {
    
   getDailyCost() {
       return 10;
   }
}