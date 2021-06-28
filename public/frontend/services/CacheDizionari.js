import AbstractCacheDizionari from 'step-fmw/dictionary/AbstractCacheDizionari.js';
import Dizionario from 'step-fmw/dictionary/Dizionario.js';

export default class extends AbstractCacheDizionari{

    constructor() {
        super();
    }

    static toLiteral(dizionario) {
        return
            dizionario.map(x => {
              return{
                codice: x.getCodice(),
                descrizione: x.getDescrizione()
              }
            });
    }


       getDizionarioQty()   {
         return [
           new Dizionario('1','1'),
           new Dizionario('2','2'), 
           new Dizionario('3','3'),
           new Dizionario('4','4'),
           new Dizionario('5','5')
          ];
       }

       getDizionarioProva() {
       return  [
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

       
        
       ];

    }
}
 