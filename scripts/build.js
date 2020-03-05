let fs = require('fs')
let request = require('request');
let Client = require("cql-translation-service-client").Client

// sample header= "multipart/form-data;boundary=Boundary_1"
// get the part after "boundary=" and before any subsequent ;
const extractMultipartBoundary = /.*;boundary=(Boundary.*);?.*/g;

const extractMultipartFileName = /Content-Disposition: form-data; name="([^"]+)"/;

// eveything between { } including newlines. [^] is like . but matches newline
const extractJSONContent = /(\{[^]*\})/;

let url = 'http://moonshot-dev.mitre.org:8080/cql/translator'
let cqlClient = new Client(url);
let dir = 'src/'
let buildPath = 'build/'

let formatName = function (file) {
  return file;
}

let listFiles = function (path) {
  let items = fs.readdirSync(path)
  let formData = {}
  for (var i = 0; i < items.length; i++) {
    let name = formatName(items[i])
    if(name.endsWith(".cql")){
      formData[name] = fs.createReadStream(dir + '/' + items[i])
    }
  }
  return formData;
}

let writeFile = function (file, data) {
  if(!fs.existsSync(buildPath)){ fs.mkdirSync(buildPath)};
  let fullName = buildPath + file;
  fs.writeFileSync(fullName, data)
}

let errorCheck = function (annotations) {
  if (annotations && annotations.length > 0) {
    return false
  }
  return true;
}

let formData = {libraries: listFiles(dir)}
cqlClient.convertCQL(formData).then((elm) =>{
  let keys = Object.keys(elm.libraries)
  for(k in keys){
    writeFile(keys[k] + ".json", JSON.stringify(elm.libraries[keys[k]]));
  }
  //let json  = JSON.parse(elm);
  
  console.log(elm);
  
});//
// let error = false;
// request.post({
//   url: url,
//   formData: formData
// }, function (err, httpResponse, body) {
//   if(err){
//     console.log(err);
//   }
//   const header = httpResponse.headers['content-type'];
//   let boundary = '';
//   if (header) {
//     // sample header= "multipart/form-data;boundary=Boundary_1"
//     const result = extractMultipartBoundary.exec(header);
//     boundary = result ? `--${result[1]}` : '';
//   }

//   body.split(boundary).forEach((line) => {
//     const body = extractJSONContent.exec(line);
//     if (body) {
//       const elmName = extractMultipartFileName.exec(line);
//       if (elmName && elmName[1]) {
//         let json  = JSON.parse(body[1]);
//         writeFile(elmName[1] + ".json", body[1])
//         if (json.library.annotation) {
//             error = true;
//         }
//       }
//     }
//   });
//   if (error) {
//     console.error("There were errors in the cql to elm conversion")
//     process.exit(1)
//   }
// });