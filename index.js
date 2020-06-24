const express = require('express');
const fs = require('fs');
const multer = require('multer');
const csvtojson = require('csvtojson');

const upload = multer();
const app = express();


const existeAtributo = (newcsv, arrayElement) => {
    let elemento = newcsv.find( (e) => {
        
        let validation = false;
        e.attributes.forEach(e=>{
            if (e.name == arrayElement[0])  {
                validation = true;
            }
        });
        
        return validation;

    });
    if (elemento == undefined) {
        return false;
    } else {
        return true;
    }
}

const existeValue = (newcsv, arrayElement) => {
    let elemento = newcsv.find( (e) => {

        let validation = false;
        e.attributes.forEach(e=>{
            if (e.name == arrayElement[0] && e.values.includes(arrayElement[1]))  {
                validation = true;
            }
        });
        
        return validation;
    });

    if (elemento == undefined) {
        return false;
    } else {
        return true;
    }
}

const crearNewCsv = (inputFile) => {
  let newcsv=[];
    inputFile.forEach((element) => {


    if (newcsv.find((e)=>e.id==element[3])==undefined) { //Si no existe el ID en "newcsv"
        newcsv.push({
            id: element[3],
            attributes: [{name: element[0], values: [element[1]]}],
        });
    } else { // Si existe el ID en "newcsv"
        if (!existeAtributo(newcsv,element)) { // Si no existe el atributo en "newcsv"
            newcsv.find((e)=>e.id==element[3]).attributes.push({name: element[0], values: [element[1]]}); 
        } else { // Si existe el atributo
            if (!existeValue(newcsv,element)) { // Si no existe el value y existe el atributo
                
                let elem = newcsv.find((e)=>e.id==element[3]);
                elem.attributes.forEach(e=>{
                    if (e.name == element[0]) {
                        e.values.push(element[1]);
                    }
                });
            }
        }
    }
    });
    
    fs.writeFile('data.json', JSON.stringify(newcsv),(err) => {
        if(err) {
            console.log(err);
        }
    });
}

app.post('/', upload.single('archivo') ,(req,res) => {
    
    let csvString = req.file.buffer.toString();
    
    csvtojson({
        delimiter: ";",
        noheader:false,
        output: "csv"
    })
    .fromString(csvString)
    .then((csvRow)=>{
        crearNewCsv(csvRow);
    })

    res.send("transformado a Array!");
});

app.listen(3000);

