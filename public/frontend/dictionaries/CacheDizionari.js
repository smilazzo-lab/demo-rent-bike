import AbstractCacheDizionari from '../../step-fmw/dictionary/AbstractCacheDizionari.js';
import Dizionario from '../../step-fmw/dictionary/Dizionario.js';

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

       getDizionarioProva() {
       return  [
        new Dizionario('codice1','descrizione1'),
        new Dizionario('codice2','descrizione2'), 
        new Dizionario('codice3','descrizione3')
        
       ];

    }
}
 