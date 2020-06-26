const express = require('express');
// const fs = require('fs');
const multer = require('multer');

const upload = multer();
const app = express();


app.post('/', upload.single('archivo') ,(req,res) => {
    
    let csvString = req.file.buffer.toString();
    
    csvObject = JSON.parse(csvString);

    console.log(csvObject.length); //254033 254033 repetidos : 220681

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

