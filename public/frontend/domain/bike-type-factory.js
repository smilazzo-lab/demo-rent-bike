import BikeTypeCityBike from "./bike-type-citybike"
import BikeTypeMtb from "./bike-type-mtb";

export default function buildMakeBikeType () {

    let istance = Object.freeze({
      createBykeType
    });
    
    return  {
      getIstance:   ()=> istance 
    };


     function createBikeType (codBikeType)
     
    {
     
      switch(codBikeType) {
        /*
        new Dizionario('BC','BICI CITTÀ	'),
        new Dizionario('MBF','MOUNTAIN BIKE FRONT'), 
        new Dizionario('MBFS','MOUNTAIN BIKE FULL SUSPENDED'),
        new Dizionario('BSC','BICI DA STRADA (TELAIO IN CARBONIO)'),
        new Dizionario('BJ20','BICI JUNIOR 20"'),
        new Dizionario('BJ24','BICI JUNIOR 24"'),
        new Dizionario('SB','SEGGIOLINO PER BICI'),
        new Dizionario('MBFE','MTB FRONT ELETTRICA'),
        new Dizionario('SB','SEGGIOLINO PER BICI'),
        new Dizionario('MBFE','MTB FRONT ELETTRICA'),
        new Dizionario('MBAM','MTB ALL MOUNTAIN'),
        new Dizionario('BSA','BICI DA STRADA (TELAIO IN ALLUMINIO'),
        new Dizionario('BP','BICI PIEGHEVOLE'),
        new Dizionario('BT','BICI TREKKING'),
        new Dizionario('BTE','BICI TREKKING ELETTRICA'),
        new Dizionario('BGA','BICI GRAVEL (TELAIO IN ALLUMINIO)'),
        new Dizionario('BEP','BICI ELETTRICA PIEGHEVOLE'),
        new Dizionario('BSE','BICI DA STRADA ELETTRICA'),
        new Dizionario('BGE','BICI GRAVEL ELETTRICA')
        */
        case 'BC': return new BikeTypeCityBike();break;
        case 'MBF' :return new BikeTypeMtb();break;
        default: return new BikeTypeCityBike();
      }
    }
  }
  
      
    
  