import PriceStrategyInterface from "./price-strategy-i.js";

export default class Price3DaysStrategy extends PriceStrategyInterface {
    saleRatio(periodoNoleggio) {
        let duration =periodoNoleggio;
        
        if (duration <3) {
            return 0;
        }
        if (duration>3 && duration<=5) {
           return 10; // sconto del 10% ogni giorno
        }
        if (duration>5 && duration<=10) {
            return 15; // sconto del 15%
        }

        if (duration>10) {
            return 20; // sconto del 20%
        }
    }
}