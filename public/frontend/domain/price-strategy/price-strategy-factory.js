import Price3DaysStrategy from "./price-strategy-3days.js";
import PriceDefaultStrategy from "./price-strategy-default.js";

export default function buildMakePriceStrategy() {


  let istance = Object.freeze(
    createPriceStrategy
  )

  return {
    getIstance: function () {
      return istance;
    }
  }

  function createPriceStrategy(codStrategy=0) {
    switch (codStrategy) {
      case 0 : return new PriceDefaultStrategy();
      case 1: return new Price3DaysStrategy();
    }
  }
}

