const express = require('express');
const fs = require('fs');
const multer = require('multer');
const csvtojson = require('csvtojson');

const upload = multer();
const app = express();


app.post('/', upload.single('archivo') ,(req,res) => {
    
    let csvString = req.file.buffer.toString();
    
    let csvObject = JSON.parse(csvString);

    // console.log(typeof csvObject);

    csvObject.forEach((element) => {
        console.log(element.value);
    })

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

