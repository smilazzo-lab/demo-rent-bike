import BikeTypeInterface from "./bike-type-interface.js"

export default class BikeTypeMtb extends BikeTypeInterface {
    getDailyCost() {
       return 15;
    }
}