  
 /**
 * @author Salvatore Milazzo
 * @description createMemento emulates a private State Memento Pattern
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
  export default function createMemento(fromoriginator) {
      let mementoState = {};
      let origin = fromoriginator;
      // cerco di emulare il pattern memento(non avendo classi private in JS). solo
      // il proprietario dello stato puo accedere ai metodi
      // get e set 
      let check = function (r){
                     if (Object.is(origin,r)){
                         return true;
                     }
                     return false;
                 };
                 // factory:
      
      return {
          
            getMementoState: function(richiedente) {
                    return mementoState;
            },
            setMementoState: function(richiedente, state){
                if (check(richiedente)) {
                    mementoState=state;
                }else{
                    throw new Error(' tentativo di accesso ad uno stato privato');
                }
            }

      }
  }

  
  