Lo stato dell'arte è 

1. step-fmk è scaricabile correttamente dal npm package manager.
2. pero i sorgenti su git-hub devono essere rivisti nel seguente modo
    a) non ci devono essere metodi privati perchè non funzionano su node
    b) si deve browserify per far caricare il modulo a cascata da app.js presso il browser
    b2) app.js quindi carica le sue dipendenze da un bundle browserifizzato
    c) browserify quindi creerebbe dal manifest.js un file manifest-bundle.js e il package.json dell'app dev'essere reindirizzato su quello
    d) anche cosi non funzionerebbe perchè il browserify non lavora con ES6 import
    d) quindi devo usare anche esmify perchè converte gli import in commonJS, per poi essere browserifyizzati
    e) la riga di comando è : browserify manifest.js --plugin esmify > manifest-bundle.js  