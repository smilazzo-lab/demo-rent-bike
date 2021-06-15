import PriceStrategyInterface from "./price-strategy-i.js";

export default class Price3DaysStrategy extends PriceStrategyInterface {
    saleRatio(periodoNoleggio) {
        let duration = intervalToDuration(periodoNoleggio);
        
        if (duration.days>3 && duration.days<=5) {
           return 10; // sconto del 10% ogni giorno
        }
        if (duration.days>5 && duration.days<=10) {
            return 15; // sconto del 15%
        }

        if (duration.days>10) {
            return 20; // sconto del 20%
        }
    }
}