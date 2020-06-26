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
            if (e.name == arrayElement.frontend_label)  {
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
            if (e.name == arrayElement.frontend_label && e.values.includes(arrayElement.value))  {
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
    let parsedLines = 0;
    let valoresRepetidos = 0;

    inputFile.forEach((element) => {


    if (newcsv.find((e)=>e.id== element.category_id)==undefined) { //Si no existe el ID en "newcsv"
        newcsv.push({
            id:  element.category_id,
            attributes: [{name: element.frontend_label, values: [element.value]}],
        });
        parsedLines++;
    } else { // Si existe el ID en "newcsv"
        if (!existeAtributo(newcsv,element)) { // Si no existe el atributo en "newcsv"
            newcsv.find((e)=>e.id== element.category_id).attributes.push({name: element.frontend_label, values: [element.value]}); 
            parsedLines++;
        } else { // Si existe el atributo
            if (!existeValue(newcsv,element)) { // Si no existe el value y existe el atributo
                
                let elem = newcsv.find((e)=>e.id== element.category_id);
                elem.attributes.forEach(e=>{
                    if (e.name == element.frontend_label) {
                        e.values.push(element.value);
                    }
                });
                parsedLines++
            } else {
                parsedLines++;
                valoresRepetidos++;

            }
        }
    }
    });
    
    console.log("parsed lines: " , parsedLines);
    console.log("valores repetidos: ", valoresRepetidos);

    fs.writeFile('data.json', JSON.stringify(newcsv),{encoding: 'utf8'},(err) => {
        if(err) {
            console.log(err);
        }
    });
}

app.post('/', upload.single('archivo') ,(req,res) => {
    
    let csvString = req.file.buffer.toString();
    
    csvObject = JSON.parse(csvString);

    crearNewCsv(csvObject);

    // csvtojson({
    //     delimiter: ";",
    //     noheader:false,
    //     output: "csv"
    // })
    // .fromString(csvString)
    // .then((csvRow)=>{
    //     console.log(csvRow);
    //     crearNewCsv(csvRow);
    // })

    res.send("transformado a Array!");
});

app.listen(3000);

