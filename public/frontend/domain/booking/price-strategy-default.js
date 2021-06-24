import PriceStrategyInterface from "./price-strategy-i.js";


export default class PriceDefaultStrategy extends PriceStrategyInterface {
    saleRatio(periodoNoleggio) {
        // NESSUNO SCONTO
        return 0;
    }
}