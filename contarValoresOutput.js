const express = require('express');
const fs = require('fs');
const multer = require('multer');
const csvtojson = require('csvtojson');

const upload = multer();
const app = express();


const contarValues = (archivoJSON) => {
    let valuesAmount = 0;
    archivoJSON.forEach((obj)=> {
        obj.attributes.forEach((attribute)=> {
            valuesAmount += attribute.values.length;
        });
    });
    console.log("values en json: ", valuesAmount);
};


app.post('/', upload.single('archivo') ,(req,res) => {
    
    let dataJSON = req.file.buffer.toString();
    
    let object = JSON.parse(dataJSON);

    // console.log(typeof csvObject);
    contarValues(object);

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
