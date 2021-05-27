export default class {
    codice=null;
    descrizione=null;

    
    constructor(c,d){
        this.codice=c;
        this.descrizione=d;
    }

    getDescrizione() {
        return this.descrizione;
    }

   setDescrizione(d) {
       this.descrizione=d;
   }

    setCodice(c) {
        this.codice=c;
    }
    getCodice() {
        return this.codice;
    }
}