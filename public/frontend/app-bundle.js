(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author Salvatore Milazzo
 * @description AbstractValidator 
 *               map {
                 name : [],
                 confermapwd : ['password corta','password diversa dalla precedente'],
                 }
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
class AbstractValidator {
  _map = new Map();

  _validate(tagElement, value) {
    let elementName = tagElement.getAttribute('id');
    if (!elementName) return;
    let error = this.validateField(elementName, value);

    if (error) {
      this.setErrorFor(tagElement, error);
    }

    if (!error) {
      this.setSuccessFor(tagElement);
    }

    this._map.set(elementName, error);
  }

  validateField(name, value) {
    return null;
  }

  isValid() {
    let mapIter = this._map.values();

    let count = 0;

    while (mapIter.next().value) {
      count++;
    }

    return count === 0;
  }

  setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
  }

  setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

}

exports.default = AbstractValidator;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMemento;

/**
* @author Salvatore Milazzo
* @description createMemento emulates a private State Memento Pattern
* @date 2021
* @name $tep MVC SPA framework
* @license MIT
*/
function createMemento(fromoriginator) {
  let mementoState = {};
  let origin = fromoriginator; // cerco di emulare il pattern memento(non avendo classi private in JS). solo
  // il proprietario dello stato puo accedere ai metodi
  // get e set 

  let check = function (r) {
    if (Object.is(origin, r)) {
      return true;
    }

    return false;
  }; // factory:


  return {
    getMementoState: function (richiedente) {
      return mementoState;
    },
    setMementoState: function (richiedente, state) {
      if (check(richiedente)) {
        mementoState = state;
      } else {
        throw new Error(' tentativo di accesso ad uno stato privato');
      }
    }
  };
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author Salvatore Milazzo
 * @description Observable , A very simple wrapper for Step Models used 
 *              for 2way binding beetween controller and view
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
class Observable {
  constructor(value) {
    this._listeners = [];
    this._value = value;
  }

  notify() {
    this._listeners.forEach(listener => listener(this._value));
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.notify();
    }
  }

  bindToHtmlElement(input, validator) {
    input.value = this._value;
    this.subscribe(() => input.value = this._value);

    input.onkeyup = () => {
      validator._validate(input, input.value);

      this._value = input.value;
    };

    input.onchange = () => {
      validator._validate(input, input.value);

      this._value = input.value;
    };
  }

}

exports.default = Observable;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AbstractCacheDizionari {
  static cache = new Map();

  static getDizionario(name) {
    let incache = this.cache.get(name); //  console.log('cache = '+cache);

    if (incache) return incache; // chiamata al business
    //  console.log(this);

    this.cache.set(name, this.prototype['getDizionario' + name].apply());
    return this.cache.get(name);
  }

}

exports.default = AbstractCacheDizionari;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class _default {
  codice = null;
  descrizione = null;

  constructor(c, d) {
    this.codice = c;
    this.descrizione = d;
  }

  getDescrizione() {
    return this.descrizione;
  }

  setDescrizione(d) {
    this.descrizione = d;
  }

  setCodice(c) {
    this.codice = c;
  }

  getCodice() {
    return this.codice;
  }

}

exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _StepRouting = _interopRequireDefault(require("./StepRouting.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Salvatore Milazzo
 * @description StepContext ,able to manage user actions 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
class _default {
  __$tep_context;

  constructor() {}

  startListening(jsonroutes, stepLoader) {
    this.__$tep_context = new _StepRouting.default(jsonroutes, stepLoader);

    this.__$tep_context.callStep("/");

    this._popStateListening(this.__$tep_context); // Install the Dispatcher


    document.body.addEventListener("click", e => {
      if (e.target.matches("[data-link]")) {
        let index = e.target.id.split('-')[1];
        let comando = e.target.id.split('-')[2];
        let i = e.target.name;
        e.preventDefault();
        /**
         * gestione 'Annulla/Indietro'
         */

        if (comando === 'avanti') {
          this.__$tep_context.getInteractionStack().getCurrent().avanti();
        }

        if (comando === 'indietro') {
          this.__$tep_context.getInteractionStack().getCurrent().indietro();
        }

        if (comando === 'annulla') {
          this.__$tep_context.returnStep(e.target.pathname);
        } // aggiornamento entity


        if (comando === 'conferma') {
          this.__$tep_context.getInteractionStack().getCurrent().conferma();
        } // cliccare si su confirm dialog


        if (comando === 'confirm_yes') {
          this.__$tep_context.returnStep(e.target.pathname, {
            command: 'yes'
          });
        } else if (comando === 'menu') {
          this.__$tep_context.getInteractionStack().reset();

          this.__$tep_context.callStep(e.target.pathname);
        }
        /**
         * Sezione per la gestione del lookup
         */
        else if (comando === 'lookup') {
            this.__$tep_context.callStep(e.target.pathname);
          } else if (comando === 'lookup.search') {
            let criteria = this.__$tep_context.getInteractionStack().getCurrent().getCriteria();

            console.log("Event Listener intercetta criteria = " + JSON.stringify(criteria));

            this.__$tep_context.getInteractionStack().getCurrent().doLookupSearch(criteria).then(x => {
              this.__$tep_context.getInteractionStack().getCurrent().renderView();

              return '';
            });
          } else if (comando === 'lookup.pick') {
            let fromUrl = this.__$tep_context.getInteractionStack().getCurrent().getFlatUrl();

            let selected = this.__$tep_context.getInteractionStack().getCurrent().pickElement(index);

            this.__$tep_context.returnStep(e.target.pathname, fromUrl, selected);
          } else if (comando === 'listamc.vis' || comando === 'listamc.upd' || comando === 'listamc.del') {
            this.__$tep_context.callStep(e.target.pathname, this.__$tep_context.getInteractionStack().getCurrent().getElementOfCollection(index));
          } // versione SHORTCUT 
          else if (comando === 'listamc.del.shortcat') {
              this.__$tep_context.getInteractionStack().getCurrent().removeElementOfCollection(index);
            }
      }
    });
  } // DISABILITAZIONE DEL BROWSING INDIETRO


  _popStateListening(stepContextRef) {
    window.onpopstate = function (event) {
      // 
      stepContextRef.getInteractionStack().reset();
      stepContextRef.callStep("/");
    };
  }

}

exports.default = _default;

},{"./StepRouting.js":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author Salvatore Milazzo
 * @description StepLoader ,dinamically creates objects from string 
 *               declaration 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
class StepLoader {
  step_collection = {};
  _injectedUi;

  constructor({
    renderer,
    setErrorMsg
  }) {
    this._injectedUi = {
      renderer,
      setErrorMsg
    };
    console.log(this._injectedUi);
  }

  use(className, step) {
    this.step_collection[className] = step;
  }

  instantiate(routerRef, className, args) {
    let S = this.step_collection[className];
    let obj = new S(this._injectedUi, routerRef, args[0], args[1]);
    return obj;
  }

}

exports.default = StepLoader;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author salvatore Milazzo
 * @description factory for StepParameters
 */
class _default {
  static createParameters(data, callLink, calledLink, edit_mode = 'vis', search_mode = "search", title = "no title") {
    return {
      inputData: data || {},
      metaInfo: {
        callLink: callLink,
        calledLink: calledLink,
        edit_mode: edit_mode,
        search_mode: search_mode,
        title: title
      }
    };
  }

}

exports.default = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _StepStack = _interopRequireDefault(require("./StepStack.js"));

var _StepParameters = _interopRequireDefault(require("./StepParameters.js"));

var _StepUrl = _interopRequireDefault(require("./StepUrl.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Salvatore Milazzo
 * @description StepContext ,able to do CallStep and ReturnStep 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
class _default {
  _stepStack = new _StepStack.default();
  _mementoStack = new _StepStack.default();
  _parametersStack = new _StepStack.default();
  _routes = [];
  _stepLoader;

  constructor(routes, stepLoader) {
    this._routes = routes;
    this._stepLoader = stepLoader;
  }

  getInteractionStack() {
    return this._stepStack;
  }

  _getMementoStack() {
    return this._mementoStack;
  }

  _getParamsStack() {
    return this._parametersStack;
  } // Examples:
  // routeTo ('/Home','initialize',inputData={},metaInfos={edit_mode:vis,prevLink='/',actualLink='/'})
  // routeTo ('/cats','initialize',inputData={},metaInfos={search_mode:search,prevLink='/',actualLink='/cats'})


  _routeTo = (stepUrl, stepParams, stepContextRef, fromRoute) => {
    history.pushState(null, null, stepUrl.getUrl());

    this._installStep(stepUrl, stepParams, stepContextRef, fromRoute);
  };

  _createStepParameters(inputData, routePath) {
    let firedRoute = this._getFiredRoute(window.location.pathname).route;

    let linkCurrentStep = firedRoute.path;
    let linkNextStep = routePath;
    let edit_mode = firedRoute.edit_mode;
    let search_mode = firedRoute.search_mode;
    let title = firedRoute.title;

    let params = _StepParameters.default.createParameters(inputData, linkCurrentStep, linkNextStep, edit_mode, search_mode, title);

    this._getParamsStack().push(params);

    return params;
  }

  _restoreStepParameters(data) {
    this._getParamsStack().pop();

    let fromStack = this._getParamsStack().getCurrent();

    if (fromStack === null) return null;
    fromStack.inputData = data;
    let stepParams = {};

    if (fromStack) {
      stepParams = fromStack;
    } else {
      stepParams = _StepParameters.default.createParameters(data, "/", "/");
    }

    return stepParams;
  } // start a new Web Step


  callStep(routePath, callingStepInputData = {}) {
    this._routeTo( //  URL+METHOD
    new _StepUrl.default(routePath, 'initialize'), // DATA PIU LINKED STEP LINKS
    this._createStepParameters(callingStepInputData, routePath), // ROUTER REF
    this);
  } // return to a Previous Web Step   


  returnStep(routePath, sourcePath = "/", fromStepOutputdata = {}) {
    this._routeTo( // URL+ CALLBACK
    new _StepUrl.default(routePath, 'callback'), // FETCH PREVIOUS LINK STATE AND OVERRIDE WITH OUTPUT DATA
    this._restoreStepParameters(fromStepOutputdata), this, sourcePath);
  }

  callMethodOfCurrentStep(methodName) {
    this._routeTo(new _StepUrl.default(window.location.pathname, methodName));
  }

  _getFiredRoute(pathToBeMatched) {
    let firedRoute = this._routes.map(x => {
      return {
        route: x,
        fired: pathToBeMatched === x.path
      };
    }).find(y => y.fired);

    return firedRoute ? firedRoute : {
      route: this._routes[0],
      fired: true
    };
  }

  _installStep(stepUrl, stepParams, stepContext, fromRoute) {
    let firedRoute = this._getFiredRoute(stepUrl.getUrl()); // factory del controller/step che deve gestire la route sul client spa


    let nextStep = this._stepLoader.instantiate(stepContext, firedRoute.route.controller, firedRoute.route.args);

    let stepMethodToInvoke; // NUOVO ROTTA NELL'ALBERO DI NAVIGAZIONE

    if (stepUrl.isAnInitializeRoute()) {
      stepMethodToInvoke = '_initialize'; // CREATE memento of last interaction || {}

      let statusOld = {};
      let stepOld = this.getInteractionStack().getCurrent();

      if (stepOld) {
        // ATTENZIONE: la creazione del memento da salvare e ripristinare successivamente riguarda 
        // solo il model della phase corrente dell'interazione a wizard.
        // il motivo? tutta la session ├¿ gi├á disponibile sul client, il mememnto viene utilizzato 
        // esclusivamente per avere effetti collaterali tra una interazione e la successsiva
        // ma relativamente al model della phase corrente ha senso! 
        statusOld = stepOld.createMemento();
      } // install new Step


      this.getInteractionStack().push(nextStep); // 3. save Memento on top of a stack

      this._getMementoStack().push(statusOld);
    } // RITORNO DI ROTTA NELL'ALBERO DI NAVIGAZIONE


    if (stepUrl.isACallbackRoute()) {
      stepMethodToInvoke = '_callback'; // estrae dallo stepcontext l'elemento morente

      this.getInteractionStack().pop(); // per ripristinare lo step, recupero il suo ultimo snapshot dello stato

      let backupMemento = this._getMementoStack().getCurrent(); //26052021 bugfix


      if (backupMemento) {
        if (backupMemento.getMementoState()) {
          nextStep.installMemento(backupMemento); // cancello una posizione dallo stack degli stati

          this._getMementoStack().pop();
        }
      }
    }

    if (stepUrl.getMethod() === 'conferma') {
      stepMethodToInvoke = 'conferma';
    } //  INVOCA IL GIUSTO METHOD DINAMICAMENTE


    if (stepParams) {
      if (stepMethodToInvoke === '_callback') {
        this.getInteractionStack().getCurrent()[stepMethodToInvoke](stepParams.inputData, stepParams.metaInfo, fromRoute);
      } else {
        this.getInteractionStack().getCurrent().setFlatUrl(stepUrl.getUrl());
        this.getInteractionStack().getCurrent()[stepMethodToInvoke](stepParams.inputData, stepParams.metaInfo);
      }
    }
  }

}

exports.default = _default;

},{"./StepParameters.js":8,"./StepStack.js":10,"./StepUrl.js":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author salvo Milazzo
 * @description general purpose stack
 */
class _default {
  _stk = [];

  constructor() {}

  getCurrent() {
    let indexUltimo = this._stk.length;

    if (indexUltimo > 0) {
      return this._stk[indexUltimo - 1];
    } else {
      return this._stk[0];
    }
  }

  reset() {
    this._stk = [];
  }

  push(step) {
    this._stk.push(step);
  }

  pop() {
    if (this._stk.length > 0) {
      return this._stk.pop();
    }

    return null;
  }

}

exports.default = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class _default {
  _url;
  _method; // {initialize || callback || annulla || lookup}

  constructor(url = '/', method = 'initialize') {
    this._url = url;
    this._method = method;
  }

  getUrl() {
    return this._url;
  }

  getMethod() {
    return this._method;
  }

  isAnInitializeRoute() {
    return this._method === 'initialize' ? true : false;
  }

  isACallbackRoute() {
    return this._method === 'callback' ? true : false;
  }

}

exports.default = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractStep = _interopRequireDefault(require("./AbstractStep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
class _default extends _AbstractStep.default {
  constructor(routerRef, specificato, searchMode) {
    super(routerRef, specificato, searchMode);
  }

  async initialize() {
    throw new Error('not implemented in AbstractCollectionStep');
  }

  _initialize(c, m) {
    super.setInputData(c);
    super.setMetaInfo(m); // se la modalit├á ├¿ search c ├¿ un criteria

    console.log("search_mode = " + super.getSearchMode());

    if (super.getSearchMode() === 'search') {
      this.asyncSearch(c).then(data => {
        console.log("i dati che sono arrivati dalla ricerca = " + JSON.stringify(data));
        super.setSearchMode('list');

        this._initialize(data, m);
      });
      return;
    } // se ├¿ la lista lavora


    if (this.getSearchMode() === 'list') {
      this.setCollection(c);
      this.initialize().then(x => this.renderView()).catch(err => {
        console.log("errore segnalato da UI:" + err);
      }); // this.renderView();
    }
  }

  setCollection(c) {
    throw new Error('set Collection ot implemented!');
  }

  asyncSearch(criteria) {
    throw new Error('asyncSearch not implemented!');
  } // non passa alla view l'id del database


  sanitizeId(sourceObj) {
    return sourceObj.map(x => {
      let newObj = {};

      for (const prop in x) {
        if (x.hasOwnProperty(prop)) {
          console.log(prop);

          if (prop !== 'id') {
            newObj[prop] = x[prop];
          }
        }
      }

      return newObj;
    });
  }

  sanitizeField(sourceObj, field) {
    return sourceObj.map(x => {
      let newObj = {};

      for (const prop in x) {
        if (x.hasOwnProperty(prop)) {
          console.log(prop);

          if (prop !== field) {
            newObj[prop] = x[prop];
          }
        }
      }

      return newObj;
    });
  }

}

exports.default = _default;

},{"./AbstractStep.js":15}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractStep = _interopRequireDefault(require("./AbstractStep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo 
 * @date 2021
 *  AbstractDetailStep 
 *  methods : constructor(target,edit_mode)
 *          : initialize  pipeline di initialize
 *          : conferma {inserimento, modifica, cancella}
 * 
 *  richiede override di:  buildModel
 *                                  
 */
class _default extends _AbstractStep.default {
  constructor(routerRef, specificato, options) {
    super(routerRef, specificato, options);
  }

  async initialize() {
    throw new Error('not implemented in AbstractDetailStep');
  } // pipeline di template 


  _initialize(c, m) {
    // Clonare gli oggetti interrompere il riferimento diretto
    let metaInfo = JSON.parse(JSON.stringify(m));
    let inputData = JSON.parse(JSON.stringify(c));
    super.setInputData(inputData);
    super.setMetaInfo(metaInfo);
    this.initialize().then(x => this.renderView()); // this.renderView();
  }

  conferma() {
    console.log("edit_mode=" + super.getEditMode());

    if (super.getEditMode() === 'vis') {
      this.insertEntity();
    }

    if (super.getEditMode() === 'ins') {
      this.insertEntity();
    }

    if (super.getEditMode() === 'upd') {
      this.updateEntity();
    }

    if (super.getEditMode() === 'del') {
      this.cancelEntity();
    }
  }

  insertEntity() {
    throw new Error('insertEntity() is an abstract!');
  }

  updateEntity() {
    throw new Error('updateEntity() is an abstract!');
  }

  cancelEntity() {
    throw new Error('cancelEntity() is an abstract!');
  }

  getBindingModel() {
    return super.getBindingModel();
  }

  setBindingModel(memento) {
    super.setBindingModel(memento);
  }

}

exports.default = _default;

},{"./AbstractStep.js":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractDetailStep = _interopRequireDefault(require("./AbstractDetailStep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
class _default extends _AbstractDetailStep.default {
  // criteria
  // lista
  constructor(routerRef, specificato, options) {
    super(routerRef, specificato, options);
  }

  getCriteria() {
    throw new Error('abstract!');
  }

  buildCriteria() {
    throw new Error('buildCriteria not implemented!');
  }

  _initialize(c, m) {
    super._initialize(c, m);
  }

  setCollection(lst) {
    throw new Error('not implemented');
  }

  pickElement(i) {
    throw new Error('not implemented');
  } // da pulsante


  async doLookupSearch(criteria) {
    return this.asyncSearch(criteria).then(data => {
      this.setCollection(data);
      return '';
    });
  }

  async asyncSearch(criteria) {
    throw new Error('asyncSearch not implemented!');
  }

  getBindingModel() {
    return super.getBindingModel();
  }

  setBindingModel(model) {
    super.setBindingModel(model);
  }

}

exports.default = _default;

},{"./AbstractDetailStep.js":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Memento = _interopRequireDefault(require("../data-binding/Memento.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * @author Salvatore Milazzo
 * @description AbstractStep ,is the Unit Of Work in web step 
               lyfecycle gestito completamente dal client
               Client : StepRouter

               createMemento -- estrae lo stato in un oggetto Memento, per conservarlo 
               installMemento -- ripristina lo stato quando si ritorna alla interazione
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */
class _default {
  _stepUrl;
  _target;
  inputData = {};
  meta = {};
  options = [];
  __$tep_context_ref; // per fare la callStep da dentro i metodi

  _injectetUi;

  constructor(uiRef, stepContext, specificato, options) {
    this._target = specificato;
    this.options = options;
    this.__$tep_context_ref = stepContext;
    this._injectetUi = uiRef;
  }

  setFlatUrl(url) {
    this._stepUrl = url;
  }

  getFlatUrl() {
    return this._stepUrl;
  }

  getAutoBindingRootModel() {
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (prop.startsWith('$_model')) {
          return this[prop];
        }
      }
    }

    throw new Error('$_model+' + " --> model context autowired not found");
  }

  getAutoBindingModel(phase = 0) {
    let rootStepModel = this.getAutoBindingRootModel();

    for (const prop in rootStepModel) {
      if (rootStepModel.hasOwnProperty(prop)) {
        if (prop.startsWith('$_' + phase + '___')) {
          // attenzione: creazione dinamica di propriet├á
          rootStepModel[prop].shadowPhase = phase;
          return rootStepModel[prop];
        }
      }
    }

    throw new Error('$_' + phase + "___  --> model context autowired not found");
  }

  setBindingModel(memento) {
    let rootStepModel = this.getAutoBindingRootModel();
    let phase = memento.shadowPhase;

    for (const prop in rootStepModel) {
      if (rootStepModel.hasOwnProperty(prop)) {
        if (prop.startsWith('$_' + phase + "___")) {
          console.log("---trovato!");
          rootStepModel[prop] = memento;
        }
      }
    }
  }

  getBindingModel() {
    let modelRef = null;

    if (this.getCurrentPhase) {
      modelRef = this.getAutoBindingModel(this.getCurrentPhase());
    } else {
      modelRef = this.getAutoBindingModel();
    }

    if (!modelRef) {
      throw new Error(' non ├¿ presente un model per $tep');
    }

    return modelRef;
  }

  getWebUi() {
    return this._injectetUi;
  }

  getStepContext() {
    return this.__$tep_context_ref;
  }

  getEditMode() {
    return this.meta['edit_mode'];
  }

  getSearchMode() {
    return this.meta['search_mode'];
  }

  setSearchMode(newMode) {
    this.meta['search_mode'] = newMode;
  }

  getValidator() {
    throw new Error('getValidator is abstract');
  }

  setInputData(inpData) {
    this.inputData = inpData;
  }

  setMetaInfo(steplinks) {
    this.meta = steplinks;
  }

  getMetaInfo() {
    return this.meta;
  }

  getInputData() {
    return this.inputData;
  }

  setElTargetByID(targetId) {
    this._target = targetId;
  }

  setTabTitle(name) {
    document.title = name;
  }

  buildModel() {
    throw new Error(' abstract method!');
  }

  initialize() {
    throw new Error('not implemented');
  } // backdoor


  _callback(inputData, m, fromStep) {
    console.log("_callback from step=" + JSON.stringify(fromStep)); // this.setInputData(inputdata);

    this.setMetaInfo(m);
    this.callback({
      fromStep,
      inputData
    }).then(x => this.renderView());
  }

  async callback({
    fromStep,
    inputData
  }) {
    throw new Error('not implemented');
  }

  renderView() {
    throw new Error('not implemented here');
  } // Memento Pattern for Progressive Web Apps


  createMemento() {
    let memento = (0, _Memento.default)(this);
    let innerControllerStatus = this.getBindingModel();
    memento.setMementoState(this, innerControllerStatus);
    return memento;
  }

  installMemento(memento) {
    let innerControllerStatus = memento.getMementoState(this);
    this.setBindingModel(innerControllerStatus);
  }

}

exports.default = _default;

},{"../data-binding/Memento.js":2}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractStep = _interopRequireDefault(require("./AbstractStep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo 
 * @date 2021
 *  AbstractDetailStep 
 *  methods : constructor(target,edit_mode)
 *          : initialize  pipeline di initialize
 *          : conferma {inserimento, modifica, cancella}
 * 
 *  richiede override di:  buildModel
 *                                  
 */
class _default extends _AbstractStep.default {
  // il target html dove renderizzare la classe
  _target = '';
  _inputData = {};
  _phaseNo = 0;

  constructor(routerRef, specificato, options) {
    super(routerRef, specificato, options);
  }

  getCurrentPhase() {
    return this._phaseNo;
  }

  getBindingModel() {
    return super.getBindingModel();
  }

  setBindingModel(memento) {
    super.setBindingModel(memento);
  }

  switchToPhase(phaseNo) {
    this._phaseNo = phaseNo;
  }

  avanti() {
    this._phaseNo++;
    this.switchToPhase(this._phaseNo);
    this.renderView();
  }

  indietro() {
    if (this._phaseNo > 0) {
      this._phaseNo--;
    }

    this.switchToPhase(this._phaseNo);
    this.renderView();
  }

  initialize() {
    throw new Error('not implemented in AbstractDetailStep');
  } // pipeline di template 


  _initialize(c, m) {
    // Clonare gli oggetti interrompere il riferimento diretto
    let metaInfo = JSON.parse(JSON.stringify(m));
    let inputData = JSON.parse(JSON.stringify(c));
    super.setInputData(inputData);
    super.setMetaInfo(metaInfo);
    this.initialize();
    this.renderView();
  }

  conferma() {
    console.log("inside conferma");
    console.log("edit_mode=" + super.getEditMode());

    if (super.getEditMode() === 'vis') {
      this.insertEntity();
    }

    if (super.getEditMode() === 'ins') {
      this.insertEntity();
    }

    if (super.getEditMode() === 'upd') {
      this.updateEntity();
    }

    if (super.getEditMode() === 'del') {
      this.cancelEntity();
    }
  }

  insertEntity() {
    throw new Error('insertEntity() is an abstract!');
  }

  updateEntity() {
    throw new Error('updateEntity() is an abstract!');
  }

  cancelEntity() {
    throw new Error('cancelEntity() is an abstract!');
  }

}

exports.default = _default;

},{"./AbstractStep.js":15}],17:[function(require,module,exports){
"use strict";

var _manifest = _interopRequireDefault(require("./web-ui/manifest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_manifest.default.start();

},{"./web-ui/manifest.js":39}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractCollectionStep = _interopRequireDefault(require("step-fmw/stepping/AbstractCollectionStep.js"));

var _manifest = _interopRequireDefault(require("../services/manifest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
class _default extends _AbstractCollectionStep.default {
  $_model = {
    $_0___bookings: {
      listAllBookings: []
    }
  }; //_bookings = [];

  _header = ['booking-id', 'cognome', 'nome', 'dal', 'al'];

  constructor(stepContext, specificato, search_mode) {
    super(stepContext, specificato, search_mode);
  }

  getElementOfCollection(index) {
    return this.$_model.$_0___bookings.listAllBookings[index];
  }

  setCollection(data) {
    this.$_model.$_0___bookings.listAllBookings = data;
  }

  async asyncSearch(criteria) {
    console.log("inside CollectionBookingController::asyncSearch");
    return await _manifest.default.getIstance().queryAllBookings();
  } // lifecycle 0


  async initialize() {}

  renderView() {
    // TOLGO id dalla visualizzazzione
    let data = super.sanitizeId(this.$_model.$_0___bookings.listAllBookings); // data = super.sanitizeField(data,'name');

    super.getWebUi().renderer({
      templateName: 'bookings',
      templateType: 'collection',
      templateData: JSON.stringify({
        header: this._header,
        data
      }),
      templateMetaInfo: super.getMetaInfo(),
      templateBindingZone: null
    });
  }

}

exports.default = _default;

},{"../services/manifest.js":37,"step-fmw/stepping/AbstractCollectionStep.js":12}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractDetailStep = _interopRequireDefault(require("step-fmw/stepping/AbstractDetailStep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _default extends _AbstractDetailStep.default {
  //{"id":4,"booking_uuid":"1111-1111-1111-1111","surname":"milazzo","name":"salvatore","date_ini":"2021-06-01T10:00:00.000Z","date_fin":"2021-06-01T10:00:00.000Z"}
  $_model = {
    $_0___booking: {
      booking_uuid: null,
      surname: null,
      name: null,
      date_ini: null,
      date_from: null
    }
  };

  constructor(stepContext, specificato, edit_mode) {
    super(stepContext, specificato, edit_mode);
  } // lifecycle 0


  async initialize() {
    // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
    let inputData = this.getInputData();
    this.$_model.$_0___booking = inputData;
    return '';
  }

  renderView() {
    super.getWebUi().renderer({
      templateName: 'booking',
      templateType: 'detail',
      templateMetaInfo: super.getMetaInfo(),
      templateData: JSON.stringify({}),
      templateBindingZone: this.$_model.$_0___booking,
      templateValidator: null
    });
  }

}

exports.default = _default;

},{"step-fmw/stepping/AbstractDetailStep.js":13}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractDetailStep = _interopRequireDefault(require("step-fmw/stepping/AbstractDetailStep.js"));

var _CacheDizionari = _interopRequireDefault(require("../services/CacheDizionari.js"));

var _BookingCustomerInfoValidator = _interopRequireDefault(require("../validators/BookingCustomerInfoValidator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditItemController extends _AbstractDetailStep.default {
  $_model = {
    $_0___item: {}
  };
  cmbQty = [];
  _titoloNotify = 'Messaggio di Sistema';
  _messaggioNotigy = 'Attenzione , dichiara di prendere visione di questa supercazzola';

  constructor(stepContext, specificato, edit_mode) {
    super(stepContext, specificato, edit_mode);
  } // lifecycle 0


  async initialize() {
    // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
    let inputData = this.getInputData();
    console.log(JSON.stringify("INPUT DAT = " + JSON.stringify(inputData)));
    let modelRef;
    modelRef = inputData; // modelRef=inputData;

    modelRef.quantity = inputData.quantity;
    modelRef.type = inputData.type;
    modelRef.description = inputData.description;
    modelRef.unityCost = inputData.unityCost;
    modelRef.picture_uri = inputData.picture_uri;
    this.$_model.$_0___item = modelRef;
    console.log("modelRef=" + JSON.stringify(this.$_model)); // inizializzazione non parametrica (fissa)

    this.cmbQty = _CacheDizionari.default.getDizionario('Qty');
  } //  fetch da DETAIL/CAT


  renderView() {
    super.getWebUi().renderer({
      templateName: 'item',
      templateType: 'detail',
      templateMetaInfo: super.getMetaInfo(),
      templateData: JSON.stringify({
        cmbQty: this.cmbQty,
        picture_uri: this.getBindingModel().picture_uri
      }),
      templateBindingZone: super.getBindingModel(),
      templateValidator: new _BookingCustomerInfoValidator.default()
    });
  }

  insertEntity() {
    console.log("IL MODEL ITEM =" + JSON.stringify(this.$_model));
    super.getStepContext().returnStep("/booking/wizard", '/booking/wizard/edit-item', this.$_model.$_0___item);
  }

  async callback() {}

}

exports.default = EditItemController;

},{"../services/CacheDizionari.js":35,"../validators/BookingCustomerInfoValidator.js":38,"step-fmw/stepping/AbstractDetailStep.js":13}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractDetailStep = _interopRequireDefault(require("step-fmw/stepping/AbstractDetailStep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _default extends _AbstractDetailStep.default {
  constructor(router, specificato, edit_mode) {
    super(router, specificato, edit_mode);
  } // lifecycle 0


  buildModel() {}

  getBindingModel() {
    return {};
  }

  async initialize() {
    return '';
  } //  fetch da DETAIL/CAT


  renderView() {
    super.getWebUi().renderer({
      templateType: 'detail',
      templateName: 'home',
      templateData: JSON.stringify({}),
      templateMetaInfo: super.getMetaInfo(),
      templateBindingZone: null
    });
  }

  async callback() {}

}

exports.default = _default;

},{"step-fmw/stepping/AbstractDetailStep.js":13}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractLookupStep = _interopRequireDefault(require("step-fmw/stepping/AbstractLookupStep.js"));

var _BookingCustomerInfoValidator = _interopRequireDefault(require("../validators/BookingCustomerInfoValidator.js"));

var _manifest = _interopRequireDefault(require("../services/manifest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
class _default extends _AbstractLookupStep.default {
  emptyValidator = new _BookingCustomerInfoValidator.default();
  $_model = {
    $_0___items: {
      listOfProducts: [],
      cmbListOfCategories: [],
      selectedIdCategory: -1,
      //  flgOrdirePrezzoCrescente,
      cmbListOfPriceRedux: [],
      selectedIdPriceRedux: -1,
      flgOrderByPrice: false
    }
  };
  _header = ['type', 'description', 'unityCost', 'qty', 'picture_uri', "des_price_strategy"];

  constructor(stepContext, specificato, search_mode) {
    super(stepContext, specificato, search_mode);
  }

  async initialize() {
    this.$_model.$_0___items.cmbListOfCategories = await _manifest.default.getIstance().queryAllDizBikeType();
    this.$_model.$_0___items.cmbListOfCategories.push({
      codice: -1,
      descrizione: 'Tutte le categorie'
    });
    this.$_model.$_0___items.cmbListOfPriceRedux = await _manifest.default.getIstance().queryAllPriceStrategies();
    this.$_model.$_0___items.cmbListOfPriceRedux.push({
      codice: -1,
      descrizione: 'Tutte le promozioni'
    });
    return super.doLookupSearch({});
  }

  getCriteria() {
    let criteria = {
      selectedIdCategory: this.$_model.$_0___items.selectedIdCategory,
      selectedIdPriceRedux: this.$_model.$_0___items.selectedIdPriceRedux
    };
    return criteria;
  }

  setCollection(lst) {
    this.$_model.$_0___items.listOfProducts = lst;
  }

  pickElement(i) {
    console.log("***************************************");
    console.log(JSON.stringify(this.$_model.$_0___items.listOfProducts[i]));
    console.log("***************************************");
    return this.$_model.$_0___items.listOfProducts[i];
  }

  async asyncSearch(criteria) {
    console.log("***************************************");
    console.log("CRITERIA = " + JSON.stringify(criteria));
    console.log("***************************************");
    return await _manifest.default.getIstance().queryAllServices(criteria);
  }

  renderView() {
    console.log("render = " + JSON.stringify(this.$_model.$_0___items.listOfProducts));
    super.getWebUi().renderer({
      templateType: 'lookup',
      templateName: 'products',
      templateData: JSON.stringify({
        criteria: this.criteria,
        header: this._header,
        data: {
          listOfProducts: this.$_model.$_0___items.listOfProducts,
          cmbListOfCategories: this.$_model.$_0___items.cmbListOfCategories,
          cmbListOfPriceRedux: this.$_model.$_0___items.cmbListOfPriceRedux
        }
      }),
      templateMetaInfo: super.getMetaInfo(),
      templateBindingZone: super.getBindingModel(),
      templateValidator: this.emptyValidator
    });
  }

}

exports.default = _default;

},{"../services/manifest.js":37,"../validators/BookingCustomerInfoValidator.js":38,"step-fmw/stepping/AbstractLookupStep.js":14}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractWizardStep = _interopRequireDefault(require("step-fmw/stepping/AbstractWizardStep.js"));

var _BookingCustomerInfoValidator = _interopRequireDefault(require("../validators/BookingCustomerInfoValidator.js"));

var _manifest = _interopRequireDefault(require("../domain/manifest.js"));

var _manifest2 = _interopRequireDefault(require("../services/manifest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WizardBookingController extends _AbstractWizardStep.default {
  validator = new _BookingCustomerInfoValidator.default();
  $_model = {
    // 1 maschera
    $_0___booking: {
      id: null,
      from: null,
      to: null
    },
    //2 maschera del wizard
    $_1___bikes: {
      listOfItems: [],
      from: null,
      to: null,
      totalPrice: 0
    },
    // 3 maschera del wizard
    $_2___customerInfo: {
      firstname: null,
      surname: null,
      email: null,
      phoneNo: null,
      document: {
        number: '',
        type: '',
        scadenza: ''
      }
    }
  };

  constructor(routerRef, specificato, edit_mode) {
    super(routerRef, specificato, edit_mode);
  }

  getValidator() {
    if (super.getCurrentPhase() == 0) {
      return this.validator;
    }

    return null;
  }

  getElementOfCollection(index) {
    this.switchToPhase(1);
    return super.getBindingModel().listOfItems[index];
  }

  removeElementOfCollection(index) {
    this.switchToPhase(1);

    if (index > -1) {
      this.getBindingModel().listOfItems.splice(index, 1);
      this.$_model.$_1___bikes.totalPrice = _manifest.default.getIstance().removeItemToCurrentBooking(index);
    }

    this.renderView();
  }

  initialize() {// niente
  }

  insertEntity() {
    console.log("insiede confemra entity");
    let info = {
      title: 'empty title',
      message: 'empty message'
    };
    super.getStepRouter().callStep("/booking/confirm", JSON.stringify(info));
  }

  renderView() {
    let templateName = 'booking-phase' + super.getCurrentPhase();
    let header = super.getCurrentPhase() === 1 ? ["type", "qty", "daily cost", "img"] : {};
    let data;

    if (super.getCurrentPhase() === 1) {
      //data = this.model.bikes.listOfItems;
      data = this.getBindingModel().listOfItems.map(x => {
        return {
          type: x.description,
          qty: x.quantity,
          qty: x.quantity,
          picture_uri: x.picture_uri
        };
      });
    } else {
      data = {};
    }

    super.getWebUi().renderer({
      templateName: templateName,
      templateType: 'wizard',
      templateMetaInfo: super.getMetaInfo(),
      templateData: JSON.stringify({
        header,
        data
      }),
      templateBindingZone: super.getBindingModel(),
      templateValidator: this.validator
    });
  }

  async callback({
    fromStep,
    inputData
  }) {
    super.switchToPhase(1);

    if (fromStep === '/booking/wizard/edit-item') {
      if (!inputData.type) {
        return;
      }

      let idx = 0;
      this.getBindingModel().listOfItems.forEach(x => {
        if (x.id == inputData.id) {
          x.quantity = inputData.quantity.value;
          return;
        }

        idx++;
      });
      let idProduct = inputData.id;

      _manifest.default.getIstance().removeItemToCurrentBooking(idx);

      return _manifest2.default.getIstance().queryServiceById(idProduct).then(productTo => this.$_model.$_1___bikes.totalPrice = _manifest.default.getIstance().addItemToCurrentBooking(productTo, inputData.quantity.value));
    } else if (fromStep === '/booking/wizard/lookup-products') {
      this.getBindingModel().listOfItems.push(inputData);
      let from = this.$_model.$_0___booking.from;
      let to = this.$_model.$_0___booking.to;
      let idProduct = inputData.id;
      let qty = inputData.quantity.value;
      this.$_model.$_0___booking.id = _manifest.default.getIstance().createIfNotExist({
        from,
        to
      });
      return _manifest2.default.getIstance().queryServiceById(idProduct).then(productTo => this.$_model.$_1___bikes.totalPrice = _manifest.default.getIstance().addItemToCurrentBooking(productTo, qty));
    }
  }

  avanti() {
    // se ci sono errori non si va avanti
    if (!this.validator.isValid()) {
      return;
    }

    if (this.getCurrentPhase() === 0) {
      // validazione delle data from > data To
      let from = Date.parse(super.getBindingModel().from.value);
      let to = Date.parse(super.getBindingModel().to.value);
      let limiteValiditaApp = new Date('01/01/2022').getTime();
      console.log("from=" + from);
      console.log("to=" + to);
      console.log("limiteValiditaApp=" + limiteValiditaApp);
      let error = false;

      if (!super.getBindingModel().from.value) {
        super.getWebUi().setErrorMsg('from', 'La data ├¿ obbligatoria');
        error = true;
      }

      if (!super.getBindingModel().to.value) {
        super.getWebUi().setErrorMsg('to', 'La data ├¿ obbligatoria');
        error = true;
      }

      if (from > limiteValiditaApp) {
        super.getWebUi().setErrorMsg('from', 'La data iniziale non pu├▓ superare il 31/12/2021');
        error = true;
      }

      if (to > limiteValiditaApp) {
        super.getWebUi().setErrorMsg('to', 'La data finale non pu├▓ superare il 31/12/2021');
        error = true;
      }

      if (from > to) {
        super.getWebUi().setErrorMsg('to', 'La data finale non pu├▓ essere inferiore alla data iniziale');
        error = true;
      }

      if (error) {
        return;
      } // copio i valori al model della fase successiva


      this.$_model.$_1___bikes.from = super.getBindingModel().from.value;
      this.$_model.$_1___bikes.to = super.getBindingModel().to.value;
    }

    if (this.getCurrentPhase() == 1) {
      console.log(this.$_model.$_1___bikes.$_1___bikes);

      if (!this.$_model.$_1___bikes.$_1___bikes) {
        console.log("SELEZIONARE UNA BICI");
        super.getWebUi().setErrorMsg('val-box', 'Selezionare una bici');
        return;
      }
    }

    super.avanti();
  }

}

exports.default = WizardBookingController;

},{"../domain/manifest.js":34,"../services/manifest.js":37,"../validators/BookingCustomerInfoValidator.js":38,"step-fmw/stepping/AbstractWizardStep.js":16}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeStepLoader;

var _StepLoader = _interopRequireDefault(require("step-fmw/routing/StepLoader.js"));

var _HomeController = _interopRequireDefault(require("./HomeController.js"));

var _EditBookingController = _interopRequireDefault(require("./EditBookingController.js"));

var _CollectionBookingController = _interopRequireDefault(require("./CollectionBookingController.js"));

var _LookupProductsController = _interopRequireDefault(require("./LookupProductsController.js"));

var _WizardBookingController = _interopRequireDefault(require("./WizardBookingController.js"));

var _EditItemController = _interopRequireDefault(require("./EditItemController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeStepLoader({
  renderer,
  setErrorMsg
}) {
  const stepLoader = new _StepLoader.default({
    renderer,
    setErrorMsg
  }); // associo ad ogni etichetta una class

  stepLoader.use('STP.HOME_NOLOG', _HomeController.default);
  stepLoader.use('STP.LST_BOOKINGS', _CollectionBookingController.default);
  stepLoader.use('STP.VIS_BOOKING', _EditBookingController.default);
  stepLoader.use('STP.LKP_WIZ_PRODUCTS', _LookupProductsController.default);
  stepLoader.use('STP.WIZ_BOOKING', _WizardBookingController.default);
  stepLoader.use('STP.WIZ_BOOKING.UPD_ITEM', _EditItemController.default);
  return stepLoader;
}

},{"./CollectionBookingController.js":18,"./EditBookingController.js":19,"./EditItemController.js":20,"./HomeController.js":21,"./LookupProductsController.js":22,"./WizardBookingController.js":23,"step-fmw/routing/StepLoader.js":7}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeBooking;

var _booking = _interopRequireDefault(require("./booking.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildMakeBooking() {
  let istance = Object.freeze({
    createBooking
  });
  return {
    getInstance: function () {
      return istance;
    }
  };

  function createBooking({
    id = createUUID(),
    from,
    to
  }) {
    return new _booking.default({
      id,
      from,
      to
    });
  }

  function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  }

  function validateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!_$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }
}

function validateName(name) {
  var nameformat = /^[a-zA-Z├á├í├ó├ñ├ú├Ñ─à─ì─ç─Ö├¿├®├¬├½─ù─»├¼├¡├«├»┼é┼ä├▓├│├┤├Â├Á├©├╣├║├╗├╝┼│┼½├┐├¢┼╝┼║├▒├º─ì┼í┼¥├Ç├ü├é├ä├â├à─ä─å─î─û─ÿ├ê├ë├è├ï├î├ì├Ä├Å─«┼ü┼â├Æ├ô├ö├û├ò├ÿ├Ö├Ü├ø├£┼▓┼¬┼©├Ø┼╗┼╣├æ├ƒ├ç┼Æ├å─î┼á┼¢Ôêé├░ ,.'-]+$/u;

  if (name.match(nameformat)) {
    return true;
  } else {
    return false;
  }
}

function validatePhoneNo(number) {
  var telformat = /^\d{10}$/;

  if (number.match(telformat)) {
    return true;
  } else {
    return false;
  }
}

},{"./booking.js":28}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rateType = _interopRequireDefault(require("./rate-type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookingItem {
  _qty;
  _rate;

  constructor(rate, qty) {
    if (!(rate instanceof _rateType.default)) {
      throw new Error(' bike tipe fornito non ├¿ istanza di Product Object');
    }

    console.log("Creating Booking Item from the product =" + JSON.stringify(rate));
    console.log("In quantity:!" + qty);
    this._rate = rate;
    this._qty = qty;
  }

  _calculateItemUnityCost(interval) {
    console.log("--- calculate unity price");

    let price = this._rate.getDailyCost();

    console.log("daily price:" + price);

    let costReduxStrategy = this._rate.getPriceStrategy();

    console.log("costReduxStrategy==" + costReduxStrategy.saleRatio);
    console.log(costReduxStrategy.saleRatio(interval));
    let sconto = price * costReduxStrategy.saleRatio(interval);
    return price - sconto;
  }

  _getQty() {
    return this._qty;
  }

  getItemCost(interval) {
    console.log("inside getitemCost");
    console.log("debuf" + this._getQty());
    return this._getQty() * this._calculateItemUnityCost(interval);
  }

}

exports.default = BookingItem;

},{"./rate-type.js":33}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BookingSomeBikesSingleton;

var _bookingItem = _interopRequireDefault(require("./booking-item.js"));

var _bookingFactory = _interopRequireDefault(require("./booking-factory.js"));

var _priceStrategyFactory = _interopRequireDefault(require("./price-strategy-factory.js"));

var _rateType = _interopRequireDefault(require("./rate-type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BookingSomeBikesSingleton() {
  let currentBooking;
  let BookingFactorySingleton = (0, _bookingFactory.default)();
  let PriceStrategyFactorySingleton = (0, _priceStrategyFactory.default)();
  let istance = Object.freeze({
    createIfNotExist,
    addItemToCurrentBooking,
    getTotal,
    removeItemToCurrentBooking
  });
  return {
    getIstance: function () {
      return istance;
    }
  };

  function addItemToCurrentBooking(productTo, qty = 1) {
    let daily_cost = productTo.daily_cost;
    let id_price_strategy = productTo.id_price_strategy;
    let price_strategy = PriceStrategyFactorySingleton.getIstance().createPriceStrategy(id_price_strategy);
    let rate = new _rateType.default({
      price_strategy,
      daily_cost
    });
    currentBooking.addBookingItem(new _bookingItem.default(rate, qty));
    return currentBooking.getTotal();
  }

  function removeItemToCurrentBooking(index) {
    currentBooking.removeBookingItem(index);
    return currentBooking.getTotal();
  }

  function createIfNotExist({
    from,
    to
  }) {
    // creazione dell'entit├á
    if (!currentBooking) {
      console.log(BookingFactorySingleton.getInstance());
      currentBooking = BookingFactorySingleton.getInstance().createBooking({
        from,
        to
      });
    }

    return currentBooking.getId();
  }

  function getTotal() {
    return currentBooking.getTotal();
  }
}

},{"./booking-factory.js":25,"./booking-item.js":26,"./price-strategy-factory.js":31,"./rate-type.js":33}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bookingItem = _interopRequireDefault(require("./booking-item.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookingEntity {
  _id; // todo creazione dell'id

  _from;
  _to;
  _bookingItems;
  _total = 0;

  constructor({
    id,
    from,
    to
  }) {
    this._id = id;
    this._from = from;
    this._to = to;
    this._bookingItems = [];
  }

  getId() {
    return this._id;
  }

  addBookingItem(bi) {
    if (!bi instanceof _bookingItem.default) {
      throw new Error('not adding a valid item');
    }

    this._bookingItems.push(bi);

    console.log("items=" + JSON.stringify(this._bookingItems));
    this.calculateTotal();
  }

  removeBookingItem(index) {
    this._bookingItems.splice(index, 1);

    this.calculateTotal();
  }

  calculateTotal() {
    this._total = 0;

    this._bookingItems.forEach(item => {
      this._total += item.getItemCost(1);
      console.log("item.getCost=" + item.getItemCost(1));
      console.log("il totale CARRELLO ├¿ =" + this._total);
    });
  }

  getTotal() {
    this.calculateTotal();
    return this._total;
  }

}

exports.default = BookingEntity;

},{"./booking-item.js":26}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _priceStrategyI = _interopRequireDefault(require("./price-strategy-i.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Price3DaysStrategy extends _priceStrategyI.default {
  saleRatio(periodoNoleggio) {
    let duration = periodoNoleggio;

    if (duration < 3) {
      return 0;
    }

    if (duration > 3 && duration <= 5) {
      return 10; // sconto del 10% ogni giorno
    }

    if (duration > 5 && duration <= 10) {
      return 15; // sconto del 15%
    }

    if (duration > 10) {
      return 20; // sconto del 20%
    }
  }

}

exports.default = Price3DaysStrategy;

},{"./price-strategy-i.js":32}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _priceStrategyI = _interopRequireDefault(require("./price-strategy-i.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PriceDefaultStrategy extends _priceStrategyI.default {
  saleRatio(periodoNoleggio) {
    // NESSUNO SCONTO
    return 0;
  }

}

exports.default = PriceDefaultStrategy;

},{"./price-strategy-i.js":32}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakePriceStrategy;

var _priceStrategy3days = _interopRequireDefault(require("./price-strategy-3days.js"));

var _priceStrategyDefault = _interopRequireDefault(require("./price-strategy-default.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildMakePriceStrategy() {
  function createPriceStrategy(codStrategy = 0) {
    switch (codStrategy) {
      case 0:
        return new _priceStrategyDefault.default();

      case 1:
        return new _priceStrategy3days.default();

      default:
        return new _priceStrategyDefault.default();
    }
  }

  let istance = Object.freeze({
    createPriceStrategy
  });
  return {
    getIstance: function () {
      return istance;
    }
  };
}

},{"./price-strategy-3days.js":29,"./price-strategy-default.js":30}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class PriceStrategyInterface {
  saleRatio(interval) {
    throw new Error('not implemented');
  }

}

exports.default = PriceStrategyInterface;

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Rate {
  _costReduxStrategy;
  _dailyPrice;

  constructor({
    price_strategy,
    daily_cost
  }) {
    this._dailyPrice = daily_cost;
    this.setPriceStrategy(price_strategy);
  }

  getDailyCost() {
    return this._dailyPrice;
  }

  setPriceStrategy(costReduxStrategy) {
    this._costReduxStrategy = costReduxStrategy;
  }

  getPriceStrategy() {
    return this._costReduxStrategy;
  }

}

exports.default = Rate;

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bookingSomeBikes = _interopRequireDefault(require("./booking/booking-some-bikes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BookingBikesDomain = (0, _bookingSomeBikes.default)();
var _default = BookingBikesDomain;
exports.default = _default;

},{"./booking/booking-some-bikes.js":27}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractCacheDizionari = _interopRequireDefault(require("step-fmw/dictionary/AbstractCacheDizionari.js"));

var _Dizionario = _interopRequireDefault(require("step-fmw/dictionary/Dizionario.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _default extends _AbstractCacheDizionari.default {
  constructor() {
    super();
  }

  static toLiteral(dizionario) {
    return;
    dizionario.map(x => {
      return {
        codice: x.getCodice(),
        descrizione: x.getDescrizione()
      };
    });
  }

  getDizionarioQty() {
    return [new _Dizionario.default('1', '1'), new _Dizionario.default('2', '2'), new _Dizionario.default('3', '3'), new _Dizionario.default('4', '4'), new _Dizionario.default('5', '5')];
  }

  getDizionarioProva() {
    return [new _Dizionario.default('BC', 'BICI CITT├Ç	'), new _Dizionario.default('MBF', 'MOUNTAIN BIKE FRONT'), new _Dizionario.default('MBFS', 'MOUNTAIN BIKE FULL SUSPENDED'), new _Dizionario.default('BSC', 'BICI DA STRADA (TELAIO IN CARBONIO)'), new _Dizionario.default('BJ20', 'BICI JUNIOR 20"'), new _Dizionario.default('BJ24', 'BICI JUNIOR 24"'), new _Dizionario.default('SB', 'SEGGIOLINO PER BICI'), new _Dizionario.default('MBFE', 'MTB FRONT ELETTRICA'), new _Dizionario.default('SB', 'SEGGIOLINO PER BICI'), new _Dizionario.default('MBFE', 'MTB FRONT ELETTRICA'), new _Dizionario.default('MBAM', 'MTB ALL MOUNTAIN'), new _Dizionario.default('BSA', 'BICI DA STRADA (TELAIO IN ALLUMINIO'), new _Dizionario.default('BP', 'BICI PIEGHEVOLE'), new _Dizionario.default('BT', 'BICI TREKKING'), new _Dizionario.default('BTE', 'BICI TREKKING ELETTRICA'), new _Dizionario.default('BGA', 'BICI GRAVEL (TELAIO IN ALLUMINIO)'), new _Dizionario.default('BEP', 'BICI ELETTRICA PIEGHEVOLE'), new _Dizionario.default('BSE', 'BICI DA STRADA ELETTRICA'), new _Dizionario.default('BGE', 'BICI GRAVEL ELETTRICA')];
  }

}

exports.default = _default;

},{"step-fmw/dictionary/AbstractCacheDizionari.js":4,"step-fmw/dictionary/Dizionario.js":5}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BookingServiceSingleton;

function BookingServiceSingleton({
  restBackend
}) {
  console.log("inside booking service restBackend is=" + restBackend);
  let istance = Object.freeze({
    queryAllServices,
    queryServiceById,
    queryAllBookings,
    queryAllDizBikeType,
    queryAllPriceStrategies
  });
  return {
    getIstance: function () {
      return istance;
    }
  };

  async function queryAllPriceStrategies() {
    return restBackend.callAPI({
      uri: "/diz-price-reduxes"
    }).then(data => data.json()).then(typeList => {
      return typeList.map(b => {
        let codice = b.id;
        let descrizione = b.DES_PRICE_REDUX;
        return Object.freeze({
          codice,
          descrizione
        });
      });
    });
  }

  async function queryAllDizBikeType() {
    return restBackend.callAPI({
      uri: "/diz-bike-types"
    }).then(data => data.json()).then(typeList => {
      return typeList.map(b => {
        let codice = b.id;
        let descrizione = b.DES_BIKE_TYPE;
        return Object.freeze({
          codice,
          descrizione
        });
      });
    });
  }

  async function queryAllServices(criteria) {
    //  se on esiste il criterio equitvale a tutte le categori
    let i = !criteria.selectedIdCategory ? -1 : criteria.selectedIdCategory.value;
    let j = !criteria.selectedIdPriceRedux ? -1 : criteria.selectedIdPriceRedux.value;
    let flgOrderByPrice = !criteria.flgOrderByPrice ? false : criteria.flgOrderByPrice;
    console.log("i=" + i);
    console.log("j=" + j);
    return restBackend.callAPI({
      uri: "/services"
    }).then(data => data.json()).then(productList => {
      let prg = productList.map(x => {
        // find All Products ---> restituisce un Array [] di Product
        // TODO: sostituzione con let p = new ProductTO()
        // p.setType(x.bike_category.id);
        // p.setId(x.id);
        // ecc ecc..
        // return p;
        let type = x.bike_category.id;
        let id = x.id;
        let description = x.bike_category.DES_BIKE_TYPE;
        let unityCost = x.daily_cost;
        let quantity = 1;
        let formats = x.bike_category.picture[0].formats;
        let format = formats['large'] || formats['medium'] || formats['small'] || formats['thumbnail'];
        let picture_uri = format.url;
        let des_price_strategy = x.price_strategy.DES_PRICE_REDUX;
        let id_price_strategy = x.price_strategy.id;
        let id_bike_category = x.bike_category.id;
        console.log("dao::des_price_Strategy" + des_price_strategy);
        return {
          id,
          type,
          description,
          unityCost,
          quantity,
          picture_uri,
          des_price_strategy,
          id_price_strategy,
          id_bike_category
        };
      });
      return prg;
    }) // se tutte le CATEGORIE (=-1) Dammi tutti i prodotti
    .then(listOfProd => i == -1 ? listOfProd : listOfProd.map(x => x).filter(prod => prod.id_bike_category == i)).then(listOfProd => j == -1 ? listOfProd : listOfProd.map(x => x).filter(prod => prod.id_price_strategy == j)).then(listOfProd => flgOrderByPrice === false ? listOfProd : listOfProd.map(x => x).slice().sort((a, b) => a - b > 0));
  }

  async function queryServiceById(idService) {
    return restBackend.callAPI({
      uri: '/services/' + idService
    }).then(data => data.json()).then(x => {
      return Object.freeze({
        daily_cost: x.daily_cost,
        id_price_strategy: x.price_strategy.id
      });
    });
  }

  async function queryAllBookings() {
    console.log("inide BOokingDao::findAllBookings");
    return restBackend.callAPI({
      uri: '/bookings'
    }).then(data => data.json()).then(bookingList => {
      console.log(JSON.stringify(bookingList));
      return bookingList.map(b => {
        let id = b.id;
        let booking_uuid = b.booking_uuid;
        let surname = b.surname;
        let name = b.name;
        let date_ini = b.intervalFrom;
        let date_fin = b.intervalTo;
        return Object.freeze({
          id,
          booking_uuid,
          surname,
          name,
          date_ini,
          date_fin
        });
      });
    });
  }
}

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bookingService = _interopRequireDefault(require("./booking-service.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _url = 'http://localhost:1337';

function makeBackend(_url) {
  console.log("making backend..");
  let baseUrl = _url;
  return Object.freeze({
    callAPI: async function ({
      _url,
      uri = '/',
      method = 'GET',
      body = {}
    }) {
      console.log("uri=" + uri);
      const request4post = {
        method: method,
        // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        // no-cors, *cors, same-origin
        cache: 'no-cache',
        // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        // manual, *follow, error
        referrerPolicy: 'no-referrer',
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body)
      };
      const request4get = {
        method: method,
        // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        // no-cors, *cors, same-origin
        cache: 'no-cache',
        // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMTU0ODMwLCJleHAiOjE2MjU3NDY4MzB9.E7-sWnrQPr-VsR-HnKpbbpU_SR5_6-uZjfL99qc-u6o'
        },
        redirect: 'follow',
        // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

      };
      console.log("requesting " + baseUrl + uri + " with " + JSON.stringify(request4get));
      return fetch(baseUrl + uri, request4get); // return fetch('http://localhost:1337/services', request4get); 
    }
  });
}

const restBackend = makeBackend(_url);
console.log("BUILDING SERVICE DAO!!");
console.log("backend = " + JSON.stringify(restBackend));
const BookingService = (0, _bookingService.default)({
  restBackend
});
var _default = BookingService;
exports.default = _default;

},{"./booking-service.js":36}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractValidator = _interopRequireDefault(require("step-fmw/data-binding/AbstractValidator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author smilazzo
 * 
 */
class _default extends _AbstractValidator.default {
  validateField(name, value) {
    // validazione 1 tab
    if (name === 'id') {
      if (!value) {
        return 'errore: il campo UUID ├¿ obbligatorio';
      }
    }

    if (name === 'from') {
      if (!value) {
        return 'errore: il campo Dal ├¿ obbligatorio';
      } else {
        let dataOdierna = Date.now();
        let from = Date.parse(value);

        if (from <= dataOdierna) {
          return 'errore: non ├¿ possibile selezionare una data anteriore la data odierna.';
        }
      }
    }

    if (name === 'to') {
      if (!value) {
        return 'errore: il campo To ├¿ obbligatorio';
      }

      {
        let dataOdierna = Date.now();
        let toParsed = Date.parse(value);

        if (toParsed <= dataOdierna) {
          return 'errore: non ├¿ possibile selezionare una data anteriore la data odierna.';
        } else {}
      }
    } // validazione name


    if (name === 'firstname') {
      if (!value) {
        return 'errore: il campo Nome ├¿ obbligatoio';
      }
    }

    if (name === 'surname') {
      if (!value) {
        return 'errore: il campo Cognome ├¿ obbligatoio';
      }
    }

    if (name === 'email') {
      if (!value) {
        return 'errore: il campo Email ├¿ obbligatoio';
      } else {
        if (!this.validateEmail(value)) {
          return 'errore: L email inserita non ├¿ valida';
        }
      }
    }

    if (name === 'phoneNo') {
      if (!value) {
        return 'errore: il campo Tel. ├¿ obbligatoio';
      } else {
        if (!this.validatePhoneNo(value)) {
          return 'errore: il campo Tel. non ├¿ valido';
        }
      }
    }
  }

  validateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!_$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  validateName(name) {
    var nameformat = /^[a-zA-Z├á├í├ó├ñ├ú├Ñ─à─ì─ç─Ö├¿├®├¬├½─ù─»├¼├¡├«├»┼é┼ä├▓├│├┤├Â├Á├©├╣├║├╗├╝┼│┼½├┐├¢┼╝┼║├▒├º─ì┼í┼¥├Ç├ü├é├ä├â├à─ä─å─î─û─ÿ├ê├ë├è├ï├î├ì├Ä├Å─«┼ü┼â├Æ├ô├ö├û├ò├ÿ├Ö├Ü├ø├£┼▓┼¬┼©├Ø┼╗┼╣├æ├ƒ├ç┼Æ├å─î┼á┼¢Ôêé├░ ,.'-]+$/u;

    if (name.match(nameformat)) {
      return true;
    } else {
      return false;
    }
  }

  validatePhoneNo(number) {
    var telformat = /^\d{10}$/;

    if (number.match(telformat)) {
      return true;
    } else {
      return false;
    }
  }

}

exports.default = _default;

},{"step-fmw/data-binding/AbstractValidator.js":1}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uiListener = _interopRequireDefault(require("./ui-listener.js"));

var _uiRender = _interopRequireDefault(require("./ui-render.js"));

var _manifest = _interopRequireDefault(require("../controllers/manifest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileServerURI = '/static/frontend/web-ui/step-fmw-routes.json';
let UIRendeting = (0, _uiRender.default)(); //IoT per il rendering

const stepClassLoader = (0, _manifest.default)({
  renderer: UIRendeting.renderView,
  setErrorMsg: UIRendeting.setErrorMsg
});
const stepListener = (0, _uiListener.default)(fileServerURI, stepClassLoader);
const view = Object.freeze({
  start: stepListener
});
var _default = view;
exports.default = _default;

},{"../controllers/manifest.js":24,"./ui-listener.js":40,"./ui-render.js":41}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeUIListener;

var _StepEventListener = _interopRequireDefault(require("step-fmw/routing/StepEventListener.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dipendenze dal framework
function buildMakeUIListener(jsonroutesUri, stepLoader) {
  // la APP deve invocare il metodo startListening per
  // avviare l'engine MVC!
  return async function () {
    loadStepRoutes(jsonroutesUri).then(routes => new _StepEventListener.default().startListening(routes, stepLoader));
  };

  async function loadStepRoutes(routes) {
    return fetch(routes).then(data => data.json());
  }
}

},{"step-fmw/routing/StepEventListener.js":6}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeUIRendering;

var _Observable = _interopRequireDefault(require("step-fmw/data-binding/Observable.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildMakeUIRendering() {
  return Object.freeze({
    renderView,
    setErrorMsg
  });

  function setErrorMsg(input, errorMsg) {
    let errorZone = document.querySelector('_' + input).parentElement;
    console.log(errorZone);
    const small = errorZone.querySelector('small');
    console.log("small");
    errorZone.className = 'form-control error';
    small.innerText = errorMsg;
  }

  async function renderView({
    templateType,
    templateName,
    templateMetaInfo,
    templateData,
    templateBindingZone = null,
    templateValidator = {}
  }) {
    document.querySelector('#step-loading').style.visibility = 'visible';
    let oldOpacity = document.querySelector('#step').style.opacity;
    document.querySelector('#step').style.opacity = '0.2';
    document.querySelector('#step-loading').style.opacity = '1';
    let url = `http://localhost:3000/launcher/${templateType}/${templateName}`;
    getHtmlFromNodeServer(url, templateData, templateMetaInfo).then(html => html.text()).then(html => {
      document.querySelector('#step-loading').style.visibility = 'hidden';
      document.querySelector('#step').innerHTML = html;
      document.querySelector('#step').style.opacity = oldOpacity;

      if (templateBindingZone !== null) {
        // 2 way binding
        applyBindings(templateBindingZone, templateValidator);
      }
    }).catch(err => {
      console.log("Problemi di connessione ajax con il server:" + err);
      document.querySelector('#step').innerHTML = `
                             
                             <h1>Si ├¿ verificato un errore nella connessione col server</h1>
                             <p>
                             <img class="avatar-large" alt="io" src="./bike_crash.png" />
                             </p>
                             <p>
                             Dettaglio Errore :[${err}]
                             </p>
                             
                             
                             
                             
                             
                             `;
      document.querySelector('#step').style.opacity = oldOpacity;
    });
  }

  function applyBindings(model, validator) {
    document.querySelectorAll("[data-bind]").forEach(elem => {
      let obs = model[elem.getAttribute("data-bind")];

      if (obs instanceof _Observable.default) {
        obs = new _Observable.default(obs.value);
      } else {
        obs = new _Observable.default(obs);
      }

      model[elem.getAttribute("data-bind")] = obs;
      obs.bindToHtmlElement(elem, validator);
    });
  }

  async function getHtmlFromNodeServer(templateUrl, templateData, metaInfo) {
    let t = JSON.parse(templateData);
    t.meta = metaInfo;
    const postData = {
      method: 'POST',
      // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      // no-cors, *cors, same-origin
      cache: 'no-cache',
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      // manual, *follow, error
      referrerPolicy: 'no-referrer',
      // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(t)
    };
    return fetch(templateUrl, postData);
  }
}

},{"step-fmw/data-binding/Observable.js":3}]},{},[17]);
