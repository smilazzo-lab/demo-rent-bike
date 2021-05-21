 /**
 * @author Salvatore Milazzo
 * @description FileUpload, manages uploads 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 * @todo da rivedere e ampliare
 */

 export default class FileUpload {
    myfiles=[];
    myFilesName = [];
    //sono nomi logici
    realUploadButton;
    fakeUploadButton;
    labelFileName;
    downloadButton;
    dropButton;
    defaultLabelText = 'Nessun File Selezionato';


    constructor(realUploadButton,
                fakeUploadButton,
                labelFileName
               ){
        
        // sono già gli elementi HTML della pagina corrente
        this.realUploadButton=realUploadButton;
        this.fakeUploadButton=fakeUploadButton;
        this.labelFileName=labelFileName;
       

        this.addListeners();
    }

    addListeners() {
          // associo tutti i listener ai pulsanti coinvolti
        this.fakeUploadButton.addEventListener('click', 
                                      function() { 
                                         document.getElementById('myFile').click();
                                      });

        this.realUploadButton.addEventListener('change', function(y) {
             y.preventDefault();
             let myfiles=  document.getElementById('myFile').files;
             let myFileNameList  = Array.prototype.map.call(myfiles, 
                function(file) {
                return file.name;
              });
        
              document.getElementById('label').textContent = myFileNameList.join(", ") || 'nessun file sel!';
            });
        }

    fileSelectHandler() {
            // Fetch FileList object
     var files = this.myfiles;
     
      for (var i = 0, f; f = files[i]; i++) {
            validateFile(f);
         //   uploadFile(f);
        }
    }

        // Output
    output(msg) {
            // Response
        var m = document.getElementById('messages');
        m.innerHTML = msg;
    }

    validateFile(f) {
       console.log(f.name);
       output('<strong>' + encodeURI(f.name) + '</strong>');
       // var fileType = file.type;
       // console.log(fileType);
       var imageName = f.name;
       var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
       if (isGood) {
           console.log("il file è bono");
               }
            else {
                console.log("il file non gne bono");
              }
        }
/*
        setProgressMaxValue(e) {
            var pBar = document.getElementById(`file-progress-${this.#uid}`);
            if (e.lengthComputable) {
            pBar.max = e.total;
            }
        }

        updateFileProgress(e) {
            var pBar = document.getElementById(`file-progress-${this.#uid}`);
            if (e.lengthComputable) {
            pBar.value = e.loaded;
            }
        }
*/

         // NON DEVO FARE L'UPLOAD, devo solo memorizzare l'oggetto
        /*
        uploadFile(file) {
            var xhr = new XMLHttpRequest(),
            fileInput = document.getElementById(`class-roster-file-${this.#uid}`),
            pBar = document.getElementById(`file-progress-${this.#uid}`),
            fileSizeLimit = 1024; // In MB
            if (xhr.upload) {
            // Check if file is less than x MB
            if (file.size <= fileSizeLimit * 1024 * 1024) {
                // Progress bar
                pBar.style.display = 'inline';
                xhr.upload.addEventListener(`loadstart-${this.#uid}`, setProgressMaxValue, false);
                xhr.upload.addEventListener(`progress-${this.#uid}`, updateFileProgress, false);

                // File received / failed
                xhr.onreadystatechange = function(e) {
                if (xhr.readyState == 4) {
                    // Everything is good!

                    // progress.className = (xhr.status == 200 ? "success" : "failure");
                    // document.location.reload(true);
                }
                };

                // Start upload
                xhr.open('POST', document.getElementById('file-upload-form').action, true);
                xhr.setRequestHeader('X-File-Name', file.name);
                xhr.setRequestHeader('X-File-Size', file.size);
                xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.send(file);
            } else {
                output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
            }
            }
        }
        */

    }

